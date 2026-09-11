"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Database } from "lucide-react";

const stats = [
    {
        label: "Reasoning Depth",
        value: "675B Parameters",
        desc: "Mistral Large 3 SOTA reasoning",
        icon: Cpu,
        color: "text-secondary"
    },
    {
        label: "Inference Latency",
        value: "<120ms TBT",
        desc: "MSA AGENT optimized fleet",
        icon: Zap,
        color: "text-amber-500"
    },
    {
        label: "Protocol Security",
        value: "SOC2 + AES-256",
        desc: "Enterprise-grade data silos",
        icon: Shield,
        color: "text-emerald-500"
    },
    {
        label: "Neural Context",
        value: "128k Tokens",
        desc: "Full enterprise knowledge base",
        icon: Database,
        color: "text-blue-500"
    }
];

export default function EnterpriseArchitecture() {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-mono text-secondary tracking-[0.4em] font-black uppercase mb-4 block"
                    >
                        Infrastructure_Standards // 2026
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase"
                    >
                        Architected for <br />
                        <span className="text-foreground/40">Industrial Scale.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/40 max-w-2xl mx-auto font-medium"
                    >
                        We don't just prompt models. We deploy high-performance inference microservices on MSA AGENT bare-metal, delivering agentic reasoning at speeds required for global enterprise operations.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl border border-white/5 bg-zinc-950/50 backdrop-blur-xl group hover:border-white/10 transition-colors"
                        >
                            <stat.icon className={`w-8 h-8 ${stat.color} mb-6 group-hover:scale-110 transition-transform`} />
                            <div className="text-[10px] font-mono text-white/20 tracking-widest font-black uppercase mb-1">
                                {stat.label}
                            </div>
                            <div className="text-2xl font-bold text-white mb-2 tracking-tight">
                                {stat.value}
                            </div>
                            <p className="text-sm text-white/40">
                                {stat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Callout */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 p-1 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full"
                >
                    <div className="bg-black/80 backdrop-blur-sm rounded-full py-4 px-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Partner_Network //</span>
                        <div className="flex items-center gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                            {/* Logos would go here, using text for now to maintain aesthetic */}
                            <span className="text-xs font-black text-white tracking-widest">MSA AGENT</span>
                            <span className="text-xs font-black text-white tracking-widest">MISTRAL AI</span>
                            <span className="text-xs font-black text-white tracking-widest">ANTHROPIC CLAUDE</span>
                            <span className="text-xs font-black text-white tracking-widest">AWS BEDROCK</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
