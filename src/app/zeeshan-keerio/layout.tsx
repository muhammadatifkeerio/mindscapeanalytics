import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: founder portfolio metadata, canonical, Zeeshan Keerio
 * WHAT: Defines the founder portfolio's search identity and canonical route.
 * WHY: The page is a public professional profile, distinct from the company homepage.
 * WHERE: /zeeshan-keerio.
 */
export const metadata: Metadata = {
    title: "Zeeshan Keerio | Lead AI Engineer & Solutions Architect",
    description: "Zeeshan Keerio is the founder of Mindscape Analytics and Lead AI Engineer & Solutions Architect, building AI products, data systems, and production software.",
    alternates: { canonical: "/zeeshan-keerio" },
};
export default function FounderLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
