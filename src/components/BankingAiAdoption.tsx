"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    Cpu, TrendingUp, ShieldAlert, 
    ArrowRight, Database, Building2
} from "lucide-react";
import Link from "next/link";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, CartesianGrid
} from 'recharts';

import { cn } from "@/lib/utils";

// Proprietary / Bloomberg AI 2030 Projections
const revenueData = [
    { year: '2024', rev: 95 },
    { year: '2025', rev: 110 },
    { year: '2026', rev: 135 },
    { year: '2027', rev: 170 },
    { year: '2028', rev: 220 },
    { year: '2029', rev: 280 },
    { year: '2030', rev: 370 },
];

const hurdleData = [
    { name: 'Compliance', cost: 100, agentic: 60 },
    { name: 'Risk Mgmt', cost: 100, agentic: 70 },
    { name: 'Customer Ops', cost: 100, agentic: 65 },
];

const adoptionDrivers = [
    {
        title: "Algorithmic Risk Management",
        icon: ShieldAlert,
        description: "Automate KYC/AML pipelines with zero-trust AI agents. Identify anomalous liquidity events and fraud patterns 400x faster than legacy human-in-the-loop systems.",
        metric: "80% Reduction in False Positives"
    },
    {
        title: "Autonomous Wealth Operations",
        icon: TrendingUp,
        description: "Deploy hyper-personalized client portfolios that are dynamically rebalanced in real-time based on macro-economic trigger events.",
        metric: "Target 30% Alpha Generation Boost"
    },
    {
        title: "Predictive Liquidity Routing",
        icon: Database,
        description: "Machine learning models that predict global cash flow crises across ledgers before critical operational thresholds are breached.",
        metric: "99.4% Forecasting Precision"
    }
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] p-4 rounded-xl shadow-xl">
                <p className="text-foreground dark:text-zinc-300 font-bold mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-[12px] font-mono" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-black">${entry.value}B</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CustomTooltipBar = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] p-4 rounded-xl shadow-xl">
                <p className="text-foreground dark:text-zinc-300 font-bold mb-2">{label}</p>
                <p className="text-muted-foreground dark:text-zinc-400 text-[12px] font-mono">
                    Traditional Cost: <span className="text-foreground dark:text-zinc-400 font-black">{payload[0].payload.cost}%</span>
                </p>
                <p className="text-foreground/85 dark:text-foreground text-[12px] font-mono">
                    Agentic AI Cost: <span className="text-foreground dark:text-foreground font-black">{payload[0].payload.agentic}%</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function BankingAiAdoption() {
    return (
        <section className="relative section-spacing overflow-hidden bg-foreground/[0.01] dark:bg-transparent border-y border-border/50 flex flex-col items-center">
            <div className="container-standard relative z-10 w-full max-w-7xl">
                {/* 1. Master Section Header Elements */}
                <div className="flex flex-col mb-12 sm:mb-16 pb-8 sm:pb-12 border-b border-border/50 dark:border-[#27272a]/50">
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background dark:bg-foreground/[0.03] border border-border shadow-sm backdrop-blur-md mb-6 max-w-full flex-wrap justify-center sm:justify-start"
                    >
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_10px_hsl(var(--secondary) / 0.8)] shrink-0" />
                        <span className="text-[7px] sm:text-[8px] md:text-[10px] uppercase font-mono tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.4em] font-black text-foreground/70 dark:text-foreground/40 text-center">
                            FINANCIAL SECTOR INSIGHTS 2030 // INSTITUTIONAL SCALE
                        </span>
                    </motion.div>
                    
                    <h2 className="fluid-h2 text-foreground drop-shadow-sm mb-6 uppercase tracking-tighter">
                        THE <span className="text-secondary font-black drop-shadow-[0_0_15px_hsl(var(--secondary) / 0.4)]">AGENTIC</span> REVOLUTION
                    </h2>
                    
                    <p className="text-foreground/70 dark:text-foreground/40 text-base sm:text-lg lg:text-xl max-w-3xl font-medium leading-relaxed mb-4">
                        The financial sector is gridlocked by fragmented data silos, 14+ disparate ERPs per core, and crippling compliance costs. 
                        By 2030, advanced Agentic AI architectures are projected to unlock <span className="text-secondary font-bold">$370 Billion</span> in annual retail banking profits by autonomously executing decisions without human latency.
                    </p>
                </div>

                {/* 2. Unified Grid System */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    
                    {/* LEFT COLUMN: Data Analytics (7 spans) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* Area Chart: Revenue Unlock */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] rounded-[1.5rem] sm:rounded-[2rem] flex flex-col p-4 sm:p-6 lg:p-8 h-full min-h-[350px] sm:min-h-[400px]"
                        >
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-white tracking-tight flex items-center gap-2">
                                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-foreground shrink-0" />
                                    Profit Unlock Trajectory (Billions)
                                </h3>
                                <p className="text-muted-foreground dark:text-zinc-400 text-[10px] sm:text-xs mt-1">
                                    Agentic AI scaling VS Traditional IT frameworks
                                </p>
                            </div>
                            <div className="flex-grow w-full h-[200px] sm:h-[250px] lg:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#71717a" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#71717a" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="year" stroke="#71717a" fontSize={9} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#71717a" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}B`} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="rev" name="Projected Value" stroke="#71717a" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Bar Chart: Cost Reduction */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] rounded-[1.5rem] sm:rounded-[2rem] flex flex-col p-4 sm:p-6 lg:p-8 h-full min-h-[300px] sm:min-h-[350px]"
                        >
                            <div className="mb-6 sm:mb-8">
                                <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-white tracking-tight flex items-center gap-2">
                                    <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-foreground shrink-0" />
                                    Operational Cost Reductions (Target)
                                </h3>
                                <p className="text-muted-foreground dark:text-zinc-400 text-[10px] sm:text-xs mt-1">
                                    Autonomous disruption of legacy human-in-the-loop dependencies
                                </p>
                            </div>
                            <div className="flex-grow w-full h-[180px] sm:h-[200px] lg:h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={hurdleData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} barGap={0}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="name" stroke="#71717a" fontSize={9} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#71717a" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                                        <Tooltip content={<CustomTooltipBar />} cursor={{ fill: '#27272a', opacity: 0.4 }} />
                                        <Bar dataKey="cost" fill="#3f3f46" radius={[4, 4, 0, 0]} maxBarSize={30} />
                                        <Bar dataKey="agentic" fill="#a1a1aa" radius={[4, 4, 0, 0]} maxBarSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Real-World Adoption (5 Spans) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {adoptionDrivers.map((driver, idx) => {
                            const Icon = driver.icon;
                            return (
                                <motion.div 
                                    key={driver.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] rounded-[1.5rem] sm:rounded-[2rem] flex flex-col p-5 sm:p-6 lg:p-8 group relative overflow-hidden h-full justify-center min-h-[200px] sm:min-h-[240px]"
                                >   
                                    {/* Subtle hover gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] dark:from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-card dark:bg-[#1a1a1c] border border-border/50 dark:border-[#27272a] group-hover:border-foreground/30 transition-colors mb-4 sm:mb-6 shrink-0">
                                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                                        </div>
                                        
                                        <h3 className="text-lg sm:text-xl font-bold text-foreground dark:text-white mb-2 sm:mb-3 tracking-tight group-hover:text-foreground/80 transition-colors">
                                            {driver.title}
                                        </h3>
                                        
                                        <p className="text-muted-foreground dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow">
                                            {driver.description}
                                        </p>
                                        
                                        <div className="mt-auto flex flex-row items-center gap-2.5 pt-4 border-t border-border/50 dark:border-[#27272a]/50 flex-wrap">
                                            <div className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse shrink-0" />
                                            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-foreground/80 leading-tight">
                                                {driver.metric}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* 3. Bottom CTA Integration */}
                <div className="mt-12 sm:mt-20 flex justify-center lg:justify-start w-full">
                    <Link href="/services" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 dark:bg-foreground dark:hover:bg-foreground/90 text-primary-foreground dark:text-background px-6 sm:px-8 py-3.5 sm:py-4 md:px-12 md:py-5 font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 shadow-md">
                            EXPLORE ENTERPRISE SOLUTIONS
                            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
