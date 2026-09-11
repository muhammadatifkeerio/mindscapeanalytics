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
    LayoutGrid,
    ArrowRight,
    Zap,
    ShieldCheck,
    Clock,
    Box,
    Cpu,
    Database,
    Globe,
    Filter,
    Eye,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductDetailsModal } from "@/components/shop/ProductDetailsModal";
import type { ProductWithSeller } from "@/lib/types";

const PRIMARY_CATEGORIES = [
    { id: "all", name: "All Products", slug: "" },
    { id: "ai_agents", name: "AI Agents", slug: "ai_agents" },
    { id: "web_projects", name: "Web Projects", slug: "web_projects" },
    { id: "saas", name: "SaaS Templates", slug: "saas" },
    { id: "workflows", name: "Workflows", slug: "workflows" },
];


function ShopContent({ initialProducts }: { initialProducts: ProductWithSeller[] }) {
    const searchParams = useSearchParams();
    const navRouter = useRouter();
    const categoryQuery = searchParams.get("category") || "";
    const urlSearchQuery = searchParams.get("search") || "";

    // Add local state for instantaneous typing feedback
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedProduct, setSelectedProduct] = useState<ProductWithSeller | null>(null);

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

    // Keep local state in sync if URL changes externally
    useEffect(() => {
        setSearchQuery(urlSearchQuery);
    }, [urlSearchQuery]);

    const products = useMemo(() => {
        let list = [...(initialProducts as any[])];

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

            <main className="relative z-10 pt-2 pb-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
                {/* Background Effects specifically for Hero - Enhanced Depth */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[700px] bg-[url('/grid.svg')] bg-[length:60px_60px] opacity-[0.04] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                {/* Professional Store Hero - Centered and Cinematic */}
                <header className="py-24 mb-16 relative overflow-hidden text-center rounded-[4rem] border border-border bg-foreground/[0.01] backdrop-blur-[2px] institutional-grid">
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="fluid-h1"
                        >
                            SYSTEM <br /> <span className="opacity-20">ARCHIVES.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 border-t border-border pt-8 md:pt-10"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] md:text-[9px] font-black text-foreground/20 uppercase tracking-[0.4em] mb-1">Total Assets</span>
                                <span className="text-3xl md:text-4xl font-black tracking-tighter text-foreground/80">
                                    {initialProducts.length.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-12 h-px md:w-px md:h-12 bg-border" />
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground/40 font-heading tracking-tight leading-[1.1] md:leading-[1] uppercase text-center max-w-4xl mx-auto">
                                MONETIZE YOUR CODE. GET YOUR SHOP UP AND RUNNING IN MINUTES. <br />
                                JOIN OUR <span className="text-foreground">ELITE ARCHITECT NETWORK.</span>
                            </p>
                            <div className="w-12 h-px md:w-px md:h-12 bg-border" />
                            <div className="flex flex-col items-center">
                                <span className="text-[8px] md:text-[9px] font-black text-foreground/20 uppercase tracking-[0.4em] mb-1">Elite Creators</span>
                                <span className="text-3xl md:text-4xl font-black tracking-tighter text-foreground/80">
                                    {new Set((initialProducts as any[]).map(p => p.sellerId).filter(Boolean)).size || "-"}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-16 flex flex-wrap justify-center gap-6"
                        >
                            <Link href="/become-seller">
                                <button className="btn-institutional group">
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        GET YOUR SHOP
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                            <Link href="/shop?category=ai_agents">
                                <button className="btn-outline-institutional group">
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        EXPLORE ARCHIVES
                                        <Box size={14} className="opacity-40 group-hover:rotate-12 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </header>

                {/* Unified Control Hub (Sticky) */}
                <div className="sticky top-20 md:top-24 z-[100] mb-8 md:mb-12 px-2">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-background/80 backdrop-blur-3xl border border-border rounded-[2rem] md:rounded-full p-2 flex flex-col md:flex-row gap-2 items-center shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
                    >
                        {/* Integrated Search */}
                        <div className="flex-1 w-full relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-foreground transition-colors" size={18} />
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Query Assets..."
                                className="w-full pl-14 pr-4 py-4 md:py-5 bg-transparent border-none rounded-full text-foreground placeholder:text-foreground/20 focus:outline-none transition-all text-xs font-bold uppercase tracking-widest"
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
                                        : "text-foreground/30 hover:text-foreground hover:bg-foreground/5"
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
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12 pb-8 border-b border-border">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 text-foreground/40 text-[10px] font-black uppercase tracking-[0.4em]">
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
                        <div className="text-center py-48 bg-foreground/[0.01] rounded-[4rem] border border-dashed border-border/50">
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
                        className="mt-32 p-16 md:p-24 bg-foreground/[0.02] backdrop-blur-md border border-border rounded-[4rem] relative overflow-hidden group shadow-2xl surface-frost"
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

export default function ShopClient({ initialProducts }: { initialProducts: ProductWithSeller[] }) {
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
