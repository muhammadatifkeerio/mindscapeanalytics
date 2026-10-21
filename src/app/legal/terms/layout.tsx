import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: terms metadata, canonical, legal notice
 * WHAT: Sets a stable canonical URL and title for the terms of service.
 * WHY: Legal content is indexable and should not inherit the site's homepage URL.
 * WHERE: /legal/terms.
 */
export const metadata: Metadata = { title: "Terms of Service | Mindscape Analytics", alternates: { canonical: "/legal/terms" } };
export default function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
