import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: seller.service, enroll, payouts, stripeAccountId, stats
 * WHAT: Seller enrollment, payout config, and dashboard aggregates.
 * WHY: Seller mutations belong in one service so Stripe Connect and Prisma stay behind the block.
 * WHERE: become-seller, payouts, seller dashboard, Connect onboarding.
 */

import { prisma } from "@/lib/prisma";

export async function enroll(userId: string, storeName: string, storeDescription: string) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            isSeller: true,
            role: "seller",
            storeName,
            storeDescription,
            sellerVerified: false,
        },
    });
}

export async function updatePayout(userId: string, payoutMethod: string, payoutDetails: string) {
    return prisma.user.update({
        where: { id: userId },
        data: { payoutMethod, payoutDetails },
    });
}

export async function getPayoutProfile(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: {
            payoutMethod: true,
            payoutDetails: true,
            stripeAccountId: true,
            sellerVerified: true,
        },
    });
}

export async function getConnectAccount(userId: string) {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { stripeAccountId: true, email: true },
    });
}

export async function saveConnectAccount(userId: string, stripeAccountId: string) {
    return prisma.user.update({
        where: { id: userId },
        data: { stripeAccountId },
    });
}

export async function getStats(sellerId: string) {
    const [totalProducts, totalSales, orderItems] = await Promise.all([
        prisma.product.count({ where: { sellerId } }),
        prisma.orderItem.count({
            where: {
                product: { sellerId },
                order: { status: "completed", isPaid: true },
            },
        }),
        prisma.orderItem.findMany({
            where: {
                product: { sellerId },
                order: { status: "completed", isPaid: true },
            },
            select: { price: true, quantity: true },
        }),
    ]);

    const totalRevenue = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return {
        totalProducts,
        totalSales,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
    };
}

export async function getRecentActivity(sellerId: string) {
    const [recentProducts, recentSales] = await Promise.all([
        prisma.product.findMany({
            where: { sellerId },
            orderBy: { createdAt: "desc" },
            take: 3,
            select: { id: true, name: true, createdAt: true },
        }),
        prisma.orderItem.findMany({
            where: {
                product: { sellerId },
                order: { status: "completed", isPaid: true },
            },
            include: {
                product: { select: { name: true } },
                order: {
                    select: {
                        createdAt: true,
                        user: { select: { name: true, email: true } },
                    },
                },
            },
            orderBy: { order: { createdAt: "desc" } },
            take: 5,
        }),
    ]);

    return [
        ...recentProducts.map((product) => ({
            id: `prod-${product.id}`,
            type: "product_created" as const,
            title: "New Asset Released",
            description: `Architectural asset "${product.name}" has been localized in the registry.`,
            timestamp: product.createdAt,
        })),
        ...recentSales.map((sale) => ({
            id: `sale-${sale.id}`,
            type: "sale_completed" as const,
            title: "Asset Deployed",
            description: `Unit "${sale.product.name}" acquired by institutional entity ${sale.order.user?.name || sale.order.user?.email || "Unknown"}.`,
            timestamp: sale.order.createdAt,
        })),
    ]
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10);
}

export async function countUsers() {
    return prisma.user.count();
}

export async function countSellers() {
    return prisma.user.count({ where: { isSeller: true } });
}
