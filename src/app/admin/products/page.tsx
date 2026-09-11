export const dynamic = "force-dynamic";
import { Package, Plus, Edit } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getProtectedContext } from "@/lib/get-session";
import * as productService from "@/services/product.service";

import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
    const ctx = await getProtectedContext();
    const products = await productService
        .listForAdmin(ctx && !ctx.hasFullAccess ? ctx.userId : undefined)
        .catch((err) => {
            console.error("Failed to fetch products for admin:", err);
            return [];
        });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1
                        className="text-4xl font-black mb-2 tracking-tighter uppercase"
                        style={{ fontSize: "clamp(2rem, 5vw, 2.25rem)" }}
                    >
                        Products
                    </h1>
                    <p className="text-foreground/40 font-medium uppercase tracking-widest text-sm">Manage platform offerings</p>
                </div>
                <Link href="/admin/products/new">
                    <button className="px-6 py-3 bg-foreground text-background font-black uppercase tracking-widest text-[10px] rounded-full flex items-center gap-2 hover:bg-foreground/90 transition shadow-lg shadow-white/5 active:scale-95">
                        <Plus size={14} />
                        Add Product
                    </button>
                </Link>
            </div>

            <div className="bg-foreground/[0.02] border border-border rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px] lg:min-w-full">
                        <thead>
                            <tr className="bg-foreground/5 border-b border-border">
                                <th className="p-6 text-foreground/40 font-black text-[10px] uppercase tracking-[0.2em]">Product</th>
                                <th className="p-6 text-foreground/40 font-black text-[10px] uppercase tracking-[0.2em]">Category</th>
                                <th className="p-6 text-foreground/40 font-black text-[10px] uppercase tracking-[0.2em]">Price</th>
                                <th className="p-6 text-foreground/40 font-black text-[10px] uppercase tracking-[0.2em]">Status</th>
                                <th className="p-6 text-foreground/40 font-black text-[10px] uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center">
                                                <Package size={24} className="text-foreground/20" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">No products found</h3>
                                                <p className="text-foreground/40 text-sm">Add your first product to get started.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-foreground/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-border overflow-hidden flex-shrink-0">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-foreground/20">
                                                            <Package size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-lg group-hover:text-foreground transition-colors uppercase tracking-tight">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-foreground/5 text-foreground/60 text-[10px] font-black uppercase tracking-widest rounded-full border border-border">
                                                {product.category?.replace(/_/g, ' ') || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="p-6 font-mono font-bold text-foreground/80">${product.price}</td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${product.approvedForSale
                                                ? 'bg-foreground/10 text-foreground border-foreground/20'
                                                : 'bg-foreground/5 text-foreground/40 border-border'
                                                }`}>
                                                {product.approvedForSale ? 'Live' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <button className="p-2.5 bg-foreground/5 hover:bg-foreground hover:text-background rounded-xl border border-border transition-all group/btn">
                                                        <Edit size={16} />
                                                    </button>
                                                </Link>
                                                <DeleteProductButton id={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
