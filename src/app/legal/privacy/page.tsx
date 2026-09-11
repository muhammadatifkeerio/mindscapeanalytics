"use client"

import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"

export default function PrivacyPage() {
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
                        PRIVACY PROTOCOL.
                    </h1>

                    <div className="space-y-8 text-foreground/60 font-medium uppercase tracking-tight leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-foreground text-xl font-black tracking-widest border-l-2 border-foreground/20 pl-4">DATA_COLLECTION // 01</h2>
                            <p>We collect industrial-grade data necessary for system optimization, including technical telemetry, communication metadata, and deployment logs.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-foreground text-xl font-black tracking-widest border-l-2 border-foreground/20 pl-4">USAGE_GOVERNANCE // 02</h2>
                            <p>Data is utilized exclusively for performance engineering, secure communication, and architectural refinement. We do not sell or trade institutional assets.</p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-foreground text-xl font-black tracking-widest border-l-2 border-foreground/20 pl-4">ENCRYPTION_STANDARDS // 03</h2>
                            <p>All data persists within AES-256 encrypted environments with multi-node redundancy and zero-trust access protocols.</p>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    )
}
