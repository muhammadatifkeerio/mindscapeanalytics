import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: checkout success metadata, noindex, private transaction
 * WHAT: Prevents personal checkout completion pages from appearing in search.
 * WHY: Success state is transaction-specific, not a public product page.
 * WHERE: /shop/success.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ShopSuccessLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
