import { permanentRedirect } from "next/navigation";

/**
 * SOURCE OF TRUTH KEYWORDS: China sourcing legacy route, permanent redirect, canonical service URL, sourcing migration, SEO consolidation
 * WHAT: Provides a route-level fallback redirect for generated route manifests.
 * WHY: The Next configuration returns the crawler-facing permanent redirect while this fallback keeps route typing stable across cached builds.
 * WHERE: Requests to /china-sourcing when configuration redirects are not applied.
 */
export default function LegacyChinaSourcingPage() {
    permanentRedirect("/services/china-sourcing");
}
