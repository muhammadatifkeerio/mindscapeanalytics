"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Zap, ArrowRight, Loader2, Mail, CheckCircle2 } from "lucide-react";
import { generateAutomationRoadmap } from "@/app/_actions/roadmap";
import { cn } from "@/lib/utils";

type ChatEntry = { type: "user" | "bot"; text: string };

const QUICK_PROMPTS = [
    "Analyze my website: https://example.com",
    "I spend 10 hours a week on LinkedIn lead gen",
    "Automate my customer support emails",
    "Set up a voice agent for appointment booking",
] as const;

// Escape raw text before we inject our own trusted markup. The chat renders
// model output via dangerouslySetInnerHTML, so unescaped HTML/scripts in the
// response could otherwise be injected into the page.
const escapeHtml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatMarkdown = (text: string): { __html: string } => {
    if (!text) return { __html: "" };

    let parsedText = escapeHtml(text);

    // Parse GitHub-style tables into styled HTML.
    if (parsedText.includes("|")) {
        const lines = parsedText.split("\n");
        let inTable = false;
        let tableRowsCount = 0;
        const newLines: string[] = [];
        let currentTableHtml = "";

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith("|") && line.endsWith("|")) {
                if (line.match(/^\|(?:\s*[-:]+\s*\|)+$/)) {
                    continue; // Skip separator row (|---|---|)
                }

                if (!inTable) {
                    inTable = true;
                    tableRowsCount = 0;
                    currentTableHtml =
                        '<div class="overflow-x-auto my-4 rounded-xl border border-white/10"><table class="w-full text-sm text-left border-collapse">';
                }

                const cells = line
                    .split("|")
                    .filter((_, index, array) => index !== 0 && index !== array.length - 1);

                currentTableHtml +=
                    '<tr class="border-b border-white/10 last:border-b-0 hover:bg-white/2 transition-colors">';
                cells.forEach((cell) => {
                    const content = cell.trim();
                    if (tableRowsCount === 0) {
                        currentTableHtml += `<th class="px-4 py-3 font-semibold bg-white/5 border-r border-white/10 last:border-r-0 text-white">${content}</th>`;
                    } else {
                        currentTableHtml += `<td class="px-4 py-3 border-r border-white/10 last:border-r-0 text-white/80">${content}</td>`;
                    }
                });
                currentTableHtml += "</tr>";
                tableRowsCount++;
            } else {
                if (inTable) {
                    inTable = false;
                    currentTableHtml += "</table></div>";
                    newLines.push(currentTableHtml);
                    currentTableHtml = "";
                }
                newLines.push(lines[i]);
            }
        }
        if (inTable) {
            currentTableHtml += "</table></div>";
            newLines.push(currentTableHtml);
        }
        parsedText = newLines.join("\n");
    }

    const html = parsedText
        .replace(/###\s+(.*?)(?=\n|$)/g, '<h3 class="text-sm font-semibold mt-4 mb-2 text-white">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<span class="text-white/90 font-medium">$1</span>')
        .replace(/-\s+(.*?)(?=\n|$)/g, '<li class="ml-4 list-disc my-1">$1</li>')
        .replace(/---/g, '<hr class="my-4 border-white/10 opacity-50" />')
        .replace(/\n/g, "<br />")
        // Tidy line breaks that hug block-level elements.
        .replace(/(<br \/>)+<h3/g, "<h3")
        .replace(/<\/h3>(<br \/>)+/g, "</h3>")
        .replace(/(<br \/>)+<li/g, "<li")
        .replace(/<\/li>(<br \/>)+/g, "</li>")
        .replace(/(<br \/>)+<hr/g, "<hr")
        .replace(/hr(.*?)>(<br \/>)+/g, "hr$1>")
        .replace(/(<br \/>)+<div class="overflow-x-auto/g, '<div class="overflow-x-auto')
        .replace(/<\/div>(<br \/>)+/g, "</div>");

    return { __html: html };
};

// Memoized so the (relatively expensive) markdown parse only runs when a
// message's text actually changes, not on every scroll-triggered re-render.
const BotMessageBody = memo(function BotMessageBody({ text }: { text: string }) {
    const html = useMemo(() => formatMarkdown(text), [text]);
    return <div dangerouslySetInnerHTML={html} className="space-y-1" />;
});

const ChatMessage = memo(function ChatMessage({
    message,
    animate,
}: {
    message: ChatEntry;
    animate: boolean;
}) {
    const isUser = message.type === "user";
    return (
        <motion.div
            initial={animate ? { opacity: 0, y: 8 } : false}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn("flex flex-col gap-2", isUser ? "items-end" : "items-start")}
        >
            <div
                className={cn(
                    "max-w-[95%] sm:max-w-[90%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed",
                    isUser
                        ? "bg-secondary/10 border border-secondary/20 text-white"
                        : "bg-white/3 border border-white/5 text-white/90 whitespace-pre-wrap shadow-xl"
                )}
            >
                {message.type === "bot" && (
                    <div className="flex items-center gap-2 mb-3 text-secondary">
                        <Cpu className="w-4 h-4" aria-hidden="true" />
                        <span className="text-[10px] font-semibold uppercase tracking-widest">
                            Mindscape Agent Analysis
                        </span>
                    </div>
                )}
                {message.type === "bot" ? <BotMessageBody text={message.text} /> : message.text}
            </div>
        </motion.div>
    );
});

