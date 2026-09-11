/**
 * SOURCE OF TRUTH KEYWORDS: checkRateLimit, getClientIp, RATE_LIMITED, fail-open, baseProcedure, retryAfter
 * WHAT: Shared rate limiter used by the API base handler and the protected block.
 * WHY: One home for identifiers and 429 shape. Limiter outages must fail open; authz still fails closed.
 * WHERE: lib/base-handler.ts, lib/protected.ts, proxy.ts.
 */

import { ERROR_CODES } from "@/config/resources";
import { RateLimitError } from "@/lib/api-error";

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

function sweepExpired(now: number): void {
    for (const [key, entry] of store) {
        if (entry.resetTime < now) store.delete(key);
    }
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    limit: number;
    resetAt: number;
    retryAfter: number;
}

/**
 * SOURCE OF TRUTH KEYWORDS: checkRateLimit, fail-open, identifier
 * WHAT: Increment the window for an identifier and return allow/deny metadata.
 * WHY: Redis is not wired; in-memory must never 5xx the API. Callers treat thrown RateLimitError as 429.
 * WHERE: withBaseHandler and runProtected.
 */
export function checkRateLimit(
    identifier: string,
    maxRequests: number = 100,
    windowMs: number = 60_000,
): RateLimitResult {
    try {
        const now = Date.now();
        if (store.size > 10_000) sweepExpired(now);

        let entry = store.get(identifier);
        if (!entry || entry.resetTime < now) {
            entry = { count: 0, resetTime: now + windowMs };
            store.set(identifier, entry);
        }

        entry.count += 1;
        const remaining = Math.max(0, maxRequests - entry.count);
        const allowed = entry.count <= maxRequests;
        const retryAfter = Math.max(1, Math.ceil((entry.resetTime - now) / 1000));

        return {
            allowed,
            remaining,
            limit: maxRequests,
            resetAt: entry.resetTime,
            retryAfter,
        };
    } catch (error) {
        console.error("[RATE_LIMIT_FAIL_OPEN]", error);
        return {
            allowed: true,
            remaining: maxRequests,
            limit: maxRequests,
            resetAt: Date.now() + windowMs,
            retryAfter: 0,
        };
    }
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
    return request.headers.get("x-real-ip") || "unknown";
}

export function getRateLimitIdentifier(request: Request, userId?: string): string {
    if (userId) return `user:${userId}`;
    return `ip:${getClientIp(request)}`;
}

export function getRateLimitIdentifierFromHeaders(headerList: Headers, userId?: string): string {
    if (userId) return `user:${userId}`;
    const forwarded = headerList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0]?.trim() || "unknown" : headerList.get("x-real-ip") || "unknown";
    return `ip:${ip}`;
}

export function throwIfRateLimited(result: RateLimitResult): void {
    if (result.allowed) return;
    throw new RateLimitError("Too many requests. Please try again later.", result.retryAfter);
}

export function rateLimitResponse(result: RateLimitResult): Response {
    return Response.json(
        {
            error: {
                code: ERROR_CODES.RATE_LIMITED,
                message: "Too many requests. Please try again later.",
                statusCode: 429,
                limit: result.limit,
                remaining: result.remaining,
                resetAt: result.resetAt,
                retryAfter: result.retryAfter,
            },
        },
        {
            status: 429,
            headers: {
                "Retry-After": String(result.retryAfter),
                "X-RateLimit-Limit": String(result.limit),
                "X-RateLimit-Remaining": String(result.remaining),
                "X-RateLimit-Reset": String(result.resetAt),
            },
        },
    );
}

/**
 * @deprecated Use withBaseHandler from lib/base-handler.ts — kept so existing call sites compile during migration.
 */
export function withRateLimit(maxRequests: number = 100, windowMs: number = 60_000) {
    return async (request: Request): Promise<Response | null> => {
        const identifier = getRateLimitIdentifier(request);
        const result = checkRateLimit(identifier, maxRequests, windowMs);
        if (!result.allowed) return rateLimitResponse(result);
        return null;
    };
}

export function getClientIdentifier(request: Request): string {
    return getRateLimitIdentifier(request);
}

export function rateLimit(
    identifier: string,
    maxRequests: number = 100,
    windowMs: number = 60_000,
): { allowed: boolean; remaining: number; resetTime: number } {
    const result = checkRateLimit(identifier, maxRequests, windowMs);
    return {
        allowed: result.allowed,
        remaining: result.remaining,
        resetTime: result.resetAt,
    };
}
