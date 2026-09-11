"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Shield, Zap, Globe, Users, Bot, TrendingUp, Award } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
    const [display, setDisplay] = useState(`${prefix}0${suffix}`);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (v) => setDisplay(v));
        return () => unsubscribe();
    }, [rounded]);

    return (
        <motion.span
            onViewportEnter={() => {
                animate(count, target, { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] });
            }}
            viewport={{ once: true }}
        >
            {display}
        </motion.span>
    );
}

const stats = [
    { icon: Bot, value: 47, suffix: "+", label: "AI Agents Deployed", color: "text-emerald-400" },
    { icon: Zap, value: 2400000, suffix: "+", label: "Automations Executed", color: "text-amber-400" },
    { icon: Users, value: 35, suffix: "+", label: "Enterprise Clients", color: "text-blue-400" },
    { icon: TrendingUp, value: 340, suffix: "%", label: "Avg. Efficiency Gain", color: "text-purple-400" },
];

const partners = [
    { name: "MSA AGENT", logo: "◆ MSA AGENT" },
    { name: "Google Cloud", logo: "◇ Google Cloud" },
    { name: "OpenAI", logo: "◈ OpenAI" },
    { name: "n8n", logo: "⬡ n8n" },
    { name: "Vercel", logo: "▲ Vercel" },
    { name: "Stripe", logo: "◉ Stripe" },
    { name: "Vapi", logo: "◎ Vapi" },
    { name: "Neon", logo: "⊕ Neon" },
];

const testimonials = [
    {
        quote: "Mindscape's AI agents reduced our customer response time from 4 hours to under 30 seconds. The ROI was immediate.",
        name: "Sarah Chen",
        role: "VP Operations, FinServe Capital",
        metric: "98% faster response",
    },
    {
        quote: "Their voice automation system handles 2,000+ calls daily with zero human intervention. It's like having 50 extra employees.",
        name: "Marcus Reid",
        role: "CEO, TechScale Solutions",
        metric: "2,000 calls/day automated",
    },
    {
        quote: "The n8n workflow architecture they built saved us $180K annually in operational costs. Absolute game-changer.",
        name: "Priya Sharma",
        role: "CTO, DataBridge Analytics",
        metric: "$180K saved annually",
    },
];

export default function TrustSignals() {
    return (
        <section className="relative py-20 lg:py-32 bg-transparent overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--secondary) / 0.03),transparent_60%)] pointer-events-none" />

            <div className="container-standard relative z-10 space-y-20 lg:space-y-32">

                {/* 1. Partner/Technology Logos Strip */}
                <div className="space-y-8">
                    <div className="text-center">
                        <p className="text-[9px] font-mono font-black uppercase tracking-[0.5em] text-foreground/50">Powered By Industry-Leading Infrastructure</p>
                    </div>
                    <div className="relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
                        <motion.div
                            animate={{ x: [0, -1200] }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="flex gap-12 items-center w-max"
                        >
                            {[...partners, ...partners, ...partners].map((p, i) => (
                                <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border/30 bg-foreground/[0.02] whitespace-nowrap opacity-40 hover:opacity-80 transition-opacity">
                                    <span className="text-sm font-bold tracking-wider text-foreground/60">{p.logo}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* 2. Live Stats Counter */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-foreground/[0.02] border border-border/30 backdrop-blur-xl group hover:border-secondary/20 transition-all text-center"
                        >
                            <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-3 ${stat.color} opacity-50`} />
                            <div className="text-2xl lg:text-4xl font-black text-foreground tracking-tight mb-1">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-[9px] lg:text-[10px] font-mono font-black uppercase tracking-[0.3em] text-foreground/60">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* 3. Testimonials */}
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-foreground/[0.03] border border-border/30 mx-auto">
                            <Award className="w-3.5 h-3.5 text-secondary" />
                            <span className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-foreground/65">Client Results</span>
                        </div>
                        <h2 className="fluid-h2">
                            PROVEN <span className="opacity-30">IMPACT.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-foreground/[0.02] border border-border/30 backdrop-blur-xl space-y-5 group hover:border-secondary/10 transition-all"
                            >
                                <div className="px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 inline-block">
                                    <span className="text-[9px] font-mono font-black text-secondary tracking-wider">{t.metric}</span>
                                </div>
                                <p className="text-sm lg:text-base text-foreground/60 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                                <div className="pt-3 border-t border-border/30">
                                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                                    <p className="text-[10px] font-mono text-foreground/60 uppercase tracking-wider">{t.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4. Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                    {[
                        { icon: Shield, text: "SOC 2 Compliant" },
                        { icon: Globe, text: "GDPR Ready" },
                        { icon: Zap, text: "99.9% Uptime SLA" },
                        { icon: Users, text: "24/7 Architect Support" },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-foreground/[0.02] border border-border/30">
                            <badge.icon className="w-3.5 h-3.5 text-foreground/60" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">{badge.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
