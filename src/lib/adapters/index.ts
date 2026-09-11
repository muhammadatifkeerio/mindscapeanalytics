/**
 * SOURCE OF TRUTH KEYWORDS: adapters barrel, resolveCapabilities, toAuthUserFields, hasPermission
 * WHAT: Identity adapter barrel.
 * WHY: Feature code imports @/lib/adapters — never better-auth for authorization decisions.
 * WHERE: protected.ts, get-session, route-authorization, FeatureGate.
 */

export { resolveCapabilities, hasPermission } from "./shared";
export { toAuthUserFields } from "./better-auth";
