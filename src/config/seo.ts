/**
 * SOURCE OF TRUTH KEYWORDS: SEO configuration, canonical origin, social image, public routes, project slugs, locale alternates
 * WHAT: Shared search-discovery constants for metadata, structured data, robots, and sitemap generation.
 * WHY: Keeps canonical URLs and indexable route inventory consistent across every crawler-facing surface.
 * WHERE: Root metadata, service schema, localized pages, robots.txt, and sitemap.xml.
 */
export const SEO_CONFIG = {
    siteUrl: "https://mindscapeanalytics.com",
    defaultSocialImage: "/images/og-mindscape-2026.png",
    organizationId: "https://mindscapeanalytics.com/#organization",
    websiteId: "https://mindscapeanalytics.com/#website",
    defaultLocale: "en_US",
    alternateLocale: "zh_CN",
} as const;

export const PROJECT_CASE_STUDY_SLUGS = [
    "global-enterprise-erp",
    "automated-inventory-system",
    "production-esg-intelligence",
    "dblynx-neural-intelligence",
    "ai-sales-agent",
    "dblynx-regional-bank",
    "fuel-station-erp",
] as const;

export const INDEXABLE_STATIC_ROUTES = [
    "",
    "/about",
    "/zeeshan-keerio",
    "/contact",
    "/outsourcing",
    "/solutions",
    "/solutions/ai-genai",
    "/solutions/cloud-infrastructure",
    "/solutions/enterprise-software",
    "/solutions/blockchain",
    "/services",
    "/services/foreign-trade-automation",
    "/services/china-sourcing",
    "/services/tianjin-inspection",
    "/projects",
    "/shop",
    "/pricing",
    "/zh-cn",
    "/zh/go-global",
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: absolute URL, canonical URL, metadataBase, route path, SEO origin, URL builder
 * WHAT: Resolves a site-relative public path against the canonical production origin.
 * WHY: Prevents origin and slash variants from drifting between metadata and structured data.
 * WHERE: Sitemap, JSON-LD, robots, Open Graph metadata, and locale alternates.
 */
export function getAbsoluteUrl(path: string): string {
    return new URL(path || "/", SEO_CONFIG.siteUrl).toString().replace(/\/$/, path ? "" : "/");
}

/**
 * SOURCE OF TRUTH KEYWORDS: JSON-LD serialization, structured data, script safety, schema markup, XSS prevention, crawler data
 * WHAT: Serializes trusted structured-data objects for an inline application/ld+json script.
 * WHY: Escaping angle brackets prevents HTML parsing from turning data into executable markup.
 * WHERE: Root organization graph and route-level structured-data scripts.
 */
export function serializeJsonLd(value: object): string {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}
