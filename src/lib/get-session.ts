import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: getSession, getProtectedContext, AdapterIdentity, headers, DYNAMIC_SERVER_USAGE
 * WHAT: Server session retrieval that returns adapter identity — never raw vendor role for authz.
 * WHY: Tenancy and capabilities must come from ctx, not from LLM/page guesswork.
 * WHERE: protected.ts, route-authorization, RSC pages that need the actor (not for DB).
 */

import { auth } from "./auth";
import { headers } from "next/headers";
import { resolveCapabilities, toAuthUserFields } from "@/lib/adapters";
import { resolvePagination } from "@/lib/types/pagination";
import type { ProtectedCtx } from "@/lib/types";

function isDynamicServerError(error: { digest?: string; name?: string }): boolean {
    return Boolean(error.digest?.includes("DYNAMIC_SERVER_USAGE") || error.name === "DynamicServerError");
}

export async function getSession() {
    try {
        const headerList = await headers();
        return await auth.api.getSession({
            headers: headerList,
        });
    } catch (error) {
        const err = error as { digest?: string; name?: string; message?: string };
        if (isDynamicServerError(err)) {
            throw error;
        }

        console.error("[GET_SESSION_FAILURE]", err.message || err);
        return null;
    }
}

/**
 * SOURCE OF TRUTH KEYWORDS: getProtectedContext, resolveCapabilities, pagination
 * WHAT: Session + normalized flags + pagination for the block.
 * WHY: Routers must not reconstruct identity; the spine injects ctx.
 * WHERE: runProtected, enforceRouteAuthorization.
 */
export async function getProtectedContext(): Promise<ProtectedCtx | null> {
    const session = await getSession();
    if (!session?.user) return null;

    const identity = resolveCapabilities(toAuthUserFields({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: "role" in session.user && typeof session.user.role === "string" ? session.user.role : null,
        isSeller: "isSeller" in session.user && typeof session.user.isSeller === "boolean" ? session.user.isSeller : null,
        sellerVerified: "sellerVerified" in session.user && typeof session.user.sellerVerified === "boolean" ? session.user.sellerVerified : null,
    }));
    return {
        ...identity,
        pagination: resolvePagination(),
    };
}

export async function getRequiredSession() {
    const ctx = await getProtectedContext();
    if (!ctx) {
        return { session: null, ctx: null, error: "Unauthorized: No valid session detected." };
    }
    if (!ctx.hasFullAccess && !ctx.isSeller) {
        return {
            session: null,
            ctx: null,
            error: "Unauthorized: Insufficient privileges (Admin/Seller required).",
        };
    }

    const session = await getSession();
    return { session, ctx, error: null };
}
