import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: founder portfolio metadata, canonical, Zeeshan Keerio
 * WHAT: Defines the founder portfolio's search identity and canonical route.
 * WHY: The page is a public professional profile, distinct from the company homepage.
 * WHERE: /zeeshan-keerio.
 */
export const metadata: Metadata = {
    title: "Zeeshan Keerio | Founder & Lead AI Engineer",
    description: "Zeeshan Keerio is the Founder and Lead AI Engineer at Mindscape Analytics, building AI products, data systems, and production software.",
    alternates: { canonical: "/zeeshan-keerio" },
};
export default function FounderLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
