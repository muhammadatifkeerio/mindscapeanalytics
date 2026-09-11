/**
 * SOURCE OF TRUTH KEYWORDS: AdapterMembership, AdapterTier, hasFullAccess, TenancyAdapter, PlanKey, PROVIDER_NEUTRAL_RBAC, session
 * WHAT: Provider-neutral identity contract used by the block and layouts.
 * WHY: App code must not speak Better Auth dialect or compare role strings; adapters map vendors into these flags.
 * WHERE: adapters/shared, protected.ts, get-session, route-authorization, FeatureGate.
 */

import type { Permission, PlanKey } from "./resources";
import type { Pagination } from "./pagination";

export interface AuthUserFields {
    id: string;
    email: string;
    name?: string | null;
    role?: string | null;
    isSeller?: boolean | null;
    sellerVerified?: boolean | null;
}

export interface AdapterIdentity {
    userId: string;
    email: string;
    name: string | null;
    hasFullAccess: boolean;
    isSeller: boolean;
    plan: PlanKey;
    permissions: ReadonlySet<Permission>;
}

export interface ProtectedCtx extends AdapterIdentity {
    pagination: Pagination;
}

export interface ActionState {
    error: string | null;
    success: boolean;
    url?: string | null;
}

export interface AuditOverride {
    entity?: string;
    action?: string;
    describe?: string;
    getEntityId?: (input: Record<string, string>, output: Record<string, string>) => string;
}
