import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: sign-in metadata, noindex, authentication
 * WHAT: Keeps authentication UI out of search results.
 * WHY: Sign-in is a utility route, not a public search destination.
 * WHERE: /sign-in.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function SignInLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
