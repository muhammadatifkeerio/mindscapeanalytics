"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Download, Share2, Terminal, Cpu, Activity, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Article = {
    id: number;
    title: string;
    date: string;
    niche: string;
    readTime: string;
    confidence: number;
    dataPoints: string;
    status: string;
    description: string;
    impact: string;
    alpha: string;
};

const NICHES = ["INDUSTRIAL", "FINANCE", "REAL ESTATE", "SAAS", "LOGISTICS"] as const;

const STATUS_SEQUENCE = [
    "INITIALIZING_AUTOBOT_V4...",
    "SCANNING_GLOBAL_MARKET_SIGNALS...",
    "FILTERING_NOISE_LEVELS_0.04...",
    "IDENTIFYING_VALUATION_GAPS...",
    "SYNTHESIZING_STRATEGIC_LOGIC...",
    "ENCRYPTING_OUTPUT_BUFFER...",
    "PUBLISHING_TO_NEURAL_NETWORK...",
] as const;

const NICHE_TITLES: Record<string, string[]> = {
    INDUSTRIAL: [
        "MSA-Edge: Zero-Latency Factory Control",
        "Predictive Maintenance at Global Scale",
        "Autonomous Logistics: The End of Idle Time",
    ],
    FINANCE: [
        "FSI-Core: Re-Architecting Banking Infrastructure",
        "Algorithmic Risk Neutralization in 2026",
        "DeFi Institutional Bridging Protocols",
    ],
    "REAL ESTATE": [
        "Tokenized Liquidity: The New Property Standard",
        "Autonomous Appraisals: Eliminating Bias",
        "Smart-Contract Escrow: 0.2s Settlements",
    ],
    SAAS: [
        "The Death of CRUD: Autonomous Product Engines",
        "Self-Evolving UX at 240 FPS",
        "API-First Architecture for Agentic Growth",
    ],
    LOGISTICS: [
        "Last-Mile Autonomy: Beyond Drones",
        "Supply-Chain Self-Correction Nodes",
        "Maritime Routing: Neural Port Optimization",
    ],
};

const INITIAL_ARTICLES: Article[] = [
    {
        id: 1,
        title: "Autonomous Real Estate: The 2026 Shift",
        date: "2026-05-14",
        niche: "REAL ESTATE",
        readTime: "4 min",
        confidence: 98.4,
        dataPoints: "12.4k",
        status: "PUBLISHED",
        description:
            "Strategic analysis of the transition from human brokers to autonomous settlement agents, reducing transaction friction by 94%.",
        impact: "+24.2% Margin Efficiency",
        alpha: "High Alpha Potential",
    },
    {
        id: 11,
        title: "Global Supply Chain: Predictive Port Autonomy",
        date: "2026-05-15",
        niche: "LOGISTICS",
        readTime: "5 min",
        confidence: 97.2,
        dataPoints: "84.1k",
        status: "PUBLISHED",
        description:
            "Deploying maritime agents for zero-idle docking. Our nodes predict congestion 72 hours before arrival.",
        impact: "-18% Operational Cost",
        alpha: "Logistics Optimization V4",
    },
    {
        id: 2,
        title: "Scaling Manufacturing with MSA-Edge Workflows",
        date: "2026-05-12",
        niche: "INDUSTRIAL",
        readTime: "7 min",
        confidence: 96.2,
        dataPoints: "48.1k",
        status: "PUBLISHED",
        description:
            "Deploying local LLMs for real-time quality control. Our industrial agents identify micro-fractures in high-frequency production lines.",
        impact: "+12.4% Yield Increase",
        alpha: "NVIDIA NIM Optimized",
    },
    {
        id: 22,
        title: "Smart Factories: Neural-Gate Predictive Maintenance",
        date: "2026-05-13",
        niche: "INDUSTRIAL",
        readTime: "6 min",
        confidence: 99.4,
        dataPoints: "128k",
        status: "PUBLISHED",
        description:
            "How autonomous sensor nodes prevent catastrophic failures in heavy industry before they occur.",
        impact: "Zero Unplanned Downtime",
        alpha: "Industrial Edge V2",
    },
    {
        id: 3,
        title: "FSI-Core: Re-Architecting Banking Infrastructure",
        date: "2026-05-11",
        niche: "FINANCE",
        readTime: "5 min",
        confidence: 99.1,
        dataPoints: "102.4k",
        status: "PUBLISHED",
        description:
            "Implementation protocol for autonomous reconciliation agents, reclaiming billions in lost operational efficiency for tier-1 institutions.",
        impact: "+42% Reconciliation Speed",
        alpha: "Financial Core V6",
    },
    {
        id: 4,
        title: "SaaS 4.0: The Rise of Self-Evolving Products",
        date: "2026-05-10",
        niche: "SAAS",
        readTime: "6 min",
        confidence: 97.8,
        dataPoints: "32.6k",
        status: "PUBLISHED",
        description:
            "How agentic frameworks are replacing static CRUD apps with self-correcting, autonomous user experiences.",
        impact: "Infinite UX Scalability",
        alpha: "Agentic SaaS Layer",
    },
    {
        id: 5,
        title: "Maritime Routing: Neural Port Optimization",
        date: "2026-05-09",
        niche: "LOGISTICS",
        readTime: "8 min",
        confidence: 95.4,
        dataPoints: "89.2k",
        status: "PUBLISHED",
        description:
            "Predictive docking and cargo distribution via neural nodes, slashing port idle times by 28% for global shipping conglomerates.",
        impact: "-28% Idle Time",
        alpha: "Maritime Intelligence",
    },
];

