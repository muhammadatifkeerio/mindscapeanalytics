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
        <div className="min-h-screen bg-background text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="glow-spot top-0 right-0 w-[50%] h-[50%] opacity-10" />
            </div>

            <Navbar />

            <main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-border pb-8 sm:mb-16 sm:flex-row sm:items-end sm:pb-10 lg:mb-20 lg:pb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 border border-border rounded-full mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                                <span className="text-xs font-medium text-muted-foreground">Seller ID: {ctx.userId.slice(0, 8)}</span>
                            </div>
                            <h1
                                className="mb-3 text-4xl font-bold uppercase tracking-tight sm:mb-4 sm:text-5xl lg:text-6xl"
                                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                            >
                                VENDOR <span className="text-muted-foreground not-italic">DASHBOARD.</span>
                            </h1>
                            <p className="max-w-prose text-sm leading-6 text-muted-foreground sm:text-base">Manage your listings, sales, and payout preferences.</p>
                        </div>
                        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                            <Link href="/seller/payments">
                                <button className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-muted px-4 py-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70 active:scale-[.99] sm:gap-3 sm:px-5">
                                    <CreditCard size={16} className="text-foreground/40 group-hover:text-foreground transition-colors" />
                                    Configure Payouts
                                </button>
                            </Link>
                            <Link href="/seller/products/new">
                                <button className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-xs font-semibold text-background shadow-sm transition-opacity hover:opacity-90 active:scale-[.99] sm:gap-3 sm:px-5">
                                    <Plus size={16} />
                                    Release New Asset
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-12 sm:gap-6 md:grid-cols-3">
                        {[
                            { label: "ACTIVE ASSETS", value: stats.totalProducts, icon: <Package size={20} /> },
                            { label: "UNITS DEPLOYED", value: stats.totalSales, icon: <TrendingUp size={20} /> },
                            { label: "INSTITUTIONAL VALUE", value: `$${stats.totalRevenue}`, icon: <DollarSign size={20} /> }
                        ].map((stat, i) => (
                            <div key={i} className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand/30 sm:rounded-[1.5rem] sm:p-6 lg:p-8">
                                <div className="absolute top-0 right-0 p-8 text-foreground/[0.02] group-hover:text-foreground/[0.05] transition-colors pointer-events-none">
                                    {stat.icon}
                                </div>
                                <div className="relative z-10">
                                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:mb-4 sm:text-xs sm:tracking-[0.2em]">{stat.label}</div>
                                    <div className="break-words text-3xl font-bold leading-none tracking-tight sm:text-4xl">{stat.value}</div>
                                </div>
                                <div className="absolute bottom-4 right-4 flex gap-1 opacity-20">
                                    <div className="w-1 h-1 bg-foreground rounded-full" />
                                    <div className="w-1 h-1 bg-foreground rounded-full animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-10 flex items-start gap-3 rounded-xl border border-border bg-muted/60 px-4 py-4 sm:mb-16 sm:px-6">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                            Settlement Protocol: All deployed value is aggregated institutional capital, distributed following a 10-day verification threshold, inclusive of a 10% standard platform commission.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8">
                        {/* Products Section */}
                        <div className="h-fit overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 lg:col-span-2 lg:p-8">
                            <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
                                <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight sm:text-2xl">
                                    Asset inventory
                                </h2>
                                <Link href="/seller/products" className="inline-flex min-h-10 items-center text-xs font-semibold text-brand hover:underline sm:text-sm">
                                    View all assets
                                </Link>
                            </div>

                            {products.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-border px-5 py-12 text-center">
                                    <Package size={40} strokeWidth={1} className="mx-auto mb-4 text-muted-foreground" />
                                    <p className="mb-6 text-sm text-muted-foreground">You haven’t listed any assets yet.</p>
                                    <Link href="/seller/products/new">
                                        <button className="min-h-11 rounded-full border border-border bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                                            Add your first asset
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex flex-col gap-4 rounded-xl border border-border bg-background p-3 transition-colors hover:border-brand/30 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:h-16 sm:w-16">
                                                    {product.images?.[0] ? (
                                                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-foreground/10">
                                                            <Package size={24} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="line-clamp-2 text-sm font-semibold leading-5 sm:text-base">{product.name}</h3>
                                                    <p className="mt-1 text-xs capitalize text-muted-foreground">{product.category.replaceAll("_", " ")}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 border-t border-border pt-3 sm:justify-end sm:border-0 sm:pt-0 sm:pl-3">
                                                <div className="text-left sm:text-right">
                                                    <div className="text-sm font-semibold">${product.price}</div>
                                                    <div className={`mt-0.5 text-xs font-medium ${product.approvedForSale ? 'text-green-700 dark:text-green-400' : 'text-amber-700 dark:text-amber-400'}`}>
                                                        {product.approvedForSale ? 'ACTIVE' : 'PENDING_REVIEW'}
                                                    </div>
                                                </div>
                                                <Link href={`/seller/products/${product.id}/edit`}>
                                                    <button className="min-h-10 rounded-lg border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-foreground hover:text-background">
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
                        <div className="h-fit rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 lg:p-8">
                            <h2 className="mb-6 text-lg font-semibold tracking-tight sm:mb-8 sm:text-2xl">
                                Recent activity
                            </h2>

                            {activities.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-sm text-muted-foreground">No recent activity yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    {activities.map((act) => (
                                        <div key={act.id} className="relative pl-8">
                                            <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-foreground/20" />
                                            <div className="absolute left-1 top-4 w-px h-full bg-foreground/5" />

                                            <div className="mb-2 text-xs font-medium text-muted-foreground">
                                                {timeAgo(act.timestamp)}
                                            </div>
                                            <h4 className="mb-2 text-sm font-semibold">{act.title}</h4>
                                            <p className="text-sm leading-6 text-muted-foreground">{act.description}</p>
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
