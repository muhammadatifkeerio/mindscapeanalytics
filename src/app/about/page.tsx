"use client";

import { motion } from "framer-motion";
import Image from "@/components/SmartImage";
import Link from "next/link";
import {
    Mail,
    Shield,
    Zap,
    Users,
    Bot,
    TrendingUp,
    ChevronRight,
    Database,
    Code,
    Cpu,
    CheckCircle2
} from "lucide-react";
import { Linkedin } from "@/components/icons/brand-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAuditLeadMagnet from "@/components/AIAuditLeadMagnet";
import TeamMoments from "@/components/TeamMoments";

/**
 * SOURCE OF TRUTH KEYWORDS: About team, profile names, portrait assets, public contacts, team links, people-first trust
 * WHAT: Public team profiles and their confirmed image and contact references.
 * WHY: Accurate identities and working links support visitor trust and prevent incorrect portrait attribution.
 * WHERE: About page core team cards.
 */
const team = [
    {
        name: "Zeeshan Keerio",
        role: "Lead AI Engineer & Solutions Architect",
        bio: "AI-focused technology leader and AI Engineer specialized in GenAI and Agentic AI. Sole designer and developer of the Mindscape Analytics (MSA) platform, architecting its core autonomous intelligence and multi-tenant infrastructure.",
        image: "/images/team/zeeshan-keerio.webp",
        linkedin: "https://linkedin.com/in/zeeshan-keerio",
        email: "mailto:zeeshan.keerio@mindscapeanalytics.com",
        href: "/zeeshan-keerio"
    },
    {
        name: "Muhammad Atif",
        role: "Full-Stack Developer & AI Engineer",
        bio: "Builds and maintains responsive product experiences, connecting clear interfaces with dependable application logic.",
        image: "/images/team/muhammad-atif.webp",
        linkedin: "#",
        email: "mailto:atif@mindscapeanalytics.com"
    },
    {
        name: "Saleem Raza",
        role: "Finance Manager",
        bio: "Advises on finance workflows, accounting systems, and practical implementation needs for business teams.",
        image: "/images/team/saleem-raza.webp",
        linkedin: "#",
        email: "#"
    },
    {
        name: "Muhammad Ibrahim",
        role: "Senior Manager - Marketing",
        bio: "Shapes go-to-market strategy, brand positioning, and partnerships that connect Mindscape products with the right customers.",
        image: "/images/team/muhammad-ibrahim.webp",
        linkedin: "#",
        email: "#"
    },
    {
        name: "Zainab Gul",
        role: "Research & Development Analyst",
        bio: "Researches business needs, evaluates product opportunities, and turns findings into practical recommendations for development teams.",
        image: "/images/team/zainab-gul.webp",
        linkedin: "#",
        email: "#"
    },
    {
        name: "Shaizan Ali",
        role: "Software Engineer",
        bio: "Develops and improves software features, integrations, and systems with a focus on reliability and maintainability.",
        image: undefined,
        linkedin: "#",
        email: "#"
    }
];

const timeline = [
    {
        year: "01",
        title: "DISCOVER",
        description: "Map the operating question, current tools, data owners, constraints, and the decisions the system needs to support."
    },
    {
        year: "02",
        title: "ARCHITECT",
        description: "Define the software, data connections, workflow boundaries, human review points, and acceptance criteria before implementation."
    },
    {
        year: "03",
        title: "DELIVER",
        description: "Build, integrate, test, and document the agreed system, then prepare the people who will use and maintain it."
    },
    {
        year: "04",
        title: "IMPROVE",
        description: "Review system performance against the agreed measures and adjust the workflow as business needs change."
    }
];

const expertise = [
    { title: "AI Agents & Automation", id: "01", icon: Bot, desc: "Autonomous agent networks engineered for operational excellence." },
    { title: "AI Voice Call Agents", id: "02", icon: Zap, desc: "Ultra-low latency conversational agents integrated with Vapi/Retell." },
    { title: "AI Sales & Chatbots", id: "03", icon: Users, desc: "Intelligent customer engagement nodes that qualify and convert." },
    { title: "Big Data & Cloud Engineering", id: "04", icon: Database, desc: "Cloud-native databases, processing millions of complex operations." },
    { title: "Full-Stack SaaS Platforms", id: "05", icon: Code, desc: "High-density web architectures designed for global scalability." },
    { title: "Lead Generation AI Systems", id: "06", icon: TrendingUp, desc: "Automated intent discovery pipelines that feed CRM directly." }
];

