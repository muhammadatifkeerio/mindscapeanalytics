"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, BadgePercent, Zap } from "lucide-react";

export default function SellerPolicyPage() {
    return (
        <div className="min-h-screen bg-transparent text-foreground selection:bg-foreground selection:text-background">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-20 border-b border-border pb-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-3 mb-6"
                        >
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            <span className="text-xs font-mono text-foreground/40 uppercase tracking-[0.5em]">Legal // Protocol_0.9</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-heading leading-none"
                        >
                            SELLER <span className="text-foreground/30">POLICY.</span>
                        </motion.h1>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-16">
                        {/* 1. Overview */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 border-l-2 border-white pl-6">
                                <BadgePercent className="w-5 h-5 text-foreground/60" />
                                <h2 className="text-2xl font-black uppercase tracking-tight">01. Service Fees & Commissions</h2>
                            </div>
                            <div className="bg-foreground/5 border border-border rounded-2xl p-8 space-y-4 leading-relaxed text-foreground/60 font-medium">
                                <p>
                                    Mindscape Analytics operates as a premium marketplace for elite AI solutions, workflows, and digital assets. To maintain the platform's world-class infrastructure, we apply a standardized commission structure.
                                </p>
                                <div className="p-6 rounded-xl bg-foreground text-background font-black text-center text-3xl tracking-tighter uppercase">
                                    10% PLATFORM FEE
                                </div>
                                <p className="text-sm text-foreground/40">
                                    * This fee is deducted automatically from each transaction. There are no hidden setup costs or recurring monthly listing fees.
                                </p>
                            </div>
                        </section>

                        {/* 2. Quality Standards */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 border-l-2 border-white/40 pl-6">
                                <ShieldCheck className="w-5 h-5 text-foreground/40" />
                                <h2 className="text-2xl font-black uppercase tracking-tight text-foreground/80">02. Elite Quality Protocol</h2>
                            </div>
                            <div className="space-y-4 text-foreground/50 leading-relaxed font-medium">
                                <p>
                                    Every asset listed on Mindscape Analytics must meet our "Industrial Elite" standards. This includes:
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        "Flawless Code Architecture",
                                        "Detailed Documentation",
                                        "Security-First Design",
                                        "Scalable Logic Systems",
                                        "Modular UI Components",
                                        "Optimized Performance"
                                    ].map((spec, i) => (
                                        <li key={i} className="flex items-center gap-3 p-4 rounded-xl bg-foreground/[0.03] border border-border text-xs font-mono uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 bg-foreground/20 rounded-full" />
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* 3. Payouts */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-4 border-l-2 border-foreground/20 pl-6">
                                <Zap className="w-5 h-5 text-foreground/20" />
                                <h2 className="text-2xl font-black uppercase tracking-tight text-foreground/60">03. Financial Settlement</h2>
                            </div>
                            <p className="text-foreground/40 font-medium leading-relaxed">
                                Payouts are processed on a bi-weekly cycle (1st and 15th of every month). Sellers must maintain a verified payout method and adhere to international anti-money laundering (AML) protocols. Funds are held in a secure escrow for 7 days post-transaction to ensure buyer satisfaction and system integrity.
                            </p>
                        </section>

                        {/* 4. Contact Policy */}
                        <section className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-border text-center">
                            <h3 className="text-xl font-black mb-4 uppercase">Require Clarification?</h3>
                            <p className="text-foreground/40 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                                If you have questions regarding bespoke licensing or large-scale enterprise seller agreements, contact our legal desk.
                            </p>
                            <a href="mailto:info@mindscapeanalytics.com">
                                <button className="px-8 py-4 bg-foreground text-background font-black uppercase text-xs tracking-widest rounded-xl hover:bg-foreground/90 transition-all">
                                    Consult Seller Desk
                                </button>
                            </a>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
