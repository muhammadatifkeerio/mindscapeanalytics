"use client"

import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-transparent text-foreground relative">
            <Navbar />
            <main className="relative pt-44 pb-32 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <h1 className="text-5xl md:text-7xl font-black font-heading uppercase tracking-[-0.05em]" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
                        TERMS OF <span className="text-foreground/20">SERVICE.</span>
                    </h1>

                    <div className="space-y-8 text-foreground/60 font-medium uppercase tracking-tight leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-foreground text-xl font-black tracking-widest border-l-2 border-foreground/20 pl-4">SERVICE_PROVISION // 01</h2>
                            <p>Mindscape Analytics provides high-performance architectural assets and managed infrastructure services subject to individual SLA agreements.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-foreground text-xl font-black tracking-widest border-l-2 border-foreground/20 pl-4">INTELLECTUAL_CORE // 02</h2>
                            <p>All underlying codebases, AI weights, and system logic remain the property of Mindscape Analytics unless explicitly transferred via Tier-3 acquisition protocol.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-foreground text-xl font-black tracking-widest border-l-2 border-foreground/20 pl-4">LIABILITY_BOUNDS // 03</h2>
                            <p>While we engineer for 99.99% uptime, we are not liable for autonomous reasoning variations or third-party API dependencies (Vapi, Retell, OpenAI).</p>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    )
}
