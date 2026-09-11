/**
 * SOURCE OF TRUTH KEYWORDS: resolveCapabilities, hasFullAccess, PlanKey, Permission, PROVIDER_NEUTRAL_RBAC, role adapter
 * WHAT: Maps vendor user fields into normalized capability flags and a permission set.
 * WHY: The only place that may inspect provider `role`. Feature code must use hasFullAccess / permissions.
 * WHERE: get-session, protected.ts, route-authorization, client FeatureGate.
 */

import { PERMISSIONS } from "@/lib/types/resources";
import type { AdapterIdentity, AuthUserFields, Permission, PlanKey } from "@/lib/types";

const ALL_PERMISSIONS: Permission[] = [
    PERMISSIONS.console.read,
    PERMISSIONS.product.create,
    PERMISSIONS.product.read,
    PERMISSIONS.product.update,
    PERMISSIONS.product.delete,
    PERMISSIONS.order.read,
    PERMISSIONS.order.create,
    PERMISSIONS.payout.read,
    PERMISSIONS.payout.update,
    PERMISSIONS.seller.read,
    PERMISSIONS.seller.create,
    PERMISSIONS.seller.update,
    PERMISSIONS.user.read,
    PERMISSIONS.lead.create,
    PERMISSIONS.checkout.create,
];

const SELLER_PERMISSIONS: Permission[] = [
    PERMISSIONS.console.read,
    PERMISSIONS.product.create,
    PERMISSIONS.product.read,
    PERMISSIONS.product.update,
    PERMISSIONS.product.delete,
    PERMISSIONS.order.read,
    PERMISSIONS.payout.read,
    PERMISSIONS.payout.update,
    PERMISSIONS.seller.read,
    PERMISSIONS.seller.update,
    PERMISSIONS.lead.create,
    PERMISSIONS.checkout.create,
];

const MEMBER_PERMISSIONS: Permission[] = [
    PERMISSIONS.lead.create,
    PERMISSIONS.checkout.create,
    PERMISSIONS.order.read,
    PERMISSIONS.seller.create,
];

/**
 * SOURCE OF TRUTH KEYWORDS: resolveCapabilities, hasFullAccess, isSeller, plan
 * WHAT: Normalize Better Auth (or any vendor) user fields into AdapterIdentity.
 * WHY: Swapping auth vendors must not rename flags consumed by the block.
 * WHERE: get-session on the server; FeatureGate on the client with the same helper.
 */
export function resolveCapabilities(user: AuthUserFields): AdapterIdentity {
    const hasFullAccess = user.role === "admin";
    const isSeller = hasFullAccess || user.isSeller === true || user.role === "seller";
    const plan: PlanKey = hasFullAccess ? "admin" : isSeller ? "seller" : "free";

    const permissions = new Set<Permission>(
        hasFullAccess ? ALL_PERMISSIONS : isSeller ? SELLER_PERMISSIONS : MEMBER_PERMISSIONS,
    );

    return {
        userId: user.id,
        email: user.email,
        name: user.name ?? null,
        hasFullAccess,
        isSeller,
        plan,
        permissions,
    };
}

export function hasPermission(identity: AdapterIdentity, permission: Permission): boolean {
    if (identity.hasFullAccess) return true;
    return identity.permissions.has(permission);
}
