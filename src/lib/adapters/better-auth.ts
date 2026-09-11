/**
 * SOURCE OF TRUTH KEYWORDS: better-auth adapter, toAuthUserFields, SessionUser, TenancyAdapter
 * WHAT: Maps Better Auth session users into AuthUserFields for resolveCapabilities.
 * WHY: Vendor SDK types stay inside the adapter folder; the rest of the app sees AdapterIdentity only.
 * WHERE: get-session.ts after auth.api.getSession.
 */

import type { AuthUserFields } from "@/lib/types";

export function toAuthUserFields(user: {
    id: string;
    email: string;
    name?: string | null;
    role?: string | null;
    isSeller?: boolean | null;
    sellerVerified?: boolean | null;
}): AuthUserFields {
    return {
        id: user.id,
        email: user.email,
        name: user.name ?? null,
        role: user.role ?? null,
        isSeller: user.isSeller ?? null,
        sellerVerified: user.sellerVerified ?? null,
    };
}
