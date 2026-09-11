"use client";

import React from "react";
import { motion } from "framer-motion";

const impacts = [
    { label: "Cost Reduction", value: "40-70%" },
    { label: "Lead response", value: "Fast" },
    { label: "Sales growth", value: "Multi" },
    { label: "Operations", value: "24/7" },
    { label: "Scalability", value: "Ready" },
    { label: "Performance", value: "Peak" }
];

export default function BusinessImpact() {
    return (
        <section className="relative section-spacing overflow-hidden bg-transparent">
            <div className="container-standard">
                <div className="flex flex-col items-center text-center mb-16 lg:mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-md"
                    >
                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                        <span className="text-meta">Value Metrics // DATA_VERIFIED</span>
                    </motion.div>
                    <h2 className="fluid-h2">
                        BUSINESS <br className="hidden md:block" /> <span className="text-foreground/40">IMPACT.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5 border border-border overflow-hidden">
                    {impacts.map((impact, i) => (
                        <motion.div
                            key={impact.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group p-8 lg:p-12 bg-foreground/[0.03] backdrop-blur-md flex flex-col items-center justify-center text-center transition-all hover:bg-foreground/[0.06] overflow-hidden relative min-h-[280px]"
                        >
                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <div className="w-1 h-1 bg-foreground/20 group-hover:bg-foreground/60 rounded-full transition-colors" />
                                <span className="text-[8px] font-mono text-foreground/10 group-hover:text-foreground/40 transition-colors tracking-[0.4em] font-black uppercase">METRIC_0{i + 1}</span>
                            </div>
                            <div className="absolute top-6 right-6 text-[8px] font-mono text-foreground/5 tracking-[0.1em] uppercase">SYSTEM_NOMINAL</div>

                            <motion.div
                                className="text-5xl md:text-6xl lg:text-[min(5.5vw,5.5rem)] font-black text-foreground mb-4 tracking-[-0.05em] font-heading uppercase leading-[0.85] group-hover:scale-105 transition-transform duration-1000"
                            >
                                {impact.value}
                            </motion.div>
                            <div className="text-[10px] font-mono font-black text-foreground/20 group-hover:text-foreground/60 transition-colors uppercase tracking-[0.3em]">{impact.label}</div>

                            {/* HUD Micro Corner */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-border group-hover:border-foreground/20 transition-colors" />
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-foreground/10" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 flex flex-col items-center gap-6 text-center">
                    <div className="text-foreground/20 text-[11px] font-mono font-bold tracking-[0.5em] uppercase">Market_Position // AUTHORITY</div>
                    <p className="text-foreground/40 text-2xl font-medium tracking-tight">Automation isn't an expense.</p>
                    <h2 className="fluid-h2">IT'S A REVENUE <br /> MULTIPLIER.</h2>
                </div>
            </div>
        </section>
    );
}
