"use client";

import React from "react";
import Image from "@/components/SmartImage";
import Link from "next/link";
import {
    Code2,
    Briefcase,
    GraduationCap,
    Sparkles,
    ArrowRight,
    ArrowUpRight,
    ExternalLink,
} from "lucide-react";
import { Linkedin } from "@/components/icons/brand-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const projects = [
    {
        title: "Mindscape Analytics Platform",
        category: "Enterprise AI & Ecosystem",
        image: "/images/projects/mindscapeanalytics-01_opt.webp",
        description: "Mindscape Analytics is an AI-driven enterprise technology platform focused on building autonomous systems, intelligent automation workflows, and scalable SaaS infrastructures. The company specializes in AI agents, data engineering, cloud architecture, and full-stack development to help businesses streamline operations, reduce manual effort, and scale efficiently. With a strong emphasis on performance, reliability, and measurable business impact, Mindscape Analytics delivers end-to-end digital transformation solutions for modern enterprises.",
        tags: ["Marketplace", "Agentic AI", "Multi-Tenancy", "Founder Project"]
    },
    {
        title: "CyberTraderX",
        category: "FinTech / AI",
        image: "/images/projects/CYBERTRADERX_opt.webp",
        description: "Autonomous crypto & stock trading bots using ML and statistical models. Implemented backtesting, risk controls, and strategy optimization pipelines for high-frequency trading.",
        tags: ["Algorithmic Trading", "Python", "Real-time Data"]
    },
    {
        title: "Cattle Farm Management",
        category: "AgriTech / Automation",
        image: "/images/projects/cattle_farm_opt.webp",
        description: "AI-driven livestock management system for large-scale operations, optimizing animal health tracking and operational efficiency through automated workflows.",
        tags: ["AgriTech", "Process Automation", "Enterprise"]
    },
    {
        title: "AgriChain",
        category: "Supply Chain / Blockchain",
        image: "/images/projects/AgriChian_opt.webp",
        description: "Transparent supply chain management system for agricultural products using distributed ledger technology.",
        tags: ["Blockchain", "Data Engineering", "Supply Chain"]
    },
    {
        title: "DBLynx Intelligence",
        category: "AI Data Intelligence",
        image: "/images/projects/dblynx-database-intelligence-mindscapeanalytics_opt.webp",
        description: "Production-grade Agentic AI platform enabling autonomous data analysis and Natural Language Querying (NLQ) over structured databases using RAG.",
        tags: ["Agentic AI", "RAG", "Vector DB", "LLMs"]
    },
    {
        title: "Global Formations",
        category: "Corporate SaaS",
        image: "/images/projects/global_formations_opt.webp",
        description: "Enterprise portal for global business entity management and legal compliance automation.",
        tags: ["Next.js", "Stripe", "Compliance AI"]
    },
    {
        title: "Enterprise ERP v4",
        category: "Industrial Systems",
        image: "/images/projects/enterprise-erp_opt.webp",
        description: "Mission-critical Resource Planning system with integrated AI for predictive maintenance and logistics.",
        tags: ["Big Data", "Real-time Monitoring", "SQL"]
    },
    {
        title: "Fuel Station ERP",
        category: "Retail Intelligence",
        image: "/images/projects/fuel-station-erp_opt.webp",
        description: "Distributed management system for high-volume fueling operations with real-time telemetry.",
        tags: ["Telemetry", "IoT", "Asset Management"]
    },
    {
        title: "Amazon Inventory Pro",
        category: "E-Commerce Data",
        image: "/images/projects/amazon_invontry_management_system_opt.webp",
        description: "High-performance inventory forecasting and management system for tier-1 Amazon sellers.",
        tags: ["Python", "Forecasting", "Big Data"]
    },
    {
        title: "Vehicle Analysis Hub",
        category: "Computer Vision",
        image: "/images/projects/vehicle_analysis_dashboard_opt.webp",
        description: "Real-time vehicle identification and movement analysis using deep neural networks.",
        tags: ["PyTorch", "OpenCV", "Deep Learning"]
    },
    {
        title: "BreachData Analytics",
        category: "Cybersecurity",
        image: "/images/projects/breachdata_opt.webp",
        description: "Data-driven platform aggregating and analyzing large-scale breach-related datasets. Enables intelligent search and insights for security awareness and research.",
        tags: ["Security", "Data Science", "Kafka"]
    },
    {
        title: "Supermarket POS Native",
        category: "Retail Operations",
        image: "/images/projects/supermarket-pos_opt.webp",
        description: "High-throughput native point-of-sale system with automated reordering logic.",
        tags: ["Low Latency", "Database Design", "Inventory"]
    },
    {
        title: "Restaurant POS Core",
        category: "Hospitality IT",
        image: "/images/projects/restraint-pos_opt.webp",
        description: "Specialized POS system for high-volume dining environments with kitchen display integration.",
        tags: ["SaaS", "Real-time Sync", "UX/UI"]
    },
    {
        title: "Cryptocurrency Autonomous Trader",
        category: "FinTech / AI",
        image: "/images/projects/cryptotrader2_opt.webp",
        description: "Self-operating trading protocols using sentiment analysis and technical indicators.",
        tags: ["FinTech", "Autoproduction", "Python"]
    },
    {
        title: "JFBZ Token Ecosystem",
        category: "Web3 Engineering",
        image: "/images/projects/jfbz_token_opt.webp",
        description: "Architecture and smart contract deployment for utility-based digital token ecosystems.",
        tags: ["Solidity", "Ecosystem Design", "Tokenomics"]
    },
    {
        title: "Annotation Tool",
        category: "AI Data Preparation",
        image: "/images/projects/image_annotation_tool_opt.webp",
        description: "Proprietary image labeling and dataset preparation tool for high-precision model training.",
        tags: ["MLOps", "Computer Vision", "Internal Tool"]
    }
];

