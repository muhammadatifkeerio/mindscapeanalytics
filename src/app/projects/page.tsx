"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    ExternalLink,
    Terminal,
    Database,
    Cloud,
    Server,
    Zap,
    Mic,
    Bot,
    ArrowRight,
    Shield,
    Activity,
    Layers,
    Code,
    ChevronLeft,
    ChevronRight,
    Boxes,
    Factory,
    Landmark,
    LineChart
} from "lucide-react"

const projects = [
    {
        title: "Global Enterprise ERP Architecture",
        category: "Enterprise Infrastructure",
        industry: "Multinational Conglomerate",
        description: "A centralized, intelligent ERP system engineered to break down data silos across global operations. Features real-time supply chain visibility, LLM-powered financial forecasting, and autonomous procurement workflows.",
        features: [
            "Autonomous resource planning",
            "Multi-currency financial forecasting",
            "Real-time global inventory sync",
            "Cross-border compliance tracking",
            "Predictive maintenance scheduling",
            "AI-assisted executive dashboards"
        ],
        techStack: ["PostgreSQL Cluster", "n8n Automation", "Custom LLM Agents", "Cloud Load Balancing", "Zero-Trust Security"],
        results: [
            "Reduced operational costs by 40%",
            "Accelerated quarterly closing by 14 days",
            "Achieved 99.999% system uptime"
        ],
        icon: Server,
        link: "/projects/global-enterprise-erp"
    },
    {
        title: "Automated Inventory & Logistics System",
        category: "Supply Chain Intelligence",
        industry: "E-Commerce & Retail",
        description: "Self-healing inventory networks utilizing predictive analytics and IoT telemetry. The system accurately forecasts demand spikes, executes autonomous reordering, and routes logistics dynamically.",
        features: [
            "Predictive demand forecasting",
            "Autonomous vendor reordering",
            "Dynamic logistics routing",
            "IoT warehouse telemetry",
            "Real-time spoilage tracking",
            "Automated audit trails"
        ],
        techStack: ["Edge Compute IoT", "Redis Caching", "GraphQL API", "AWS Lambda", "MongoDB"],
        results: [
            "Eliminated stockouts completely (Zero Stockouts)",
            "Maintained 99.9% fulfillment accuracy",
            "Reduced warehouse holding costs by 22%"
        ],
        icon: Boxes,
        link: "/projects/automated-inventory-system"
    },
    {
        title: "Production & ESG Disposal Intelligence",
        category: "Manufacturing Technology",
        industry: "Industrial Manufacturing",
        description: "An AI-governed production lifecycle system. It monitors manufacturing telemetry in real-time to optimize yield, while autonomously tracking and routing industrial byproducts for perfect environmental compliance.",
        features: [
            "Real-time yield optimization",
            "Automated byproduct routing",
            "Continuous ESG compliance tracking",
            "Carbon footprint logging",
            "Predictive equipment failure alerts",
            "Automated regulatory reporting"
        ],
        techStack: ["Time-Series DB", "Industrial IoT Sensors", "Kubernetes Clustering", "ML Pipelines", "Blockchain Audit Trails"],
        results: [
            "Achieved 100% verifiable ESG compliance",
            "Reduced raw material waste by 31%",
            "Monetized 15% of hazardous byproducts"
        ],
        icon: Factory,
        link: "/projects/production-esg-intelligence"
    },
    {
        title: "DBlynx: Neural DB Intelligence",
        category: "Data Science & NLP",
        industry: "FinTech & SaaS",
        description: "A revolutionary semantic search architecture that allows non-technical executives to chat with massive relational databases in plain English. Translates natural language into complex, optimized SQL queries instantaneously.",
        features: [
            "Natural Language to SQL translation",
            "Sub-second query resolution",
            "Context-aware data visualization",
            "Automatic query optimization",
            "Role-based data access controls",
            "Conversational data exploration"
        ],
        techStack: ["Vector Databases", "OpenAI Embeddings", "PostgreSQL", "React Server Components", "Vercel Edge"],
        results: [
            "Democratized data access universally",
            "Eliminated 80% of ad-hoc data requests",
            "Accelerated decision-making speed by 10x"
        ],
        icon: Terminal,
        link: "/projects/dblynx-neural-intelligence"
    },
    {
        title: "AI Sales & Lead Qualification Agent",
        category: "AI Automation / Sales Intelligence",
        industry: "B2B Services",
        description: "A fully autonomous AI Sales Agent that works as a 24/7 virtual sales team, reducing manual pipeline management.",
        features: [
            "Captures inbound leads",
            "Qualifies prospects via AI conversation",
            "Books appointments automatically",
            "Sends follow-up emails",
            "Updates CRM in real-time",
            "Filters unqualified leads"
        ],
        techStack: ["LLM Integration", "n8n Automation Engine", "Custom API Integrations", "Cloud Backend", "Managed Database"],
        results: [
            "Reduced manual sales effort by 70%",
            "Increased response speed by 5x",
            "Improved lead conversion rates"
        ],
        icon: Bot,
        link: "/projects/ai-sales-agent"
    },
    {
        title: "AI Voice Call Appointment Booking System",
        category: "AI Voice Automation",
        industry: "Healthcare & Services",
        description: "Built an AI-powered voice agent capable of handling inbound and outbound calls, booking appointments, and answering FAQs naturally.",
        features: [
            "Natural human-like voice conversations",
            "Calendar routing and booking",
            "Automated SMS/email confirmations",
            "CRM syncing",
            "Objection handling",
            "Call analytics dashboard"
        ],
        techStack: ["Secure Voice APIs", "Managed database", "Real-time monitoring", "Monthly maintenance SLA"],
        results: [
            "Eliminated manual booking staff overhead",
            "24/7 autonomous availability",
            "Reduced missed calls to near zero"
        ],
        icon: Mic,
        link: "/contact"
    },
    {
        title: "Custom SaaS Platform with Managed Infrastructure",
        category: "Full Stack SaaS Development",
        industry: "Tech Startup",
        description: "Developed a scalable SaaS web platform with integrated AI features, secure user authentication, and high-availability endpoints.",
        features: [
            "Multi-role RBAC authentication",
            "Subscription subscription billing",
            "Real-time streaming dashboards",
            "AI-powered data insights",
            "Tenant-isolated admin analytics",
            "API-first architecture"
        ],
        techStack: ["Managed cloud hosting", "Database indexing & optimization", "Auto backups", "Security edge monitoring", "Performance reporting"],
        results: [
            "Full infrastructure ownership",
            "Ensured 99.9% application uptime",
            "Sub-100ms API peak performance"
        ],
        icon: Cloud,
        link: "/contact"
    },
    {
        title: "AI Workflow Automation for Lead Generation",
        category: "Automation Systems",
        industry: "Digital Marketing",
        description: "Engineered an automated lead generation network that scrapes, filters, verifies, and engages potential B2B clients concurrently.",
        features: [
            "Continuous lead data collection",
            "Multi-node email validation",
            "AI personalized outbound generation",
            "Automated cadence sequences",
            "Smart follow-up logic",
            "Bi-directional CRM integration"
        ],
        techStack: ["Serverless Scrapers", "Third-party APIs", "Distributed Workflows", "Message Queues", "Analytics Engine"],
        results: [
            "Fully automated outbound sales pipeline",
            "Scaled monthly lead volume by 300%",
            "Reduced operational cost by $20k+/mo"
        ],
        icon: Zap,
        link: "/contact"
    },
    {
        title: "Managed Database & Hosting Architecture",
        category: "Infrastructure & Cloud Engineering",
        industry: "Enterprise Services",
        description: "Enterprise-grade managed infrastructure ensuring zero configuration risk, ironclad security perimeters, and continuous optimization.",
        features: [
            "Highly available PostgreSQL clusters",
            "Automated slow-query optimization",
            "Multi-region data indexing",
            "Zero-trust secure authentication",
            "Continuous automated backups",
            "Intelligent L7 load balancing"
        ],
        techStack: ["PostgreSQL", "Redis", "Cloud Load Balancers", "Docker/Kubernetes", "Strict Security Protocols"],
        results: [
            "Absolute zero configuration risk",
            "24/7 active infrastructure monitoring",
            "Continuous auto-scaling optimization"
        ],
        icon: Database,
        link: "/contact"
    },
    {
        title: "DBLynx: Autonomous Banking Intelligence",
        category: "Database AI Agent",
        industry: "Banking & Financial Services",
        description: "Deployed an AI-powered database intelligence system for a regional bank, enabling 95% faster analytics and automated real-time fraud detection on a $36.8M loan portfolio.",
        features: [
            "Natural Language SQL Queries",
            "AI Anomaly Detection",
            "Automated Analytics Dashboards",
            "SOC-2 Read-Only Security"
        ],
        techStack: ["DBLynx Core", "PostgreSQL", "Next.js", "Vector Embeddings"],
        results: [
            "95% Faster Analytics",
            "Identified 153 anomalous transactions",
            "$45K estimated annual savings"
        ],
        icon: Landmark,
        link: "/projects/dblynx-regional-bank"
    },
    {
        title: "Fuel Station Management System",
        category: "Energy & Infrastructure ERP",
        industry: "Oil & Gas Retail",
        description: "A mission-critical ERP for fuel station networks featuring automated pump synchronization, hazardous material tracking, and real-time enterprise accounting across multiple locations.",
        features: [
            "Automated Pump Synchronization",
            "Real-Time Inventory & Leak Detection",
            "Hazardous Material Compliance",
            "Enterprise-Grade Accounting"
        ],
        techStack: ["Industrial IoT Sensors", "PostgreSQL", "Next.js", "Strict Security SLA"],
        results: [
            "100% Inventory Accuracy",
            "Zero Safety Compliance Breaches",
            "Real-Time Multi-Site Visibility"
        ],
        icon: Factory,
        link: "/projects/fuel-station-erp"
    }
];

