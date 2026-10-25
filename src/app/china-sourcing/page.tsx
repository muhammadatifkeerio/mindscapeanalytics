import { permanentRedirect } from "next/navigation";

/**
 * SOURCE OF TRUTH KEYWORDS: China sourcing legacy route, permanent redirect, canonical service URL, sourcing migration, SEO consolidation
 * WHAT: Redirects the former sourcing URL to the canonical service route.
 * WHY: Preserves existing links and search equity while keeping one indexable page for the expanded offer.
 * WHERE: Requests to /china-sourcing.
 */
export default function LegacyChinaSourcingPage() {
    permanentRedirect("/services/china-sourcing");
}
