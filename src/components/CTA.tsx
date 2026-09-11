"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import CalButton from "./CalButton";

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null);

    // Scroll-linked transformations removed for mobile performance optimization

    return (
        <section ref={sectionRef} className="relative section-spacing overflow-hidden bg-transparent">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="container-standard transform-gpu-fix"
            >
                <div className="relative p-12 lg:p-24 rounded-[4rem] bg-foreground text-background overflow-hidden group border border-border shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                    {/* Static Grid Background */}
                    <div
                        className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 bg-[url('/grid.svg')] bg-[length:50px_50px]"
                    />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent/[0.03] border border-black/10 mb-8 backdrop-blur-md"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                            <span className="text-background/60 text-[10px] font-bold tracking-[0.3em] uppercase">
                                Start Your Transformation
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="fluid-h2 mb-8"
                        >
                            READY TO REPLACE <br className="hidden md:block" />
                            <span className="opacity-30">MANUAL WORK?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-background/60 text-lg max-w-xl mb-12 font-medium"
                        >
                            Let's architect your AI-driven infrastructure and build the intelligent systems your business deserves.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <CalButton ariaLabel="Open chat with Mindscape Analytics" className="px-12 py-5 rounded-full bg-black text-foreground font-bold text-xl hover:scale-105 transition-all flex items-center gap-4">
                                Chat with us
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </motion.div>
                            </CalButton>

                            <Link href="/contact">
                                <button className="px-12 py-5 rounded-full bg-transparent border-2 border-black/10 text-background font-bold text-xl hover:bg-black/5 transition-all uppercase tracking-tighter">
                                    Request Proposal
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
