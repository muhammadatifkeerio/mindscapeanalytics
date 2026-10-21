import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: blog metadata, editorial index, noindex, canonical
 * WHAT: Marks the current placeholder editorial route as not ready for indexing.
 * WHY: The route does not yet contain publishable articles with working detail pages.
 * WHERE: /blog until a real editorial collection is implemented.
 */
export const metadata: Metadata = {
    title: "Insights | Mindscape Analytics",
    description: "Explore Mindscape Analytics products, engineering perspectives, and practical AI automation guidance.",
    alternates: { canonical: "/blog" },
    robots: { index: false, follow: true },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
