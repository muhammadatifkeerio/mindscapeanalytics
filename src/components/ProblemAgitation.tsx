"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const painPoints = [
    "Manual sales processes",
    "Slow lead follow-up",
    "Missed customer calls",
    "Disconnected tools",
    "Poor database performance",
    "Unmanaged cloud costs",
    "No automation strategy"
];

export default function ProblemAgitation() {
    return (
        <section className="relative section-spacing overflow-hidden bg-foreground/[0.01] dark:bg-transparent border-y border-border/50">
            <div className="container-standard">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="flex flex-col items-center lg:items-start max-w-4xl space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="fluid-h2 text-foreground drop-shadow-sm"
                        >
                            THE COST OF <br className="hidden md:block" /> <span className="text-secondary font-black drop-shadow-[0_0_15px_hsl(var(--secondary) / 0.4)]">INEFFICIENCY.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-foreground/70 dark:text-foreground/40 text-lg lg:text-xl max-w-2xl font-medium leading-relaxed"
                        >
                            Every manual workflow is a hidden tax on your growth. We identify the bottlenecks and replace them with intelligent automation.
                        </motion.p>
                    </div>

                    <div className="relative">
                        {/* Interactive Diagnostic Scanner Line */}
                        <motion.div
                            animate={{ y: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-px bg-secondary/50 z-20 pointer-events-none"
                        />
                        <div className="absolute -inset-10 bg-secondary/10 blur-[120px] rounded-full opacity-40 dark:opacity-20" />
                        <div className="relative grid grid-cols-1 gap-4">
                             {painPoints.map((point, i) => (
                                <motion.div
                                    key={point}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="group flex items-center justify-between p-6 rounded-2xl bg-background/95 dark:bg-foreground/[0.02] border border-border/80 backdrop-blur-xl transition-all hover:border-foreground/20 hover:scale-[1.02] shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_0_30px_hsl(var(--foreground) / 0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] cursor-default"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="text-[9px] font-mono text-secondary dark:text-foreground/20 tracking-[0.3em] font-black group-hover:text-secondary transition-colors">0{i + 1}</span>
                                        <span className="text-lg font-bold text-foreground/80 dark:text-foreground/60 group-hover:text-foreground transition-colors uppercase tracking-tight">{point}</span>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/10 group-hover:bg-secondary transition-all shadow-[0_0_10px_hsl(var(--secondary) / 0)] group-hover:shadow-[0_0_15px_hsl(var(--secondary) / 0.6)]" />
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="mt-8 p-10 rounded-[2.5rem] bg-foreground text-background text-center space-y-6 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px] opacity-20" />
                                <p className="text-xl font-black uppercase tracking-[-0.05em] text-secondary">YOU DON'T NEED ANOTHER APP.</p>
                                <p className="text-4xl md:text-5xl font-black uppercase tracking-[-0.05em] font-heading leading-none text-background">YOU NEED AN <br /> <span className="text-secondary drop-shadow-[0_0_20px_hsl(var(--secondary) / 0.3)]">INTELLIGENT SYSTEM.</span></p>
                                <div className="pt-4 text-[9px] font-mono font-black tracking-[0.5em] uppercase text-background/40">That's where we come in.</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
