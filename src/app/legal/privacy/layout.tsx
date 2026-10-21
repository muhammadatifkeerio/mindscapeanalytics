import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: privacy metadata, canonical, legal notice
 * WHAT: Sets a stable canonical URL and title for the privacy notice.
 * WHY: Legal content is indexable and should not inherit the site's homepage URL.
 * WHERE: /legal/privacy.
 */
export const metadata: Metadata = { title: "Privacy Policy | Mindscape Analytics", alternates: { canonical: "/legal/privacy" } };
export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
