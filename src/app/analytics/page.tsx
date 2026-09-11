"use client"

import React from "react"
import { motion } from "framer-motion"
import {
    LineChart,
    BarChart,
    PieChart,
    Activity,
    Zap,
    Target,
    ArrowUpRight,
    TrendingUp,
    RefreshCw
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const stats = [
    { label: "Active Nodes", value: "1,248", icon: Activity, trend: "+12%" },
    { label: "Forecast Accuracy", value: "94.2%", icon: Target, trend: "+3%" },
    { label: "Throughput", value: "8.4GB/s", icon: Zap, trend: "+18%" }
]

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-transparent text-foreground">
            <Navbar />

            {/* Dashboard Header */}
            <section className="relative pt-44 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
                        <div>
                            <span className="text-subheading mb-4 block">Real-time Intelligence</span>
                            <h1
                                className="text-6xl md:text-8xl font-black tracking-tighter leading-tight"
                                style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
                            >
                                PREDICTIVE <br />
                                <span className="text-foreground/30 text-[0.8em]">DASHBOARD</span>
                            </h1>
                        </div>
                        <div className="flex gap-4">
                            <button className="btn-ghost flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" />
                                Refresh Data
                            </button>
                            <button className="btn-primary">
                                Export Report
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-3xl bg-foreground/5 border border-border"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-foreground/5">
                                        <stat.icon className="w-6 h-6 text-foreground/40" />
                                    </div>
                                    <span className="text-foreground text-xs font-black px-2 py-1 bg-foreground/10 rounded-md tracking-wider">{stat.trend}</span>
                                </div>
                                <span className="text-foreground/40 text-sm uppercase tracking-widest font-bold mb-1 block">{stat.label}</span>
                                <span className="text-4xl font-black">{stat.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Chart Placeholders */}
            <section className="pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Main Chart */}
                        <div className="lg:col-span-2 p-12 rounded-[2.5rem] bg-background border border-border relative overflow-hidden group">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black tracking-tight">Predictive Growth Mapping</h3>
                                <TrendingUp className="w-6 h-6 text-foreground/20" />
                            </div>
                            <div className="h-[400px] w-full flex items-end justify-between gap-4">
                                {[40, 60, 45, 90, 65, 80, 55, 70, 40, 100, 85, 95].map((val, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        transition={{ delay: i * 0.05, duration: 1, ease: "easeOut" }}
                                        className="flex-1 bg-gradient-to-t from-white/10 to-white/40 rounded-t-lg group-hover:to-white/60 transition-all"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Secondary Charts */}
                        <div className="p-12 rounded-[2.5rem] bg-background border border-border">
                            <h4 className="text-xl font-black mb-8 tracking-tight">Signal Distribution</h4>
                            <div className="aspect-square flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 border-[20px] border-border rounded-full"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-8 border-[20px] border-border rounded-full"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PieChart className="w-12 h-12 text-foreground/40" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 rounded-[2.5rem] bg-background border border-border">
                            <h4 className="text-xl font-black mb-8 tracking-tight">Resource Allocation</h4>
                            <div className="space-y-6">
                                {[
                                    { label: "Deep Learning Engine", val: 85 },
                                    { label: "Vector Indexing", val: 62 },
                                    { label: "API Gateway", val: 41 },
                                    { label: "Security Layer", val: 93 }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-foreground/40">
                                            <span>{item.label}</span>
                                            <span>{item.val}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.val}%` }}
                                                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                                                className="h-full bg-foreground/40"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
