import type { Metadata } from "next";

/** SOURCE OF TRUTH KEYWORDS: outsourcing service metadata, canonical, engineering teams
 * WHAT: Gives the existing delivery-team page its own search metadata.
 * WHY: Avoids inheriting the homepage canonical and title.
 * WHERE: /outsourcing.
 */
export const metadata: Metadata = {
    title: "AI and Software Delivery Teams | Mindscape Analytics",
    description: "Discuss AI engineering, full-stack software, data, and product delivery support with Mindscape Analytics.",
    alternates: { canonical: "/outsourcing" },
};
export default function OutsourcingLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
