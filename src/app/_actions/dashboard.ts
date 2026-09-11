"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: getSellerStats, getRecentActivity, seller:read, protectedQuery, seller.service
 * WHAT: Seller dashboard queries through the block.
 * WHY: Stats are privileged reads — layout route-auth is UX; this is the authoritative check.
 * WHERE: /seller page.
 */

import { protectedQuery } from "@/lib/protected";
import { PERMISSIONS } from "@/lib/types";
import * as sellerService from "@/services/seller.service";

export const getSellerStats = protectedQuery({ permission: PERMISSIONS.seller.read, audit: false }, (ctx) =>
    sellerService.getStats(ctx.userId),
);

export const getRecentActivity = protectedQuery({ permission: PERMISSIONS.seller.read, audit: false }, (ctx) =>
    sellerService.getRecentActivity(ctx.userId),
);
