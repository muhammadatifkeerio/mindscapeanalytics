import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { withBaseHandler } from "@/lib/base-handler";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import * as orderService from "@/services/order.service";
import * as productService from "@/services/product.service";

/**
 * SOURCE OF TRUTH KEYWORDS: stripe webhook, checkout.session.completed, fulfillCheckout, getStripe, Connect
 * WHAT: Stripe event ingress — signature verify, then order service fulfillment + Connect transfers.
 * WHY: Must not construct Stripe at import (breaks `next build`). DB writes go through services.
 * WHERE: Stripe Dashboard webhook → POST /api/webhooks/stripe
 */

export const dynamic = "force-dynamic";

const productIdsSchema = z.array(z.string().min(1));

async function handleStripeWebhook(req: NextRequest): Promise<Response> {
    if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
        console.error("[WEBHOOK_CONFIG_ERROR] Stripe is not configured.");
        return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    const stripe = getStripe();
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        const message = error instanceof Error ? error.message : "invalid signature";
        console.error(`[STRIPE_WEBHOOK_VERIFICATION_FAILED] ${message}`);
        return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object;
                const userId = session.metadata?.userId;
                const productId = session.metadata?.productId;
                const productsJson = session.metadata?.products;
                const guestEmail = session.customer_details?.email ?? undefined;
                const guestName = session.customer_details?.name ?? undefined;

                if (!userId && !guestEmail) {
                    console.error("[WEBHOOK_ERROR] No userId and no guestEmail.", { sessionId: session.id });
                    break;
                }
                if (!productId && !productsJson) {
                    console.warn("[WEBHOOK_WARNING] Session completed without product metadata.", { sessionId: session.id });
                    break;
                }

                const totalAmount = (session.amount_total || 0) / 100;
                let itemsData: { productId: string; quantity: number; price: number }[] = [];

                if (productsJson) {
                    let parsedJson: unknown;
                    try {
                        parsedJson = JSON.parse(productsJson);
                    } catch {
                        console.error("[WEBHOOK_JSON_PARSE_ERROR] Failed to parse productsJson");
                        break;
                    }
                    const parsedIds = productIdsSchema.safeParse(parsedJson);
                    if (!parsedIds.success) {
                        console.error("[WEBHOOK_JSON_PARSE_ERROR] Failed to parse productsJson");
                        break;
                    }
                    const products = await productService.findManyByIds(parsedIds.data);
                    itemsData = parsedIds.data.map((id) => {
                        const product = products.find((entry) => entry.id === id);
                        return { productId: id, quantity: 1, price: product?.price ?? 0 };
                    });
                } else if (productId) {
                    itemsData = [{ productId, quantity: 1, price: totalAmount }];
                }

                if (itemsData.length === 0) break;

                const { created } = await orderService.fulfillCheckout({
                    stripeSessionId: session.id,
                    userId: userId || undefined,
                    customerEmail: guestEmail,
                    customerName: guestName,
                    amount: totalAmount,
                    items: itemsData,
                });

                if (!created) {
                    console.log(`[WEBHOOK_IDEMPOTENT] Order already exists for session ${session.id}.`);
                    break;
                }

                const productsWithSellers = await productService.findManyByIds(itemsData.map((item) => item.productId));
                const PLATFORM_FEE_PERCENTAGE = 0.1;
                const sellerPayouts: Record<string, number> = {};

                for (const item of itemsData) {
                    const productInfo = productsWithSellers.find((product) => product.id === item.productId);
                    const sellerStripeAccount = productInfo?.seller?.stripeAccountId;
                    if (!sellerStripeAccount) continue;
                    const sellerCut = item.price * item.quantity * (1 - PLATFORM_FEE_PERCENTAGE);
                    sellerPayouts[sellerStripeAccount] = (sellerPayouts[sellerStripeAccount] ?? 0) + sellerCut;
                }

                for (const [stripeAccountId, amount] of Object.entries(sellerPayouts)) {
                    const transferAmountCents = Math.round(amount * 100);
                    if (transferAmountCents <= 0) continue;
                    try {
                        const transfer = await stripe.transfers.create({
                            amount: transferAmountCents,
                            currency: "usd",
                            destination: stripeAccountId,
                            transfer_group: session.id,
                            metadata: { orderSessionId: session.id },
                        });
                        console.log(`[PAYOUT_SUCCESS] Transfer ${transfer.id} to ${stripeAccountId}`);
                    } catch (transferError) {
                        console.error(`[PAYOUT_ERROR] Failed to transfer funds to ${stripeAccountId}:`, transferError);
                    }
                }
                break;
            }
            case "account.updated": {
                const account = event.data.object;
                if (account.charges_enabled && account.payouts_enabled) {
                    await orderService.markSellerVerified(account.id);
                }
                break;
            }
            case "payment_intent.payment_failed": {
                console.error(`[PAYMENT_FAILED] PaymentIntent ${event.data.object.id} failed.`);
                break;
            }
            default:
                break;
        }
    } catch (error) {
        console.error("[WEBHOOK_HANDLER_ERROR] Unexpected error processing event:", error);
    }

    return NextResponse.json({ received: true, timestamp: new Date().toISOString() });
}

export const POST = withBaseHandler(
    (request) => handleStripeWebhook(request as NextRequest),
    { maxRequests: 300, windowMs: 60_000 },
);
