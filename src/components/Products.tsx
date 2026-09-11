"use client"

import { motion } from "framer-motion"
import { Sparkles, Terminal, Shield, Zap, Database } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const products = [
    {
        title: "AI Sales Agent Templates",
        category: "Lead Gen",
        icon: Zap,
        description: "Production-ready templates for capturing, qualifying, and booking appointments automatically.",
        tag: "Conversion-First"
    },
    {
        title: "Lead Generation Engines",
        category: "Growth",
        icon: Shield,
        description: "Automated systems that identify and engage high-value prospects across multiple channels.",
        tag: "Massive Outreach"
    },
    {
        title: "SaaS Starter Architectures",
        category: "Development",
        icon: Database,
        description: "Scalable, secure full-stack frameworks designed for rapid platform deployment.",
        tag: "Rapid Scale"
    },
    {
        title: "Trading Bot Systems",
        category: "FinTech",
        icon: Terminal,
        description: "High-frequency algorithmic systems for automated market analysis and execution.",
        tag: "Intelligence"
    }
]

export default function Products() {
    return (
        <section id="products" className="relative pt-0 pb-32 px-6 overflow-hidden bg-transparent text-foreground">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 px-6 py-2 rounded-full bg-foreground/5 border border-border mb-10 backdrop-blur-md"
                    >
                        <Sparkles className="w-4 h-4 text-foreground/60" />
                        <span className="text-meta">Elite Product Suite // CATALOG_v4</span>
                    </motion.div>

                    <h2 className="fluid-h2">
                        BATTLE-TESTED <br className="hidden md:block" />
                        <span className="text-foreground/40 font-black">SOFTWARE.</span>
                    </h2>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 rounded-[3rem] overflow-hidden border border-border">
                    {products.map((product, index) => (
                        <Link key={product.title} href="/shop" className="flex h-full">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "relative p-10 lg:p-14 bg-foreground/5 backdrop-blur-md group overflow-hidden hover:bg-foreground/[0.08] transition-all duration-500 hover:border-border w-full h-full",
                                    index === 0 && "md:rounded-tl-[2.8rem]",
                                    index === 1 && "md:rounded-tr-[2.8rem]",
                                    index === 2 && "md:rounded-bl-[2.8rem]",
                                    index === 3 && "last:rounded-br-[2.8rem]"
                                )}
                            >
                                {/* Background Glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                    style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
                                />
                                {/* --- HUD Elements --- */}
                                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-border group-hover:border-white/30 transition-colors" />
                                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-border group-hover:border-white/30 transition-colors" />

                                <div className="absolute top-1/2 right-4 flex flex-col gap-1 items-center opacity-10">
                                    <span className="text-meta vertical-text py-2">PRODUCT_ID:0x{index.toString(16).toUpperCase()}</span>
                                    <div className="w-[1px] h-12 bg-foreground" />
                                </div>

                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex items-start justify-between mb-16">
                                        <div className="w-16 h-16 rounded-xl bg-foreground/5 border border-border flex items-center justify-center text-foreground/40 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground/20 transition-all duration-500 shadow-2xl">
                                            <product.icon className="w-8 h-8" />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-meta text-foreground/40 mb-1">Status // DEPLOYED</span>
                                            <span className="text-meta text-foreground/10">{product.tag}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <span className="text-[8px] font-mono text-foreground/10 mb-5 block tracking-[0.3em] uppercase group-hover:text-foreground/30 transition-colors">
                                            {product.category} // ARCHIVE_v0{index + 1}
                                        </span>
                                        <h3 className="text-3xl lg:text-5xl font-black tracking-[-0.05em] mb-8 uppercase transition-all font-heading leading-[0.9] group-hover:translate-x-4 duration-500">
                                            {product.title}
                                        </h3>
                                        <p className="text-foreground/40 text-[10px] leading-relaxed max-w-sm group-hover:text-foreground/50 transition-colors duration-500 font-black uppercase tracking-[0.1em] opacity-60">
                                            {product.description}
                                        </p>

                                        <div className="mt-16 w-full h-px bg-foreground/5 rounded-full overflow-hidden relative">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.5, delay: index * 0.2 }}
                                                className="h-full bg-foreground/20 leading-none shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                            />
                                            <div className="absolute inset-0 bg-foreground/5 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link href="/shop" className="flex items-center gap-4 text-foreground/40 hover:text-foreground transition-all font-bold text-sm uppercase tracking-widest group">
                        <span className="h-px w-12 bg-foreground/10 group-hover:w-20 group-hover:bg-foreground transition-all" />
                        Explore Our Shop
                        <span className="h-px w-12 bg-foreground/10 group-hover:w-20 group-hover:bg-foreground transition-all" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
