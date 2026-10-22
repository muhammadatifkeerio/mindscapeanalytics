import { MetadataRoute } from "next";
import * as productService from "@/services/product.service";
import { getAbsoluteUrl, INDEXABLE_STATIC_ROUTES, PROJECT_CASE_STUDY_SLUGS } from "@/config/seo";

/** SOURCE OF TRUTH KEYWORDS: sitemap, revalidation, approved products, discovery, catalog refresh
 * WHAT: Refreshes the sitemap after product changes without requiring a new deployment.
 * WHY: Search engines need current approved product URLs rather than a permanent build-time snapshot.
 * WHERE: /sitemap.xml.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        ...INDEXABLE_STATIC_ROUTES,
        ...PROJECT_CASE_STUDY_SLUGS.map((slug) => `/projects/${slug}`),
    ].map((route) => ({
        url: getAbsoluteUrl(route),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
        ...(route === "" || route === "/zh-cn"
            ? {
                  alternates: {
                      languages: {
                          "en-US": getAbsoluteUrl(""),
                          "zh-CN": getAbsoluteUrl("/zh-cn"),
                          "x-default": getAbsoluteUrl(""),
                      },
                  },
              }
            : {}),
    }));

    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        const products = await productService.listApprovedSitemap();
        productRoutes = products.map((product) => ({
            url: getAbsoluteUrl(`/shop/${product.id}`),
            lastModified: product.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));
    } catch (error) {
        console.error("Sitemap product fetch failed:", error);
    }

    return [...staticRoutes, ...productRoutes];
}
