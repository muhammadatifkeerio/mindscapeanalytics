"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, Brain, ArrowRight, Database, Lock, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pricingPlans = [
    {
        name: "AI Starter System",
        subtitle: "Best for small service businesses",
        price: "$4,800 – $8,500",
        setupFee: "Starting Investment",
        managedFee: "$297 – $497/mo",
        icon: Zap,
        description: "Foundational AI infrastructure to automate lead capture and basic CRM workflows.",
        features: [
            "AI Lead Capture Agent",
            "Basic Automation Workflow",
            "CRM Integration",
            "Cloud Deployment",
            "Managed Database (1 mo included)",
            "System Performance Monitoring"
        ],
        cta: "Initiate Deployment",
        highlight: false,
        managedNote: "Managed Infrastructure Plan Required After Month 1"
    },
    {
        name: "Growth Automation System",
        subtitle: "Best for scaling companies",
        price: "$12,000 – $25,000",
        setupFee: "Starting Investment",
        managedFee: "$750 – $1,500/mo",
        icon: Brain,
        description: "Comprehensive AI sales and operational systems built for high-growth global teams.",
        features: [
            "AI Sales Agent (Lead/Qualify/Book)",
            "AI Email Automation Engine",
            "Advanced CRM + API Integrations",
            "Performance Analytics Dashboard",
            "Managed Infrastructure Setup",
            "Security + Triple Backup System",
            "Priority Response Support"
        ],
        cta: "Scale Infrastructure",
        highlight: true,
        managedNote: "Includes Advanced Infrastructure Monitoring"
    },
    {
        name: "Enterprise AI Ecosystem",
        subtitle: "Custom built for Global Enterprise",
        price: "Custom",
        setupFee: "Architectural Pricing",
        managedFee: "$2,000+/mo",
        icon: Shield,
        description: "Full-scale autonomous ecosystems integrating multi-agent reasoning and voice AI.",
        features: [
            "Multi-agent AI Clusters",
            "AI Voice Integration (Vapi/Retell)",
            "Advanced Workflow Orchestration",
            "Scalable Cloud Cluster Architecture",
            "Database Clustering & Sharding",
            "Industrial Performance Engineering",
            "24/7 Dedicated Support Node"
        ],
        cta: "Request Consultation",
        highlight: false,
        managedNote: "Full Infrastructure SLA & Optimization"
    }
];

