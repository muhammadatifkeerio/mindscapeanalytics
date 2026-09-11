"use client"

import React from "react"
import { motion } from "framer-motion"
import SolutionLayout from "@/components/layouts/SolutionLayout"
import Link from "next/link"
import {
    BrainCircuit,
    Sparkles,
    Database,
    Zap,
    Bot,
    Mic,
    ShieldCheck,
    Cpu
} from "lucide-react"

const features = [
    {
        title: "Agentic Workflow Design",
        description: "Autonomous AI agents that reason through multi-step business logic to eliminate manual operational bottlenecks.",
        icon: BrainCircuit
    },
    {
        title: "AI Voice Call Agents",
        description: "Industrial-grade voice systems (Vapi/Retell) for human-like appointment booking and support at scale.",
        icon: Mic
    },
    {
        title: "Lead Generation Engines",
        description: "Automated systems that identify, qualify, and capture high-intent prospects across digital ecosystems.",
        icon: Zap
    },
    {
        title: "Custom LLM Fine-tuning",
        description: "Training specialized models on your private data to ensure brand alignment and technical precision.",
        icon: Sparkles
    },
    {
        title: "Enterprise RAG Systems",
        description: "Retrieval-Augmented Generation connecting AI to your live databases with secure sync protocols.",
        icon: Database
    },
    {
        title: "AI Chatbots (Sales)",
        description: "24/7 intelligent sales assistants that drive conversions and handle complex customer queries frictionlessly.",
        icon: Bot
    }
];

export default function AIGenAIClient() {
    return (
        <SolutionLayout
            currentSolutionId="ai-genai"
            title="AI & GenAI"
            subtitle="Architecting context-aware intelligence that transforms how enterprises think, create, and operate."
        >
            <div className="space-y-32">
                {/* Intro Section */}
                <section>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="fluid-h2">INTELLIGENCE AS INFRASTRUCTURE.</h2>
                            <p className="text-body text-lg">
                                We believe AI shouldn't just be a chatbot in the corner. It should be the foundation
                                of your business logic. Our team builds deeply integrated AI systems that
                                automate reasoning, not just tasks.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                {["GPT-4o", "Claude 3.5", "Llama 3", "Gemini Pro"].map(tech => (
                                    <span key={tech} className="px-3 py-1 rounded-md bg-foreground/5 border border-border text-xs text-foreground/40 font-bold uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-border flex items-center justify-center group">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <BrainCircuit className="w-40 h-40 text-foreground opacity-10 group-hover:opacity-20 transition-opacity" />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 p-6 bg-transparent/60 backdrop-blur-xl border border-border rounded-2xl">
                                <span className="text-foreground font-black text-2xl block tracking-tighter">98%</span>
                                <span className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em]">Accuracy Improvement</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section>
                    <div className="mb-12">
                        <span className="text-subheading mb-4">Capabilities</span>
                        <h2 className="fluid-h2">CORE AI ENGINEERING.</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-foreground/[0.03] border border-border hover:border-foreground/20 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-6 h-6 text-foreground/60 group-hover:text-foreground transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-foreground/40 text-sm leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Methodology CTA */}
                <section className="relative p-12 rounded-[3rem] bg-foreground/[0.02] backdrop-blur-xl border border-border overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 p-12">
                        <Sparkles className="w-20 h-20 text-foreground opacity-[0.03]" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="fluid-h2 text-foreground">READY TO INTEGRATE <br /> INTELLIGENCE?</h2>
                        <p className="text-foreground/40 mb-8 font-medium">
                            Our team conducts deep technical audits to identify the high-impact AI opportunities
                            within your existing tech stack.
                        </p>
                        <Link href="/contact">
                            <button className="btn-institutional group">
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    Speak to an AI Architect
                                    <Zap className="w-4 h-4 transition-transform group-hover:scale-125" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </SolutionLayout>
    )
}
