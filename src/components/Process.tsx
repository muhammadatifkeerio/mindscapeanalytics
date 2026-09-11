"use client"

import React from "react"
import { motion } from "framer-motion"

const steps = [
    {
        number: "01",
        title: "Strategy & Architecture",
        description: "We define the intelligent blueprint and data infrastructure designed for long-term scalability."
    },
    {
        number: "02",
        title: "AI Development",
        description: "Engineering autonomous agents and high-performance workflows tailored for your operations."
    },
    {
        number: "03",
        title: "Secure Deployment",
        description: "Deploying mission-critical systems with security-first defaults and optimized cloud protocols."
    },
    {
        number: "04",
        title: "Managed Infrastructure",
        description: "Continuous database performance tuning, query indexing, and automated backup monitoring."
    },
    {
        number: "05",
        title: "Continuous Optimization",
        description: "We monitor and evolve your systems ensuring they scale as your business grows."
    }
]

export default function Process() {
    return (
        <section id="process" className="relative section-spacing overflow-hidden bg-transparent text-foreground">
            <div className="container-standard">
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16 lg:mb-20 border-b border-border pb-10 text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-6 md:mb-8"
                        >
                            <div className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                            <span className="text-meta">Sequence // OPS_FLOW_v4.1</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="fluid-h2"
                        >
                            OUR <span className="text-foreground/40 font-black">METHODOLOGY.</span>
                        </motion.h2>
                    </div>

                    <div className="hidden lg:block text-right font-mono text-[8px] text-foreground/10 uppercase tracking-[0.3em] leading-relaxed font-black">
                        Protocol: linear_v2 <br />
                        Integrity: 100% <br />
                        Scale: msa_inf_0
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative p-6 lg:p-8 rounded-2xl bg-foreground/5 backdrop-blur-md border border-border group transition-all duration-500 hover:bg-foreground/[0.08] hover:border-foreground/20 shadow-2xl overflow-hidden"
                        >
                            {/* --- Step HUD Node --- */}
                            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-border group-hover:border-white/40 transition-colors" />
                            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-border group-hover:border-white/40 transition-colors" />

                            <div className="flex items-center justify-between mb-12">
                                <span className="text-5xl font-black text-foreground/5 group-hover:text-foreground/20 transition-all duration-500 font-heading leading-none tracking-[-0.05em]">
                                    {step.number}
                                </span>
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-mono text-foreground/10 group-hover:text-foreground/40 transition-colors uppercase tracking-[0.2em]">Node // 00{index + 1}</span>
                                    <div className="w-8 h-px bg-foreground/5 mt-2" />
                                </div>
                            </div>

                            <h3 className="text-xl md:text-[min(1.3vw,1.35rem)] font-black text-foreground/80 mb-6 uppercase tracking-[-0.05em] group-hover:text-foreground transition-colors font-heading leading-tight break-words">
                                {step.title}
                            </h3>
                            <p className="text-foreground/30 leading-relaxed text-[10px] font-medium tracking-tight group-hover:text-foreground/60 transition-colors uppercase">
                                {step.description}
                            </p>

                            {/* Connector Line for Desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-foreground/10 z-0" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
