"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
    Users,
    Code,
    Palette,
    Database,
    BarChart3,
    Cpu,
    Zap,
    Globe,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import CinematicBackground from "@/components/CinematicBackground";

const TALENT_POOLS = [
    {
        title: "AI & Machine Learning Engineers",
        description: "Specialized in LLMs, Neural Networks, and Predictive Analytics. Our experts build the brains of modern enterprise.",
        icon: Cpu,
        skills: ["PyTorch", "TensorFlow", "OpenAI API", "HuggingFace"]
    },
    {
        title: "Full-Stack Architects",
        description: "End-to-end development using modern stacks. Scalable, secure, and performant digital infrastructure.",
        icon: Code,
        skills: ["Next.js", "React", "Node.js", "Python", "Go"]
    },
    {
        title: "UI/UX Experience Designers",
        description: "Crafting high-fidelity, user-centric interfaces that blend aesthetic excellence with functional precision.",
        icon: Palette,
        skills: ["Figma", "Design Systems", "Prototyping", "Motion Design"]
    },
    {
        title: "Data Engineers & Architects",
        description: "Building robust data pipelines and warehousing solutions for high-velocity industrial data streams.",
        icon: Database,
        skills: ["SQL", "NoSQL", "Spark", "Kafka", "ETL Systems"]
    },
    {
        title: "BI & Data Analysts",
        description: "Translating raw data into strategic intelligence. Advanced dashboarding and predictive trend analysis.",
        icon: BarChart3,
        skills: ["Tableau", "Power BI", "Python", "R", "Advanced SQL"]
    }
];

const ENGAGEMENT_MODELS = [
    {
        title: "Managed Delivery",
        description: "Full end-to-end project execution handled by MSA teams.",
        icon: ShieldCheck
    },
    {
        title: "Staff Augmentation",
        description: "Seamless integration of our experts into your existing internal teams.",
        icon: Users
    },
    {
        title: "Strategic Consulting",
        description: "High-level architectural guidance and technology roadmapping.",
        icon: Zap
    }
];

export default function OutsourcingPage() {
    return (
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative overflow-hidden">
            <CinematicBackground />
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-32 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-foreground/5 border border-border rounded-full mb-8"
                        >
                            <Globe size={14} className="text-foreground/40" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/60">Global Talent Network</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-none"
                        >
                            Outsourced <span className="text-secondary">Intelligence.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl mx-auto text-foreground/40 text-sm md:text-base font-medium uppercase tracking-[0.2em] leading-relaxed"
                        >
                            Scale your enterprise with high-fidelity technical talent curated by Mindscape Analytics.
                        </motion.p>
                    </div>

                    {/* Talent Pools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
                        {TALENT_POOLS.map((pool, i) => {
                            const Icon = pool.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-10 bg-foreground/[0.02] border border-border rounded-[3rem] hover:border-foreground/20 transition-all duration-700 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-10 text-foreground/[0.02] group-hover:text-foreground/[0.05] transition-colors">
                                        <Icon size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-foreground/5 border border-border rounded-2xl flex items-center justify-center mb-8 group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{pool.title}</h3>
                                        <p className="text-foreground/40 text-sm font-medium leading-loose mb-8">
                                            {pool.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {pool.skills.map((skill, j) => (
                                                <span key={j} className="px-3 py-1 bg-foreground/5 border border-border rounded-lg text-[9px] font-black uppercase tracking-widest text-foreground/60">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Procedures Section */}
                    <div className="bg-foreground/[0.03] border border-border rounded-[4rem] p-12 md:p-24 mb-40 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
                                    Our <span className="text-secondary">Vetting Process.</span>
                                </h2>
                                <p className="text-foreground/40 text-sm md:text-base font-medium leading-loose mb-12">
                                    At MSA, we don't just match resumes. We verify intelligence. Every engineer in our network undergoes rigorous architectural evaluation, code-efficiency audits, and cultural synchronization tests.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        "Phase 01: Multi-Staged Technical Audit",
                                        "Phase 02: Architectural Capability Assessment",
                                        "Phase 03: Distributed Team Sync Evaluation",
                                        "Phase 04: Continuous Alignment Monitoring"
                                    ].map((step, k) => (
                                        <div key={k} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em]">
                                            <div className="w-6 h-px bg-foreground/20" />
                                            {step}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                {ENGAGEMENT_MODELS.map((model, l) => {
                                    const ModelIcon = model.icon;
                                    return (
                                        <div key={l} className="p-8 bg-foreground/[0.02] backdrop-blur-xl border border-border rounded-3xl hover:border-foreground/20 transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground/40 group-hover:text-foreground transition-colors">
                                                    <ModelIcon size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black uppercase tracking-widest text-xs mb-1">{model.title}</h4>
                                                    <p className="text-[10px] text-foreground/30">{model.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-gradient-to-b from-white/[0.05] to-transparent border border-border rounded-[3rem] p-20">
                        <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tighter">
                            Begin Your <span className="text-secondary">Team Expansion.</span>
                        </h2>
                        <button className="px-12 py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-foreground/90 transition-all active:scale-95 flex items-center gap-4 mx-auto group">
                            Schedule Technical Audit
                            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div >
            </main >

            <Footer />
        </div >
    );
}
