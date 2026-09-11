"use client";

import { motion } from "framer-motion";
import {
    Brain,
    Cpu,
    Database,
    Globe,
    Mic,
    Shield,
    TrendingUp,
    Users,
    ArrowRight,
    BarChart3
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PremiumCard } from "@/components/ui/PremiumCard";
import TechStackShowcase from "@/components/services/TechStackShowcase";
import TestimonialCarousel from "@/components/services/TestimonialCarousel";

const services = [
    {
        icon: Brain,
        title: "AI Agents & Automation",
        description: "Autonomous AI agents that replace manual operations with intelligent, self-operating system logic.",
        features: [
            "Agentic Workflows",
            "Operation-First Design",
            "Autonomous Capture",
            "Contextual Reasoning",
            "System-wide Integration"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Mic,
        title: "AI Voice Call Agents",
        description: "Human-like AI voice systems (Vapi/Retell) for inbound & outbound appointment booking.",
        features: [
            "Ultra-low Latency Sync",
            "Contextual Booking Logic",
            "Bilingual Support",
            "CRM Data Pipeline",
            "Calendar Integration"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Database,
        title: "Big Data & Cloud Engineering",
        description: "Architecting high-performance cloud ecosystems and big data pipelines for enterprise precision.",
        features: [
            "Data Warehousing",
            "Managed Infrastructure",
            "Performance Clusters",
            "ETL Pipeline Design",
            "Query Optimization"
        ],
        link: "/solutions/cloud-infrastructure",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Cpu,
        title: "AI Chatbots (Sales & Support)",
        description: "Intelligent engines that capture leads and facilitate complex support 24/7 without friction.",
        features: [
            "Lead Gen Engines",
            "Support Intelligence",
            "CRM Data Sync",
            "Multi-channel Deployment",
            "Analytics Readout"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Globe,
        title: "Full Stack SaaS Platforms",
        description: "End-to-end web applications and SaaS architectures built with Next.js 15+ for high performance.",
        features: [
            "Type-safe Architecture",
            "Micro-frontend Ready",
            "Enterprise Security",
            "Real-time Data Fetching",
            "Scalable Auth Systems"
        ],
        link: "/solutions/enterprise-software",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: TrendingUp,
        title: "Lead Generation AI Systems",
        description: "Automated engines designed to capture, track, and qualify high-intent leads across ecosystems.",
        features: [
            "Targeted Capture Logic",
            "Automated Scoring",
            "Lead Nurture Flow",
            "Multi-source Tracking",
            "Conversion Optimization"
        ],
        link: "#",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: BarChart3,
        title: "Dynamic Dashboard Creation",
        description: "Enterprise-grade visualization systems that provide real-time visibility into high-velocity operations.",
        features: [
            "Real-time HUD Design",
            "Cross-platform Sync",
            "Custom Metric Tracking",
            "Interactive Data Nodes",
            "Executive Reports"
        ],
        link: "/solutions/enterprise-software",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Database,
        title: "Data Engineering & Analytics",
        description: "Architecting the pipelines that power modern intelligence. Scalable, secure, and performant.",
        features: [
            "ETL Pipeline Mastery",
            "Warehouse Architecture",
            "Stream Processing",
            "Data Quality Audits",
            "Predictive Analytics"
        ],
        link: "/solutions/cloud-infrastructure",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Shield,
        title: "Custom DB & Infrastructure",
        description: "Industrial-grade database design and cloud management focused on long-term scalability.",
        features: [
            "Schema Architecture",
            "Redundancy Protocols",
            "Managed Maintenance",
            "Security Hardening",
            "Automated Backups"
        ],
        link: "/solutions/cloud-infrastructure",
        gradient: "from-white/10 to-transparent"
    }
];

const process = [
    {
        step: "01",
        title: "Discovery",
        description: "We analyze your business needs and define project scope"
    },
    {
        step: "02",
        title: "Strategy",
        description: "Develop a comprehensive roadmap and technical architecture"
    },
    {
        step: "03",
        title: "Development",
        description: "Build your solution with agile methodology and best practices"
    },
    {
        step: "04",
        title: "Deployment",
        description: "Launch with confidence and provide ongoing support"
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <Navbar />

            {/* --- Industrial Hero Section --- */}
            <section className="relative pt-44 pb-32 overflow-hidden institutional-grid">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-md"
                        >
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--foreground) / 0.6)]" />
                            <span className="text-meta">Service_Catalog // v4.2</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="fluid-h1"
                        >
                            ENGINEERED <br /> <span className="opacity-40">SERVICES.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-4xl border-t border-border pt-12"
                        >
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground/40 font-heading tracking-tight leading-[1.1] md:leading-[1] uppercase text-center max-w-4xl">
                                ARCHITECTING THE NEXT GENERATION OF <span className="text-foreground">ENTERPRISE INTELLIGENCE</span> THROUGH PRECISION ENGINEERING.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-spacing bg-transparent relative">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
                        {services.map((service, index) => (
                            <PremiumCard
                                key={service.title}
                                {...service}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Technical Infrastructure Section --- */}
            <TechStackShowcase />

            {/* --- Process Section --- */}
            <section className="py-32 bg-background border-t border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-32"
                    >
                        <h2 className="fluid-h2 mb-4">
                            PROCESS.
                        </h2>
                        <span className="text-meta">The engineering workflow</span>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
                        {process.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="space-y-6">
                                    <span className="text-5xl font-black text-foreground/5 group-hover:text-foreground/20 transition-colors leading-none">{item.step}</span>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-foreground">{item.title}</h3>
                                    <p className="text-foreground/40 text-sm font-medium leading-relaxed uppercase tracking-tight">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Global Validation Section --- */}
            <TestimonialCarousel />

            {/* --- Managed Subscription Section --- */}
            <section className="py-24 border-t border-border bg-foreground text-background">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center max-w-screen-2xl mx-auto">
                        <div className="space-y-12">
                            <span className="text-meta opacity-40">Business_Model // Managed</span>
                            <h2 className="fluid-h2 text-background">
                                WE DON'T JUST DELIVER. <br /> <span className="opacity-40">WE OPTIMIZE.</span>
                            </h2>
                            <p className="text-lg md:text-xl font-black uppercase tracking-tight max-w-xl text-background/40">
                                Our clients subscribe to long-term reliability. We manage hosting, databases, AI maintenance, and security so you can focus on growth.
                            </p>
                            <div className="grid grid-cols-2 gap-6 text-meta opacity-60">
                                <div className="text-background">✔ NO TECHNICAL HEADACHES</div>
                                <div className="text-background">✔ NO DOWNTIME RISKS</div>
                                <div className="text-background">✔ NO UNMANAGED BILLS</div>
                                <div className="text-background">✔ NO SYSTEM FAILURES</div>
                            </div>
                        </div>

                        <div className="p-12 rounded-[3.5rem] bg-background text-foreground space-y-8 relative overflow-hidden group border border-border">
                            <div className="absolute inset-0 z-0 opacity-10 bg-[url('/grid.svg')] bg-[length:40px_40px]" />
                            <div className="relative z-10 space-y-8">
                                <h3 className="text-xl lg:text-3xl font-black uppercase tracking-tight text-foreground">THE ELITE SUBSCRIPTION</h3>
                                <div className="space-y-4">
                                    {[
                                        "Monthly AI Maintenance & Optimization",
                                        "Automated Scale & Load Balancing",
                                        "24/7 Priority Support Node",
                                        "Recurring Security Audits"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 bg-foreground rounded-full group-hover:scale-150 transition-transform" />
                                            <span className="text-xs font-black uppercase tracking-widest text-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact">
                                    <button className="btn-institutional group w-full">
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            INITIATE_ONBOARDING
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-transparent text-center">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto space-y-12"
                    >
                        <h2 className="fluid-h2 mb-12">
                            BECOME THE <br /> <span className="opacity-40">STANDARD.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact">
                                <button className="btn-institutional group">
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        START_PROJECT
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </button>
                            </Link>
                            <Link href="/shop">
                                <button className="btn-outline-institutional group">
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        BROWSE_ARCHITECTURES
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
