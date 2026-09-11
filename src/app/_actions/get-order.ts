"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: getOrderBySessionId, order.service, checkout success, productFiles
 * WHAT: Load an order by Stripe checkout session for the success page.
 * WHY: Paid-file gating stays in one read home; unpaid orders never leak productFiles.
 * WHERE: /shop/success.
 */

import { stripeSessionIdSchema } from "@/lib/types";
import * as orderService from "@/services/order.service";

export async function getOrderBySessionId(sessionId: string) {
    const parsed = stripeSessionIdSchema.safeParse({ sessionId });
    if (!parsed.success) return null;

    try {
        const order = await orderService.getByStripeSessionId(parsed.data.sessionId);
        if (!order) return null;
        if (order.isPaid) return order;

        return {
            ...order,
            items: order.items.map((item) => ({
                ...item,
                product: {
                    ...item.product,
                    productFiles: [],
                },
            })),
        };
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return null;
    }
}
