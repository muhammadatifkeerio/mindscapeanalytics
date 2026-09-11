"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Brain,
    Code,
    Cloud,
    Shield,
    ArrowRight,
    ChevronRight,
    CheckCircle2
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const solutions = [
    {
        id: "ai-genai",
        name: "Intelligent AI Ecosystems",
        icon: Brain,
        href: "/solutions/ai-genai"
    },
    {
        id: "cloud-infrastructure",
        name: "Industrial Cloud Foundations",
        icon: Cloud,
        href: "/solutions/cloud-infrastructure"
    },
    {
        id: "enterprise-software",
        name: "Enterprise Core Systems",
        icon: Code,
        href: "/solutions/enterprise-software"
    },
    {
        id: "services",
        name: "Managed Operation Units",
        icon: Shield,
        href: "/services"
    }
];

interface SolutionLayoutProps {
    children: React.ReactNode
    currentSolutionId: string
    title: string
    subtitle: string
    heroImage?: string
}

export default function SolutionLayout({
    children,
    currentSolutionId,
    title,
    subtitle,
    heroImage
}: SolutionLayoutProps) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-transparent text-foreground relative overflow-x-clip">
            {/* Cinematic Background Layer - Harmonized with Global */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-10 left-0 w-[60%] h-[60%] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-20" />
                <div className="absolute bottom-10 right-0 w-[50%] h-[50%] translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] opacity-15" />
            </div>
            <Navbar />

            {/* Premium Solution Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,black,transparent)] opacity-10" />

                {/* Background Glow - Optimized */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />

                <div className="container-standard relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-meta mb-4 block">Solutions Architecture</span>
                        <h1 className="fluid-h1 mb-8">
                            {title}
                        </h1>
                        <p className="fluid-body max-w-3xl mx-auto opacity-60">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-standard py-20">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sticky Sidebar Navigation */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h3 className="text-foreground font-black text-sm uppercase tracking-widest mb-6 border-b border-border pb-4">
                                    Our Solutions
                                </h3>
                                <nav className="space-y-2">
                                    {solutions.map((solution) => {
                                        const isActive = solution.id === currentSolutionId
                                        return (
                                            <Link
                                                key={solution.id}
                                                href={solution.href}
                                                className={cn(
                                                    "flex items-center justify-between p-4 rounded-xl transition-all group",
                                                    isActive
                                                        ? "bg-foreground text-background font-bold border-transparent"
                                                        : "bg-foreground/5 border border-border text-foreground/40 hover:text-foreground hover:bg-foreground/10"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <solution.icon className={cn("w-5 h-5", isActive ? "text-background" : "group-hover:text-foreground transition-colors")} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{solution.name}</span>
                                                </div>
                                                <ChevronRight className={cn("w-4 h-4 opacity-0 transition-all", isActive ? "opacity-100" : "group-hover:opacity-100 group-hover:translate-x-1")} />
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>

                            {/* Sidebar CTA - Glassmorphism */}
                            <div className="p-8 rounded-2xl bg-foreground/[0.02] backdrop-blur-xl border border-border">
                                <h4 className="text-xl font-bold mb-4">Need a custom solution?</h4>
                                <p className="text-sm text-foreground/40 mb-6">
                                    Our engineers are ready to build the next generation of your enterprise.
                                </p>
                                <Link href="/contact" className="flex items-center text-sm font-bold group">
                                    Contact Us
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="w-full flex-1">
                        {children}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}