/**
 * SOURCE OF TRUTH KEYWORDS: featuredPortfolioProjects, Tenvo, DisposIQ, RSIQ Pro, Smart Dairy, DBLynx
 * WHAT: The verified public product portfolio and the current project destinations.
 * WHY: Leads with shipped systems people can inspect, while keeping the legacy project archive below.
 * WHERE: Rendered in the founder portfolio's primary work section.
 */
const featuredPortfolioProjects = [
    {
        title: "AurumPulse Gold News Intelligence Pro",
        category: "XAUUSD economic news intelligence",
        image: "/images/projects/aurumpulse-gold-intelligence.webp",
        description: "A gold-focused terminal that organizes macroeconomic event alerts, impact classifications, pre-news market context, conditional post-release scenarios, and historical and forward validation. It presents analytical context, not guaranteed predictions.",
        tags: ["Market intelligence", "XAUUSD", "News analysis"],
        href: "/shop/seed_aurumpulse_gold_news_intelligence_pro",
        external: false,
    },
    {
        title: "TENVO Growth Intelligence",
        category: "Customer acquisition & lead generation",
        image: "/images/tenvo/tenvo-dashboard.webp",
        description: "A connected growth workflow within TENVO that brings prospect capture, quotes and pipeline follow-up, customer purchase history, campaigns, and business analytics together. It gives teams a clearer path from first inquiry to repeat customer, with guided insights expanding by plan and configuration.",
        tags: ["Lead generation", "CRM", "Campaigns"],
        href: "https://tenvo.store/solutions/marketing-crm",
        external: true,
    },
    {
        title: "TENVO",
        category: "Business operations platform",
        image: "/images/projects/tenvo.webp",
        description: "A connected business platform for commerce, inventory, finance, customer operations, and AI-assisted workflows, built to reduce the tool-switching that slows growing teams.",
        tags: ["SaaS", "Business systems", "AI workflows"],
        href: "https://www.tenvo.store/",
        external: true,
    },
    {
        title: "DisposIQ",
        category: "Production & disposal intelligence",
        image: "/images/projects/disposiq.webp",
        description: "An operational system that connects production records, disposal tracking, reporting, and AI-assisted insights for food production and industrial teams.",
        tags: ["Operations", "Analytics", "AI insights"],
        href: "https://disposiq.tenvo.store/",
        external: true,
    },
    {
        title: "RSIQ Pro",
        category: "Real-time market intelligence",
        image: "/images/projects/rsiq-pro.webp",
        description: "A multi-exchange market intelligence product that organizes live market data and technical signals into a focused decision workspace for traders.",
        tags: ["FinTech", "Live data", "Decision support"],
        href: "https://rsiq.mindscapeanalytics.com/",
        external: true,
    },
    {
        title: "Smart Dairy & Cattle Farm Management",
        category: "Agriculture operations system",
        image: "/images/projects/smart-dairy.webp",
        description: "A digital operating system for dairy farms, bringing cattle records, milk production, feed, animal health, and farm performance into one workspace.",
        tags: ["AgriTech", "Farm operations", "Analytics"],
        href: "https://cattle.mindscapeanalytics.com/",
        external: true,
    },
    {
        title: "DBLynx Intelligence",
        category: "AI data infrastructure",
        image: "/images/projects/dblynx-database-intelligence-mindscapeanalytics_opt.webp",
        description: "An agentic data platform that helps teams explore structured databases through natural-language questions, governed access, and generated analysis.",
        tags: ["Agentic AI", "RAG", "Data systems"],
        href: "/projects/dblynx-neural-intelligence",
        external: false,
    },
];

