import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: terms metadata, canonical, legal notice
 * WHAT: Sets a stable canonical URL and title for the terms of service.
 * WHY: Keep legal pages accessible without competing with service pages in search.
 * WHERE: /legal/terms.
 */
export const metadata: Metadata = { title: "Terms of Service | Mindscape Analytics", description: "Terms governing use of the Mindscape Analytics website, services, and digital product marketplace.", robots: { index: false, follow: true }, alternates: { canonical: "/legal/terms" } };
export default function TermsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