export default function NeuralNewsroom() {
    const reduceMotion = useReducedMotion();
    const router = useRouter();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isRefining, setIsRefining] = useState(false);
    const [selectedNiche, setSelectedNiche] = useState<string>(NICHES[0]);
    const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
    const [logs, setLogs] = useState<string[]>([]);
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
    const [downloadedId, setDownloadedId] = useState<number | null>(null);

    // Track every timer so we can guarantee cleanup on unmount and avoid
    // setState-after-unmount warnings / leaked intervals on low-end devices.
    const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const genIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const track = useCallback((id: ReturnType<typeof setTimeout>) => {
        timersRef.current.push(id);
        return id;
    }, []);

    useEffect(() => {
        return () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
            if (genIntervalRef.current) clearInterval(genIntervalRef.current);
        };
    }, []);

    const filteredArticles = useMemo(
        () => articles.filter((article) => article.niche.toUpperCase() === selectedNiche.toUpperCase()),
        [articles, selectedNiche]
    );

    const handleNicheChange = useCallback(
        (niche: string) => {
            if (niche === selectedNiche) return;
            setIsRefining(true);
            setSelectedNiche(niche);
            track(setTimeout(() => setIsRefining(false), 800));
        },
        [selectedNiche, track]
    );

    const generateArticle = useCallback(() => {
        setIsGenerating((prev) => {
            if (prev) return prev;

            setLogs([]);
            let step = 0;
            genIntervalRef.current = setInterval(() => {
                if (step < STATUS_SEQUENCE.length) {
                    setLogs((current) => [...current, STATUS_SEQUENCE[step]]);
                    step++;
                } else if (genIntervalRef.current) {
                    clearInterval(genIntervalRef.current);
                    genIntervalRef.current = null;
                }
            }, 600);

            track(
                setTimeout(() => {
                    const nicheTitles = NICHE_TITLES[selectedNiche] || [`${selectedNiche} Transformation`];
                    const randomTitle = nicheTitles[Math.floor(Math.random() * nicheTitles.length)];

                    const newArticle: Article = {
                        id: Date.now(),
                        title: randomTitle,
                        date: new Date().toISOString().split("T")[0],
                        niche: selectedNiche,
                        readTime: `${Math.floor(Math.random() * 5 + 3)} min`,
                        confidence: Number((97 + Math.random() * 2.9).toFixed(1)),
                        dataPoints: `${(Math.random() * 80 + 20).toFixed(1)}k`,
                        status: "PUBLISHED",
                        description: `Strategic analysis of how Mindscape's ${selectedNiche.toLowerCase()} agents capture alpha through persistent workflow integration and autonomous decision-making.`,
                        impact: `+${(Math.random() * 12 + 4).toFixed(1)}% Valuation Delta`,
                        alpha: `${(Math.random() * 40 + 15).toFixed(1)}% Captured`,
                    };

                    setArticles((current) => [newArticle, ...current]);
                    setIsGenerating(false);
                }, STATUS_SEQUENCE.length * 600 + 500)
            );

            return true;
        });
    }, [selectedNiche, track]);

    const handleShare = useCallback(
        (id: number, title: string) => {
            const url = typeof window !== "undefined" ? window.location.href : "https://mindscapeanalytics.ai";
            const shareText = `[MSA_NEURAL_LINK] :: ${title} :: ${url}`;

            if (typeof navigator !== "undefined" && navigator.clipboard) {
                navigator.clipboard.writeText(shareText).catch(() => {});
                setCopiedId(id);
                track(setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000));
            }
        },
        [track]
    );

    const handleDownload = useCallback(
        (id: number) => {
            setDownloadingId(id);
            track(
                setTimeout(() => {
                    setDownloadingId((prev) => (prev === id ? null : prev));
                    setDownloadedId(id);
                    track(setTimeout(() => setDownloadedId((prev) => (prev === id ? null : prev)), 2000));
                }, 1500)
            );
        },
        [track]
    );

    const handleDeploy = useCallback(() => {
        router.push("/shop");
    }, [router]);

    return (
        <section className="relative overflow-hidden border-t border-white/5 bg-transparent py-16 sm:py-24 md:py-32">
            <div className="container-standard relative z-10">
                <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-20">

                    {/* Header / Controls */}
                    <div className="mb-12 w-full space-y-8 static lg:sticky lg:top-32 lg:mb-0 lg:w-1/3 lg:space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-5xl md:text-7xl">
                                Neural <br />
                                <span className="text-white/60">Newsroom.</span>
                            </h2>
                            <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                                Our autonomous agents monitor global market shifts in real time to surface strategic
                                intelligence - no writers, no delays. Just raw, institutional-grade foresight.
                            </p>
                        </div>

                        {/* Niche selector */}
                        <div className="flex flex-wrap gap-2">
                            {NICHES.map((niche) => (
                                <button
                                    key={niche}
                                    type="button"
                                    onClick={() => handleNicheChange(niche)}
                                    aria-pressed={selectedNiche === niche}
                                    className={cn(
                                        "rounded-xl border px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors sm:text-[11px]",
                                        selectedNiche === niche
                                            ? "border-secondary bg-secondary text-secondary-foreground"
                                            : "border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                                    )}
                                >
                                    {niche}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={generateArticle}
                            disabled={isGenerating}
                            className={cn(
                                "btn-institutional group relative w-full overflow-hidden py-4 text-[10px] font-black uppercase tracking-[0.2em] sm:py-5",
                                isGenerating && "cursor-wait opacity-60"
                            )}
                        >
                            <span className="relative text-[14px] font-sans z-10 flex items-center justify-center gap-3">
                                {isGenerating ? "NEURAL LINK ESTABLISHED" : "INITIALIZE AUTOBOT GEN"}
                                <Sparkles
                                    size={14}
                                    className={cn(
                                        "transition-transform",
                                        isGenerating ? (reduceMotion ? "" : "animate-spin") : "group-hover:rotate-12"
                                    )}
                                />
                            </span>
                            {isGenerating && !reduceMotion && (
                                <motion.span
                                    aria-hidden
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 z-0 bg-white/10"
                                />
                            )}
                        </button>

                        {/* Generation logs */}
                        <AnimatePresence initial={false}>
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-1.5 overflow-hidden rounded-2xl border border-white/10 bg-black p-5 font-mono text-[10px] shadow-2xl sm:p-6"
                                >
                                    {logs.map((log, i) => (
                                        <div key={i} className="flex gap-3 uppercase">
                                            <span className="text-secondary/50">[{String(i).padStart(2, "0")}]</span>
                                            <span className="text-white/70">{log}</span>
                                        </div>
                                    ))}
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "ml-1 inline-block h-3 w-1.5 bg-secondary",
                                            !reduceMotion && "animate-pulse"
                                        )}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Feed */}
                    <div className="w-full lg:w-2/3">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <AnimatePresence mode="popLayout">
                                {isRefining ? (
                                    <div className="col-span-1 rounded-4xl border border-dashed border-secondary/20 bg-secondary/2 py-24 text-center sm:col-span-2 sm:py-32">
                                        <Activity
                                            size={36}
                                            className={cn(
                                                "mx-auto mb-5 text-secondary",
                                                !reduceMotion && "animate-spin"
                                            )}
                                        />
                                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
                                            Refining sector intelligence
                                        </p>
                                        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-secondary/40">
                                            MSA_CORE_V5 // Connecting nodes
                                        </p>
                                    </div>
                                ) : filteredArticles.length > 0 ? (
                                    filteredArticles.map((article, i) => (
                                        <motion.article
                                            key={article.id}
                                            layout
                                            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                                            transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.06 }}
                                            className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/60 p-5 transition-colors hover:border-secondary/25 sm:min-h-[350px] sm:p-8"
                                        >
                                            {/* Static watermark + hover sheen (opacity-only, no layout animation) */}
                                            <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.06]">
                                                <Cpu size={140} />
                                            </div>
                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-secondary/6 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                            <div className="relative z-10 flex grow flex-col gap-5 sm:gap-6">
                                                <div className="flex flex-wrap items-center justify-between gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={cn(
                                                                "h-1.5 w-1.5 rounded-full bg-secondary",
                                                                !reduceMotion && "animate-pulse"
                                                            )}
                                                        />
                                                        <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-secondary">
                                                            {article.niche}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-5">
                                                        <div className="flex flex-col items-end">
                                                            <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                                                                Confidence
                                                            </span>
                                                            <span className="font-mono text-xs font-black text-emerald-400">
                                                                {article.confidence}%
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">
                                                                Signals
                                                            </span>
                                                            <span className="font-mono text-xs font-black text-sky-400">
                                                                {article.dataPoints}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-secondary sm:text-2xl">
                                                        {article.title}
                                                    </h3>
                                                    <p className="line-clamp-3 text-xs leading-relaxed text-white/55 sm:text-sm">
                                                        {article.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 pt-1">
                                                        <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                                                            {article.impact}
                                                        </span>
                                                        <span className="rounded-md border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-sky-400">
                                                            {article.alpha}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative z-10 mt-6 flex flex-col gap-4 border-t border-white/5 pt-6">
                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center gap-5 text-white/40">
                                                        <span className="flex items-center gap-2">
                                                            <Terminal size={12} className="text-secondary/50" />
                                                            <span className="font-mono text-[10px] uppercase tracking-widest">
                                                                {article.readTime}
                                                            </span>
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <Cpu size={12} className="text-secondary/50" />
                                                            <span className="font-mono text-[10px] uppercase tracking-widest">
                                                                Node_V4
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleShare(article.id, article.title)}
                                                            aria-label={`Copy link to ${article.title}`}
                                                            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
                                                        >
                                                            {copiedId === article.id ? (
                                                                <Check size={14} className="text-emerald-400" />
                                                            ) : (
                                                                <Share2 size={14} />
                                                            )}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDownload(article.id)}
                                                            aria-label={`Download report for ${article.title}`}
                                                            className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
                                                        >
                                                            {downloadingId === article.id ? (
                                                                <Activity
                                                                    size={14}
                                                                    className={cn(
                                                                        "text-secondary",
                                                                        !reduceMotion && "animate-spin"
                                                                    )}
                                                                />
                                                            ) : downloadedId === article.id ? (
                                                                <Check size={14} className="text-emerald-400" />
                                                            ) : (
                                                                <Download size={14} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={handleDeploy}
                                                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-secondary py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-secondary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                                >
                                                    Deploy this agent
                                                    <Zap size={12} />
                                                </button>
                                            </div>
                                        </motion.article>
                                    ))
                                ) : (
                                    <div className="col-span-1 rounded-4xl border border-dashed border-white/10 bg-white/1 py-24 text-center sm:col-span-2 sm:py-32">
                                        <Cpu
                                            size={36}
                                            className={cn(
                                                "mx-auto mb-5 text-white/20",
                                                !reduceMotion && "animate-pulse"
                                            )}
                                        />
                                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
                                            Awaiting sector intelligence
                                        </p>
                                        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/25">
                                            Initialize the autobot for {selectedNiche} extraction
                                        </p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient backdrop — pre-blurred radial gradient, no filter (cheap on GPU) */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_65%)]"
            />
        </section>
    );
}
