"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: createCheckoutSession, createMultiItemCheckout, createStripeAccountLink, runPublic, getStripe
 * WHAT: Stripe Checkout (guest-capable) and Connect onboarding (protected).
 * WHY: One Stripe home. Guest checkout stays on the public rate spine; Connect stays on the block.
 * WHERE: shop cart, product details, seller onboarding.
 */

import { headers } from "next/headers";
import { runProtected, runPublic } from "@/lib/protected";
import { getStripe } from "@/lib/stripe";
import { checkoutItemsSchema, checkoutProductIdSchema, PERMISSIONS } from "@/lib/types";
import * as productService from "@/services/product.service";
import * as sellerService from "@/services/seller.service";

function originFromHeaders(headerList: Headers): string {
    return headerList.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function createCheckoutSession(productId: string): Promise<{ url: string }> {
    const { productId: id } = checkoutProductIdSchema.parse({ productId });
    const headerList = await headers();
    const origin = originFromHeaders(headerList);

    return runPublic(async (ctx) => {
        const product = await productService.getById(id);
        if (!product) throw new Error("Asset not found in MSA Directory.");
        if (!product.approvedForSale) {
            throw new Error("This asset is pending review and cannot be purchased at this time.");
        }

        const stripe = getStripe();
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            description: product.description || undefined,
                            images: [],
                        },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: ctx?.email || undefined,
            metadata: { productId: id, userId: ctx?.userId ?? "" },
            success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/shop/${id}`,
        });

        if (!stripeSession.url) throw new Error("Failed to generate secure checkout portal.");
        return { url: stripeSession.url };
    });
}

export async function createMultiItemCheckout(items: Array<{ id: string; quantity: number }>): Promise<{ url: string }> {
    const parsed = checkoutItemsSchema.parse(items);
    const headerList = await headers();
    const origin = originFromHeaders(headerList);

    return runPublic(async (ctx) => {
        const products = await productService.findManyByIds(parsed.map((item) => item.id));
        for (const item of parsed) {
            const product = products.find((entry) => entry.id === item.id);
            if (!product) throw new Error(`Asset "${item.id}" not found.`);
            if (!product.approvedForSale) {
                throw new Error(`Asset "${product.name}" is not available for purchase.`);
            }
        }

        const stripe = getStripe();
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: parsed.map((item) => {
                const product = products.find((entry) => entry.id === item.id);
                if (!product) throw new Error(`Asset "${item.id}" not found.`);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: { name: product.name },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: item.quantity,
                };
            }),
            mode: "payment",
            customer_email: ctx?.email || undefined,
            metadata: {
                userId: ctx?.userId ?? "",
                products: JSON.stringify(parsed.map((item) => item.id)),
            },
            success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}&batch=true`,
            cancel_url: `${origin}/cart`,
        });

        if (!stripeSession.url) throw new Error("Failed to generate checkout portal.");
        return { url: stripeSession.url };
    });
}

export async function createStripeAccountLink() {
    const headerList = await headers();
    const origin = originFromHeaders(headerList);

    return runProtected({ permission: PERMISSIONS.payout.update }, async (ctx) => {
        const user = await sellerService.getConnectAccount(ctx.userId);
        if (!user) throw new Error("User record not found");

        const stripe = getStripe();
        let accountId = user.stripeAccountId;
        if (!accountId) {
            const account = await stripe.accounts.create({
                type: "express",
                email: user.email,
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
                settings: { payouts: { schedule: { interval: "manual" } } },
                metadata: { userId: ctx.userId },
            });
            accountId = account.id;
            await sellerService.saveConnectAccount(ctx.userId, accountId);
        }

        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${origin}/seller`,
            return_url: `${origin}/seller`,
            type: "account_onboarding",
        });

        return { url: accountLink.url };
    });
}
