"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle, Download, ArrowRight, Package, ShoppingBag, CreditCard, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { getOrderBySessionId } from "@/app/_actions/get-order";

type CheckoutOrder = Awaited<ReturnType<typeof getOrderBySessionId>>;

export default function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string; product?: string; products?: string; amount?: string }> }) {
    const resolvedParams = use(searchParams);
    const sessionId = resolvedParams.session_id;
    const { clearCart } = useCart();
    const [order, setOrder] = useState<CheckoutOrder>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Clear cart on successful purchase
        clearCart();

        // Fetch fulfillment details
        if (sessionId) {
            getOrderBySessionId(sessionId).then(data => {
                setOrder(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    const displayAmount = order?.amount || resolvedParams.amount;
    const displayProducts = order?.items?.map((item) => item.product.name).join(", ") || resolvedParams.product || resolvedParams.products;
    const productFiles = order?.items?.flatMap((item) => item.product.productFiles || []) ?? [];

    return (
        <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Global CinematicBackground handles depth */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(180deg,black,transparent)]" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 mx-auto mb-12 bg-foreground/5 border border-border rounded-full flex items-center justify-center shadow-[0_0_50px_hsl(var(--foreground)/0.1)] group"
                    >
                        <ShieldCheck size={48} className="text-foreground group-hover:scale-110 transition-transform" />
                    </motion.div>

                    {/* Success Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-16"
                    >
                        <div className="inline-block px-4 py-1.5 bg-foreground/5 border border-border rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-foreground/40">
                            Protocol Complete
                        </div>
                        <h1
                            className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-none"
                            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                        >
                            ACQUISITION <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40">VERIFIED.</span>
                        </h1>
                        <p className="text-lg text-foreground/40 max-w-xl mx-auto font-medium tracking-tight border-t border-border pt-8 mt-8">
                            Transaction successfully recorded. Your architectural assets have been allocated for deployment.
                        </p>
                    </motion.div>

                    {/* Order Details Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-foreground/[0.02] border border-border rounded-[3rem] p-12 mb-12 text-left backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-12 text-foreground/[0.02] group-hover:text-foreground/[0.04] transition-colors pointer-events-none">
                            <CreditCard size={200} strokeWidth={0.5} />
                        </div>

                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/40 flex items-center gap-4">
                                <Zap size={14} className="text-foreground/20" />
                                Manifest Summary
                            </h2>
                            <div className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Status: Allocated</div>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <div className="flex flex-col gap-2">
                                <span className="text-foreground/30 font-black text-[9px] uppercase tracking-widest">Protocol ID</span>
                                <span className="font-mono text-xs text-foreground/60 bg-foreground/[0.03] px-4 py-2 rounded-xl border border-border break-all">
                                    {sessionId || "MSA_SECURE_TRANSACTION_" + Math.random().toString(36).substring(7).toUpperCase()}
                                </span>
                            </div>

                            {displayProducts && (
                                <div className="flex flex-col gap-2">
                                    <span className="text-foreground/30 font-black text-[9px] uppercase tracking-widest">Allocated Assets</span>
                                    <span className="font-black text-2xl uppercase tracking-tighter leading-none">
                                        {displayProducts}
                                    </span>
                                </div>
                            )}

                            <div className="pt-8 border-t border-border flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/30 mb-1">Final Valuation</span>
                                    <span className="text-5xl font-black text-foreground tracking-widest font-heading">${displayAmount || "0.00"}</span>
                                </div>
                                <div className="pb-2">
                                    <ShieldCheck size={24} className="text-foreground/20" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-foreground/[0.02] border border-border rounded-[2rem] p-10 text-left group hover:border-foreground/20 transition-all cursor-pointer overflow-hidden relative"
                        >
                            <div className="absolute -right-4 -bottom-4 text-foreground/[0.02] group-hover:rotate-12 transition-transform">
                                <Download size={150} strokeWidth={0.5} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-3">DEPLOY ASSETS</h3>
                            <p className="text-foreground/40 text-[10px] mb-8 uppercase tracking-widest leading-relaxed">Access instant repository links and deployment documentation.</p>
                            {productFiles.length > 0 ? (
                                <div className="space-y-3">
                                    {productFiles.map((file, index) => (
                                        <button
                                            key={file.id || index}
                                            onClick={() => window.open(file.url, '_blank')}
                                            className="w-full py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/90 transition-all flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            <Package size={14} />
                                            DOWNLOAD {file.filename || `ASSET ${index + 1}`}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <button disabled className="w-full py-5 bg-foreground/20 text-foreground/50 cursor-not-allowed rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
                                    <Package size={14} />
                                    NO FILES AVAILABLE
                                </button>
                            )}
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-foreground/[0.02] border border-border rounded-[2rem] p-10 text-left group hover:border-foreground/20 transition-all cursor-pointer overflow-hidden relative"
                        >
                            <div className="absolute -right-4 -bottom-4 text-foreground/[0.02] group-hover:rotate-12 transition-transform">
                                <ShoppingBag size={150} strokeWidth={0.5} />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-3">CONTINUE MATRIX</h3>
                            <p className="text-foreground/40 text-[10px] mb-8 uppercase tracking-widest leading-relaxed">Scan the marketplace for additional architectural primitives.</p>
                            <Link href="/shop" className="block">
                                <button className="w-full py-5 bg-foreground/5 border border-border text-foreground rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/10 transition-all flex items-center justify-center gap-3 active:scale-95">
                                    OPEN MARKETPLACE
                                    <ArrowRight size={14} />
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Infrastructure ID */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-foreground/20 text-[9px] font-black uppercase tracking-[0.4em] flex flex-col gap-4"
                    >
                        <span>Infrastructure node: SECURE_FULFILLMENT_ALPHA_01</span>
                        <div className="flex items-center justify-center gap-6">
                            <span className="hover:text-foreground transition-colors cursor-pointer border-b border-border pb-1">SUPPORT_CORE</span>
                            <span className="hover:text-foreground transition-colors cursor-pointer border-b border-border pb-1">DOCUMENTATION</span>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