const faqs = [
    {
        q: "Why is a managed plan required?",
        a: "To ensure system reliability, security, and peak AI performance. All deployments are supported by our Managed Infrastructure Plan which covers hosting, security patches, and database health."
    },
    {
        q: "How long does deployment take?",
        a: "Starter systems are typically live within 14-21 days. Growth and Enterprise systems require deeper architectural planning, usually 4-8 weeks for initial deployment."
    },
    {
        q: "Do you offer custom integrations?",
        a: "Yes. Our systems are built to integrate with existing tech stacks, including custom CRMs, ERPs, and legacy database architectures."
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-transparent text-foreground relative">
            <Navbar />

            {/* --- Hero Section --- */}
            <section className="relative pt-44 pb-32 overflow-hidden institutional-grid">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-md"
                    >
                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--foreground)/0.6)]" />
                        <span className="text-meta">Investment_Protocol // v4.2</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fluid-h1"
                    >
                        SYSTEM <br /> <span className="opacity-20">INVESTMENT.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl border-t border-border pt-12 mx-auto"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground/40 font-heading tracking-tight leading-[1.1] md:leading-[1] uppercase text-center max-w-4xl">
                            PRECISION-ENGINEERED PRICING MODELS BUILT FOR <span className="text-foreground">OUTCOMES + INFRASTRUCTURE.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- Pricing Grid --- */}
            <section className="py-24 bg-transparent relative border-t border-border">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative p-6 xs:p-8 lg:p-10 rounded-[2.5rem] lg:rounded-[3rem] border transition-all duration-500 flex flex-col surface-frost ${plan.highlight
                                    ? "bg-foreground text-background border-foreground shadow-[0_0_80px_hsl(var(--foreground)/0.1)]"
                                    : "bg-foreground/[0.02] border-border hover:border-foreground/30 backdrop-blur-xl"
                                    }`}
                            >
                                <div className="mb-10 flex items-start justify-between">
                                    <div className={`p-4 rounded-xl ${plan.highlight ? "bg-background text-foreground" : "bg-foreground/5 border border-border"}`}>
                                        <plan.icon className="w-7 h-7" />
                                    </div>
                                    <div className={`text-meta ${plan.highlight ? "text-background/40" : "text-foreground/20"}`}>
                                        Tier_0{index + 1}
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className={`text-3xl font-black uppercase tracking-tight leading-none mb-2 ${plan.highlight ? "text-background" : "text-foreground"}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-meta ${plan.highlight ? "text-background/40" : "text-foreground/20"}`}>
                                        {plan.subtitle}
                                    </p>
                                </div>

                                <div className="mb-10">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black">{plan.price}</span>
                                    </div>
                                    <div className={`text-meta mt-1 ${plan.highlight ? "text-background/60" : "text-foreground/40"}`}>
                                        {plan.setupFee}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <Check className={`w-4 h-4 ${plan.highlight ? "text-background" : "text-foreground/40"}`} />
                                            <span className={`text-[11px] font-black uppercase tracking-wider ${plan.highlight ? "text-background/80" : "text-foreground/60"}`}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className={`pt-8 border-t mb-10 ${plan.highlight ? "border-background/10" : "border-border"}`}>
                                    <div className="flex items-center gap-3">
                                        <Database className="w-4 h-4 opacity-40" />
                                        <div className="flex flex-col">
                                            <span className="text-meta">{plan.managedFee}</span>
                                            <span className={`text-[8px] font-medium uppercase opacity-60`}>Managed Infrastructure Plan</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/contact" className="w-full">
                                    <button className={plan.highlight ? "btn-institutional group w-full" : "btn-outline-institutional group w-full"}>
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            {plan.cta}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                        </span>
                                    </button>
                                </Link>

                                <p className={`mt-6 text-[8px] font-mono text-center uppercase tracking-widest font-black leading-relaxed ${plan.highlight ? "text-background/40" : "text-foreground/20"}`}>
                                    {plan.managedNote}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Trust & Authority Section --- */}
            <section className="py-32 border-t border-border bg-transparent">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <span className="text-meta opacity-40">Authority // FAQ</span>
                                <h2 className="fluid-h2">
                                    SYSTEM <br /> <span className="text-foreground/40">INTEGRITY.</span>
                                </h2>
                                <p className="text-xl text-foreground/40 max-w-xl font-medium uppercase tracking-tight leading-relaxed">
                                    We don't sell software licenses. We sell engineered performance and long-term technical stability.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { icon: Lock, label: "Data Protection", value: "AES-256" },
                                    { icon: Clock, label: "System Uptime", value: "99.99%" },
                                    { icon: Shield, label: "Security Scale", value: "Industrial" },
                                    { icon: Zap, label: "Latency Goal", value: "< 10MS" }
                                ].map(item => (
                                    <div key={item.label} className="p-6 rounded-2xl bg-foreground/[0.02] border border-border">
                                        <item.icon className="w-6 h-6 text-foreground/20 mb-4" />
                                        <div className="text-2xl font-black uppercase tracking-tight">{item.value}</div>
                                        <div className="text-[9px] font-mono font-black text-foreground/20 uppercase tracking-[0.2em]">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-[2rem] bg-foreground/[0.02] border border-border group hover:border-foreground/20 transition-all surface-frost"
                                >
                                    <h4 className="text-lg font-black uppercase tracking-tight mb-4 flex items-start gap-4">
                                        <span className="text-foreground/20 font-mono text-[11px] pt-1.5">0{i + 1}</span>
                                        {faq.q}
                                    </h4>
                                    <p className="text-foreground/40 text-[13px] leading-relaxed font-medium ml-10">
                                        {faq.a}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Managed Infrastructure Callout --- */}
            <section className="py-24 border-t border-border bg-foreground text-background text-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <span className="text-background/40 text-[11px] font-mono font-black uppercase tracking-[0.5em]">System Reliability Standard</span>
                        <h2 className="fluid-h2 text-background">
                            MANAGED <br /> <span className="opacity-40">OR IT'S BROKEN.</span>
                        </h2>
                        <p className="text-lg font-medium opacity-60 uppercase tracking-tighter max-w-2xl mx-auto text-background">
                            To ensure system reliability and performance, all deployments are supported by our Managed Infrastructure Plan. This protects your revenue and eliminates technical debt.
                        </p>
                        <div className="pt-8 flex flex-wrap justify-center gap-4">
                            {["Uptime Monitoring", "Security Patching", "DB Health", "AI Tuning", "SLA Reports"].map(tag => (
                                <span key={tag} className="px-4 py-2 rounded-full border border-background/10 text-[9px] font-black uppercase tracking-widest text-background">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
