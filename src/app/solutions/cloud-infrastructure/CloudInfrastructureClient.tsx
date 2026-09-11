"use client"

import React from "react"
import { motion } from "framer-motion"
import SolutionLayout from "@/components/layouts/SolutionLayout"
import Link from "next/link"
import {
    Cloud,
    Server,
    ShieldCheck,
    Zap,
    Activity,
    Database,
    ArrowRight
} from "lucide-react"

const features = [
    {
        title: "Big Data Engineering",
        description: "Architecting high-performance data pipelines and warehouses capable of processing enterprise-scale intelligence.",
        icon: Database
    },
    {
        title: "Managed Infrastructure",
        description: "subscription-based cloud management, hosting, and optimization to ensure zero-downtime operations.",
        icon: Server
    },
    {
        title: "Industrial-Scale Cloud",
        description: "Cloud-native architectures defined by horizontal scalability and sub-10ms global latency protocols.",
        icon: Cloud
    },
    {
        title: "Security Hardening",
        description: "Enterprise-grade security layers and proactive threat detection protocols built into the system core.",
        icon: ShieldCheck
    },
    {
        title: "Automated Deployments",
        description: "Zero-friction CI/CD pipelines that ensure rapid, reliable, and secure code transitions to production.",
        icon: Zap
    },
    {
        title: "Managed Maintenance",
        description: "Perpetual monitoring and proactive patching to eliminate technical headaches and unmanaged bills.",
        icon: Activity
    }
];

export default function CloudInfrastructureClient() {
    return (
        <SolutionLayout
            currentSolutionId="cloud-infrastructure"
            title="Cloud & Infra"
            subtitle="Building high-performance, resilient foundation that scales horizontally with your enterprise demands."
        >
            <div className="space-y-32">
                {/* Intro Section */}
                <section>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="fluid-h2">RESILIENCE BY DESIGN.</h2>
                            <p className="text-body text-lg">
                                Infrastructure shouldn't be a bottleneck. We build cloud-native environments
                                that are elastic, self-healing, and fully automated. Our DevOps experts
                                bridge the gap between code and production.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                {["Terraform", "Kubernetes", "AWS", "Azure", "Docker", "Prometheus"].map(tech => (
                                    <span key={tech} className="px-3 py-1 rounded-md bg-foreground/5 border border-border text-xs text-foreground/40 font-bold uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 border border-border flex items-center justify-center group">
                            <motion.div
                                animate={{
                                    rotate: [0, 360]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Cloud className="w-40 h-40 text-foreground opacity-10 group-hover:opacity-20 transition-opacity" />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 p-6 bg-transparent/60 backdrop-blur-xl border border-border rounded-2xl">
                                <span className="text-foreground font-black text-2xl block tracking-tighter">{"< 50ms"}</span>
                                <span className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em]">Global Latency</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section>
                    <div className="mb-12">
                        <span className="text-subheading mb-4">Operations</span>
                        <h2 className="fluid-h2">CLOUD-NATIVE EXCELLENCE.</h2>
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

                {/* Infrastructure CTA */}
                <section className="relative p-12 rounded-[3.5rem] bg-background border border-border overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 p-12">
                        <Database className="w-20 h-20 text-foreground opacity-[0.03]" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="fluid-h2 text-foreground">SCALE YOUR <br /> FOUNDATION TODAY.</h2>
                        <p className="text-foreground/40 mb-8 font-medium">
                            Optimize your cloud costs and improve system reliability with an infrastructure audit.
                        </p>
                        <Link href="/contact">
                            <button className="btn-institutional group">
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    Infrastructure Strategy
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
