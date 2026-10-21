import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: analytics metadata, noindex, internal dashboard
 * WHAT: Keeps analytics UI out of search results.
 * WHY: Operational analytics is not a public marketing page.
 * WHERE: /analytics.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AnalyticsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
