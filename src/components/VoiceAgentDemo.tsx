"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Phone, X, Volume2, Globe, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VoiceAgentDemo() {
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState<"IDLE" | "CONNECTING" | "LISTENING" | "THINKING" | "SPEAKING">("IDLE");
    const [transcript, setTranscript] = useState("");
    const [agentResponse, setAgentResponse] = useState("");
    const [currentInteraction, setCurrentInteraction] = useState(0);

    const interactions = [
        {
            query: "Initialize strategic audit for real estate portfolio...",
            response: "Hi, I'm Zee. Strategic audit initiated. I'm analyzing your real estate portfolio against current market data. I've identified three high-yield optimization opportunities. Shall we proceed with the briefing?"
        },
        {
            query: "Analyze current network latency and agent efficiency...",
            response: "Hi, I'm Zee. Network diagnostic complete. All autonomous nodes are operating at sub-100 millisecond latency. Agent efficiency is currently at 98.5%. How else can I assist your operational scaling today?"
        },
        {
            query: "Generate deployment roadmap for autonomous sales agents...",
            response: "Hi, I'm Zee. Roadmap generation in progress. Global market intelligence suggests a 40% efficiency gain. I am ready to deploy a custom training layer for your specific sales niche. What is your primary objective?"
        }
    ];

    // Simulated Voice Core Timer References to prevent phantom state updates
    const activeRef = useRef(false);
    const connectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const thinkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const endTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const listenTimerRef = useRef<NodeJS.Timeout | null>(null);
    const resumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const clearAllDemoTimeouts = useCallback(() => {
        if (connectTimeoutRef.current) {
            clearTimeout(connectTimeoutRef.current);
            connectTimeoutRef.current = null;
        }
        if (thinkingTimeoutRef.current) {
            clearTimeout(thinkingTimeoutRef.current);
            thinkingTimeoutRef.current = null;
        }
        if (endTimeoutRef.current) {
            clearTimeout(endTimeoutRef.current);
            endTimeoutRef.current = null;
        }
        if (listenTimerRef.current) {
            clearTimeout(listenTimerRef.current);
            listenTimerRef.current = null;
        }
        if (resumeIntervalRef.current) {
            clearInterval(resumeIntervalRef.current);
            resumeIntervalRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            activeRef.current = false;
            clearAllDemoTimeouts();
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, [clearAllDemoTimeouts]);

    const toggleProtocol = () => {
        if (isActive) {
            activeRef.current = false;
            setIsActive(false);
            setStatus("IDLE");
            setTranscript("");
            setAgentResponse("");
            clearAllDemoTimeouts();
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        } else {
            activeRef.current = true;
            setIsActive(true);
            setStatus("CONNECTING");
            setCurrentInteraction(Math.floor(Math.random() * interactions.length));

            clearAllDemoTimeouts();
            connectTimeoutRef.current = setTimeout(() => {
                if (activeRef.current) {
                    setStatus("LISTENING");
                }
            }, 1500);
        }
    };

    const simulateInteraction = (interaction: { query: string, response: string }) => {
        if (!activeRef.current) return;
        setStatus("THINKING");

        clearAllDemoTimeouts();
        thinkingTimeoutRef.current = setTimeout(() => {
            if (!activeRef.current) return;
            setStatus("SPEAKING");
            setAgentResponse(interaction.response);

            // Web Speech API - TTS
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                // Institutional Reliability: Resume synthesis to bypass browser-native audio locks
                window.speechSynthesis.resume();
                window.speechSynthesis.cancel();

                const utterance = new SpeechSynthesisUtterance(interaction.response);
                utterance.rate = 0.95;
                utterance.pitch = 0.85;

                // Enhanced Voice Selection
                const voices = window.speechSynthesis.getVoices();
                const preferredVoices = [
                    "Microsoft Christopher Online (Natural)",
                    "Google US English Male",
                    "English (United States)",
                    "Male"
                ];

                let selectedVoice = null;
                for (const name of preferredVoices) {
                    selectedVoice = voices.find((v: any) => v.name.includes(name));
                    if (selectedVoice) break;
                }

                if (selectedVoice) utterance.voice = selectedVoice;

                if (resumeIntervalRef.current) clearInterval(resumeIntervalRef.current);
                resumeIntervalRef.current = setInterval(() => {
                    if (typeof window !== "undefined" && window.speechSynthesis && window.speechSynthesis.speaking) {
                        window.speechSynthesis.resume();
                    }
                }, 10000);

                window.speechSynthesis.speak(utterance);

                utterance.onend = () => {
                    if (resumeIntervalRef.current) {
                        clearInterval(resumeIntervalRef.current);
                        resumeIntervalRef.current = null;
                    }
                    if (!activeRef.current) return;
                    setCurrentInteraction(prev => (prev + 1) % interactions.length);
                    endTimeoutRef.current = setTimeout(() => {
                        if (activeRef.current) setStatus("LISTENING");
                    }, 1000);
                };

                utterance.onerror = () => {
                    if (resumeIntervalRef.current) {
                        clearInterval(resumeIntervalRef.current);
                        resumeIntervalRef.current = null;
                    }
                    if (!activeRef.current) return;
                    setCurrentInteraction(prev => (prev + 1) % interactions.length);
                    endTimeoutRef.current = setTimeout(() => {
                        if (activeRef.current) setStatus("LISTENING");
                    }, 1000);
                };
            } else {
                if (!activeRef.current) return;
                setCurrentInteraction(prev => (prev + 1) % interactions.length);
                endTimeoutRef.current = setTimeout(() => {
                    if (activeRef.current) setStatus("LISTENING");
                }, 3000);
            }
        }, 1200);
    };

    useEffect(() => {
        if (status === "LISTENING" && isActive && activeRef.current) {
            listenTimerRef.current = setTimeout(() => {
                if (!activeRef.current) return;
                const interaction = interactions[currentInteraction];
                setTranscript(interaction.query);
                simulateInteraction(interaction);
            }, 2500);
            return () => {
                if (listenTimerRef.current) {
                    clearTimeout(listenTimerRef.current);
                }
            };
        }
    }, [status, isActive, currentInteraction]);

    return (
        <section id="voice-agent-demo" className="pb-24 pt-8 lg:pt-0 bg-transparent relative overflow-hidden -mt-8 lg:-mt-24 z-20">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--secondary) / 0.05),transparent_70%)]" />

            {/* Neural Pulse Animation */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.05, 0.1, 0.05]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--secondary) / 1),transparent_50%)]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Visual Interface */}
                    <div className="relative flex flex-col items-center justify-center">
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            {/* Orbital Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-white/5 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-8 border border-secondary/10 rounded-full border-dashed"
                            />

                            {/* The Core */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={isActive ? {
                                        scale: [1, 1.05, 1],
                                        boxShadow: [
                                            "0 0 20px hsl(var(--secondary) / 0.2)",
                                            "0 0 50px hsl(var(--secondary) / 0.4)",
                                            "0 0 20px hsl(var(--secondary) / 0.2)"
                                        ]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={cn(
                                        "w-48 h-48 rounded-full flex items-center justify-center transition-all duration-1000 relative z-20",
                                        isActive ? "bg-secondary text-white" : "bg-zinc-900 text-white/20 border border-white/5"
                                    )}
                                >
                                    <AnimatePresence mode="wait">
                                        {status === "IDLE" && <Mic key="mic" size={48} />}
                                        {status === "CONNECTING" && <Globe key="globe" size={48} className="animate-spin" />}
                                        {status === "LISTENING" && <Volume2 key="vol" size={48} className="animate-pulse" />}
                                        {status === "THINKING" && <Zap key="zap" size={48} className="animate-bounce" />}
                                        {status === "SPEAKING" && <Phone key="phone" size={48} className="animate-pulse" />}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Waveform Visualization (Simulated) */}
                            {isActive && (
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 h-12">
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                            className="w-1 bg-secondary/60 rounded-full"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content & Control */}
                    <div className="space-y-10">
                        <div className="space-y-6 text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <motion.span className="text-[10px] font-mono text-secondary tracking-[0.4em] font-black uppercase block">
                                    Voice_Intelligence_v4 //
                                </motion.span>
                                {isActive && (
                                    <span className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-[8px] font-mono text-green-500 uppercase font-black">Link_Active</span>
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                                Speak to <br />
                                <span className="text-foreground/40">The Architect.</span>
                            </h3>
                            <p className="text-lg text-white/40 font-medium max-w-md tracking-tighter">
                                Experience the future of enterprise communication. Our voice agents handle $10M+ portfolios with human-grade empathy and machine-grade precision.
                            </p>
                        </div>

                        {/* Interaction Console */}
                        <div className="bg-zinc-950/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl min-h-[250px] flex flex-col justify-between relative overflow-hidden group">
                            {/* Console Scanline */}
                            <motion.div
                                animate={{ y: ["-100%", "1000%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-secondary/5 to-transparent z-0 opacity-20 pointer-events-none"
                            />

                            <div className="space-y-4 relative z-10">
                                <AnimatePresence>
                                    {transcript && (
                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                                            <span className="text-[8px] font-mono text-white/20 uppercase mt-1">USER //</span>
                                            <p className="text-sm text-white/60 font-mono tracking-tighter">"{transcript}"</p>
                                        </motion.div>
                                    )}
                                    {agentResponse && (
                                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                                            <span className="text-[8px] font-mono text-secondary uppercase mt-1">CORE //</span>
                                            <p className="text-sm text-white font-mono tracking-tighter">{agentResponse}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="relative z-10">
                                <button
                                    onClick={toggleProtocol}
                                    className={cn(
                                        "w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group mt-8",
                                        isActive
                                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                            : "bg-secondary text-white shadow-[0_0_30px_hsl(var(--secondary) / 0.3)] hover:scale-[1.02]"
                                    )}
                                >
                                    {isActive ? (
                                        <>TERMINATE PROTOCOL <X size={18} /></>
                                    ) : (
                                        <>INITIALIZE VOICE PROTOCOL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </button>

                                {isActive && (
                                    <div className="mt-4 flex justify-between items-center px-2">
                                        <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">LATENCY: 84MS</span>
                                        <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">PACKET: 1024KB/S</span>
                                        <span className="text-[7px] font-mono text-white/30 uppercase tracking-widest">STREAM: OPUS_PRO</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Capabilities */}
                        <div className="flex flex-wrap gap-8 justify-center lg:justify-start opacity-40">
                            <div className="flex items-center gap-2">
                                <Shield size={14} className="text-secondary" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white tracking-tighter">Encrypted_IO</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-amber-500" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-white tracking-tighter">Sub_100ms_ASR</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14m-7-7 7 7-7 7" />
        </svg>
    );
}
