"use client";

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
            "Research and inquiry workflows",
            "Rules based on your operations",
            "Human review for sensitive actions",
            "Approved business context",
            "Connections to existing tools"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Mic,
        title: "AI Voice Receptionist & Calling",
        description: "Answer business inquiries, qualify interest, coordinate appointments, and hand conversations to your team through scoped voice workflows.",
        features: [
            "Answer approved common questions",
            "Appointment and transfer rules",
            "Configured language support",
            "CRM connection where supported",
            "Calendar connection where supported"
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
            "Approved question handling",
            "Inquiry capture and routing",
            "CRM connection where supported",
            "Configured channel deployment",
            "Conversation reporting"
        ],
        link: "/solutions/ai-genai",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Globe,
        title: "Web & SaaS Application Development",
        description: "Complete web applications, SaaS platforms, and AI-enabled software: product discovery, UI/UX design, APIs, databases, deployment, and ongoing support.",
        features: [
            "Product discovery and scope",
            "Responsive user experience",
            "Secure-by-design development",
            "APIs and data connections",
            "Deployment and support planning"
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
        description: "Tools to capture, organize, and qualify inquiries from approved sources using rules your team can review.",
        features: [
            "Inquiry capture and routing",
            "Business-fit qualification rules",
            "Follow-up task workflows",
            "Lead-source tracking",
            "Outcome reporting"
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
        description: "Connect approved data sources through documented pipelines, quality checks, and reporting models that support business decisions.",
        features: [
            "Data source and pipeline design",
            "Analytics warehouse planning",
            "Batch or event-based processing",
            "Data quality checks",
            "Forecasts with stated assumptions"
        ],
        link: "/solutions/cloud-infrastructure",
        gradient: "from-white/10 to-transparent"
    },
    {
        icon: Shield,
        title: "Custom DB & Infrastructure",
        description: "Database and cloud infrastructure designed around access control, backups, measured workloads, and the reliability your team needs.",
        features: [
            "Database and schema planning",
            "Availability and recovery design",
            "Scoped maintenance",
            "Security configuration",
            "Backup and restore planning"
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

/**
 * SOURCE OF TRUTH KEYWORDS: priority services, e-commerce intelligence, AI voice, export sales, China sourcing, software development
 * WHAT: Places the most specific buyer-facing service pages first in the services catalog.
 * WHY: Visitors can identify a relevant offer before scanning specialist engineering capabilities.
 * WHERE: Services catalog cards.
 */
const primaryServiceTitles = [
    "E-Commerce Profit & Inventory Intelligence",
    "AI Voice Receptionist & Calling",
    "Foreign Trade Sales & Growth Automation",
    "China Direct Factory Sourcing",
    "Web & SaaS Application Development",
] as const;

const primaryServices = primaryServiceTitles.flatMap((primaryTitle) => {
    const service = services.find((item) => item.title === primaryTitle);
    return service ? [service] : [];
});

const orderedServices = [
    ...primaryServices,
    ...services.filter((service) => !primaryServiceTitles.some((primaryTitle) => primaryTitle === service.title)),
];

const process = [
    {
        step: "01",
        title: "Discovery",
        description: "We map your goals, current tools, and operating constraints."
    },
    {
        step: "02",
        title: "Strategy",
        description: "We agree on deliverables, data access, and the project plan."
    },
    {
        step: "03",
        title: "Development",
        description: "We build and connect the workflows included in the agreed scope."
    },
    {
        step: "04",
        title: "Deployment",
        description: "We review the result with your team and define any ongoing support."
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <Navbar />

            <section className="container-standard pb-12 pt-36 md:pb-16 md:pt-44">
                <div className="max-w-4xl">
                    <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand">Services for business operations and growth</p>
                    <h1 className="mt-4 text-balance font-heading text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[.98] tracking-[-.04em]">Business software, AI, and growth systems.</h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">We help e-commerce teams, manufacturers, and exporters connect data, respond to customers, and improve essential workflows. Start with the service closest to your business need.</p>
                    <Link href="/contact" className="msa-button mt-7">Discuss your business challenge <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
            </section>

            <section className="section-spacing bg-transparent">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="mb-8 max-w-2xl">
                        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">Choose the offer closest to your goal</h2>
                        <p className="mt-3 leading-7 text-muted-foreground">Compare the main service areas first. Specialist capabilities follow below.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
                        {orderedServices.map((service, index) => (
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
            <section className="py-20 bg-background border-t border-border md:py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-12 text-center md:mb-16">
                        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">A clear path from discovery to handoff</h2>
                        <p className="mt-3 text-muted-foreground">Scope, delivery, and review are agreed before work begins.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
                        {process.map((item) => (
                            <div key={item.step} className="group">
                                <div className="space-y-6">
                                    <span className="text-3xl font-semibold text-brand leading-none">{item.step}</span>
                                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
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
                        <div className="space-y-8">
                            <p className="text-sm font-semibold text-brand">After launch</p>
                            <h2 className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                                Support that fits your system
                            </h2>
                            <p className="text-lg leading-7 max-w-xl text-muted-foreground">
                                Ongoing support can be scoped to your system, including infrastructure monitoring, database maintenance, AI workflow updates, and security reviews. Coverage and response windows are agreed in writing.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>Managed technical operations</div>
                                <div>Reliability reviews</div>
                                <div>Cloud cost visibility</div>
                                <div>Ongoing improvements</div>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-background text-foreground space-y-7 relative overflow-hidden border border-border sm:p-10">
                            <div className="absolute inset-0 z-0 opacity-10 bg-[url('/grid.svg')] bg-[length:40px_40px]" />
                            <div className="relative z-10 space-y-8">
                                <h3 className="text-xl font-semibold tracking-tight text-foreground">Possible support scope</h3>
                                <div className="space-y-4">
                                    {[
                                        "AI, database, and integration maintenance",
                                        "Capacity planning based on measured workloads",
                                        "Agreed monitoring and response windows",
                                        "Scheduled security reviews within scope"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                                            <span className="text-sm font-medium text-foreground">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            <Link href="/contact" className="msa-button w-full justify-between">
                                Discuss managed support<ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-transparent text-center md:py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl">
                            Ready to improve a workflow?
                        </h2>
                        <p className="mx-auto max-w-2xl leading-7 text-muted-foreground">Tell us what is slowing the work down. We will help identify a practical first step and define what a project would include.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="msa-button">Discuss your project <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                            <Link href="/projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-5 font-semibold hover:bg-muted">See selected work <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
