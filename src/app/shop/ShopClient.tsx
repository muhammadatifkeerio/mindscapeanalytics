"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/shop/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    Search,
    SlidersHorizontal,
    ArrowRight,
    Zap,
    ShieldCheck,
    Clock,
    Box,
    Cpu,
    Database,
    Globe,
    Filter,
    X
} from "lucide-react";
import { motion } from "framer-motion";
import { ProductDetailsModal } from "@/components/shop/ProductDetailsModal";
import type { ShopProduct } from "@/lib/types";

const PRIMARY_CATEGORIES = [
    { id: "all", name: "All Products", slug: "" },
    { id: "ai_agents", name: "AI Agents", slug: "ai_agents" },
    { id: "web_projects", name: "Web Projects", slug: "web_projects" },
    { id: "saas", name: "SaaS Templates", slug: "saas" },
    { id: "workflows", name: "Workflows", slug: "workflows" },
];


function ShopContent({ initialProducts }: { initialProducts: ShopProduct[] }) {
    const searchParams = useSearchParams();
    const navRouter = useRouter();
    const categoryQuery = searchParams.get("category") || "";
    const urlSearchQuery = searchParams.get("search") || "";

    // Add local state for instantaneous typing feedback
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

    const viewMode = "grid";
    const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);

    // Debounce the actual URL update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== urlSearchQuery) {
                const params = new URLSearchParams(window.location.search);
                if (searchQuery) {
                    params.set("search", searchQuery);
                } else {
                    params.delete("search");
                }
                navRouter.push(`/shop?${params.toString()}`, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, urlSearchQuery, navRouter]);

    // Keep local search in sync with browser back/forward navigation.
    useEffect(() => {
        const syncSearchQuery = () => {
            setSearchQuery(new URLSearchParams(window.location.search).get("search") || "");
        };
        window.addEventListener("popstate", syncSearchQuery);
        return () => window.removeEventListener("popstate", syncSearchQuery);
    }, []);

    const products = useMemo(() => {
        let list = [...initialProducts];

        if (categoryQuery && categoryQuery !== "all") {
            list = list.filter(p => p.category === categoryQuery);
        }

        if (searchQuery) {
            list = list.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
        return list;
    }, [initialProducts, categoryQuery, searchQuery]);

    const activeCategoryId = categoryQuery || "all";

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <Navbar />

            <main className="relative z-10 mx-auto max-w-[1800px] px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-12 lg:pb-32 lg:pt-48">
                {/* Background Effects specifically for Hero - Enhanced Depth */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[700px] bg-[url('/grid.svg')] bg-[length:60px_60px] opacity-[0.04] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                <header className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:mb-14 sm:rounded-3xl">
                    <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
                    <div className="relative grid gap-7 px-4 py-6 sm:gap-10 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:px-16 lg:py-16">
                        <div className="flex h-full flex-col justify-center">
                            <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand sm:mb-5"><Box size={14} /> Mindscape digital asset shop</p>
                            <h1 className="max-w-[13ch] text-balance font-heading text-[clamp(2.25rem,9vw,4.25rem)] font-semibold leading-[.98] tracking-[-.035em]">
                                Production-ready building blocks for AI teams.
                            </h1>
                            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:mt-5 sm:text-lg sm:leading-8">Browse reusable agents, workflows, SaaS foundations, and web products. Find a starting point, then adapt it to the way your team works.</p>
                            <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link href="#shop-assets" className="msa-button justify-center">Browse assets <ArrowRight className="h-4 w-4" /></Link>
                                <Link href="/become-seller" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 font-semibold text-foreground transition-colors hover:border-brand/40 hover:text-brand">Open a seller store</Link>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted-foreground sm:mt-8 sm:gap-x-7 sm:pt-5">
                                <span><strong className="font-semibold text-foreground">{initialProducts.length.toLocaleString()}</strong> available assets</span>
                                <span><strong className="font-semibold text-foreground">{new Set(initialProducts.map((product) => product.sellerId).filter(Boolean)).size || "0"}</strong> contributing sellers</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:content-center" aria-label="Shop categories">
                            {[
                                { icon: Cpu, name: "AI agents", detail: "Task-ready assistants" },
                                { icon: Database, name: "SaaS foundations", detail: "Reusable product bases" },
                                { icon: Zap, name: "Workflows", detail: "Automations to adapt" },
                                { icon: Globe, name: "Web products", detail: "Launch-ready experiences" },
                            ].map(({ icon: Icon, name, detail }) => <div key={name} className="min-h-28 rounded-xl border border-border bg-background/90 p-3.5 sm:min-h-32 sm:rounded-2xl sm:p-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={18} /></span><h2 className="mt-3 text-sm font-semibold sm:mt-5 sm:text-base">{name}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p></div>)}
                        </div>
                    </div>
                </header>

                {/* Unified Control Hub (Sticky) */}
                <div className="sticky top-20 z-30 mb-6 px-0 sm:top-24 sm:mb-8 sm:px-2 md:top-28 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-background/95 p-1.5 shadow-[0_12px_32px_rgba(20,15,18,0.12)] sm:gap-2 sm:p-2 md:flex-row md:rounded-full"
                    >
                        {/* Integrated Search */}
                        <div className="flex-1 w-full relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground sm:left-6" size={18} />
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Query Assets..."
                                className="w-full rounded-xl border-none bg-transparent py-3 pl-11 pr-11 text-base font-medium text-foreground transition-all placeholder:text-muted-foreground/75 focus:outline-none sm:rounded-full sm:py-4 sm:pl-14 md:py-5"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear search"
                                    className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground sm:right-4"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* Category Fast Switcher - Integrated & Professional */}
                        <div className="flex items-center gap-1.5 p-1 bg-foreground/[0.03] rounded-full w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth">
                            {PRIMARY_CATEGORIES.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={cat.slug ? `/shop?category=${cat.slug}${searchQuery ? `&search=${searchQuery}` : ""}` : `/shop${searchQuery ? `?search=${searchQuery}` : ""}`}
                                    className={`min-h-10 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap sm:px-5 sm:py-3 sm:text-[9px] sm:font-black sm:tracking-[0.2em] ${activeCategoryId === (cat.id === "all" ? "all" : cat.slug)
                                        ? "bg-foreground text-background shadow-lg"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <div className="w-px h-6 bg-border mx-2 hidden md:block" />
                            <button type="button" className="hidden md:flex items-center gap-2 px-6 py-3 text-[9px] font-black text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                                <SlidersHorizontal size={14} />
                                FILTERS
                            </button>
                        </div>

                    </motion.div>
                </div>

                {/* Content Area - Single Column for Results */}
                <div id="shop-assets" className="mx-auto max-w-7xl scroll-mt-28 sm:scroll-mt-32">
                    <div className="mb-6 flex items-center justify-between gap-3 border-b border-border pb-5 sm:mb-12 sm:pb-8">
                        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
                            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground sm:gap-3 sm:text-xs sm:tracking-[0.12em]">
                                <span className="rounded-lg border border-border bg-muted px-3 py-1.5 text-foreground sm:px-4">{products.length}</span>
                                ASSETS DETECTED
                            </div>
                            <div className="w-px h-4 bg-border hidden md:block" />
                            <div className="hidden md:flex items-center gap-8">
                                {[
                                    { icon: <Zap size={14} />, label: "INSTANT DEPLOY" },
                                    { icon: <ShieldCheck size={14} />, label: "AUDITED" },
                                    { icon: <Clock size={14} />, label: "LIFETIME UPDATES" }
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                        {badge.icon} {badge.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden items-center gap-4 sm:flex">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Filter status: active</span>
                            <Filter size={14} className="text-muted-foreground" />
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center sm:rounded-3xl sm:py-24">
                            <Search size={40} strokeWidth={1} className="mx-auto mb-5 text-muted-foreground" />
                            <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">No matching assets</h3>
                            <p className="mb-8 text-sm leading-6 text-muted-foreground">Try another search or clear the selected filters.</p>
                            <Link href="/shop" className="inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                                Clear search and filters
                            </Link>
                        </div>
                    ) : (
                        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 gap-4"}`}>
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <ProductCard
                                        product={product}
                                        onQuickView={() => setSelectedProduct(product)}
                                        priority={index < 6}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <ProductDetailsModal
                        product={selectedProduct}
                        isOpen={!!selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />

                    {/* Monetize Genius CTA - Unified Full Width Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative mt-14 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm surface-frost group sm:mt-24 sm:rounded-3xl sm:p-12 md:p-16"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-1000 rotate-12">
                            <Cpu size={300} strokeWidth={0.2} className="text-foreground" />
                        </div>

                        <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row md:gap-16">
                            <div className="max-w-2xl text-center md:text-left">
                                <h2 className="fluid-h2">
                                    MONETIZE <br />
                                    <span className="opacity-20">GENIUS.</span>
                                </h2>
                                <p className="max-w-2xl mx-auto text-foreground/40 text-sm md:text-base font-medium uppercase tracking-[0.2em] leading-relaxed">
                                    Join our elite architect network. Transform high-tier <br className="hidden md:block" /> architectural code into persistent institutional capital.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 w-full md:w-auto">
                                <Link href="/become-seller">
                                    <button className="btn-institutional group">
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            Initialize Protocol
                                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                        </span>
                                    </button>
                                </Link>
                                <p className="text-[9px] text-foreground/20 font-black uppercase tracking-widest text-center">85% Revenue Retention Guaranteed</p>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function ShopClient({ initialProducts }: { initialProducts: ShopProduct[] }) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.5em] animate-pulse">Initializing Terminal...</div>
            </div>
        }>
            <ShopContent initialProducts={initialProducts} />
        </Suspense>
    );
}
