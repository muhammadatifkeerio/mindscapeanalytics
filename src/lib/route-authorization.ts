import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: ROUTE_AUTHORIZATION, longest-href, requirePermission, FeatureGate parity, nav, the gap
 * WHAT: Page-level twin of the block. Gates dashboard/seller URLs from the same RESOURCES.nav the sidebar uses.
 * WHY: Provider-hosted and RSC pages never hit protectedProcedure; pasteable URLs must still fail closed.
 * WHERE: admin/layout.tsx and seller/layout.tsx.
 */

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/resources";
import { getSidebarNav, type Permission } from "@/lib/types";
import { getProtectedContext } from "@/lib/get-session";
import { hasPermission } from "@/lib/adapters";

function matchRoute(pathname: string) {
    const nav = getSidebarNav()
        .slice()
        .sort((a, b) => b.href.length - a.href.length);

    return nav.find((entry) => pathname === entry.href || pathname.startsWith(`${entry.href}/`));
}

/**
 * SOURCE OF TRUTH KEYWORDS: enforceRouteAuthorization, x-pathname, denyRedirect
 * WHAT: Resolve longest nav href, require its permission, redirect on deny.
 * WHY: Nested /settings/billing must win over /settings. Same hasPermission helper as the block.
 * WHERE: dashboard layouts.
 */
export async function enforceRouteAuthorization(fallbackPath: string): Promise<void> {
    const headerList = await headers();
    const pathname = headerList.get("x-pathname") ?? fallbackPath;
    const match = matchRoute(pathname);
    if (!match) return;

    const ctx = await getProtectedContext();
    if (!ctx) {
        redirect(`${ROUTES.signIn}?callbackUrl=${encodeURIComponent(pathname)}`);
    }

    if (!hasPermission(ctx, match.requirePermission as Permission)) {
        redirect(match.denyRedirect);
    }
}
