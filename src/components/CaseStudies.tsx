"use client"

import React, { useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import {
    BarChart3,
    Brain,
    TrendingUp,
    Phone,
    ArrowRight,
    ExternalLink,
    Landmark,
    LineChart,
    Factory
} from "lucide-react"

const caseStudies = [
    {
        title: "Tenvo",
        category: "Hospitality POS",
        icon: Brain,
        metrics: "99.9% Uptime",
        description: "Next-generation Restraint Management POS system engineered for high-volume environments. Features advanced seat-map automation and real-time inventory sync.",
        image: "/images/projects/restraint-pos_opt.webp"
    },
    {
        title: "Enterprise ERP",
        category: "Industrial Management",
        icon: BarChart3,
        metrics: "ROI +450%",
        description: "Comprehensive 2026 ERP suite for large-scale operations. Automated resource planning with integrated AI forecasting and global supply chain visibility.",
        image: "/images/projects/enterprise-erp_opt.webp"
    },
    {
        title: "DBLynx Autonomous Hub",
        category: "Banking Intelligence",
        icon: Landmark,
        metrics: "95% Human Reduction",
        description: "Autonomous data agents for a regional bank, capable of real-time fraud mitigation and self-healing portfolio analysis on $36.8M in active assets.",
        image: "/images/projects/dblynx-database-intelligence-mindscapeanalytics_opt.webp",
        link: "/projects/dblynx-regional-bank"
    },
    {
        title: "Fuel Station ERP",
        category: "Energy Tech",
        icon: Factory,
        metrics: "Elite Security",
        description: "Mission-critical Fuel Station management system with automated pump synchronization, hazardous material tracking, and enterprise-grade accounting.",
        image: "/images/projects/fuel-station-erp_opt.webp",
        link: "/projects/fuel-station-erp"
    }
]

export default function CaseStudies() {
    const containerRef = useRef(null)

    return (
        <section ref={containerRef} id="case-studies" className="relative section-spacing overflow-hidden bg-transparent">
            <div className="container-standard">
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-32 border-b border-border pb-12">
                    <div className="max-w-4xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-[0.5em] font-black">Archive // MISSION_LOGS_v2</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="fluid-h2"
                        >
                            PROVEN <br /> <span className="text-foreground/40 font-black">SUCCESS.</span>
                        </motion.h2>
                    </div>
                </div>
                {/* Horizontal Layout / Staggered Cards */}
                <div className="space-y-32">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={cn(
                                "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
                                index % 2 === 1 && "lg:flex-row-reverse"
                            )}
                        >
                            {/* Image Container */}
                            <div className="w-full lg:w-1/2 relative group">
                                <div className="absolute -inset-4 bg-foreground/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-1000" />
                                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border group-hover:border-foreground/20 transition-all duration-500 shadow-2xl">
                                    <Image
                                        src={study.image}
                                        alt={study.title}
                                        fill
                                        priority={index === 0}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                        loading={index < 2 ? "eager" : "lazy"}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                    {/* --- Industrial HUD --- */}
                                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center opacity-40">
                                            <div className="w-full h-px bg-foreground/40" />
                                            <div className="h-full w-px bg-foreground/40 absolute" />
                                            <div className="w-12 h-12 border border-white/40 rounded-full" />
                                        </div>
                                        <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/60" />
                                        <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/60" />
                                    </div>

                                    {/* Floating Metric Banner */}
                                    <div className="absolute bottom-6 left-6 p-6 rounded-xl bg-transparent/95 backdrop-blur-2xl border border-border flex items-center gap-4 z-20 transition-colors shadow-2xl group-hover:border-foreground/20">
                                        <div className="w-12 h-12 rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-foreground/60">
                                            <study.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-foreground font-black text-xl leading-none tracking-tighter uppercase">{study.metrics}</span>
                                            <span className="text-meta text-foreground/20 mt-2">Status // VERIFIED_DATA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text content */}
                            <div className="w-full lg:w-1/2 space-y-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-1 bg-foreground/60 rounded-full animate-pulse" />
                                        <span className="text-[9px] font-mono text-foreground/20 uppercase tracking-[0.5em] font-black">{study.category} // CASE_ID_0{index + 1}</span>
                                    </div>
                                    <h3 className="text-4xl md:text-6xl font-black text-foreground leading-[0.9] tracking-[-0.05em] uppercase font-heading group-hover:text-foreground transition-colors">
                                        {study.title}
                                    </h3>
                                </div>

                                <p className="text-foreground/40 text-sm md:text-lg leading-relaxed max-w-md font-medium tracking-tight">
                                    {study.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-8 pt-6">
                                    <Link href="/projects">
                                        <button className="btn-primary">
                                            VIEW CASE STUDY
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </Link>
                                    <Link href="/contact">
                                        <button className="text-meta text-foreground/20 hover:text-foreground transition-all flex items-center gap-3 group/docs">
                                            TECHNICAL SPECIFICATIONS
                                            <ExternalLink className="w-3.5 h-3.5 opacity-20 group-hover/docs:opacity-60" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div >
        </section >
    )
}
