import { MetadataRoute } from "next";
import * as productService from "@/services/product.service";

/** SOURCE OF TRUTH KEYWORDS: sitemap, revalidation, approved products, discovery, catalog refresh
 * WHAT: Refreshes the sitemap after product changes without requiring a new deployment.
 * WHY: Search engines need current approved product URLs rather than a permanent build-time snapshot.
 * WHERE: /sitemap.xml.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://mindscapeanalytics.com";

    const staticRoutes = [
        "",
        "/about",
        "/zeeshan-keerio",
        "/contact",
        "/become-seller",
        "/outsourcing",
        "/solutions",
        "/solutions/ai-genai",
        "/solutions/cloud-infrastructure",
        "/solutions/enterprise-software",
        "/solutions/blockchain",
        "/services",
        "/china-sourcing",
        "/projects",
        "/shop",
        "/pricing",
        "/zh-cn",
        ...["global-enterprise-erp", "automated-inventory-system", "production-esg-intelligence", "dblynx-neural-intelligence", "ai-sales-agent", "dblynx-regional-bank", "fuel-station-erp"].map((slug) => `/projects/${slug}`),
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        const products = await productService.listApprovedSitemap();
        productRoutes = products.map((product) => ({
            url: `${baseUrl}/shop/${product.id}`,
            lastModified: product.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));
    } catch (error) {
        console.error("Sitemap product fetch failed:", error);
    }

    return [...staticRoutes, ...productRoutes];
}
