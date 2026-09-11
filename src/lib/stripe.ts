import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: getStripe, Stripe, lazy client, checkout, webhook, Connect
 * WHAT: Single lazy Stripe client. Never construct at module load.
 * WHY: `new Stripe("")` throws during `next build` page-data collection when secrets are absent.
 * WHERE: checkout actions, Connect onboarding, webhook fulfillment.
 */

import Stripe from "stripe";

const STRIPE_API_VERSION = "2026-06-24.dahlia" as const;

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
        throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    if (!stripeClient) {
        stripeClient = new Stripe(key, {
            apiVersion: STRIPE_API_VERSION,
        });
    }
    return stripeClient;
}

export function isStripeConfigured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY);
}
