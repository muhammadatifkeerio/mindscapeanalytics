export const dynamic = "force-dynamic";

/**
 * SOURCE OF TRUTH KEYWORDS: AdminDashboard, getProtectedContext, hasFullAccess, seller.service, product.service
 * WHAT: Console overview counts from services using adapter flags — never role strings.
 * WHY: Layout already gated console:read; this page only renders numbers.
 * WHERE: /admin
 */

import React from "react";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { getProtectedContext } from "@/lib/get-session";
import * as productService from "@/services/product.service";
import * as orderService from "@/services/order.service";
import * as sellerService from "@/services/seller.service";

export default async function AdminDashboard() {
    const ctx = await getProtectedContext();
    const scopedSellerId = ctx && !ctx.hasFullAccess ? ctx.userId : undefined;

    const [productCount, orderCount, userCount, sellerCount] = await Promise.all([
        productService.countProducts(scopedSellerId).catch((err) => {
            console.error("Prisma count error (products):", err);
            return 0;
        }),
        orderService.countOrders(scopedSellerId).catch((err) => {
            console.error("Prisma count error (orders):", err);
            return 0;
        }),
        ctx?.hasFullAccess ? sellerService.countUsers().catch(() => 0) : Promise.resolve(0),
        ctx?.hasFullAccess ? sellerService.countSellers().catch(() => 0) : Promise.resolve(0),
    ]);

    const stats = ctx?.hasFullAccess
        ? [
              { label: "Total Products", value: productCount, icon: Package },
              { label: "Total Orders", value: orderCount, icon: ShoppingBag },
              { label: "Total Users", value: userCount, icon: Users },
              { label: "Total Sellers", value: sellerCount, icon: TrendingUp },
          ]
        : [
              { label: "My Products", value: productCount, icon: Package },
              { label: "My Orders", value: orderCount, icon: ShoppingBag },
          ];

    return (
        <div className="space-y-12">
            <div>
                <h1
                    className="text-5xl font-black mb-2 tracking-tighter uppercase"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                >
                    {ctx?.hasFullAccess ? "MANAGEMENT" : "SELLER HUB"}
                </h1>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">
                    {ctx?.hasFullAccess ? "Platform Overview & Analytics" : "Vendor Analytics & Listings"}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-8 rounded-3xl bg-foreground/[0.02] border border-border hover:border-border transition-all group card-premium">
                        <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <stat.icon className="text-foreground" size={24} />
                        </div>
                        <h3 className="text-muted-foreground text-xs font-black uppercase tracking-widest mb-1">{stat.label}</h3>
                        <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
