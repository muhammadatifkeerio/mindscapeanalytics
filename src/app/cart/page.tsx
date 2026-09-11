"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowRight,
    ShieldCheck,
    Zap,
    Lock
} from "lucide-react";
import { createMultiItemCheckout } from "@/app/_actions/stripe";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const handleCheckout = async () => {
        if (items.length === 0) return;



        setIsProcessing(true);
        try {
            const cartItems = items.map(item => ({
                id: item.productId,
                quantity: item.quantity
            }));

            const result = await createMultiItemCheckout(cartItems);
            if (result.url) {
                window.location.href = result.url;
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Global CinematicBackground handles depth, removed local blurs */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(180deg,black,transparent)]" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-16">
                        <div className="inline-block px-4 py-1.5 bg-foreground/5 border border-border rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-foreground/40">
                            Asset Allocation
                        </div>
                        <h1
                            className="text-5xl md:text-7xl font-black tracking-tighter"
                            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                        >
                            ACQUISITION <span className="text-foreground/20">HUB.</span>
                        </h1>
                    </div>

                    <AnimatePresence mode="wait">
                        {items.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-32 bg-foreground/[0.02] border border-dashed border-border rounded-[3rem]"
                            >
                                <ShoppingBag size={48} className="mx-auto mb-6 text-foreground/10" />
                                <h2 className="text-xl font-black uppercase tracking-widest mb-4">Allocation Empty</h2>
                                <p className="text-foreground/40 text-xs mb-10 uppercase tracking-widest">No architectural assets selected for acquisition.</p>
                                <Link href="/shop">
                                    <button className="px-10 py-4 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-foreground/90 transition-all">
                                        Return to Marketplace
                                    </button>
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Cart Items */}
                                <div className="lg:col-span-2 space-y-6">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.productId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-foreground/[0.02] border border-border rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-8 group hover:border-border transition-colors"
                                        >
                                            <div className="w-32 h-32 flex-shrink-0 bg-foreground/5 rounded-2xl border border-border relative overflow-hidden">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-foreground/10 text-[10px] font-black uppercase">
                                                        No Media
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 text-center sm:text-left">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1">Asset ID: {item.productId.slice(0, 8)}</div>
                                                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{item.name}</h3>
                                                <div className="text-2xl font-black text-foreground">
                                                    ${item.price.toFixed(2)}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-4 bg-transparent/40 border border-border rounded-2xl p-2 px-4">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                        className="p-1 hover:text-foreground text-foreground/40 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                        className="p-1 hover:text-foreground text-foreground/40 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.productId)}
                                                    className="p-4 bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 text-foreground/20 rounded-2xl transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Order Summary */}
                                <div className="lg:col-span-1">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-foreground/[0.03] border border-border rounded-[2.5rem] p-10 sticky top-40"
                                    >
                                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40 mb-10 pb-6 border-b border-border">Transaction Summary</h2>

                                        <div className="space-y-6 mb-10">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                                                <span>Allocated Units</span>
                                                <span className="text-foreground">{itemCount}</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                                                <span>Protocol Fee</span>
                                                <span className="text-foreground">CREDIT</span>
                                            </div>
                                            <div className="pt-6 border-t border-border flex justify-between items-end">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-1">Total Valuation</span>
                                                <span className="text-4xl font-black text-foreground">${total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <button
                                                onClick={handleCheckout}
                                                disabled={isProcessing}
                                                className="w-full py-6 bg-foreground text-background disabled:bg-foreground/20 disabled:cursor-not-allowed rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-[0_0_50px_hsl(var(--foreground)/0.1)] active:scale-95 group"
                                            >
                                                {isProcessing ? (
                                                    "PROCESSING..."
                                                ) : (
                                                    <>
                                                        Initialize Secure Acquisition
                                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>

                                            <div className="flex items-center justify-center gap-4 py-4 opacity-30">
                                                <Lock size={12} />
                                                <span className="text-[8px] font-black uppercase tracking-[0.2em]">Stripe Security Protocol</span>
                                            </div>
                                        </div>

                                        {/* Trust Factors in Summary */}
                                        <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck size={12} className="text-foreground/20" />
                                                <span className="text-[8px] font-bold uppercase tracking-tighter text-foreground/30">Verified</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Zap size={12} className="text-foreground/20" />
                                                <span className="text-[8px] font-bold uppercase tracking-tighter text-foreground/30">Instant</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