const deliveryPhases = [
    { title: "Strategy & Architecture Design", icon: Layers },
    { title: "AI & System Development", icon: Code },
    { title: "Cloud Deployment & Optimization", icon: Cloud },
    { title: "Managed Database Integration", icon: Database },
    { title: "Ongoing Monitoring & Maintenance", icon: Activity }
];

export default function ProjectsPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                const scrollAmount = container.clientWidth * 0.8;

                // If we've reached near the end, scroll back to start
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 100) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 5000); // 5 second auto delay

        return () => clearInterval(interval);
    }, [isHovered]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8; // Scroll by most of the container width
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-foreground relative">
            <Navbar />

            {/* --- Hero Section --- */}
            <section className="relative pt-44 pb-16 overflow-hidden institutional-grid">
                <div className="container-standard relative z-10 text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-foreground/5 border border-border backdrop-blur-md mx-auto"
                    >
                        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse shadow-[0_0_8px_hsl(var(--foreground)/0.6)]" />
                        <span className="text-meta">Deployment_Logs // v5.1</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fluid-h1"
                    >
                        SYSTEM <span className="text-foreground/40">DEPLOYS.</span>
                    </motion.h1>
                </div>
            </section>

            {/* --- Projects Slider --- */}
            <section className="py-24 bg-transparent relative border-t border-border">
                <div className="container-standard mb-8 flex justify-between items-end">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground/40 font-heading tracking-tight leading-[1.1] md:leading-[1] uppercase text-center max-w-4xl">
                            REAL ENTERPRISE SYSTEMS. <br />
                            <span className="text-foreground">VERIFIED ROI & IMPACT.</span>
                        </p>
                    </div>
                    {/* Navigation Arrows */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="p-4 bg-foreground/5 border border-border rounded-full hover:bg-foreground/10 hover:border-foreground/20 transition-all text-foreground/60 hover:text-foreground"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-4 bg-foreground/5 border border-border rounded-full hover:bg-foreground/10 hover:border-foreground/20 transition-all text-foreground/60 hover:text-foreground"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    {/* Visual fade edges for larger screens */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 px-8 md:px-[calc((100vw-80rem)/2)] pb-12"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {projects.map((project, index) => (
                             <motion.div
                                key={project.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: 0.1 }}
                                className="w-[85vw] md:w-[80vw] lg:w-[1100px] max-w-[1200px] shrink-0 snap-center group relative p-8 lg:p-14 rounded-[3rem] bg-foreground/[0.02] border border-border hover:border-foreground/20 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between surface-frost"
                            >
                                <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-700 translate-x-1/4 -translate-y-1/4">
                                    <project.icon className="w-96 h-96" />
                                </div>

                                <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
                                    <div className="space-y-8 flex flex-col justify-center">
                                        <div className="space-y-4">
                                             <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-foreground/5 border border-border rounded-full text-meta opacity-60">
                                                    {project.category}
                                                </span>
                                                <span className="px-3 py-1 bg-foreground/5 border border-border rounded-full text-meta opacity-40">
                                                    Industry: {project.industry}
                                                </span>
                                            </div>
                                            <h2 className="fluid-h2 leading-none text-foreground break-words">{project.title}</h2>
                                            <p className="text-lg md:text-xl text-foreground/50 font-medium leading-relaxed max-w-2xl">
                                                {project.description}
                                            </p>
                                        </div>

                                         <div className="bg-foreground/[0.03] border border-border p-6 rounded-2xl space-y-4 mt-auto surface-frost">
                                            <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40 border-b border-border pb-2">Business Impact & Results</h3>
                                            <ul className="space-y-3">
                                                {project.results.map(res => (
                                                    <li key={res} className="flex items-start gap-3">
                                                        <Shield className="w-4 h-4 text-foreground/40 shrink-0 mt-0.5" />
                                                        <span className="text-sm font-bold uppercase tracking-wide text-foreground/90">{res}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                     <div className="space-y-10 flex flex-col justify-center bg-foreground/[0.01] p-8 rounded-3xl border border-border surface-frost">
                                        <div className="space-y-6">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-foreground/40 border-b border-border pb-4">System Architecture & Features</h3>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {project.features.map(feature => (
                                                    <div key={feature} className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                                                        <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-sm font-black uppercase tracking-widest text-foreground/40 border-b border-border pb-4">Infrastructure & Tech Stack</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map(tech => (
                                                    <span key={tech} className="px-3 py-1.5 bg-foreground/5 border border-border rounded-lg text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <Link href={project.link} className="inline-block mt-4">
                                            <button className="btn-institutional group w-full">
                                                <span className="relative z-10 flex items-center justify-center gap-4">
                                                    View Case Study
                                                    <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5-Phase Methodology Section --- */}
            <section className="section-spacing border-t border-border bg-background/40 backdrop-blur-3xl relative overflow-hidden institutional-grid">
                <div className="container-standard">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="text-center space-y-6">
                            <h2 className="fluid-h2">5-PHASE DELIVERY FRAMEWORK</h2>
                            <p className="text-lg text-foreground/40 font-medium uppercase tracking-widest max-w-2xl mx-auto">
                                We don't just deliver code and disappear. Every system we engineer follows a rigorous protocol from inception to perpetual maintenance.
                            </p>
                        </div>

                         <div className="grid lg:grid-cols-5 gap-4">
                            {deliveryPhases.map((phase, i) => (
                                <div key={phase.title} className="p-8 bg-foreground/[0.02] border border-border rounded-2xl relative group hover:bg-foreground/[0.05] transition-colors surface-frost">
                                    <div className="text-[10px] font-mono font-black text-foreground/20 uppercase tracking-[0.3em] mb-6">Phase_0{i + 1}</div>
                                    <phase.icon className="w-8 h-8 text-foreground/40 mb-6 group-hover:text-foreground transition-colors" />
                                    <h3 className="text-sm font-black uppercase tracking-wider leading-relaxed">{phase.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Managed Infrastructure Callout --- */}
            <section className="section-spacing border-t border-border bg-foreground text-background text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-30" />
                <div className="container-standard">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <span className="text-meta opacity-40">The Infrastructure Advantage</span>
                        <h2 className="fluid-h2">
                            AGENCIES HAND OVER RAW CODE. <br /> <span className="text-secondary">WE DELIVER MANAGED PERFORMANCE.</span>
                        </h2>
                        <p className="text-lg font-medium opacity-60 uppercase tracking-tighter max-w-2xl mx-auto">
                            All our deployed systems are backed by monthly infrastructure management, database optimization, and security monitoring to ensure long-term reliability and scalable growth.
                        </p>
                        <Link href="/pricing" className="inline-block pt-8">
                            <button className="btn-institutional group mx-auto">
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    View Pricing & SLAs
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
