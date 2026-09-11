import { notFound } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
    Activity,
    ArrowRight,
    Cpu,
    Database,
    Network,
    Server,
    ShieldCheck,
    TrendingUp,
    Zap
} from 'lucide-react';

// Case Study Data Source (Normally from CMS or DB)
const caseStudies = {
    "global-enterprise-erp": {
        title: "Global Enterprise ERP Architecture",
        category: "Enterprise Infrastructure",
        industry: "Multinational Conglomerate",
        heroMetrics: {
            metric1: { value: "40%", label: "Operational Cost Reduction" },
            metric2: { value: "14x", label: "Faster Quarterly Closing" },
            metric3: { value: "99.999%", label: "System Uptime Guaranteed" }
        },
        problem: "The enterprise was operating on fragmented, legacy software silos across international regions. Data synchronization delays led to inaccurate financial forecasting, disrupted supply chains, and reactive rather than proactive resource allocation.",
        solution: "We engineered a centralized, intelligent ERP architecture capable of harmonizing disparate global datasets in real-time. By implementing LLM-powered financial forecasting, the system predicts market fluctuations and automatically suggests procurement workflows to eliminate bottlenecks.",
        techStack: ["PostgreSQL Cluster", "n8n Automation", "Custom LLM Agents", "Cloud Load Balancing", "Zero-Trust Security"],
        infrastructure: "Deployed on a highly available, multi-region Kubernetes cluster. We established a zero-trust network perimeter with automated failover and continuous database replication, ensuring the system remains operational under massive global loads.",
        results: [
            "Reduced total operational and IT overhead costs by 40%.",
            "Accelerated financial quarterly closing sequences by 14 days.",
            "Achieved an undisputed 99.999% high-availability uptime metric."
        ]
    },
    "automated-inventory-system": {
        title: "Automated Inventory & Logistics System",
        category: "Supply Chain Intelligence",
        industry: "E-Commerce & Retail",
        heroMetrics: {
            metric1: { value: "0", label: "Stockout Incidents" },
            metric2: { value: "99.9%", label: "Fulfillment Accuracy" },
            metric3: { value: "-22%", label: "Warehouse Holding Costs" }
        },
        problem: "Rapid demand spikes were overwhelming traditional stock management thresholds. The client faced continuous stockouts on high-velocity items, alongside bloated holding costs for stagnant inventory due to poor predictive modeling.",
        solution: "We deployed a self-healing inventory network driven by predictive analytics. Using IoT telemetry from distribution centers, the system accurately forecasts demand velocity, executes autonomous vendor reordering, and dynamically routes active logistics.",
        techStack: ["Edge Compute IoT", "Redis Caching", "GraphQL API", "AWS Lambda", "MongoDB"],
        infrastructure: "The backbone is a distributed Edge Compute architecture that minimizes latency between IoT warehouse sensors and the central cloud brain. Real-time Redis caching allows for instantaneous stock state resolution across thousands of global API endpoints.",
        results: [
            "Eliminated stockouts completely across all flagship product lines.",
            "Maintained 99.9% fulfillment and routing accuracy under holiday loads.",
            "Reduced unnecessary warehouse holding costs by 22%."
        ]
    },
    "production-esg-intelligence": {
        title: "Production & ESG Disposal Intelligence",
        category: "Manufacturing Technology",
        industry: "Industrial Manufacturing",
        heroMetrics: {
            metric1: { value: "100%", label: "Verifiable ESG Compliance" },
            metric2: { value: "-31%", label: "Raw Material Waste" },
            metric3: { value: "15%", label: "Byproduct Monetization" }
        },
        problem: "The manufacturing facility struggled with optimizing yield while managing hazardous byproduct disposal. Manual compliance reporting was error-prone, risking severe regulatory fines and hindering the company's carbon-neutral mandates.",
        solution: "We built an AI-governed production lifecycle system. It monitors manufacturing telemetry in real-time to optimize yield thresholds, while autonomously tracking, logging, and routing industrial byproducts to certified disposal or recycling centers.",
        techStack: ["Time-Series DB", "Industrial IoT Sensors", "Kubernetes Clustering", "ML Pipelines", "Blockchain Audit Trails"],
        infrastructure: "Utilizing Time-Series Databases for high-frequency sensor ingestion, the architecture processes millions of data points hourly. Blockchain-backed audit trails were implemented to guarantee immutable proof of environmental compliance to regulators.",
        results: [
            "Achieved and maintained 100% verifiable ESG regulatory compliance.",
            "Reduced raw material waste by 31% via real-time yield optimization.",
            "Successfully routed and monetized 15% of previously discarded byproducts."
        ]
    },
    "dblynx-neural-intelligence": {
        title: "DBlynx: Neural DB Intelligence",
        category: "Data Science & NLP",
        industry: "FinTech & SaaS",
        heroMetrics: {
            metric1: { value: "<1s", label: "To SQL Translation" },
            metric2: { value: "10x", label: "Executive Decision Speed" },
            metric3: { value: "-80%", label: "Ad-hoc Data Requests" }
        },
        problem: "Executives and non-technical staff were entirely dependent on a bottlenecked data engineering team to extract insights from massive, undocumented relational databases. Weeks were lost waiting for simple SQL queries to be constructed and run.",
        solution: "We engineered DBlynx, a revolutionary semantic search architecture. By integrating neural embeddings, non-technical users can interactively 'chat' with their database in plain English, while the engine instantaneously translates intent into optimized SQL executions.",
        techStack: ["Vector Databases", "OpenAI Embeddings", "PostgreSQL", "React Server Components", "Vercel Edge"],
        infrastructure: "The system leverages ultra-fast Vector Databases to map natural language intent to database schemas. Vercel Edge functions handle the immediate translation and streaming, ensuring minimal latency between a user's question and the visualized data dashboard.",
        results: [
            "Democratized absolute data access universally across all departments.",
            "Eliminated 80% of ad-hoc query requests previously sent to data engineers.",
            "Accelerated strategic executive decision-making speed by an estimated 10x."
        ]
    },
    "ai-sales-agent": {
        title: "AI Sales & Lead Qualification Agent",
        category: "AI Automation / Sales Intelligence",
        industry: "B2B Services",
        heroMetrics: {
            metric1: { value: "70%", label: "Manual Effort Reduction" },
            metric2: { value: "5x", label: "Response Speed Increase" },
            metric3: { value: "24/7", label: "Autonomous Uptime" }
        },
        problem: "The client's sales team was overwhelmed by unqualified leads, suffering from slow response times, and wasting critical hours on manual follow-ups. This inefficiency resulted in significant lost pipeline revenue and sales burnout.",
        solution: "We engineered an autonomous AI Sales Agent that acts as a perpetual virtual SDR. The system captures inbound intent, qualifies prospects via natural language conversations, automatically books strategy calls for high-tier leads, and seamlessly updates the CRM.",
        techStack: ["LLM Integration", "n8n Automation Engine", "Custom API Integrations", "PostgreSQL", "Cloud CDN"],
        infrastructure: "The system is hosted on a managed high-availability cloud cluster. We optimized the database architecture to handle rapid concurrent webhook events without latency spikes, ensuring continuous webhook stability.",
        results: [
            "Reduced manual SDR workload by 70%, freeing the team to focus purely on closing.",
            "Decreased average lead response time from 14 hours to under 3 seconds.",
            "Increased overall lead-to-appointment conversion rate by 24%."
        ]
    },
    "dblynx-regional-bank": {
        title: "DBLynx: Autonomous Banking Intelligence",
        category: "Database AI Agent",
        industry: "Banking & Financial Services",
        heroMetrics: {
            metric1: { value: "95%", label: "Faster Analytics" },
            metric2: { value: "24h", label: "Deployment Time" },
            metric3: { value: "$45K", label: "Estimated Annual Savings" }
        },
        problem: "A regional bank with $36.8M in loan portfolios faced a severe data accessibility crisis. Branch managers waited 2-3 days for critical customer analytics reports, risk officers manually scanned thousands of monthly transactions for fraud, and executives lacked real-time visibility into portfolio distribution.",
        solution: "We deployed DBLynx, our proprietary AI database chat agent. DBLynx securely connected to their complex 7-table PostgreSQL database, instantly granting authorized staff the ability to run natural language queries, generate real-time analytics dashboards, and automatically detect anomalous transactions using AI.",
        techStack: ["DBLynx Enterprise Core", "PostgreSQL", "Isolation Forest Algorithms", "Zero-Trust Security Protocols", "Next.js Dashboard"],
        infrastructure: "DBLynx was deployed with comprehensive SOC-2 compliant read-only access ensuring zero risk of data modification. The AI anomaly detection models were tailored to continuously map live transaction schemas, flagging suspicious activities in real-time.",
        results: [
            "Reduced report generation time by 95%, empowering branch managers with instant multi-tenant answers.",
            "Automatically identified 153 anomalous transactions with a highly accurate 5% flagged rate.",
            "Saved an estimated $45K annually in operational overhead and data engineering costs."
        ]
    },
    "fuel-station-erp": {
        title: "Fuel Station Management System",
        category: "Energy & Infrastructure ERP",
        industry: "Oil & Gas Retail",
        heroMetrics: {
            metric1: { value: "100%", label: "Inventory Accuracy" },
            metric2: { value: "Zero", label: "Compliance Breaches" },
            metric3: { value: "Real-Time", label: "Pump Synchronization" }
        },
        problem: "A major regional fuel station network struggled with outdated legacy pump software. Manual reconciliations of underground fuel tanks, disjointed POS endpoints, and siloed accounting systems created significant risks of hazardous material leakage and financial discrepancies.",
        solution: "We engineered a centralized Fuel Station ERP that fully integrates with digital pump hardware via IoT sensors. The system provides unified point-of-sale functionality, real-time underground tank volume tracking, and automated reconciliation of every drop of fuel sold across all locations.",
        techStack: ["Industrial IoT Integration", "Next.js POS Interface", "PostgreSQL Clusters", "Cloud Edge Nodes", "Strict Security Perimeters"],
        infrastructure: "The architecture adheres to extreme reliability constraints, featuring offline-first POS capabilities that buffer transactions during network drops and sync securely to the central cloud once connection is restored. High-frequency telemetry from fuel tanks is processed without latency.",
        results: [
            "Achieved perfect 100% fuel inventory accuracy across all physical locations.",
            "Eliminated manual end-of-day reconciliations, saving 3 hours per station daily.",
            "Maintained zero regulatory or compliance breaches with automated hazardous material reporting."
        ]
    }
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    // Simulate fallback for prototype
    const study = caseStudies[slug as keyof typeof caseStudies] || caseStudies["global-enterprise-erp"];

    if (!study) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-transparent text-foreground relative">
            <Navbar />

            {/* --- Case Study Hero --- */}
            <section className="relative pt-48 pb-24 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="px-4 py-1.5 bg-foreground/5 border border-border rounded-full text-[10px] font-mono font-black uppercase tracking-widest text-foreground/60">
                                Case_Study // {slug.replace(/-/g, '_')}
                            </span>
                            <span className="px-4 py-1.5 bg-foreground/5 border border-border rounded-full text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40">
                                {study.industry}
                            </span>
                        </div>

                        <h1
                            className="text-5xl md:text-7xl lg:text-8xl font-black font-heading uppercase tracking-[-0.02em] leading-[0.9]"
                            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
                        >
                            {study.title.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>
                    </div>
                </div>
            </section>

            {/* --- Hero Metrics Grid --- */}
            <section className="py-12 border-y border-border bg-foreground/[0.01]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/5 rounded-2xl overflow-hidden border border-border">
                        {Object.values(study.heroMetrics).map((metric, i) => (
                            <div key={i} className="p-8 bg-black/40 backdrop-blur-md text-center">
                                <div className="text-5xl font-black font-heading text-foreground mb-2">{metric.value}</div>
                                <div className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Deep Dive Content --- */}
            <section className="py-24 bg-transparent border-b border-border">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-24">

                        {/* Problem */}
                        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                            <div className="sticky top-32">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="w-5 h-5 text-red-500/80" />
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">The Inefficiency</h2>
                                </div>
                                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-foreground/20">Operational_Drag</p>
                            </div>
                            <div className="prose prose-invert prose-lg text-foreground/60 font-medium leading-relaxed">
                                <p>{study.problem}</p>
                            </div>
                        </div>

                        {/* Solution Architecture */}
                        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                            <div className="sticky top-32">
                                <div className="flex items-center gap-3 mb-4">
                                    <Network className="w-5 h-5 text-blue-500/80" />
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">The Architecture</h2>
                                </div>
                                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-foreground/20">System_Design</p>
                            </div>
                            <div className="space-y-8">
                                <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                                    {study.solution}
                                </p>
                                <div className="p-8 rounded-2xl bg-foreground/[0.02] border border-border space-y-6">
                                    <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/40">Technology Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {study.techStack.map(tech => (
                                            <span key={tech} className="px-3 py-1 bg-black/50 border border-border rounded-lg text-xs font-bold tracking-wide text-foreground/80">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Infrastructure Strategy */}
                        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                            <div className="sticky top-32">
                                <div className="flex items-center gap-3 mb-4">
                                    <Server className="w-5 h-5 text-emerald-500/80" />
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">The Infrastructure</h2>
                                </div>
                                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-foreground/20">Managed_Environment</p>
                            </div>
                            <div className="space-y-6">
                                <p className="text-lg text-foreground/60 font-medium leading-relaxed">
                                    {study.infrastructure}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 rounded-xl bg-foreground/5 border border-border flex items-center gap-4">
                                        <Database className="w-6 h-6 text-foreground/40" />
                                        <span className="text-sm font-bold uppercase tracking-wide">Managed DB</span>
                                    </div>
                                    <div className="p-6 rounded-xl bg-foreground/5 border border-border flex items-center gap-4">
                                        <ShieldCheck className="w-6 h-6 text-foreground/40" />
                                        <span className="text-sm font-bold uppercase tracking-wide">24/7 Security</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                            <div className="sticky top-32">
                                <div className="flex items-center gap-3 mb-4">
                                    <Zap className="w-5 h-5 text-yellow-500/80" />
                                    <h2 className="text-2xl font-black uppercase tracking-tighter">Business Impact</h2>
                                </div>
                                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-foreground/20">Revenue_Multiplier</p>
                            </div>
                            <div className="space-y-6">
                                {study.results.map((res, i) => (
                                    <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-foreground/[0.03] border border-border hover:bg-foreground/[0.06] transition-colors">
                                        <span className="text-[10px] font-mono font-black text-foreground/20 mt-1">0{i + 1}</span>
                                        <p className="text-foreground/80 font-medium leading-relaxed">{res}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- Conversion CTA --- */}
            <section className="py-32 bg-foreground text-background text-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <Cpu className="w-12 h-12 mx-auto opacity-20" />
                        <h2 className="text-5xl font-black font-heading uppercase tracking-[-0.03em] leading-tight">
                            READY TO ENGINEER <br /> YOUR SYSTEM?
                        </h2>
                        <p className="text-lg font-medium opacity-60 uppercase tracking-tighter">
                            Book a strategy call to map out the architecture and timeline for your custom AI ecosystem.
                        </p>
                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/contact">
                                <button className="px-10 py-5 bg-black text-foreground font-black uppercase text-[10px] tracking-[0.4em] rounded-xl hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl">
                                    Initiate Deployment
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                            <Link href="/pricing" className="text-[10px] font-black uppercase tracking-widest text-background/60 hover:text-background border-b border-black/20 pb-1 transition-colors">
                                View Managed Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
