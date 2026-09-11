import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: order.service, Stripe session, OrderItem, fulfillment, idempotency
 * WHAT: Order persistence and checkout fulfillment.
 * WHY: Webhook and success page must share one write/read home so duplicates cannot fork.
 * WHERE: stripe webhook, get-order action, admin orders page, seller stats.
 */

import { prisma } from "@/lib/prisma";

export async function getByStripeSessionId(sessionId: string) {
    return prisma.order.findUnique({
        where: { stripeSessionId: sessionId },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: true,
                            productFiles: true,
                        },
                    },
                },
            },
        },
    });
}

export async function countOrders(sellerId?: string) {
    return prisma.order.count({
        where: sellerId ? { items: { some: { product: { sellerId } } } } : {},
    });
}

export async function listForConsole(sellerId?: string) {
    return prisma.order.findMany({
        where: sellerId ? { items: { some: { product: { sellerId } } } } : {},
        orderBy: { createdAt: "desc" },
        include: { user: true },
    });
}

export async function listRecent(take: number) {
    return prisma.order.findMany({
        include: {
            user: true,
            items: { include: { product: true } },
        },
        orderBy: { createdAt: "desc" },
        take,
    });
}

interface FulfillmentItem {
    productId: string;
    quantity: number;
    price: number;
}

export async function fulfillCheckout(input: {
    stripeSessionId: string;
    userId?: string;
    customerEmail?: string;
    customerName?: string;
    amount: number;
    items: FulfillmentItem[];
}) {
    const existing = await prisma.order.findUnique({
        where: { stripeSessionId: input.stripeSessionId },
    });
    if (existing) return { order: existing, created: false };

    const order = await prisma.$transaction(async (tx) => {
        return tx.order.create({
            data: {
                userId: input.userId,
                customerEmail: input.customerEmail,
                customerName: input.customerName,
                amount: input.amount,
                status: "completed",
                isPaid: true,
                stripeSessionId: input.stripeSessionId,
                items: {
                    create: input.items,
                },
            },
        });
    });

    return { order, created: true };
}

export async function markSellerVerified(stripeAccountId: string) {
    await prisma.user.updateMany({
        where: { stripeAccountId },
        data: { sellerVerified: true },
    });
}
