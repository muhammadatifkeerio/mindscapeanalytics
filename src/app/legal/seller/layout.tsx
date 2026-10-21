import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: seller policy metadata, canonical, legal notice
 * WHAT: Sets a stable canonical URL and title for the seller policy.
 * WHY: Keep legal pages accessible without competing with service pages in search.
 * WHERE: /legal/seller.
 */
export const metadata: Metadata = { title: "Seller Policy | Mindscape Analytics", description: "Marketplace seller policies, platform fees, quality standards, and responsibilities for selling digital products through Mindscape Analytics.", robots: { index: false, follow: true }, alternates: { canonical: "/legal/seller" } };
export default function SellerPolicyLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
