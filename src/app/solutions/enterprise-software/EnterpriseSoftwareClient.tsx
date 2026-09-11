"use client"

import React from "react"
import { motion } from "framer-motion"
import SolutionLayout from "@/components/layouts/SolutionLayout"
import Link from "next/link"
import {
    Code,
    Layers,
    Shield,
    Zap,
    Terminal,
    Database,
    Globe,
    Lock,
    ArrowRight
} from "lucide-react"

const features = [
    {
        title: "Full Stack SaaS Platforms",
        description: "End-to-end web applications built with Next.js 15+, optimized for high performance and global scale.",
        icon: Globe
    },
    {
        title: "Custom Database Design",
        description: "High-performance data architectures tailored to your specific query patterns and scaling requirements.",
        icon: Database
    },
    {
        title: "Mission-Critical Systems",
        description: "Reliable, fault-tolerant architectures designed to handle complex enterprise business logic without failure.",
        icon: Shield
    },
    {
        title: "API-First Engineering",
        description: "Secure, high-throughput API layers that facilitate seamless integration across your entire ecosystem.",
        icon: Zap
    },
    {
        title: "Legacy Modernization",
        description: "Transforming monolithic legacy architectures into sleek, modular, and cloud-native software units.",
        icon: Code
    },
    {
        title: "Managed Software Ops",
        description: "Continuous maintenance and optimization of your codebase to ensure long-term stability and security.",
        icon: Layers
    }
];

export default function EnterpriseSoftwareClient() {
    return (
        <SolutionLayout
            currentSolutionId="enterprise-software"
            title="Enterprise Software"
            subtitle="Building the digital backbone of modern organizations with scalable, resilient, and secure application architectures."
        >
            <div className="space-y-32">
                {/* Intro Section */}
                <section>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="fluid-h2">ENGINEERING FOR SCALE.</h2>
                            <p className="text-body text-lg">
                                We design software that grows with you. Our enterprise solutions are built on the
                                latest technical standards, ensuring they remain performant under load and
                                maintainable for years to come.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                {["Node.js", "Python", "Go", "React", "PostgreSQL", "Redis"].map(tech => (
                                    <span key={tech} className="px-3 py-1 rounded-md bg-foreground/5 border border-border text-xs text-foreground/40 font-bold uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-border flex items-center justify-center group">
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    y: [0, -10, 0]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Code className="w-40 h-40 text-foreground opacity-10 group-hover:opacity-20 transition-opacity" />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 p-6 bg-transparent/60 backdrop-blur-xl border border-border rounded-2xl">
                                <span className="text-foreground font-black text-2xl block tracking-tighter">99.99%</span>
                                <span className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em]">System Availability</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section>
                    <div className="mb-12">
                        <span className="text-subheading mb-4">Core Competencies</span>
                        <h2 className="fluid-h2">FULL-STACK EXCELLENCE.</h2>
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

                {/* Architecture CTA */}
                <section className="relative p-12 rounded-[3rem] bg-background border border-border overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 p-12">
                        <Layers className="w-20 h-20 text-foreground opacity-[0.03]" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="fluid-h2 text-foreground">READY TO MODERNIZE <br /> YOUR TECH STACK?</h2>
                        <p className="text-foreground/40 mb-8 font-medium">
                            Schedule a deep-dive technical workshop with our lead architects to plan your next major release.
                        </p>
                        <Link href="/contact">
                            <button className="btn-institutional group">
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    Talk to an Architect
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </span>
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </SolutionLayout>
    )
}
