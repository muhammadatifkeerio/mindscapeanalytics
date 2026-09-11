"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
    Calendar,
    User,
    ChevronRight,
    Cpu,
    Zap,
    Database,
    Brain,
    Clock,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import CinematicBackground from "@/components/CinematicBackground";

const BLOG_POSTS = [
    {
        title: "The Agentic Shift: Why 2026 is the Year of Autonomous Operations",
        excerpt: "Moving beyond simple chatbots. How distributed AI agents are taking over complex enterprise workflows and decision-making.",
        date: "Feb 24, 2026",
        author: "Dr. Aris Thorne",
        category: "Artificial Intelligence",
        readTime: "8 min",
        icon: Brain
    },
    {
        title: "Quantum Data Engineering: Architecting for the Next Computational Leap",
        excerpt: "Preparing your data pipelines for quantum-ready encryption and processing speeds. What every CTO needs to know today.",
        date: "Feb 20, 2026",
        author: "Sarah Jenkins",
        category: "Data Engineering",
        readTime: "12 min",
        icon: Database
    },
    {
        title: "Neural UI: The End of Traditional Navigation as We Know It",
        excerpt: "Context-aware interfaces that predict user intent before the first click. Exploring the 2026 design standards.",
        date: "Feb 15, 2026",
        author: "Marcus Vane",
        category: "User Experience",
        readTime: "6 min",
        icon: Cpu
    },
    {
        title: "Global Liquidity Protocols: Web3 Payouts and the Future of Work",
        excerpt: "Ensuring near-instant, compliant settlements for global workforces using distributed ledger technologies.",
        date: "Feb 10, 2026",
        author: "Elena Rossi",
        category: "Web3 / Finance",
        readTime: "10 min",
        icon: Zap
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative">
            <CinematicBackground />
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-border pb-20">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 border border-border rounded-full mb-8"
                            >
                                <Zap size={12} className="text-foreground/40" />
                                <span className="text-meta">Intelligence_Stream // v2026</span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="fluid-h1"
                            >
                                INTEL <span className="text-foreground/20">HUB.</span>
                            </motion.h1>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-meta max-w-sm leading-loose"
                        >
                            Proprietary insights and technical forecasts for the 2026 industrial digital landscape.
                        </motion.p>
                    </div>

                    {/* Blog Feed */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                        {BLOG_POSTS.map((post, i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-foreground/[0.02] border border-border rounded-[3rem] overflow-hidden hover:border-foreground/20 transition-all duration-700"
                            >
                                <div className="p-10 md:p-14">
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="p-4 bg-foreground/5 rounded-2xl text-foreground/40 group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                                            <post.icon size={24} />
                                        </div>
                                        <div className="flex items-center gap-6 text-meta">
                                            <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                                            <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 group-hover:text-foreground/80 transition-colors">{post.category}</span>
                                    </div>

                                    <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter leading-tight group-hover:translate-x-2 transition-transform duration-500">
                                        {post.title}
                                    </h2>

                                    <p className="text-foreground/40 text-sm font-medium leading-loose mb-10">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-10 border-t border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-black border border-border text-foreground/40">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-meta">{post.author}</span>
                                        </div>
                                        <Link href="#" className="flex items-center gap-2 text-meta text-foreground hover:gap-4 transition-all group/read">
                                            Execute Read <ChevronRight size={14} className="group-hover/read:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.article>
                        ))}
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="bg-foreground/5 border border-border rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />
                        <h2 className="fluid-h2 mb-8">Stay Ahead of the <span className="text-foreground/20">Incline.</span></h2>
                        <p className="text-meta mb-12">Join 50,000+ architects receiving weekly industrial intelligence.</p>

                        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="IDENT_EMAIL@SECURE.HOST"
                                className="flex-1 bg-black/50 border border-border rounded-2xl px-8 py-5 text-meta focus:outline-none focus:border-white/30 transition-all"
                            />
                            <button className="btn-institutional">
                                Subscribe
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
