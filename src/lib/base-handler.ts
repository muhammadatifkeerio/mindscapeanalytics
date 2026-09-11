/**
 * SOURCE OF TRUTH KEYWORDS: withBaseHandler, baseProcedure, checkRateLimit, public route, RATE_LIMITED, fail-open
 * WHAT: API-route spine for public and webhook traffic — rate limit first, then handler.
 * WHY: Most abuse hits open endpoints. Do not invent per-router limiters.
 * WHERE: src/app/api/** except Better Auth's own handler.
 */

import { checkRateLimit, getRateLimitIdentifier, rateLimitResponse } from "@/lib/rate-limit";
import { handleApiError } from "@/lib/api-error";

interface BaseHandlerOptions {
    maxRequests?: number;
    windowMs?: number;
}

/**
 * SOURCE OF TRUTH KEYWORDS: withBaseHandler, getRateLimitIdentifier
 * WHAT: Wrap a Route Handler with the global rate spine and shared error mapping.
 * WHY: Public/webhook/health still sit on the base path; Redis outage fail-opens inside checkRateLimit.
 * WHERE: leads, contact, chat, voice, products, stripe webhook.
 */
export function withBaseHandler(
    handler: (request: Request) => Promise<Response>,
    options: BaseHandlerOptions = {},
): (request: Request) => Promise<Response> {
    const maxRequests = options.maxRequests ?? 60;
    const windowMs = options.windowMs ?? 60_000;

    return async function baseHandler(request: Request): Promise<Response> {
        try {
            const identifier = getRateLimitIdentifier(request);
            const result = checkRateLimit(identifier, maxRequests, windowMs);
            if (!result.allowed) return rateLimitResponse(result);
            return await handler(request);
        } catch (error) {
            return handleApiError(error);
        }
    };
}
