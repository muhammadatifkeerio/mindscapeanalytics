export const dynamic = "force-dynamic";
import { getProtectedContext } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Plus, Package, DollarSign, TrendingUp, AlertTriangle, CreditCard } from "lucide-react";
import { getSellerStats, getRecentActivity } from "@/app/_actions/dashboard";
import * as productService from "@/services/product.service";
import { ROUTES } from "@/config/resources";

function timeAgo(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

export default async function SellerDashboard() {
    const ctx = await getProtectedContext();

    if (!ctx) {
        redirect(`${ROUTES.signIn}?callbackUrl=/seller`);
    }

    if (!ctx.isSeller) {
        redirect(ROUTES.becomeSeller);
    }

    const products = await productService.listForSeller(ctx.userId);

    const stats = await getSellerStats();
    const activities = await getRecentActivity();

    return (
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="glow-spot top-0 right-0 w-[50%] h-[50%] opacity-10" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6 max-w-[1500px] mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 pb-12 border-b border-border">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 border border-border rounded-full mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">Terminal ID: {ctx.userId.slice(0, 8)}</span>
                            </div>
                            <h1
                                className="text-6xl font-black mb-4 uppercase tracking-tighter"
                                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                            >
                                VENDOR <span className="text-foreground/20 not-italic">COMMAND.</span>
                            </h1>
                            <p className="text-foreground/40 text-[11px] font-black uppercase tracking-[0.5em]">Ecosystem Management & Strategic Allocation</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/seller/payments">
                                <button className="flex items-center gap-4 px-10 py-5 bg-foreground/5 border border-border text-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/10 transition-all active:scale-95 group">
                                    <CreditCard size={16} className="text-foreground/40 group-hover:text-foreground transition-colors" />
                                    Configure Payouts
                                </button>
                            </Link>
                            <Link href="/seller/products/new">
                                <button className="flex items-center gap-4 px-10 py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/90 shadow-2xl transition-all active:scale-95 group">
                                    <Plus size={16} />
                                    Release New Asset
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { label: "ACTIVE ASSETS", value: stats.totalProducts, icon: <Package size={20} /> },
                            { label: "UNITS DEPLOYED", value: stats.totalSales, icon: <TrendingUp size={20} /> },
                            { label: "INSTITUTIONAL VALUE", value: `$${stats.totalRevenue}`, icon: <DollarSign size={20} /> }
                        ].map((stat, i) => (
                            <div key={i} className="bg-foreground/[0.02] border border-border rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-border transition-all">
                                <div className="absolute top-0 right-0 p-8 text-foreground/[0.02] group-hover:text-foreground/[0.05] transition-colors pointer-events-none">
                                    {stat.icon}
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-4">{stat.label}</div>
                                    <div className="text-5xl font-black tracking-tightest leading-none">{stat.value}</div>
                                </div>
                                <div className="absolute bottom-4 right-4 flex gap-1 opacity-20">
                                    <div className="w-1 h-1 bg-foreground rounded-full" />
                                    <div className="w-1 h-1 bg-foreground rounded-full animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 px-6 py-4 bg-foreground/[0.02] border border-border rounded-2xl mb-20">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30">
                            Settlement Protocol: All deployed value is aggregated institutional capital, distributed following a 10-day verification threshold, inclusive of a 10% standard platform commission.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Products Section */}
                        <div className="lg:col-span-2 bg-foreground/[0.02] border border-border rounded-[3rem] p-12 relative overflow-hidden shadow-2xl h-fit">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                                    <span className="w-px h-6 bg-foreground/20" />
                                    Asset <span className="text-foreground/20 not-italic">Inventory</span>
                                </h2>
                                <Link href="/seller/products" className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 hover:text-foreground transition-colors">
                                    View Full Registry //
                                </Link>
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-24 border border-dashed border-border rounded-[2.5rem]">
                                    <Package size={64} strokeWidth={0.5} className="mx-auto mb-10 text-foreground/5" />
                                    <p className="text-foreground/20 text-[10px] font-black uppercase tracking-[0.5em] mb-12">No architectural assets localized in registry.</p>
                                    <Link href="/seller/products/new">
                                        <button className="px-12 py-5 bg-foreground/5 border border-border text-foreground/40 hover:text-foreground hover:bg-foreground/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all">
                                            Initialize Protocol
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between p-6 bg-foreground/[0.03] border border-border rounded-3xl hover:border-border transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-border overflow-hidden flex-shrink-0">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-foreground/10">
                                                            <Package size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold uppercase tracking-tight">{product.name}</h3>
                                                    <p className="text-foreground/30 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <div className="text-sm font-bold">${product.price}</div>
                                                    <div className={`text-[8px] font-black uppercase tracking-[0.3em] ${product.approvedForSale ? 'text-green-500/50' : 'text-amber-500/50'}`}>
                                                        {product.approvedForSale ? 'ACTIVE' : 'PENDING_REVIEW'}
                                                    </div>
                                                </div>
                                                <Link href={`/seller/products/${product.id}/edit`}>
                                                    <button className="px-6 py-3 bg-foreground/5 border border-border rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all">
                                                        Edit
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Recent Activity Section */}
                        <div className="bg-foreground/[0.02] border border-border rounded-[3rem] p-12 relative overflow-hidden shadow-2xl h-fit">
                            <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4 mb-12">
                                <span className="w-px h-6 bg-foreground/20" />
                                Activity <span className="text-foreground/20 not-italic">Stream</span>
                            </h2>

                            {activities.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-foreground/20 text-[9px] font-black uppercase tracking-[0.4em]">No localized activity detected.</p>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    {activities.map((act) => (
                                        <div key={act.id} className="relative pl-8">
                                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-foreground/20" />
                                            <div className="absolute left-1 top-4 w-px h-full bg-foreground/5" />

                                            <div className="text-[8px] font-black uppercase tracking-[0.3em] text-foreground/20 mb-2">
                                                {timeAgo(act.timestamp)}
                                            </div>
                                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-2">{act.title}</h4>
                                            <p className="text-[10px] text-foreground/40 leading-relaxed">{act.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-12 pt-12 border-t border-border">
                                <Link href="/seller/analytics">
                                    <button className="w-full py-4 bg-foreground/5 border border-border rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] hover:bg-foreground/10 transition-all flex items-center justify-center gap-3 group">
                                        Analyze Full Data Spectrum
                                        <TrendingUp size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
