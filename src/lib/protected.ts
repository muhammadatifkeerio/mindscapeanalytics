import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: protectedProcedure, runProtected, THE BLOCK, requirePermission, plan limit, rate limit, audit, pagination
 * WHAT: The skeletal spine for Server Actions — equivalent of protectedProcedure without a second tRPC stack.
 * WHY: Auth, permission, plan, rate, pagination, and audit must run here so routers/actions only hold business logic.
 * WHERE: src/app/_actions/* mutations and privileged queries.
 */

import { headers } from "next/headers";
import { z } from "zod";
import { getProtectedContext } from "@/lib/get-session";
import { hasPermission } from "@/lib/adapters";
import { checkFeatureGate } from "@/lib/feature-gate";
import { writeAuditRow } from "@/lib/audit";
import { checkRateLimit, getRateLimitIdentifierFromHeaders, throwIfRateLimited } from "@/lib/rate-limit";
import { isLimitResource, type ActionState, type AuditOverride, type Permission, type ProtectedCtx } from "@/lib/types";
import { ForbiddenError, UnauthorizedError, RateLimitError, ValidationError } from "@/lib/api-error";
import * as usageService from "@/services/usage.service";

export interface ProtectedOptions {
    permission: Permission;
    audit?: false | AuditOverride;
    rateLimit?: { maxRequests: number; windowMs: number };
}

function formValue(formData: FormData, key: string): string {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
}

function formValues(formData: FormData, key: string): string[] {
    return formData.getAll(key).filter((value): value is string => typeof value === "string");
}

export { formValue, formValues };

function isNextControlFlow(error: unknown): boolean {
    if (typeof error !== "object" || error === null || !("digest" in error)) return false;
    const digest = String((error as { digest?: string }).digest);
    return digest.startsWith("NEXT_REDIRECT") || digest.startsWith("NEXT_NOT_FOUND");
}

function toActionError(error: unknown): ActionState {
    if (error instanceof UnauthorizedError) {
        return { error: error.message, success: false };
    }
    if (error instanceof ForbiddenError) {
        return { error: error.message, success: false };
    }
    if (error instanceof RateLimitError) {
        return { error: error.message, success: false };
    }
    if (error instanceof ValidationError) {
        return { error: error.message, success: false };
    }
    if (error instanceof Error) {
        return { error: error.message, success: false };
    }
    return { error: "Unexpected error", success: false };
}

/**
 * SOURCE OF TRUTH KEYWORDS: runProtected, gates, checkFeatureGate, writeAuditRow
 * WHAT: Linear gate path: session → rate → permission → plan limit → handler → audit.
 * WHY: Echo: missing permission/limit options fail here instead of a per-router copy.
 * WHERE: protectedMutation / protectedFormMutation / protectedQuery.
 */
export async function runProtected<TResult>(
    options: ProtectedOptions,
    handler: (ctx: ProtectedCtx) => Promise<TResult>,
): Promise<TResult> {
    const ctx = await getProtectedContext();
    if (!ctx) {
        throw new UnauthorizedError();
    }

    const headerList = await headers();
    const identifier = getRateLimitIdentifierFromHeaders(headerList, ctx.userId);
    const rate = checkRateLimit(
        identifier,
        options.rateLimit?.maxRequests ?? 60,
        options.rateLimit?.windowMs ?? 60_000,
    );
    throwIfRateLimited(rate);

    if (!hasPermission(ctx, options.permission)) {
        throw new ForbiddenError();
    }

    if (isLimitResource(options.permission)) {
        const current = await usageService.countForPermission(options.permission, ctx);
        checkFeatureGate({
            permission: options.permission,
            plan: ctx.plan,
            current,
        });
    }

    const result = await handler(ctx);

    if (options.audit !== false) {
        await writeAuditRow({
            permission: options.permission,
            userId: ctx.userId,
            override: options.audit,
        });
    }

    return result;
}

export function protectedFormMutation<TSchema extends z.ZodType>(
    options: ProtectedOptions & {
        schema: TSchema;
        fromFormData: (formData: FormData) => Record<string, string | number | boolean | undefined | string[] | Array<{ filename: string; url: string }>>;
    },
    handler: (args: { ctx: ProtectedCtx; input: z.infer<TSchema> }) => Promise<ActionState | void>,
): (prevState: ActionState, formData: FormData) => Promise<ActionState> {
    return async function protectedFormAction(
        _prevState: ActionState,
        formData: FormData,
    ): Promise<ActionState> {
        try {
            const parsed = options.schema.safeParse(options.fromFormData(formData));
            if (!parsed.success) {
                return { error: parsed.error.issues[0]?.message ?? "Validation failed", success: false };
            }

            const result = await runProtected(options, async (ctx) =>
                handler({ ctx, input: parsed.data }),
            );
            return result ?? { error: null, success: true };
        } catch (error) {
            if (isNextControlFlow(error)) throw error;
            return toActionError(error);
        }
    };
}

export function protectedMutation<TSchema extends z.ZodType, TResult>(
    options: ProtectedOptions & { schema: TSchema },
    handler: (args: { ctx: ProtectedCtx; input: z.infer<TSchema> }) => Promise<TResult>,
): (input: z.infer<TSchema>) => Promise<TResult> {
    return async function protectedMutator(input: z.infer<TSchema>): Promise<TResult> {
        const parsed = options.schema.parse(input);
        return runProtected(options, async (ctx) => handler({ ctx, input: parsed }));
    };
}

export function protectedQuery<TResult>(
    options: ProtectedOptions,
    handler: (ctx: ProtectedCtx) => Promise<TResult>,
): () => Promise<TResult> {
    return async function protectedQuerier(): Promise<TResult> {
        return runProtected({ ...options, audit: false }, handler);
    };
}

/**
 * SOURCE OF TRUTH KEYWORDS: runPublic, baseProcedure, guest checkout, rate limit
 * WHAT: Rate-limited public Server Action path with optional session ctx.
 * WHY: Checkout and similar guest flows must not skip the rate spine, but cannot require login.
 * WHERE: stripe checkout actions.
 */
export async function runPublic<TResult>(
    handler: (ctx: ProtectedCtx | null) => Promise<TResult>,
    rateLimit: { maxRequests: number; windowMs: number } = { maxRequests: 20, windowMs: 60_000 },
): Promise<TResult> {
    const ctx = await getProtectedContext();
    const headerList = await headers();
    const identifier = getRateLimitIdentifierFromHeaders(headerList, ctx?.userId);
    const rate = checkRateLimit(identifier, rateLimit.maxRequests, rateLimit.windowMs);
    throwIfRateLimited(rate);
    return handler(ctx);
}
