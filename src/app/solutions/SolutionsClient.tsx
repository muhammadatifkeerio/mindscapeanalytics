"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PremiumCard } from "@/components/ui/PremiumCard";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    Brain,
    Database,
    Globe,
    Shield,
    ArrowRight,
    Zap,
    Cpu,
    Network
} from "lucide-react";

const solutions = [
    {
        icon: Brain,
        title: "Intelligent AI Ecosystems",
        description: "Autonomous agentic workflows and LLM clusters designed for complex enterprise reasoning and decision support.",
        features: [
            "Custom LLM Fine-tuning",
            "Agentic Workflow Engineering",
            "RAG Infrastructure",
            "Semantic Multi-node Search"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-foreground/10 to-transparent"
    },
    {
        icon: Database,
        title: "Industrial Data Engineering",
        description: "Architecting high-velocity data pipelines and warehousing solutions for real-time industrial intelligence.",
        features: [
            "ETL Pipeline Engineering",
            "Big Data Orchestration",
            "Warehouse Modernization",
            "Predictive Modeling Nodes"
        ],
        link: "/shop?category=Datasets",
        gradient: "from-foreground/10 to-transparent",
        id: "data-engineering"
    },
    {
        icon: Globe,
        title: "Market Insight Visualizers",
        description: "High-fidelity, real-time visualization systems that translate raw data into actionable enterprise foresight.",
        features: [
            "Real-time Stream Sync",
            "Custom Component HUDs",
            "Interactive Trend Analysis",
            "Multi-source Aggregation"
        ],
        link: "/solutions/enterprise-software",
        gradient: "from-foreground/10 to-transparent",
        id: "dashboards"
    },
    {
        icon: Shield,
        title: "Managed Operation Units",
        description: "Perpetual system maintenance, military-grade monitoring, and continuous AI model optimization.",
        features: [
            "24/7 Performance Sync",
            "Automated Security Patching",
            "Database Health Monitoring",
            "Recurring Model Optimization"
        ],
        link: "/services",
        gradient: "from-foreground/10 to-transparent"
    }
];

export default function SolutionsClient() {
    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <Navbar />

            {/* --- Industrial Hero Section --- */}
            <section className="relative pt-44 pb-24 overflow-hidden institutional-grid">
                <div className="container-standard relative z-10 text-center space-y-12 px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-md mx-auto"
                    >
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--foreground)/0.6)]" />
                        <span className="text-meta">Solutions Architecture // v4.2</span>
                    </motion.div>

                    <div className="relative">
                        <h1 className="fluid-h1">
                            SYSTEM <span className="text-foreground/20">SOLUTIONS.</span>
                        </h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl border-t border-border pt-12 mx-auto"
                    >
                        <p className="fluid-body max-w-4xl mx-auto opacity-60">
                            PRECISION-ENGINEERED FOUNDATIONS FOR THE NEXT GENERATION OF <span className="text-foreground font-black">ENTERPRISE INTELLIGENCE.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="pb-32 bg-transparent relative">
                <div className="container-standard relative z-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                        {solutions.map((solution, index) => (
                            <PremiumCard
                                key={solution.title}
                                {...solution}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Managed Theme-Aware CTA Section --- */}
            <section className="relative py-32 overflow-hidden border-t border-border institutional-grid">
                <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                <div className="container-standard relative z-10 px-6">
                    <div className="bg-foreground/[0.03] border border-border backdrop-blur-2xl rounded-[3rem] p-12 lg:p-20 overflow-hidden relative group surface-frost shadow-2xl">
                        {/* Decorative HUD items */}
                        <div className="absolute top-8 left-8 flex gap-2 opacity-20">
                            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-foreground rounded-full" />)}
                        </div>
                        <div className="absolute bottom-8 right-8 text-[8px] font-mono font-black text-foreground/10 tracking-[0.5em] uppercase">
                            DEPLOYMENT_READY_PROTOCOL_1.0
                        </div>

                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
                            <div className="space-y-6 max-w-2xl">
                                <span className="inline-block text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-4">Operational Status: Nominal</span>
                                <h2 className="fluid-h2">
                                    INITIATE_FULL<br />
                                    <span className="text-foreground/20">DEPLOYMENT.</span>
                                </h2>
                                <p className="text-sm sm:text-base md:text-lg font-medium text-muted-foreground uppercase tracking-tight max-w-xl mx-auto lg:mx-0">
                                    All architectures are optimized for subscription-based reliability and hyper-scaled infrastructure maintenance.
                                </p>
                            </div>

                            <Link href="/services" className="group/btn relative">
                                <button className="btn-institutional group px-12 py-8 bg-primary text-primary-foreground font-black uppercase text-[11px] tracking-[0.4em] rounded-2xl flex items-center gap-4 border border-primary-foreground/10">
                                    <Zap size={14} className="fill-current" />
                                    EXPLORE_MANAGED_MODELS
                                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <div className="absolute -inset-4 bg-foreground/5 blur-2xl rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