const experience = [
    {
        role: "AI Engineer | Team Lead (GenAI & Agentic Systems)",
        company: "Mindscape Analytics LLC (USA | Remote)",
        period: "Jan 2025 - Present",
        description: "Designing and deploying LLM-powered AI assistants using RAG. Building agentic AI systems capable of task planning, decision-making, tool execution, and memory handling. Integrated vector databases and LLM APIs into production-grade systems, significantly reducing manual operational efforts."
    },
    {
        role: "Big Data Administrator",
        company: "Freelance (Remote, Canada)",
        period: "Jul 2023 - Dec 2024",
        description: "Optimized Cloudera HDFS ecosystems, improved reliability and performance for large-scale workloads. Deployed and administered HDFS, Impala, Hive, YARN, and StreamSets. Led enterprise-grade security hardening using SSL/TLS, Apache Knox, Ranger, and LDAP integration."
    },
    {
        role: "Financial Data Analyst",
        company: "UBL Head Office - Speridian Technologies LLC",
        period: "Mar 2022 - Oct 2023",
        description: "Awarded Employee of the Month (Sep 2022) for automation excellence. Automated enterprise financial reporting using Python, SQL, and Oracle Analytics, reducing reporting time from 5 hours to 15 minutes. Designed executive BI dashboards and analytical models."
    },
    {
        role: "AI Engineer Intern",
        company: "Optimizia",
        period: "Jun 2021 - Sep 2021",
        description: "Developed computer vision models using deep neural networks. Performed dataset preparation, labeling, and augmentation. Worked in agile teams delivering ML prototypes and experiments."
    }
];

