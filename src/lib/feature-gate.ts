/**
 * SOURCE OF TRUTH KEYWORDS: checkFeatureGate, plan limit, Infinity, USAGE_LIMIT_REACHED, AUTO_DERIVED_FROM_RESOURCES
 * WHAT: Single plan-limit check. Unlimited (Infinity) is an allowed no-op on the same path.
 * WHY: Skipping the call for "unlimited" plans reconstructs a skippable gate. Always invoke this.
 * WHERE: protected.ts gate [9] on *.create when isLimitResource.
 */

import { ForbiddenError } from "@/lib/api-error";
import { ERROR_CODES } from "@/config/resources";
import { getPlanLimit, type Permission, type PlanKey } from "@/lib/types";

export function checkFeatureGate(options: {
    permission: Permission;
    plan: PlanKey;
    current: number;
}): void {
    const limit = getPlanLimit(options.permission, options.plan);
    if (limit === Number.POSITIVE_INFINITY) return;
    if (options.current < limit) return;

    throw new ForbiddenError("Usage limit reached", {
        errorCode: ERROR_CODES.USAGE_LIMIT_REACHED,
        resource: options.permission,
        limit,
        current: options.current,
    });
}
