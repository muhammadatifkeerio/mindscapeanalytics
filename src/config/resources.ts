/**
 * SOURCE OF TRUTH KEYWORDS: RESOURCES, Permission, PlanKey, perPlan, nav, requirePermission, ROUTE_AUTHORIZATION, feature flags, AUTO_DERIVED_FROM_RESOURCES, PROVIDER_NEUTRAL_RBAC
 * WHAT: Single registry for permissions, plan limits, flags, and nav eligibility.
 * WHY: Declare once so the block, layout route-auth, and client FeatureGate derive the same contract instead of forking checks.
 * WHERE: consumed by lib/types (derive), lib/protected (enforce), lib/route-authorization (pages), adapters (capability map).
 */

export const PLAN_KEYS = ["free", "seller", "admin"] as const;

export const ROUTES = {
    home: "/",
    signIn: "/sign-in",
    dashboard: "/admin",
    seller: "/seller",
    becomeSeller: "/become-seller",
    shop: "/shop",
} as const;

export const RESOURCES = {
    console: {
        actions: ["read"] as const,
        nav: [
            {
                href: "/admin",
                label: "Dashboard",
                icon: "LayoutDashboard",
                requirePermission: "console:read",
                denyRedirect: ROUTES.home,
            },
        ],
    },
    product: {
        actions: ["create", "read", "update", "delete"] as const,
        perPlan: {
            create: { free: 0, seller: 50, admin: Number.POSITIVE_INFINITY },
        },
        nav: [
            {
                href: "/admin/products",
                label: "Products",
                icon: "Package",
                requirePermission: "product:read",
                denyRedirect: ROUTES.home,
            },
            {
                href: "/seller/products",
                label: "Inventory",
                icon: "Package",
                requirePermission: "product:read",
                denyRedirect: ROUTES.becomeSeller,
            },
        ],
    },
    order: {
        actions: ["read", "create"] as const,
        nav: [
            {
                href: "/admin/orders",
                label: "Orders",
                icon: "ShoppingCart",
                requirePermission: "order:read",
                denyRedirect: ROUTES.home,
            },
        ],
    },
    payout: {
        actions: ["read", "update"] as const,
        nav: [
            {
                href: "/admin/payments",
                label: "Payments",
                icon: "DollarSign",
                requirePermission: "payout:read",
                denyRedirect: ROUTES.home,
            },
            {
                href: "/seller/payments",
                label: "Payments",
                icon: "DollarSign",
                requirePermission: "payout:read",
                denyRedirect: ROUTES.becomeSeller,
            },
        ],
    },
    seller: {
        actions: ["read", "create", "update"] as const,
        nav: [
            {
                href: "/seller",
                label: "Dashboard",
                icon: "LayoutDashboard",
                requirePermission: "seller:read",
                denyRedirect: ROUTES.becomeSeller,
            },
        ],
    },
    user: {
        actions: ["read"] as const,
        nav: [
            {
                href: "/admin/users",
                label: "Users",
                icon: "Users",
                requirePermission: "user:read",
                denyRedirect: ROUTES.dashboard,
            },
        ],
    },
    lead: {
        actions: ["create"] as const,
        nav: [],
    },
    checkout: {
        actions: ["create"] as const,
        nav: [],
    },
} as const;

export const ERROR_CODES = {
    FORBIDDEN: "FORBIDDEN",
    UNAUTHORIZED: "UNAUTHORIZED",
    USAGE_LIMIT_REACHED: "USAGE_LIMIT_REACHED",
    RATE_LIMITED: "RATE_LIMITED",
    TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS",
    VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;
