import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: sign-up metadata, noindex, authentication
 * WHAT: Keeps account registration UI out of search results.
 * WHY: Sign-up is a utility route, not a public search destination.
 * WHERE: /sign-up.
 */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function SignUpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
