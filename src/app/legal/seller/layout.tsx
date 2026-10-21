import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: seller policy metadata, canonical, legal notice
 * WHAT: Sets a stable canonical URL and title for the seller policy.
 * WHY: Legal content is indexable and should not inherit the site's homepage URL.
 * WHERE: /legal/seller.
 */
export const metadata: Metadata = { title: "Seller Policy | Mindscape Analytics", alternates: { canonical: "/legal/seller" } };
export default function SellerPolicyLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
