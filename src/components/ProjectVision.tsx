"use client";

import React, { useState, useEffect } from "react";
import {
    motion,
    useTransform,
    useSpring,
    useMotionValue,
    useReducedMotion,
    AnimatePresence,
} from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// --- Types ---
interface ProjectData {
    title: string;
    category: string;
    description: string;
    metrics: string;
    image: string;
    details: string[];
    status?: "live" | "coming-soon";
    link?: string;
}

// --- Projects Data ---
const PROJECTS: ProjectData[] = [
    {
        title: "DisposIQ",
        category: "Enterprise Intelligence",
        metrics: "Zero Data Loss • Real-time Sync",
        description: "Next-gen production and disposal management ecosystem for enterprise-scale industrial operations.",
        image: "/images/projects/disposiq.webp",
        details: ["Smart Reconciliation", "Autonomous Logging", "Multi-site Sync"],
        status: "live",
        link: "https://disposiq.mindscapeanalytics.com/"
    },
    {
        title: "Smart DairyFarm",
        category: "Agri-Tech Platform",
        metrics: "ROI +35% • Live Monitoring",
        description: "Comprehensive OS for modern dairy farms, managing everything from herd health to milk production lifecycles.",
        image: "/images/projects/smart-dairy.webp",
        details: ["Herd Intelligence", "Milk Cycle Automation", "Feed Inventory AI"],
        status: "live",
        link: "https://cattle.mindscapeanalytics.com/"
    },
    {
        title: "RSIQ Pro",
        category: "FinTech Intelligence",
        metrics: "High-Confluence • Real-time Alerts",
        description: "Advanced scanning and signal generation platform for institutional-grade market analysis.",
        image: "/images/projects/rsiq-pro.webp",
        details: ["Multi-indicator Confluence", "Sentiment AI", "Custom Alert Engine"],
        status: "live",
        link: "https://rsiq.mindscapeanalytics.com/"
    },
    {
        title: "Tenvo",
        category: "Business Hub",
        metrics: "Coming Soon • Scaling Ops",
        description: "Advanced intelligent solution designed to automate and accelerate business growth trajectories.",
        image: "/images/projects/tenvo.webp",
        details: ["Growth Automation", "Predictive Analytics", "CRM Intelligence"],
        status: "coming-soon",
        link: "https://tenvo.mindscapeanalytics.com/"
    },
    {
        title: "CyberTrader-X",
        category: "Autonomous Trading",
        metrics: "Coming Soon • Daily Alpha",
        description: "Cutting-edge autonomous system for high-frequency trading across Forex, Crypto, and Metals.",
        image: "/images/projects/cybertrader-x.webp",
        details: ["Intraday Intelligence", "Swing Scaling", "Metals Precision"],
        status: "coming-soon",
        link: "https://traderx.mindscapeanalytics.com/"
    },
    {
        title: "Enterprise ERP",
        category: "Industrial Management",
        metrics: "ROI +450% • AI Forecasting",
        description: "Comprehensive 2026 ERP suite for large-scale operations with global supply chain visibility.",
        image: "/images/projects/enterprise-erp_opt.webp",
        details: ["AI Forecasting", "Supply Chain Viz", "Resource Planning"]
    },
    {
        title: "Super Market ERP",
        category: "Retail Tech",
        metrics: "Zero Leakage • 100K SKUs",
        description: "Unified retail intelligence platform combining POS precision with backend ERP automation.",
        image: "/images/projects/supermarket-pos_opt.webp",
        details: ["Stock Tracking", "Predictive Procurement", "SKU Synchronization"]
    },
    {
        title: "Fuel Station ERP",
        category: "Energy Tech",
        metrics: "Elite Security • Live Tracking",
        description: "Mission-critical fuel station management system with automated pump synchronization.",
        image: "/images/projects/fuel-station-erp_opt.webp",
        details: ["Pump Sync", "Hazardous Tracking", "Auto-Accounting"]
    },
    {
        title: "CryptoTrader Pro",
        category: "FinTech",
        metrics: "Auto-Execution • Risk Bot",
        description: "High-frequency algorithmic trading platform with deep liquidity integration.",
        image: "/images/projects/cryptotrader2_opt.webp",
        details: ["Algorithmic Trading", "Liquidity Integration", "AI Signal Auditing"]
    },
    {
        title: "VisionScan AI",
        category: "Computer Vision",
        metrics: "Auto-Label • QA Mode",
        description: "Multi-modal model training platform with advanced auto-labeling and integrity checks.",
        image: "/images/projects/image_annotation_tool_opt.webp",
        details: ["Dataset Preparation", "Integrated QA", "Auto-Labeling Engine"]
    }
];

