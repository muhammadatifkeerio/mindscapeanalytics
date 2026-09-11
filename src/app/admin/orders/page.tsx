export const dynamic = "force-dynamic";
import React from "react";
import { getProtectedContext } from "@/lib/get-session";
import * as orderService from "@/services/order.service";

export default async function AdminOrdersPage() {
    const ctx = await getProtectedContext();
    const orders = await orderService
        .listForConsole(ctx && !ctx.hasFullAccess ? ctx.userId : undefined)
        .catch(() => []);
    return (
        <div>
            <h1
                className="text-3xl font-bold mb-8"
                style={{ fontSize: "clamp(1.875rem, 4vw, 2.25rem)" }}
            >
                Orders
            </h1>

            <div className="bg-foreground/[0.02] border border-border rounded-2xl overflow-hidden backdrop-blur-xl">
                <table className="w-full text-left">
                    <thead className="bg-foreground/5 border-b border-border">
                        <tr>
                            <th className="p-4 text-foreground/60 font-mono text-sm uppercase">Order ID</th>
                            <th className="p-4 text-foreground/60 font-mono text-sm uppercase">Customer</th>
                            <th className="p-4 text-foreground/60 font-mono text-sm uppercase">Amount</th>
                            <th className="p-4 text-foreground/60 font-mono text-sm uppercase">Status</th>
                            <th className="p-4 text-foreground/60 font-mono text-sm uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-foreground/40">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-foreground/5 transition">
                                    <td className="p-4 font-mono text-sm text-foreground/50">#{order.id.slice(-6)}</td>
                                    <td className="p-4">{order.user?.email || "Unknown"}</td>
                                    <td className="p-4 font-mono">${order.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === "completed" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-foreground/50 text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