const differences = [
    { name: "AI Automation Workflows", stat: "Human-reviewed" },
    { name: "Cloud Architecture", stat: "Cost-aware" },
    { name: "Enterprise Data Systems", stat: "Integrated" },
    { name: "Production Delivery", stat: "Observable" },
    { name: "Ongoing Engineering", stat: "Collaborative" }
];

const trustFactors = [
    { title: "Architecture shaped around your operations", detail: "We design for your workflows, data, integrations, and delivery constraints." },
    { title: "Cloud-cost-aware deployment", detail: "We consider service selection, sizing, and usage so infrastructure fits the workload." },
    { title: "Security-conscious engineering", detail: "We apply secure defaults and access controls appropriate to the system and its data." },
    { title: "Observable production systems", detail: "We plan monitoring, backups, and recovery needs as part of deployment." },
    { title: "Performance measured in context", detail: "We agree on relevant baselines and evaluate results against real operating needs." },
    { title: "Clear delivery and support", detail: "Scope, ownership, handoff, and ongoing support are discussed before launch." }
];

// Helper component for reveal animations
function ScrollReveal({
    children,
    delay = 0,
    className = ""
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.215, 0.61, 0.355, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function AboutPage() {
    return (
        <div className="about-page min-h-screen bg-background text-foreground relative selection:bg-foreground selection:text-background">
            <Navbar />

            {/* About introduction */}
            <section className="relative overflow-hidden pb-12 pt-28 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
                <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
                            className="max-w-[12ch] text-left text-[clamp(2.75rem,11vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-foreground"
                        >
                            <span className="block">We build for</span>
                            <span className="mt-2 block">real work.</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
                            className="max-w-xl lg:justify-self-end"
                        >
                            <p className="text-xl font-medium leading-relaxed tracking-tight text-foreground/75 sm:text-2xl">
                                We help businesses scale using intelligent systems, not manual effort.
                            </p>
                            <p className="mt-4 text-base leading-relaxed text-foreground/60 sm:text-lg">
                                From AI agents and data systems to digital products and production, we connect strategy with software teams can rely on.
                            </p>
                            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                                <Link
                                    href="/projects"
                                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                                >
                                    Explore our work <ChevronRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex min-h-12 items-center text-sm font-semibold text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                                >
                                    Get in touch
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-foreground/10 pt-4 sm:mt-16 sm:grid-cols-4 sm:gap-6 lg:mt-20">
                        {["AI agents", "Data systems", "Digital products", "Production delivery"].map((capability) => (
                            <p key={capability} className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55 sm:text-sm">
                                {capability}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Premium Company Overview Section --- */}
            <section className="relative overflow-hidden border-y border-foreground/5 bg-foreground/[0.01] py-14 sm:py-20 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-24">
                        <ScrollReveal className="space-y-8">
                          
                            <h2 className="fluid-h2 text-foreground">
                                NEXT-GENERATION <br />
                                <span className="text-foreground/45">AI & DATA ENGINEERING.</span>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-base sm:text-lg text-foreground/60 leading-relaxed font-medium">
                                    Mindscape Analytics is a next-generation AI and Software Development company specializing in intelligent automation, AI agents, full-stack systems, and scalable cloud infrastructure.
                                </p>
                                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-foreground transition-all group-hover:h-[50%] duration-500" />
                                    <p className="text-base sm:text-lg text-foreground font-black leading-relaxed pl-4">
                                        &ldquo;To help businesses scale using intelligent systems, not manual effort.&rdquo;
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:rounded-[2rem] sm:p-8 lg:rounded-[3rem] lg:p-12">
                            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none" />
                            <h3 className="text-lg sm:text-xl font-black uppercase text-foreground mb-8 tracking-tight font-heading">What Makes Us Different?</h3>
                            <div className="space-y-6">
                                {differences.map((diff, i) => (
                                    <div key={i} className="flex justify-between items-center group/item pb-4 border-b border-foreground/5 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 group-hover/item:bg-foreground group-hover/item:scale-125 transition-all duration-300" />
                                            <span className="text-[11px] font-mono font-black text-foreground/50 uppercase tracking-[0.1em] group-hover/item:text-foreground transition-colors">{diff.name}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-foreground/40 group-hover/item:text-foreground transition-colors">{diff.stat}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-foreground/5">
                                <p className="text-meta text-center">
                                    We focus on long-term partnership, not one-time delivery.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* --- Vision: the north star behind the work --- */}
            <section className="py-20 relative overflow-hidden border-y border-foreground/5">
                <div className="absolute inset-0 bg-foreground/[0.01]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-foreground/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
                    <ScrollReveal className="text-center space-y-7">
                        <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter">Our vision</h2>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto" />
                        <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-foreground/70 max-w-3xl mx-auto">
                            To become a global AI-first technology partner helping businesses transition from manual operations to <span className="text-foreground font-black border-b border-foreground/20 pb-1">autonomous AI-driven systems.</span>
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* --- Core expertise: how the vision becomes practical work --- */}
            <section className="bg-transparent py-14 sm:py-20 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal className="text-center mb-20 space-y-4">

                        <h2 className="fluid-h2 text-foreground">
                            What we do
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {expertise.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="group p-8 rounded-2xl bg-card border border-border hover:border-brand/40 transition-all relative flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-md overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/[0.01] rounded-bl-full group-hover:bg-foreground/[0.02] transition-colors pointer-events-none" />
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 rounded-xl bg-foreground/[0.04] border border-foreground/10 group-hover:bg-foreground group-hover:text-black transition-all">
                                            <exp.icon className="w-5 h-5 text-foreground group-hover:text-black transition-colors" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-black text-foreground uppercase tracking-tight font-heading">{exp.title}</h3>
                                    <p className="text-xs text-foreground/50 leading-relaxed font-medium">{exp.desc}</p>
                                </div>
                                <div className="w-8 h-px bg-foreground/20 mt-6 group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Delivery approach: context before introducing the people --- */}
            <section className="border-t border-foreground/5 bg-transparent py-14 sm:py-20 lg:py-24">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6">
                    <ScrollReveal className="text-center mb-16 space-y-4">
                        <p className="text-meta">From an operating question to a system people can use</p>
                        <h2 className="fluid-h2 text-foreground">How we work</h2>
                    </ScrollReveal>

                    <div className="relative">
                        <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[2px] bg-gradient-to-b from-foreground/20 via-foreground/5 to-transparent pointer-events-none" />
                        <div className="space-y-10 md:space-y-16">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: index * 0.08 }}
                                    className={`flex flex-col md:flex-row gap-6 md:gap-8 items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="absolute left-[16px] md:left-1/2 -ml-[5px] w-3 h-3 rounded-full bg-brand border-4 border-background z-20 shadow-[0_1px_4px_rgba(20,15,18,0.22)]" />
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                                        <div className={`space-y-3 p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-brand/30 transition-colors relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                            <span className="text-4xl sm:text-5xl font-black text-foreground/10 font-heading leading-none absolute top-4 right-6 pointer-events-none">{item.year}</span>
                                            <span className="text-3xl sm:text-4xl font-black text-foreground font-heading leading-none block">{item.year}</span>
                                            <h3 className="text-lg font-black tracking-tight text-foreground">{item.title}</h3>
                                            <p className="text-foreground/60 text-sm leading-relaxed max-w-sm ml-0 mr-auto md:ml-auto md:mr-0">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <TeamMoments />

            {/* --- Architects (Team) Section --- */}
            <section className="bg-transparent py-16 sm:py-24 lg:py-32">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <ScrollReveal className="text-center mb-24 space-y-4">
                        <h2 className="fluid-h2 text-foreground">Core team</h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="p-6 rounded-[2rem] bg-card border border-border hover:border-brand/35 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md"
                            >
                                <div>
                                    <div className="mb-8 block aspect-[4/5] overflow-hidden rounded-2xl relative border border-foreground/10">
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            />
                                        ) : (
                                            <div role="img" aria-label={`${member.name} initials`} className="grid h-full place-items-center bg-muted font-heading text-5xl font-semibold text-muted-foreground">
                                                {member.name.split(" ").map((part) => part[0]).join("")}
                                            </div>
                                        )}
                                        {member.image && <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-black uppercase font-heading tracking-tighter text-foreground">{member.name}</h3>
                                                <span className="text-meta block mt-1">{member.role}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                {member.linkedin && member.linkedin !== "#" && (
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-muted border border-border hover:bg-brand hover:text-white text-foreground transition-all">
                                                        <Linkedin className="h-3.5 w-3.5" />
                                                    </a>
                                                )}
                                                {member.email && member.email !== "#" && (
                                                    <a href={member.email} className="p-2.5 rounded-xl bg-muted border border-border hover:bg-brand hover:text-white text-foreground transition-all">
                                                        <Mail className="h-3.5 w-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed font-medium uppercase tracking-tight pt-2 border-t border-foreground/5">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                                
                                {member.href && (
                                    <div className="mt-8 pt-4">
                                        <Link href={member.href} className="inline-flex items-center gap-2 text-meta hover:text-foreground transition-colors group/btn">
                                            View Architectural Log
                                            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Trust and ongoing partnership --- */}
            <section className="border-t border-foreground/5 bg-foreground/[0.01] py-14 sm:py-20 lg:py-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid gap-5 lg:grid-cols-[1.2fr_1.8fr] lg:gap-8">
                        {/* Why Trust Us card */}
                        <ScrollReveal className="relative space-y-7 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:space-y-10 sm:rounded-[2rem] sm:p-8 lg:rounded-[2.5rem] lg:p-12">
                            <div className="space-y-2">
                                <h2 className="fluid-h2 text-foreground">Why partner with us?</h2>
                            </div>
                            <div className="space-y-6">
                                {trustFactors.map((factor, i) => (
                                    <div key={i} className="group flex flex-col gap-1.5 border-b border-foreground/5 pb-5 last:border-0 last:pb-0">
                                        <span className="text-sm font-black text-foreground uppercase tracking-tight flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-colors" />
                                            {factor.title}
                                        </span>
                                        <p className="text-xs text-foreground/50 group-hover:text-foreground/70 transition-colors uppercase tracking-widest pl-6">{factor.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Managed Infographic carbon card (100% visible on all backgrounds, extremely sleek) */}
                        <ScrollReveal className="relative flex min-h-[350px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-muted p-5 shadow-sm sm:min-h-[420px] sm:rounded-[2rem] sm:p-8 lg:min-h-[450px] lg:rounded-[2.5rem] lg:p-16">
                            <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
                            
                            <div className="relative z-10 space-y-10">
                                
                                <h2 className="fluid-h2 text-foreground">
                                    WE DON&apos;T JUST DELIVER. <br />
                                    <span className="text-foreground/45">WE OPTIMIZE.</span>
                                </h2>
                                <p className="text-base sm:text-lg font-medium text-foreground/70 max-w-xl leading-relaxed">
                                    Our clients subscribe to long-term reliability. We manage hosting, databases, AI model maintenance, and security protocols so you can focus entirely on commercial growth.
                                </p>
                            </div>

                            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-meta pt-8 border-t border-foreground/10">
                                <div className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
                                    <Shield className="w-4 h-4 text-foreground/50" />
                                    <span>✔ NO TECHNICAL HEADACHES</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
                                    <Zap className="w-4 h-4 text-foreground/50" />
                                    <span>✔ PLAN FOR RECOVERY</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
                                    <Database className="w-4 h-4 text-foreground/50" />
                                    <span>✔ MAKE CLOUD COSTS VISIBLE</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors">
                                    <Cpu className="w-4 h-4 text-foreground/50" />
                                    <span>✔ DESIGN FOR RESILIENCE</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* --- Stats Section --- */}
            <section className="border-t border-foreground/5 bg-transparent py-16 sm:py-20 lg:py-28">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-12 md:grid-cols-4 lg:gap-16">
                        {[
                            { value: "AI + Data", label: "INTELLIGENT", sub: "SYSTEMS" },
                            { value: "Products", label: "BUILT FOR", sub: "REAL OPERATIONS" },
                            { value: "US ↔ China", label: "CONNECTED", sub: "DELIVERY" },
                            { value: "End to end", label: "STRATEGY TO", sub: "PRODUCTION" }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                className="text-center group"
                            >
                                <div className="mb-3 text-3xl font-bold leading-tight tracking-tight text-foreground transition-transform duration-500 group-hover:scale-105 sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl">
                                    {stat.value}
                                </div>
                                <div className="text-meta group-hover:text-foreground transition-colors duration-300">
                                    {stat.label}
                                    <span className="block mt-1 text-foreground/30 group-hover:text-foreground/50">{stat.sub}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AIAuditLeadMagnet />

            <Footer />
        </div>
    );
}
