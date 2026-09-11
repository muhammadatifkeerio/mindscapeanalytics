/**
 * SOURCE OF TRUTH KEYWORDS: Permission, PlanKey, ResourceName, NavEntry, PermissionConstants, derived types, RESOURCES
 * WHAT: Types and helpers derived from the RESOURCES registry — never hand-duplicated unions.
 * WHY: TypeScript lock-in: invalid permissions/plans fail at compile instead of at a forgotten if-branch.
 * WHERE: protected block, adapters, route-authorization, FeatureGate, services.
 */

import { PLAN_KEYS, RESOURCES } from "@/config/resources";

export type PlanKey = (typeof PLAN_KEYS)[number];

export type ResourceName = keyof typeof RESOURCES;

type ResourceActions<R extends ResourceName> = (typeof RESOURCES)[R]["actions"][number];

export type Permission = {
    [R in ResourceName]: `${R & string}:${ResourceActions<R> & string}`;
}[ResourceName];

export interface NavEntry {
    href: string;
    label: string;
    icon: string;
    requirePermission: Permission;
    denyRedirect: string;
}

export const PERMISSIONS = {
    console: { read: "console:read" },
    product: {
        create: "product:create",
        read: "product:read",
        update: "product:update",
        delete: "product:delete",
    },
    order: { read: "order:read", create: "order:create" },
    payout: { read: "payout:read", update: "payout:update" },
    seller: { read: "seller:read", create: "seller:create", update: "seller:update" },
    user: { read: "user:read" },
    lead: { create: "lead:create" },
    checkout: { create: "checkout:create" },
} as const satisfies {
    [R in ResourceName]: { [A in ResourceActions<R>]: `${R & string}:${A & string}` };
};

export function parsePermission(permission: Permission): {
    resource: ResourceName;
    action: string;
} {
    const separator = permission.indexOf(":");
    const resource = permission.slice(0, separator) as ResourceName;
    const action = permission.slice(separator + 1);
    return { resource, action };
}

export function isLimitResource(permission: Permission): boolean {
    const { resource, action } = parsePermission(permission);
    const entry = RESOURCES[resource];
    return "perPlan" in entry && action in (entry.perPlan ?? {});
}

export function getPlanLimit(permission: Permission, plan: PlanKey): number {
    const { resource, action } = parsePermission(permission);
    const entry = RESOURCES[resource];
    if (!("perPlan" in entry) || !entry.perPlan) {
        return Number.POSITIVE_INFINITY;
    }
    const actionLimits = entry.perPlan[action as keyof typeof entry.perPlan];
    if (!actionLimits) {
        return Number.POSITIVE_INFINITY;
    }
    const limits: Record<PlanKey, number> = actionLimits;
    return limits[plan];
}

export function getSidebarNav(): NavEntry[] {
    return Object.values(RESOURCES).flatMap((resource) =>
        "nav" in resource ? [...resource.nav] : [],
    ) as NavEntry[];
}
