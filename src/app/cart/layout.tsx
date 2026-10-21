import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: cart metadata, noindex, checkout privacy
 * WHAT: Keeps individual shopping carts out of search results.
 * WHY: Cart contents are user-specific and are not a public landing page.
 * WHERE: /cart.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function CartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
