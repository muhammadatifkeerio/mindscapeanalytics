"use client"

import React from "react"
import { motion } from "framer-motion"
import SolutionLayout from "@/components/layouts/SolutionLayout"
import Link from "next/link"
import {
    Shield,
    Zap,
    Lock,
    Globe,
    Database,
    Link as LinkIcon,
    Terminal,
    Key,
    Code,
    ArrowRight
} from "lucide-react"

const features = [
    {
        title: "Smart Contract Engineering",
        description: "Developing hyper-secure, gas-optimized smart contracts for Ethereum, Solana, and Layer 2 ecosystems.",
        icon: Code
    },
    {
        title: "DeFi Protocol Development",
        description: "Architecting decentralized financial systems with robust liquidity mechanisms and governance models.",
        icon: Database
    },
    {
        title: "Private Ledger Integration",
        description: "Implementing Hyperledger and Corda for enterprise-specific privacy and permissioned networks.",
        icon: Lock
    },
    {
        title: "Asset Tokenization (RWAs)",
        description: "Bringing Real World Assets onto the chain with compliant, transparent tokenization frameworks.",
        icon: LinkIcon
    },
    {
        title: "Cross-Chain Interoperability",
        description: "Building bridges and communication layers that allow value and data to move across chains seamlessly.",
        icon: Globe
    },
    {
        title: "Web3 Identity & Auth",
        description: "Implementing decentralized identity solutions that put users in control of their own data and credentials.",
        icon: Key
    }
]

export default function BlockchainClient() {
    return (
        <SolutionLayout
            currentSolutionId="blockchain"
            title="Blockchain"
            subtitle="Architecting decentralized trust systems that redefine transparency, security, and digital ownership."
        >
            <div className="space-y-32">
                {/* Intro Section */}
                <section>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="fluid-h2">THE TRUST LAYER.</h2>
                            <p className="text-body text-lg">
                                Blockchain isn't about the hype. It's about building systems where trust is
                                mathematical, not institutional. We help enterprises leverage decentralized
                                architectures to solve complex coordination problems.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                {["Solidity", "Rust", "Ethereum", "Solana", "Hyperledger", "Zero Knowledge"].map(tech => (
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
                                    rotateY: [0, 360]
                                }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            >
                                <Shield className="w-40 h-40 text-foreground opacity-10 group-hover:opacity-20 transition-opacity" />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 p-6 bg-transparent/60 backdrop-blur-xl border border-border rounded-2xl">
                                <span className="text-foreground font-black text-2xl block tracking-tighter">PHASE 0</span>
                                <span className="text-foreground/40 text-[10px] font-bold uppercase tracking-[0.2em]">Optimized Contracts</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section>
                    <div className="mb-12">
                        <span className="text-subheading mb-4">Ecosystem</span>
                        <h2 className="fluid-h2">WEB3 ENGINEERING.</h2>
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

                {/* Blockchain CTA */}
                <section className="relative p-12 rounded-[3rem] bg-background border border-border overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 right-0 p-12">
                        <Lock className="w-20 h-20 text-foreground opacity-[0.03]" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="fluid-h2 text-foreground">SECURE YOUR <br /> DIGITAL FUTURE.</h2>
                        <p className="text-foreground/40 mb-8 font-medium">
                            From smart contract audits to full protocol design, our Web3 engineers deliver secure decentralization.
                        </p>
                        <Link href="/contact">
                            <button className="btn-institutional group">
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    Protocol Strategy
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
