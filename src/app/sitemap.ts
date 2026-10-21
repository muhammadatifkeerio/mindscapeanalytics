import { MetadataRoute } from "next";
import * as productService from "@/services/product.service";

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
        "/projects",
        "/shop",
        "/pricing",
        "/legal/privacy",
        "/legal/terms",
        "/legal/seller",
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
