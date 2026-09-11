import type { Metadata } from "next";
import { enforceRouteAuthorization } from "@/lib/route-authorization";

/**
 * SOURCE OF TRUTH KEYWORDS: SellerLayout, ROUTE_AUTHORIZATION, seller:read
 * WHAT: Seller portal chrome gated from RESOURCES.nav.
 * WHY: /seller was previously ungated at layout — the gap the block misses.
 * WHERE: all /seller/* routes.
 */

export const metadata: Metadata = {
    title: "Seller Portal | MSA Architect Network",
    description: "Manage your architectural assets, track sales, and optimize your persistent revenue streams in the MSA Seller Dashboard.",
};

export default async function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await enforceRouteAuthorization("/seller");
    return <>{children}</>;
}
