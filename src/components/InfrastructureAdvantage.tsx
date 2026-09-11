"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const advantages = [
    "Managed cloud hosting",
    "Optimized database architecture",
    "Query indexing & performance tuning",
    "Automated backups",
    "Security patches",
    "Infrastructure monitoring",
    "Monthly maintenance & support"
];

const risks = [
    "Downtime & latency",
    "Security vulnerabilities",
    "Misconfigured servers",
    "No dedicated monitoring"
];

export default function InfrastructureAdvantage() {
    return (
        <section className="relative section-spacing overflow-hidden bg-transparent">
            <div className="container-standard">
                {/* Header Band */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 mb-16 lg:mb-24 border-b border-border pb-10 text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start max-w-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                            <span className="text-meta">Infrastructure // ELITE_MANAGED</span>
                        </div>
                        <h2 className="fluid-h2">
                            THE INFRASTRUCTURE <br className="hidden md:block" /> <span className="text-foreground/40">ADVANTAGE.</span>
                        </h2>
                    </div>
                    <div className="hidden md:block text-right font-mono text-[9px] text-foreground/40 uppercase tracking-[0.4em] leading-relaxed font-black">
                        Uptime: 99.99% <br />
                        Response: &lt;10ms <br />
                        Protocol: msa-infra-v1
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
                    {/* Left side: Lifecycle & Advantages */}
                    <div className="space-y-12">
                        <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono font-black uppercase tracking-[0.4em] text-foreground/20">
                            <span className="text-foreground/60">Build</span>
                            <span className="text-foreground/10">→</span>
                            <span className="text-foreground/60">Deploy</span>
                            <span className="text-foreground/10">→</span>
                            <span className="text-foreground/60">Monitor</span>
                            <span className="text-foreground/10">→</span>
                            <span className="text-foreground/60">Optimize</span>
                            <span className="text-foreground/10">→</span>
                            <span className="text-foreground/60">Maintain</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5 border border-border rounded-2xl overflow-hidden">
                             {advantages.map((adv) => (
                                <div
                                    key={adv}
                                    className="flex items-center gap-4 p-6 bg-foreground/[0.02] backdrop-blur-sm group hover:bg-foreground/[0.05] transition-all relative"
                                >
                                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-border group-hover:border-white/30 transition-colors" />
                                    <div className="w-8 h-8 rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-foreground/40 group-hover:bg-foreground group-hover:text-background transition-all">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px] font-black text-foreground/40 group-hover:text-foreground transition-colors uppercase tracking-[0.1em]">{adv}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Risks & Conclusion */}
                    <div className="p-12 rounded-[3.5rem] bg-foreground/[0.02] border border-border backdrop-blur-xl relative flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

                        <div className="space-y-8 relative z-10">
                            <div className="text-[9px] font-mono font-bold text-foreground/20 border-b border-border pb-4 tracking-[0.5em] uppercase text-center">UNMANAGED_RISK_REPORT</div>
                            <div className="space-y-4">
                                {risks.map((risk) => (
                                    <div key={risk} className="flex items-center gap-4 opacity-30 group hover:opacity-100 transition-opacity">
                                        <div className="w-1.5 h-1.5 border border-white/40 rounded-full" />
                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] line-through group-hover:no-underline transition-all">{risk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-16 space-y-8 relative z-10">
                            <p className="text-foreground/40 text-[13px] leading-relaxed font-medium uppercase tracking-widest text-center">
                                hosting without expertise leads to vulnerabilities, high latency, and mission-critical failure.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="p-8 rounded-2xl bg-foreground text-background font-black uppercase tracking-[-0.05em] text-lg text-center shadow-[0_0_50px_hsl(var(--foreground)/0.1)]"
                            >
                                WE BECOME YOUR LONG-TERM <br /> AI SYSTEMS PARTNER.
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