export default function AgenticHeroScanner() {
    const [input, setInput] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<ChatEntry[]>([]);
    const [leadEmail, setLeadEmail] = useState("");
    const [leadCaptured, setLeadCaptured] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const handleAnalyze = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            const userMsg = input.trim();
            if (!userMsg || isAnalyzing) return;

            setInput("");
            setHistory((prev) => [...prev, { type: "user", text: userMsg }]);
            setIsAnalyzing(true);

            try {
                const response = await generateAutomationRoadmap(userMsg);
                if (response.success && response.roadmap) {
                    setHistory((prev) => [...prev, { type: "bot", text: response.roadmap! }]);
                    setResult(response.roadmap);
                } else {
                    setHistory((prev) => [
                        ...prev,
                        { type: "bot", text: "ERROR: Connection to the agent was interrupted. Please try again." },
                    ]);
                }
            } catch {
                setHistory((prev) => [
                    ...prev,
                    { type: "bot", text: "ERROR: Connection to the agent was interrupted. Please try again." },
                ]);
            } finally {
                setIsAnalyzing(false);
            }
        },
        [input, isAnalyzing]
    );

    const captureAuditLead = useCallback(async () => {
        const email = leadEmail.trim();
        if (!email) return;
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "audit_scanner",
                    service: "AI Automation Roadmap",
                    message: `Roadmap generated: ${result?.slice(0, 500) || "N/A"}`,
                }),
            });
            setLeadCaptured(true);
        } catch {
            /* Non-blocking: keep the form available so the user can retry. */
        }
    }, [leadEmail, result]);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [history, isAnalyzing]);

    return (
        <section className="relative py-12 lg:py-24 overflow-hidden bg-transparent">
            <div className="container-standard">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Column 1: Header Content */}
                    <div className="flex flex-col items-start text-left">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-6 leading-[0.9]">
                            Stop guessing. <br />
                            <span className="text-secondary drop-shadow-[0_0_20px_hsl(var(--secondary)/0.2)]">
                                Start automating.
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-foreground/60 max-w-xl leading-relaxed mb-8">
                            Tell our architect agent about a manual bottleneck in your business, and it will build a
                            technical automation roadmap in seconds.
                        </p>

                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/2 border border-border/30">
                                <Zap className="w-4 h-4 text-secondary" aria-hidden="true" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground/70">
                                    Instant Inference
                                </span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/2 border border-border/30">
                                <Cpu className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-foreground/70">
                                    Advanced Reasoning
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Terminal UI */}
                    <div className="relative group">
                        {/* Ambient glow — composited opacity transition only, hidden on small screens. */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-1 hidden sm:block bg-linear-to-r from-secondary/20 via-white/5 to-secondary/20 rounded-4xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                        />

                        <div className="relative rounded-[2.5rem] border border-white/10 bg-zinc-950/85 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
                            {/* Terminal Top Bar */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                                    mindscape-agent
                                </span>
                            </div>

                            {/* Terminal Content */}
                            <div
                                ref={scrollRef}
                                className="flex-1 p-4 sm:p-6 lg:p-8 font-mono text-xs sm:text-sm overflow-y-auto space-y-6 custom-scrollbar max-h-[50vh] md:max-h-[420px]"
                            >
                                {history.length === 0 && !isAnalyzing && (
                                    <div className="space-y-6">
                                        <p className="text-secondary tracking-widest uppercase font-bold text-xs sm:text-sm">
                                            {">"} Initializing Mindscape Agent protocol...
                                        </p>
                                        <p className="text-white/80">
                                            Awaiting input. Enter a URL or describe a bottleneck.
                                        </p>

                                        <div className="grid grid-cols-1 gap-3">
                                            {QUICK_PROMPTS.map((prompt) => (
                                                <button
                                                    key={prompt}
                                                    type="button"
                                                    onClick={() => setInput(prompt)}
                                                    className="text-left p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-secondary/15 hover:border-secondary/40 transition-colors text-xs sm:text-sm text-white/80 hover:text-white group/btn flex items-center"
                                                >
                                                    <span className="opacity-50 group-hover/btn:opacity-100 mr-3 text-secondary transition-opacity shrink-0">
                                                        {">"}
                                                    </span>
                                                    <span>{prompt}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {history.map((msg, i) => (
                                    <ChatMessage
                                        key={i}
                                        message={msg}
                                        animate={!prefersReducedMotion}
                                    />
                                ))}

                                {isAnalyzing && (
                                    <div className="flex items-center gap-4 text-secondary">
                                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] motion-safe:animate-pulse">
                                            Analyzing // Mindscape Agent
                                        </span>
                                    </div>
                                )}

                                {/* Lead Capture After Result */}
                                {result && !leadCaptured && !isAnalyzing && (
                                    <div className="mt-4 p-4 sm:p-5 rounded-xl bg-secondary/10 border border-secondary/20 space-y-4">
                                        <p className="flex items-center gap-2 text-[10px] font-mono font-bold text-secondary uppercase tracking-widest">
                                            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                                            Get the full report and implementation blueprint
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input
                                                type="email"
                                                autoComplete="email"
                                                aria-label="Email address for your full report"
                                                value={leadEmail}
                                                onChange={(e) => setLeadEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                className="flex-1 h-10 px-4 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-secondary/50 transition-colors"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        captureAuditLead();
                                                    }
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={captureAuditLead}
                                                className="h-10 px-6 rounded-lg bg-secondary text-black text-[10px] font-bold uppercase tracking-wider hover:bg-secondary/80 transition-colors w-full sm:w-auto"
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {leadCaptured && (
                                    <div className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                                        Report queued. Our architects will deliver the full blueprint within 24 hours.
                                    </div>
                                )}
                            </div>

                            {/* Terminal Input */}
                            <div className="p-4 sm:p-6 border-t border-white/5 bg-white/2">
                                <form onSubmit={handleAnalyze} className="relative">
                                    <input
                                        type="text"
                                        value={input}
                                        aria-label="Describe a manual process or enter a URL to analyze"
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Enter a URL or manual process..."
                                        disabled={isAnalyzing}
                                        className="w-full bg-zinc-900/60 border border-white/20 rounded-xl px-4 sm:px-6 py-3.5 sm:py-4 pr-12 text-xs sm:text-sm font-mono text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-colors disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        aria-label="Generate automation roadmap"
                                        disabled={isAnalyzing || !input.trim()}
                                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-lg bg-secondary transition-transform hover:scale-110 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                    >
                                        <ArrowRight className="w-4 h-4 text-black" aria-hidden="true" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
