import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: privacy metadata, canonical, legal notice
 * WHAT: Sets a stable canonical URL and title for the privacy notice.
 * WHY: Keep legal pages accessible without competing with service pages in search.
 * WHERE: /legal/privacy.
 */
export const metadata: Metadata = { title: "Privacy Policy | Mindscape Analytics", description: "How Mindscape Analytics handles personal information, account data, and website inquiries.", robots: { index: false, follow: true }, alternates: { canonical: "/legal/privacy" } };
export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