export default function ProjectVision() {
    const prefersReducedMotion = useReducedMotion();
    const [activeIndex, setActiveIndex] = useState(0);

    // Mouse parallax for the ambient glow. Hooks are declared unconditionally
    // (Rules of Hooks); the listener that feeds them is only attached on
    // desktop pointers with motion enabled — see the effect below.
    const springConfig = { stiffness: 60, damping: 40, mass: 1, restDelta: 0.005 };
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);
    const glowX = useTransform(smoothMouseX, (v) => v * 1.5);
    const glowY = useTransform(smoothMouseY, (v) => v * 1.5);

    useEffect(() => {
        if (prefersReducedMotion) return;
        if (typeof window === "undefined" || !window.matchMedia) return;

        // Only run the parallax on large screens with a precise pointer so the
        // mousemove/rAF/spring machinery never spins up on phones or low-power
        // touch devices.
        const mql = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
        let rafId = 0;
        let attached = false;

        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
                mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
            });
        };

        const sync = () => {
            if (mql.matches && !attached) {
                window.addEventListener("mousemove", handleMouseMove, { passive: true });
                attached = true;
            } else if (!mql.matches && attached) {
                window.removeEventListener("mousemove", handleMouseMove);
                attached = false;
                mouseX.set(0);
                mouseY.set(0);
            }
        };

        sync();
        mql.addEventListener("change", sync);
        return () => {
            mql.removeEventListener("change", sync);
            if (attached) window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, [prefersReducedMotion, mouseX, mouseY]);

    const activeProject = PROJECTS[activeIndex];
    const statusLabel = activeProject.status === "coming-soon" ? "In Development" : "In Production";

    // Cheap, GPU-friendly panel transition (opacity + small translate only).
    const panelTransition = prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const };

    return (
        <section
            id="project-vision"
            className="relative w-full min-h-screen bg-transparent py-12 lg:py-24 px-4 lg:px-6 overflow-hidden flex flex-col items-center justify-center institutional-grid"
        >
            {/* --- Ambient glow (desktop + reduced-motion aware) --- */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <motion.div
                    style={{ x: glowX, y: glowY }}
                    className="absolute z-0 w-[260px] lg:w-[360px] h-[260px] lg:h-[360px] bg-foreground/2.5 blur-[70px] lg:blur-[90px] rounded-full pointer-events-none transform-gpu"
                />
            </div>

            <div className="container-standard flex flex-col gap-8 lg:gap-12">
                {/* --- Section Header --- */}
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 border-b border-border pb-6 lg:pb-10 text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start space-y-3 lg:space-y-4">
                        <h2 className="fluid-h2">
                            PROJECT <span className="text-secondary drop-shadow-[0_0_15px_hsl(var(--secondary)/0.3)]">VISION</span>
                        </h2>
                    </div>
                    <div className="hidden lg:flex flex-col text-right font-mono text-[10px] text-foreground/50 uppercase tracking-widest leading-relaxed gap-1">
                        <span>{PROJECTS.length} Platforms Shipped</span>
                        <span>Enterprise Grade</span>
                        <span>Updated 2026</span>
                    </div>
                </div>

                {/* --- Main Dashboard Container --- */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-px rounded-2xl overflow-hidden border border-border/80 bg-card dark:bg-[#0f0f11]">
                    {/* 1. Left Rail: Project Selector (Adaptive) */}
                    <div className="relative flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-border p-2 lg:p-4 no-scrollbar snap-x snap-mandatory lg:snap-none mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] lg:mask-none">
                        <div className="text-[10px] font-mono text-foreground/50 uppercase tracking-widest mb-4 lg:mb-6 px-4 shrink-0 self-center lg:self-start">Projects</div>

                        <div className="flex flex-row lg:flex-col gap-1 shrink-0 px-[30vw] lg:px-0">
                            {PROJECTS.map((project, i) => (
                                <button
                                    key={project.title}
                                    onClick={() => setActiveIndex(i)}
                                    aria-pressed={activeIndex === i}
                                    className={cn(
                                        "group relative min-w-[150px] lg:min-w-0 text-left px-4 lg:px-5 py-2.5 lg:py-3 transition-colors duration-200 rounded-lg flex items-center justify-between snap-center",
                                        activeIndex === i ? "bg-foreground/5 border border-border" : "hover:bg-foreground/3 border border-transparent"
                                    )}
                                >
                                    <div className="flex items-center gap-3 lg:gap-4">
                                        <span className={cn(
                                            "font-mono text-[10px] transition-colors",
                                            activeIndex === i ? "text-foreground" : "text-foreground/40"
                                        )}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "text-[11px] lg:text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap lg:whitespace-normal",
                                                activeIndex === i ? "text-foreground" : "text-foreground/60 group-hover:text-foreground/80"
                                            )}>
                                                {project.title}
                                            </span>
                                            <span className="text-[10px] font-mono text-foreground/40 group-hover:text-foreground/60 transition-colors uppercase pt-0.5">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                    <ArrowRight className={cn(
                                        "hidden lg:block w-3 h-3 transition-all duration-200",
                                        activeIndex === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                    )} />

                                    {activeIndex === i && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute bottom-0 lg:bottom-auto lg:left-0 w-full lg:w-1 h-0.5 lg:h-1/2 bg-foreground lg:rounded-r-full shadow-[0_0_8px_hsl(var(--foreground)/0.8)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Center: Active Project Monitor */}
                    <div className="relative min-h-[320px] xs:min-h-[400px] lg:min-h-[700px] bg-transparent p-4 lg:p-12 flex items-center justify-center group overflow-hidden lg:border-r border-border border-b lg:border-b-0">
                        {/* Monitor Border Elements */}
                        <div className="absolute top-4 left-4 w-3 h-3 lg:w-4 lg:h-4 border-t border-l border-foreground/30" />
                        <div className="absolute top-4 right-4 w-3 h-3 lg:w-4 lg:h-4 border-t border-r border-foreground/30" />
                        <div className="absolute bottom-4 left-4 w-3 h-3 lg:w-4 lg:h-4 border-b border-l border-foreground/30" />
                        <div className="absolute bottom-4 right-4 w-3 h-3 lg:w-4 lg:h-4 border-b border-r border-foreground/30" />

                        {/* Top Metadata */}
                        <div className="absolute top-4 lg:top-6 left-8 lg:left-10 right-8 lg:right-10 flex justify-between items-center z-20">
                            <div className="flex items-center gap-2 lg:gap-3">
                                <div className="px-2 py-0.5 bg-foreground/5 border border-border text-foreground/70 text-[9px] lg:text-[10px] font-mono rounded uppercase tracking-wide">Preview</div>
                                <span className="text-[9px] lg:text-[10px] font-mono text-foreground/50 uppercase tracking-[0.3em] leading-none pt-0.5">
                                    {String(activeIndex + 1).padStart(2, "0")} / {PROJECTS.length}
                                </span>
                            </div>
                            <div className="flex gap-0.5 lg:gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-0.5 lg:w-1 h-2 lg:h-3 bg-foreground/20" />)}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={panelTransition}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}
                                onDragEnd={(_, info) => {
                                    const swipe = info.offset.x;
                                    if (swipe < -50 && activeIndex < PROJECTS.length - 1) {
                                        setActiveIndex(activeIndex + 1);
                                    } else if (swipe > 50 && activeIndex > 0) {
                                        setActiveIndex(activeIndex - 1);
                                    }
                                }}
                                className="relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transform-gpu"
                            >
                                {/* Main Image Container */}
                                <div className="relative w-full aspect-video rounded-xl lg:rounded-2xl overflow-hidden border border-border shadow-[0_0_30px_rgba(0,0,0,0.5)] lg:shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:border-foreground/20 transition-colors duration-500">
                                    <Image
                                        src={activeProject.image}
                                        alt={`${activeProject.title}: ${activeProject.category}`}
                                        fill
                                        className={cn(
                                            "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] transform-gpu",
                                            activeProject.status === "coming-soon" && "opacity-60"
                                        )}
                                        sizes="(max-width: 768px) 95vw, (max-width: 1200px) 60vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />

                                    {activeProject.status === "coming-soon" && (
                                        <div className="absolute inset-0 flex items-center justify-center z-30">
                                            <div className="px-4 py-1.5 lg:px-6 lg:py-2 bg-foreground/10 backdrop-blur-md border border-border rounded-full text-foreground text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
                                                Coming Soon
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile Swipe Hint */}
                                    <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50 z-20">
                                        <div className="w-8 h-px bg-foreground/40" />
                                        <span className="text-[9px] font-mono text-foreground/70 uppercase tracking-widest whitespace-nowrap">Swipe to navigate</span>
                                        <div className="w-8 h-px bg-foreground/40" />
                                    </div>

                                    {/* Corner Brackets */}
                                    <div className="absolute inset-0 pointer-events-none p-4 lg:p-6">
                                        <div className="absolute top-4 lg:top-6 left-4 lg:left-6 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-foreground opacity-30 lg:opacity-40" />
                                        <div className="absolute bottom-4 lg:bottom-6 right-4 lg:right-6 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-foreground opacity-30 lg:opacity-40" />
                                    </div>
                                </div>

                                {/* Detail Label */}
                                <motion.div
                                    initial={prefersReducedMotion ? false : { y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.25 }}
                                    className="relative lg:absolute mt-4 lg:mt-0 lg:-bottom-5 lg:left-10 p-4 lg:p-6 bg-card/80 dark:bg-foreground/4 backdrop-blur-md border border-border rounded-xl lg:rounded-2xl w-full lg:max-w-sm z-30 shadow-2xl"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1 h-1 bg-foreground rounded-full" />
                                        <h4 className="text-foreground text-base lg:text-xl font-black uppercase tracking-tight leading-none">{activeProject.title}</h4>
                                    </div>
                                    <p className="text-foreground/60 text-[11px] lg:text-xs leading-relaxed">{activeProject.description}</p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 3. Right Panel: Technical Readout */}
                    <div className="flex flex-col p-6 lg:p-8 gap-8 lg:gap-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-10">
                            {/* Highlights Section */}
                            <div className="space-y-4 lg:space-y-6">
                                <div className="flex items-center justify-between border-b border-border pb-3">
                                    <span className="text-[10px] lg:text-[11px] font-mono text-foreground/60 uppercase tracking-widest">Key Metrics</span>
                                    <div className="hidden lg:flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-1 h-2", i < 4 ? "bg-foreground/60" : "bg-foreground/20")} />)}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-[10px] font-mono text-foreground/50 uppercase mb-1 tracking-widest">Highlights</div>
                                    <div className="p-3 lg:p-4 rounded-xl bg-foreground/5 border border-border font-mono">
                                        <div className="text-foreground/80 text-xs lg:text-sm font-bold mb-1.5">{activeProject.metrics}</div>
                                        <div className="flex items-center gap-1.5 text-foreground/50 text-[10px] uppercase tracking-widest">
                                            <span className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                activeProject.status === "coming-soon" ? "bg-foreground/30" : "bg-foreground/70"
                                            )} />
                                            {statusLabel}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Capabilities Section */}
                            <div className="space-y-4 lg:space-y-6">
                                <span className="text-[10px] lg:text-[11px] font-mono text-foreground/60 uppercase tracking-widest block border-b border-border pb-3">Capabilities</span>
                                <div className="space-y-3">
                                    {activeProject.details.map((detail, idx) => (
                                        <motion.div
                                            key={detail}
                                            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2 + idx * 0.08, duration: 0.3 }}
                                            className="flex items-center gap-3 group/sys"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full border border-border flex items-center justify-center shrink-0">
                                                <div className="w-0.5 h-0.5 bg-foreground/60 rounded-full" />
                                            </div>
                                            <span className="text-[11px] lg:text-xs font-medium text-foreground/70 group-hover/sys:text-foreground transition-colors">{detail}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="mt-8 lg:mt-auto space-y-4 pt-6 lg:pt-10 border-t border-border">
                            {activeProject.link ? (
                                <Link
                                    href={activeProject.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-disabled={activeProject.status === "coming-soon"}
                                    className={cn(
                                        "w-full flex items-center justify-between p-3 lg:p-4 bg-foreground text-background text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-opacity shadow-[0_4px_20px_hsl(var(--foreground)/0.1)]",
                                        activeProject.status === "coming-soon" && "opacity-50 pointer-events-none"
                                    )}
                                >
                                    {activeProject.status === "coming-soon" ? "Coming Soon" : "Visit Platform"}
                                    <ExternalLink className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                </Link>
                            ) : (
                                <Link
                                    href="/contact"
                                    className="w-full flex items-center justify-between p-3 lg:p-4 bg-foreground text-background text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] rounded-xl hover:opacity-90 transition-opacity shadow-[0_4px_20px_hsl(var(--foreground)/0.1)]"
                                >
                                    Request a Demo
                                    <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                </Link>
                            )}
                            <div className="flex items-center justify-between px-2">
                                <span className="text-[10px] font-mono text-foreground/50 uppercase tracking-widest">{activeProject.category}</span>
                                <div className="flex gap-1.5 lg:gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/60 shadow-[0_0_8px_hsl(var(--foreground)/0.4)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Bottom Footer Info --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 lg:py-8 border-t border-border">
                    <div className="text-[10px] font-mono text-foreground/50 uppercase tracking-widest text-center sm:text-left">
                        Mindscape Analytics: Selected Work
                    </div>
                    <div className="text-[10px] font-mono text-foreground/50 uppercase tracking-widest">
                        {PROJECTS.length} Platforms in the Portfolio
                    </div>
                </div>
            </div>
        </section>
    );
}
