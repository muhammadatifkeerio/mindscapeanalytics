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
    ArrowRight,
    BarChart3
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PremiumCard } from "@/components/ui/PremiumCard";
import TechStackShowcase from "@/components/services/TechStackShowcase";

const services = [
    {
        icon: Brain,
        title: "AI Agents & Automation",
        description: "AI-assisted workflows for research, inquiry triage, content preparation, and repeatable tasks, with review points for sensitive actions.",
        features: [
            "Agentic Workflows",
            "Operation-First Design",
            "Human Review Points",
            "Context-Aware Responses",
            "System-wide Integration"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Mic,
        title: "AI Voice Receptionist & Calling",
        description: "Answer business inquiries, qualify interest, coordinate appointments, and hand conversations to your team through scoped voice workflows.",
        features: [
            "Inbound Reception and FAQs",
            "Scheduling and Handoff Rules",
            "Configured Language Support",
            "CRM Data Pipeline",
            "Calendar Integration"
        ],
        link: "/services/ai-voice-receptionist",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Database,
        title: "AWS Architecture, Cost Optimization & Deployment",
        description: "Design and deploy AWS infrastructure for web and AI applications, with workload sizing, cost reviews, monitoring, and repeatable releases.",
        features: [
            "Data Warehousing",
            "Managed Infrastructure",
            "AWS Cost Optimization",
            "ETL Pipeline Design",
            "Query Optimization"
        ],
        link: "/solutions/cloud-infrastructure",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Cpu,
        title: "AI Chatbots (Sales & Support)",
        description: "Conversational support that answers approved questions, collects inquiry details, and routes requests to the right person or workflow.",
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
        title: "Web & SaaS Application Development",
        description: "Complete web applications, SaaS platforms, and AI-enabled software: product discovery, UI/UX design, APIs, databases, deployment, and ongoing support.",
        features: [
            "Type-safe Architecture",
            "Micro-frontend Ready",
            "Security-Conscious Design",
            "Real-time Data Fetching",
            "Scalable Auth Systems"
        ],
        link: "/solutions/enterprise-software",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Globe,
        title: "UI/UX Design",
        description: "Plan and design responsive web applications with clear user journeys, accessible interfaces, practical prototypes, and implementation-ready product screens.",
        features: ["User Journey Mapping", "Responsive Web Design", "Accessible Interfaces", "Product Prototypes", "Design to Development"],
        link: "/solutions/enterprise-software#ui-ux-design",
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
        link: "/contact",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: BarChart3,
        title: "Business Intelligence & Operations Dashboards",
        description: "Dashboards that make agreed business metrics, source data, refresh rules, and operational exceptions clear to the people who use them.",
        features: [
            "Metric Definitions",
            "Approved Data Connections",
            "Role-Specific Views",
            "Exception Monitoring",
            "Executive Reporting"
        ],
        link: "/solutions/enterprise-software",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: BarChart3,
        title: "E-Commerce Profit & Inventory Intelligence",
        description: "Connect product economics, returns, fulfillment, marketing spend, stock movement, and operating workflows in a decision-ready reporting system.",
        features: ["Contribution-Margin Definitions", "Blended Marketing Efficiency", "Inventory Runway", "Finance and Operations", "Multilingual Workflows"],
        link: "/ecommerce",
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

// SOURCE OF TRUTH KEYWORDS: China sourcing, service catalog, factory coordination, production, supplier validation
services.push({
    icon: Globe,
    title: "China Direct Factory Sourcing",
    description: "Connect your product requirements with China factories. Coordinate supplier fit, samples, validation, production handoff, and delivery planning with our team.",
    features: ["Product Requirements", "Factory Matching", "Sample Coordination", "Production Handoff", "Delivery Coordination"],
    link: "/services/china-sourcing",
    gradient: "from-white/10 to-transparent"
});

// SOURCE OF TRUTH KEYWORDS: foreign trade automation, export sales CRM, distributor growth, RFQ workflow, multilingual follow-up, service catalog
services.push({
    icon: TrendingUp,
    title: "Foreign Trade Sales & Growth Automation",
    description: "Connect export inquiries, multilingual follow-up, RFQs, quotations, distributor development, CRM, and performance reporting in one commercial workflow.",
    features: ["Inquiry Qualification", "Multilingual Follow-up", "RFQ & Quotation Workflow", "Distributor Pipeline", "Sales Reporting"],
    link: "/services/foreign-trade-automation",
    gradient: "from-white/10 to-transparent"
});

// SOURCE OF TRUTH KEYWORDS: China go global, Chuhai service, AI sales agents, global infrastructure, English B2B, Chinese founders
services.push({
    icon: Globe,
    title: "China Go-Global AI GTM",
    description: "For Beijing and Tianjin technology and hardware teams: English B2B market entry, AI voice and sales agents, global web infrastructure, and billing integration.",
    features: ["English B2B Positioning", "Vapi or Retell Agents", "Next.js Global Web", "Stripe Integration", "CRM & Lead Workflows"],
    link: "/zh/go-global",
    gradient: "from-white/10 to-transparent"
});

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
                            APPLICATION &amp; AI <br /> <span className="opacity-40">SERVICES.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-4xl border-t border-border pt-12"
                        >
                            <p className="text-xl md:text-2xl lg:text-3xl font-black text-foreground/40 font-heading tracking-tight leading-[1.1] md:leading-[1] uppercase text-center max-w-4xl">
                                E-commerce intelligence, web application development, AI workflows, AWS architecture, foreign-trade automation, and China factory sourcing. From a specific operating question to a scoped system.
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

            {/* Reviews are intentionally omitted until the client-approved source material is supplied. */}
            <section className="border-t border-border bg-muted/35 py-16 md:py-20">
                <div className="container-standard flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-brand">Selected work</p>
                        <h2 className="mt-2 max-w-xl text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">See how strategy becomes a working system.</h2>
                    </div>
                    <Link href="/projects" className="msa-text-link">Explore our projects <ArrowRight className="h-4 w-4" /></Link>
                </div>
            </section>

            {/* --- Managed Subscription Section --- */}
            <section className="py-24 border-t border-border bg-muted/40 text-foreground">
                <div className="container-standard">
                    <div className="grid lg:grid-cols-2 gap-20 items-center max-w-screen-2xl mx-auto">
                        <div className="space-y-12">
                            <span className="text-meta opacity-40">Business_Model // Managed</span>
                            <h2 className="fluid-h2 text-foreground">
                                WE DON&apos;T JUST DELIVER. <br /> <span className="text-muted-foreground">WE OPTIMIZE.</span>
                            </h2>
                            <p className="text-lg md:text-xl font-black uppercase tracking-tight max-w-xl text-muted-foreground">
                                Ongoing support can be scoped to your system, including infrastructure monitoring, database maintenance, AI workflow updates, and security reviews. Coverage and response windows are agreed in writing.
                            </p>
                            <div className="grid grid-cols-2 gap-6 text-meta text-muted-foreground">
                                <div>✔ MANAGED TECHNICAL OPERATIONS</div>
                                <div>✔ RELIABILITY PRACTICES</div>
                                <div>✔ COST VISIBILITY</div>
                                <div>✔ CONTINUOUS IMPROVEMENT</div>
                            </div>
                        </div>

                        <div className="p-12 rounded-[3.5rem] bg-background text-foreground space-y-8 relative overflow-hidden group border border-border">
                            <div className="absolute inset-0 z-0 opacity-10 bg-[url('/grid.svg')] bg-[length:40px_40px]" />
                            <div className="relative z-10 space-y-8">
                                <h3 className="text-xl lg:text-3xl font-black uppercase tracking-tight text-foreground">MANAGED SUPPORT, SCOPED TO YOUR SYSTEM</h3>
                                <div className="space-y-4">
                                    {[
                                        "AI, database, and integration maintenance",
                                        "Capacity planning based on measured workloads",
                                        "Agreed monitoring and response windows",
                                        "Scheduled security reviews within scope"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 bg-foreground rounded-full group-hover:scale-150 transition-transform" />
                                            <span className="text-xs font-black uppercase tracking-widest text-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            <Link href="/contact" className="btn-institutional group w-full">
                                <span className="relative z-10 flex items-center justify-center gap-4">Discuss managed support<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" /></span>
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
                            <Link href="/contact" className="btn-institutional group"><span className="relative z-10 flex items-center justify-center gap-4">START_PROJECT<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" /></span></Link>
                            <Link href="/shop" className="btn-outline-institutional group"><span className="relative z-10 flex items-center justify-center gap-4">BROWSE_ARCHITECTURES<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" /></span></Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