export default function FounderPortfolio() {
    const [showAllProjects, setShowAllProjects] = React.useState(false);
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="relative overflow-hidden border-b border-border bg-background">
                <div className="pointer-events-none absolute -right-28 top-12 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="container-standard relative px-6 pb-14 pt-28 md:pb-20 md:pt-32">
                    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                        <div className="relative mb-7 h-40 w-40 rounded-full bg-card p-1.5 shadow-xl shadow-foreground/10 ring-1 ring-border sm:h-48 sm:w-48">
                            <div className="relative h-full w-full overflow-hidden rounded-full bg-muted ring-4 ring-background">
                                <Image src="/images/team/zeeshan-keerio.webp" alt="Portrait of Zeeshan Keerio, Founder and Lead AI Engineer" fill priority sizes="(max-width: 640px) 160px, 192px" className="object-cover object-top" />
                            </div>
                        </div>
                        <h1 className="font-heading text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Zeeshan Keerio</h1>
                        <p className="mt-4 text-lg font-semibold tracking-[-0.02em] text-primary sm:text-xl">Founder &amp; Lead AI Engineer</p>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">Mindscape Analytics <span className="mx-2 text-border" aria-hidden="true">·</span> Sheridan, Wyoming, USA</p>
                        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                            I turn complex business problems into dependable AI, data, and software products. I lead the work from system architecture through engineering, cloud deployment, and ongoing improvement for teams worldwide.
                        </p>
                        <div className="mt-7 flex flex-wrap justify-center items-center gap-3">
                                <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                    Get in touch <ArrowRight size={17} aria-hidden="true" />
                                </Link>
                                <Link href="https://www.linkedin.com/in/zeeshan-keerio" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-semibold transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                    <Linkedin size={17} aria-hidden="true" /> LinkedIn <ExternalLink size={14} aria-hidden="true" />
                                </Link>
                                <Link href="mailto:zeeshan.keerio@mindscapeanalytics.com" className="inline-flex min-h-12 items-center gap-2 px-3 py-3 font-semibold text-foreground underline decoration-border underline-offset-4 transition hover:text-primary">Email <ArrowUpRight size={15} aria-hidden="true" /></Link>
                            </div>
                    </div>
                    <div className="mt-12 grid gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["01", "Agentic AI, LLMs & RAG"],
                            ["02", "Data platforms & analytics"],
                            ["03", "AWS architecture & delivery"],
                            ["04", "Full-stack product engineering"],
                        ].map(([index, label]) => <div key={index} className="flex items-center gap-3"><span className="text-xs font-semibold tabular-nums text-primary">{index}</span><span className="text-sm font-medium text-foreground">{label}</span></div>)}
                    </div>
                </div>
            </section>

            <section id="featured-work" className="scroll-mt-28 py-20 md:py-28">
                <div className="container-standard px-6">
                    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Products I’ve built and shipped</h2>
                            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">A selection of products where software, data, and day-to-day operations meet.</p>
                        </div>
                        <Link href="/projects" className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
                            Browse project catalog <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>

                    <div className="grid gap-x-8 md:grid-cols-2">
                        {featuredPortfolioProjects.map((project) => (
                            <article key={project.title} className="group flex min-w-0 gap-4 border-t border-border py-5 sm:gap-5 sm:py-6">
                                <div className="relative aspect-[4/3] w-[34%] max-w-48 shrink-0 overflow-hidden rounded-xl bg-muted sm:w-[38%]">
                                    <Image src={project.image} alt={`${project.title} product interface`} fill sizes="(max-width: 640px) 34vw, 190px" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col items-start">
                                    <p className="text-xs font-semibold text-primary">{project.category}</p>
                                    <h3 className="mt-1 font-heading text-lg font-semibold leading-snug tracking-tight sm:text-xl">{project.title}</h3>
                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                                    <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex" aria-label={`${project.title} focus areas`}>
                                        {project.tags.map((tag) => <li key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{tag}</li>)}
                                    </ul>
                                    <Link href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noreferrer" : undefined} className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-foreground underline decoration-primary/50 underline-offset-4 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                        {project.external ? "View live product" : "Read the case study"}
                                        {project.external ? <ExternalLink size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                        <Link href="https://www.tenvo.store/demo-stores" target="_blank" rel="noreferrer" className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 sm:flex-row sm:items-center sm:p-8">
                            <div className="max-w-2xl">
                                <h3 className="font-heading text-2xl font-semibold tracking-tight">TENVO demo storefront ecosystem</h3>
                                <p className="mt-2 text-sm leading-6 text-muted-foreground">Explore 25+ live, industry-specific storefronts built on the TENVO platform, from retail and food to automotive and services.</p>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary">View demo stores <ExternalLink size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></span>
                        </Link>
                        <div className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
                            <h3 className="font-heading text-2xl font-semibold tracking-tight">Cloud architecture, built for efficiency</h3>
                            <p className="mt-3 text-sm leading-6 text-primary-foreground/85">I design and deploy AWS environments around workload needs, with right-sizing and architecture optimization that can reduce cloud costs by up to 70%.</p>
                            <p className="mt-3 text-xs leading-5 text-primary-foreground/75">Actual savings depend on the starting architecture, usage, and workload.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="selected-work" className="scroll-mt-28 border-t border-border bg-muted/35 py-20 md:py-28">
                <div className="container-standard px-6">
                    <div className="mb-8 max-w-3xl">
                        <h2 className="font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">More engineering work</h2>
                        <p className="mt-3 text-base leading-7 text-muted-foreground">Selected systems across AI, data, finance, supply chain, and computer vision. The product pages include deeper architecture and delivery details.</p>
                    </div>

                    <div className="grid gap-x-10 md:grid-cols-2">
                        {(showAllProjects ? projects : projects.slice(0, 6)).map((project, i) => (
                            <article key={project.title} className="flex gap-4 border-t border-border py-5 sm:gap-6">
                                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-card sm:h-24 sm:w-36">
                                    <Image src={project.image} alt={`${project.title} project`} fill sizes="(max-width: 640px) 112px, 144px" className="object-cover" loading={i < 2 ? "eager" : "lazy"} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-primary">{project.category}</p>
                                    <h3 className="mt-1 font-heading text-lg font-semibold leading-snug tracking-tight">{project.title}</h3>
                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
                                    <p className="mt-2 text-xs text-muted-foreground">{project.tags.slice(0, 3).join(" · ")}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    {!showAllProjects && projects.length > 6 && (
                        <button
                            type="button"
                            aria-expanded={showAllProjects}
                            onClick={() => setShowAllProjects(true)}
                            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-semibold transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                            Show all {projects.length} projects <ArrowRight size={16} aria-hidden="true" />
                        </button>
                    )}
                    {showAllProjects && (
                        <button
                            type="button"
                            aria-expanded={showAllProjects}
                            onClick={() => setShowAllProjects(false)}
                            className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-semibold transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                        >
                            Show fewer projects
                        </button>
                    )}
                </div>
            </section>

            {/* --- CHRONICLE (EXPERIENCE) --- */}
            <section id="experience" className="scroll-mt-28 border-t border-border bg-background py-20 md:py-28">
                <div className="container-standard px-4 md:px-6">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start max-w-7xl mx-auto">
                        <div className="lg:sticky lg:top-32 space-y-8 mb-12 lg:mb-0">
                            <Briefcase className="text-primary" size={22} aria-hidden="true" />
                            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">Experience built across data, AI, and product delivery</h2>
                            <p className="max-w-sm text-sm font-medium leading-6 text-muted-foreground">
                                From enterprise reporting and big-data operations to designing and shipping production AI products.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="https://www.linkedin.com/in/zeeshan-keerio" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-semibold transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                    <Linkedin size={17} aria-hidden="true" /> LinkedIn <ExternalLink size={14} aria-hidden="true" />
                                </Link>
                                <Link href="mailto:zeeshan.keerio@mindscapeanalytics.com" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-semibold transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                    <Briefcase size={16} aria-hidden="true" /> Contact
                                </Link>
                            </div>
                        </div>

                        <div className="divide-y divide-border border-y border-border">
                            {experience.map((exp) => (
                                <article key={`${exp.company}-${exp.role}`} className="py-7 first:pt-7 last:pb-7 sm:py-8">
                                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start sm:gap-6">
                                        <div>
                                            <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{exp.role}</h3>
                                            <p className="mt-1 font-medium text-muted-foreground">{exp.company}</p>
                                        </div>
                                        <p className="shrink-0 text-sm font-medium text-muted-foreground">
                                            {exp.period}
                                        </p>
                                    </div>
                                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                                        {exp.description}
                                    </p>
                                    {exp.role === "Financial Data Analyst" && (
                                        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                                            Automated recurring reports from 5 hours to 15 minutes
                                        </p>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- EDUCATION & CERTIFICATIONS --- */}
            <section id="education" className="scroll-mt-28 border-t border-border bg-muted/35 py-20 text-foreground md:py-28">
                <div className="container-standard px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
                            <div className="space-y-8">
                                <GraduationCap size={22} className="text-primary" aria-hidden="true" />
                                <div>
                                    <h2 className="font-heading text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Education & tools</h2>
                                    <div className="mt-6">
                                        <h3 className="text-xl font-semibold">BS in Computer Science</h3>
                                        <p className="mt-1 text-sm font-medium text-muted-foreground">Iqra University · Karachi · 2016–2021</p>
                                    </div>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                                        Focused on artificial intelligence, data engineering, and machine learning. Led backend development for a final-year computer-vision project that detected student engagement from webcam video.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
                                    <h3 className="font-heading text-lg font-semibold">Technical toolkit</h3>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {[
                                            "Python", "SQL", "LLMs", "RAG", "Agentic AI", "TensorFlow", "Hadoop", "Cloudera", "Spark", "Kafka", "Hive", "Impala", "StreamSets", "Azure AI", "Snowflake", "Power BI", "SSL/TLS", "Apache Knox", "Next.js"
                                        ].map(tech => (
                                            <span key={tech} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-3">
                                    <Sparkles size={20} className="text-primary" aria-hidden="true" />
                                    <h3 className="font-heading text-2xl font-semibold tracking-tight">Certifications & learning</h3>
                                </div>
                                <ul className="mt-6 divide-y divide-border border-y border-border">
                                    {[
                                        "Career Essentials in GEN AI (Microsoft/LinkedIn)",
                                        "Data Science Professional (Coursera)",
                                        "Machine Learning (AWS)",
                                        "Neural Networks & Deep Learning",
                                        "Advanced Deep Learning with Keras (DataCamp)",
                                        "Statistics for Machine Learning",
                                        "Scrum Foundation Professional",
                                        "Six Sigma White Belt",
                                        "Ethics in the Age of Generative AI"
                                    ].map((cert) => (
                                        <li key={cert} className="flex items-center justify-between gap-4 py-4 text-sm font-medium text-muted-foreground">
                                            <span>{cert}</span>
                                            <Code2 size={15} className="shrink-0 text-primary/70" aria-hidden="true" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section id="contact" className="scroll-mt-28 border-t border-border bg-background py-20 md:py-28">
                <div className="container-standard text-center">
                    <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card px-6 py-12 sm:px-12 md:py-16">
                        <h2 className="font-heading text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Have a system to build?</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">If you’re exploring AI agents, data platforms, cloud architecture, or a product idea, let’s talk through the problem and a practical path to delivery.</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                Start a conversation <ArrowRight size={17} aria-hidden="true" />
                            </Link>
                            <Link href="mailto:zeeshan.keerio@mindscapeanalytics.com" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-5 py-3 font-semibold transition hover:border-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                                Email me <ExternalLink size={14} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
