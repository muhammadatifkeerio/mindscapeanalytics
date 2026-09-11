
export const dynamic = "force-dynamic";

/**
 * SOURCE OF TRUTH KEYWORDS: AdminLayout, ROUTE_AUTHORIZATION, getSidebarNav, hasPermission, console:read
 * WHAT: Admin shell gated from RESOURCES.nav — same permission helper as the block.
 * WHY: Pasteable /admin URLs never hit tRPC; layout is the page-level twin of protectedProcedure.
 * WHERE: all /admin/* routes.
 */

import { redirect } from "next/navigation";
import React from "react";
import { Settings } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { enforceRouteAuthorization } from "@/lib/route-authorization";
import { getProtectedContext } from "@/lib/get-session";
import { getSidebarNav } from "@/lib/types";
import { hasPermission } from "@/lib/adapters";
import { ROUTES } from "@/config/resources";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await enforceRouteAuthorization("/admin");
    const ctx = await getProtectedContext();
    if (!ctx) redirect(ROUTES.signIn);

    const navItems = getSidebarNav()
        .filter((entry) => entry.href.startsWith("/admin") && hasPermission(ctx, entry.requirePermission))
        .map((entry) => ({
            label: entry.label,
            href: entry.href,
            icon: entry.icon,
        }));

    return (
        <div className="min-h-screen bg-transparent text-foreground flex flex-col lg:flex-row">
            <AdminSidebar navItems={navItems} />

            <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto w-full">
                    {!ctx ? (
                        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-foreground/5 border border-border flex items-center justify-center mb-6 animate-pulse">
                                <Settings size={32} className="text-foreground/20" />
                            </div>
                            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Authenticating</h2>
                            <p className="text-muted-foreground max-w-sm text-sm uppercase tracking-widest font-medium">
                                Verifying your administrative credentials...
                            </p>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </main>
        </div>
    );
}
