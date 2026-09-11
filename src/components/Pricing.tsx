"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const tiers = [
    {
        name: "Strategic Architecture",
        slug: "strategic-architecture",
        price: "Consultative",
        description: "Ideal for organizations looking to define their cognitive roadmap and AI governance.",
        features: [
            "AI Readiness & Audit",
            "Cognitive Roadmap Design",
            "Infrastructure Assessment",
            "Ethical AI Governance"
        ]
    },
    {
        name: "Enterprise Intelligence",
        slug: "enterprise-intelligence",
        price: "Strategic",
        description: "Standardize your operations with full-stack AI automation and custom neural agents.",
        features: [
            "Custom Neural Logic",
            "Multi-Agent Workflow",
            "Full API Integration",
            "Dedicated AI Architect"
        ],
        popular: true
    },
    {
        name: "Infinite Ecosystem",
        slug: "infinite-ecosystem",
        price: "Enterprise",
        description: "For elite organizations requiring a total-immersion, multi-platform AI ecosystem.",
        features: [
            "Autonomous Multi-Agentry",
            "Proprietary Model Tuning",
            "Quantum-Ready Security",
            "24/7 Global Intelligence"
        ]
    }
]

export default function Pricing() {
    return (
        <section id="pricing" className="relative pt-0 pb-32 px-6 overflow-hidden bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b border-border pb-10">
                    <div className="max-w-4xl text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                            <span className="text-meta">Matrix // Strategic Asset Allocation</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="fluid-h2"
                        >
                            SCALABLE <br />
                            <span className="text-secondary">INVESTMENT.</span>
                        </motion.h2>
                    </div>

                    <div className="hidden lg:block text-right font-mono text-[9px] text-foreground/40 uppercase tracking-widest leading-relaxed">
                        Allocation: optimized <br />
                        ROI: projected_v4 <br />
                        Contract: node-locked
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-10 rounded-xl bg-transparent flex flex-col h-full border transition-all duration-500 hover:bg-transparent hover:scale-[1.02] shadow-2xl group ${tier.popular ? "border-foreground/20 shadow-white/5" : "border-border"
                                }`}
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
                            {/* --- HUD Elements --- */}
                            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-border group-hover:border-white/30 transition-colors" />
                            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-border group-hover:border-white/30 transition-colors" />

                            {tier.popular && (
                                <div className="absolute top-6 right-8 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground text-background text-meta shadow-xl">
                                    MOST ELITE
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-meta mb-5 flex items-center gap-3 group-hover:text-foreground transition-colors">
                                    <div className="w-1 h-1 bg-foreground/20 rounded-full group-hover:bg-foreground transition-all" />
                                    {tier.name}
                                </h3>
                                <div className="text-3xl lg:text-4xl font-black text-foreground mb-6 uppercase tracking-tight font-heading leading-none group-hover:scale-[1.01] transition-transform origin-left">
                                    {tier.price}
                                </div>
                                <p className="text-foreground/50 text-sm leading-relaxed font-medium tracking-tight group-hover:text-foreground/70 transition-colors">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {tier.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-4 text-foreground/20 text-meta">
                                        <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center">
                                            <div className="w-1 h-1 bg-foreground/20 rounded-full" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link href={`/contact?plan=${tier.slug}`} className="mt-auto block group/btn">
                                <button className={cn(
                                    "w-full py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3",
                                    tier.popular
                                        ? "bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] shadow-xl"
                                        : "bg-foreground/5 border border-border text-foreground/40 hover:bg-foreground/10 hover:text-foreground hover:border-foreground/20"
                                )}>
                                    Initiate Contract
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    )
}
