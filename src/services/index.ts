/**
 * SOURCE OF TRUTH KEYWORDS: services barrel, product.service, order.service, seller.service, lead.service, usage.service
 * WHAT: Server-only service map.
 * WHY: Routers import * as so they receive object references and cannot tree-shake past the spine accidentally.
 * WHERE: protected actions and RSC pages after route-auth.
 */

export * as productService from "./product.service";
export * as orderService from "./order.service";
export * as sellerService from "./seller.service";
export * as leadService from "./lead.service";
export * as usageService from "./usage.service";
