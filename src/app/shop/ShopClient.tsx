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

            <main className="relative z-10 max-w-[1800px] mx-auto px-6 pt-40 pb-32 sm:pt-44 lg:px-12 lg:pt-48">
                {/* Background Effects specifically for Hero - Enhanced Depth */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[700px] bg-[url('/grid.svg')] bg-[length:60px_60px] opacity-[0.04] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                <header className="relative mb-14 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
                    <div className="relative grid gap-10 px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:px-16 lg:py-16">
                        <div className="flex h-full flex-col justify-center">
                            <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand"><Box size={14} /> Mindscape digital asset shop</p>
                            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-[13ch] font-heading text-[clamp(2.5rem,4.8vw,4.25rem)] font-semibold leading-[.98] tracking-[-.04em]">
                                Production-ready building blocks for AI teams.
                            </motion.h1>
                            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Browse reusable agents, workflows, SaaS foundations, and web products. Find a starting point, then adapt it to the way your team works.</p>
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link href="#shop-assets" className="msa-button">Browse assets <ArrowRight className="h-4 w-4" /></Link>
                                <Link href="/become-seller" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-background px-5 font-semibold text-foreground transition-colors hover:border-brand/40 hover:text-brand">Open a seller store</Link>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
                                <span><strong className="font-semibold text-foreground">{initialProducts.length.toLocaleString()}</strong> available assets</span>
                                <span><strong className="font-semibold text-foreground">{new Set(initialProducts.map((product) => product.sellerId).filter(Boolean)).size || "0"}</strong> contributing sellers</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:content-center" aria-label="Shop categories">
                            {[
                                { icon: Cpu, name: "AI agents", detail: "Task-ready assistants" },
                                { icon: Database, name: "SaaS foundations", detail: "Reusable product bases" },
                                { icon: Zap, name: "Workflows", detail: "Automations to adapt" },
                                { icon: Globe, name: "Web products", detail: "Launch-ready experiences" },
                            ].map(({ icon: Icon, name, detail }) => <div key={name} className="min-h-32 rounded-2xl border border-border bg-background/90 p-4 sm:p-5"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand"><Icon size={18} /></span><h2 className="mt-5 text-sm font-semibold sm:text-base">{name}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p></div>)}
                        </div>
                    </div>
                </header>

                {/* Unified Control Hub (Sticky) */}
                <div className="sticky top-24 md:top-28 z-30 mb-8 md:mb-12 px-2">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background/95 border border-border rounded-[1.25rem] md:rounded-full p-2 flex flex-col md:flex-row gap-2 items-center shadow-[0_12px_32px_rgba(20,15,18,0.12)]"
                    >
                        {/* Integrated Search */}
                        <div className="flex-1 w-full relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors" size={18} />
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Query Assets..."
                                className="w-full pl-14 pr-4 py-4 md:py-5 bg-transparent border-none rounded-full text-foreground placeholder:text-muted-foreground/75 focus:outline-none transition-all text-sm font-medium"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-foreground/20 hover:text-foreground transition-all bg-foreground/5 rounded-full"
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
                                    className={`px-5 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${activeCategoryId === (cat.id === "all" ? "all" : cat.slug)
                                        ? "bg-foreground text-background shadow-lg"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <div className="w-px h-6 bg-border mx-2 hidden md:block" />
                            <button className="hidden md:flex items-center gap-2 px-6 py-3 text-[9px] font-black text-foreground/20 hover:text-foreground transition-colors uppercase tracking-[0.2em]">
                                <SlidersHorizontal size={14} />
                                FILTERS
                            </button>
                        </div>

                    </motion.div>
                </div>

                {/* Content Area - Single Column for Results */}
                <div id="shop-assets" className="max-w-7xl mx-auto scroll-mt-32">
                    <div className="flex items-center justify-between mb-12 pb-8 border-b border-border">
                        <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3 text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">
                                <span className="text-foreground bg-foreground/10 px-4 py-1.5 rounded-lg border border-border">{products.length}</span>
                                ASSETS DETECTED
                            </div>
                            <div className="w-px h-4 bg-border hidden md:block" />
                            <div className="hidden md:flex items-center gap-8">
                                {[
                                    { icon: <Zap size={14} />, label: "INSTANT DEPLOY" },
                                    { icon: <ShieldCheck size={14} />, label: "AUDITED" },
                                    { icon: <Clock size={14} />, label: "LIFETIME UPDATES" }
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-foreground/20">
                                        {badge.icon} {badge.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-foreground/20 tracking-widest uppercase">Filter Status: Active</span>
                            <Filter size={14} className="opacity-10" />
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-32 bg-card rounded-3xl border border-dashed border-border">
                            <Search size={64} strokeWidth={0.5} className="opacity-5 mx-auto mb-10 text-foreground" />
                            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6 text-foreground/40">Zero Matches</h3>
                            <p className="opacity-10 text-[11px] mb-12 uppercase tracking-[0.4em] font-medium leading-relaxed text-foreground">No architectural assets aligned <br /> with the current system query.</p>
                            <Link href="/shop" className="inline-block bg-foreground text-background text-[10px] font-black uppercase tracking-[0.4em] px-16 py-6 rounded-2xl hover:opacity-90 shadow-2xl transition-all active:scale-95">
                                Reset Terminal
                            </Link>
                        </div>
                    ) : (
                        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-10`}>
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
                        className="mt-24 p-8 sm:p-12 md:p-16 bg-card border border-border rounded-3xl relative overflow-hidden group shadow-sm surface-frost"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-all duration-1000 rotate-12">
                            <Cpu size={300} strokeWidth={0.2} className="text-foreground" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
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
