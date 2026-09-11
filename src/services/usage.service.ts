import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: countForPermission, product.create, plan limit, usage
 * WHAT: Usage counters the block consults before checkFeatureGate.
 * WHY: Limit math stays in the service home; protected.ts never queries Prisma itself.
 * WHERE: lib/protected.ts when isLimitResource(permission).
 */

import { prisma } from "@/lib/prisma";
import { parsePermission, type Permission, type ProtectedCtx } from "@/lib/types";

export async function countForPermission(permission: Permission, ctx: ProtectedCtx): Promise<number> {
    const { resource, action } = parsePermission(permission);
    if (resource === "product" && action === "create") {
        return prisma.product.count({ where: { sellerId: ctx.userId } });
    }
    return 0;
}
