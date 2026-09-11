"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShieldCheck, Cpu, Mic, Globe, Volume2, Zap, Phone, MicOff } from "lucide-react";

const TAGS = [
    { name: "Adaptive", x: -320, y: -180, delay: 0, bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400" },
    { name: "Analytical", x: 220, y: -260, delay: 0.2, bg: "bg-blue-500/10", border: "border-blue-500/30", dot: "bg-blue-400" },
    { name: "Conversational", x: 300, y: 40, delay: 0.4, bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-400" },
    { name: "Proactive", x: 240, y: 280, delay: 0.6, bg: "bg-amber-500/10", border: "border-amber-500/30", dot: "bg-amber-400" },
    { name: "Collaborative", x: -280, y: 240, delay: 0.8, bg: "bg-rose-500/10", border: "border-rose-500/30", dot: "bg-rose-400" },
];

// Responsive scale for the floating capability tags. Driven by matchMedia
// (event-based, fires only on breakpoint crossings) so it stays off the
// scroll/resize hot path and replaces a previously injected <style> block.
const TAG_SCALE_BREAKPOINTS = [
    { query: "(min-width: 1024px)", scale: 1 },
    { query: "(min-width: 768px)", scale: 0.7 },
    { query: "(min-width: 480px)", scale: 0.45 },
] as const;
const TAG_SCALE_DEFAULT = 0.38;

function useTagScale(): number {
    const [scale, setScale] = useState(TAG_SCALE_DEFAULT);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const lists = TAG_SCALE_BREAKPOINTS.map((bp) => window.matchMedia(bp.query));
        const update = () => {
            const matchIndex = lists.findIndex((mql) => mql.matches);
            setScale(matchIndex === -1 ? TAG_SCALE_DEFAULT : TAG_SCALE_BREAKPOINTS[matchIndex].scale);
        };
        update();
        lists.forEach((mql) => mql.addEventListener("change", update));
        return () => lists.forEach((mql) => mql.removeEventListener("change", update));
    }, []);

    return scale;
}

interface ConversationEntry {
    role: "user" | "assistant";
    content: string;
}

export default function AiEmployee() {
    const prefersReducedMotion = useReducedMotion();
    const tagScale = useTagScale();
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState<"IDLE" | "CONNECTING" | "LISTENING" | "THINKING" | "SPEAKING">("IDLE");
    const [transcript, setTranscript] = useState("");
    const [agentResponse, setAgentResponse] = useState("");
    const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
    const [turnCount, setTurnCount] = useState(0);
    const [permissionError, setPermissionError] = useState<string | null>(null);
    const [micFallbackCountdown, setMicFallbackCountdown] = useState<number | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isTextMode, setIsTextMode] = useState(false);
    const [textInput, setTextInput] = useState("");
    const micFallbackIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
    const recognitionRef = useRef<any>(null);
    const activeRef = useRef(false);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    // Always points at the latest processUserInput so the speech-recognition
    // "onend" closure never calls a stale version (avoids an `as any` cast).
    const processUserInputRef = useRef<((text: string) => void) | null>(null);
    
    // Failsafe refs to prevent memory leaks, redundant loops and voice overlaps
    const recognitionActiveRef = useRef(false);
    const listeningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const resumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Centralized timeout cleanup to prevent phantom restarts
    const clearAllTimeouts = useCallback(() => {
        if (listeningTimeoutRef.current) {
            clearTimeout(listeningTimeoutRef.current);
            listeningTimeoutRef.current = null;
        }
        if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current);
            fallbackTimeoutRef.current = null;
        }
        if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current);
            restartTimeoutRef.current = null;
        }
        if (resumeIntervalRef.current) {
            clearInterval(resumeIntervalRef.current);
            resumeIntervalRef.current = null;
        }
        if (micFallbackIntervalRef.current) {
            clearInterval(micFallbackIntervalRef.current);
            micFallbackIntervalRef.current = null;
        }
    }, []);

    // Initialize Speech and Voices
    useEffect(() => {
        if (typeof window === "undefined" || !window.speechSynthesis) return;

        const synth = window.speechSynthesis;
        synthesisRef.current = synth;

        let interval: ReturnType<typeof setInterval> | null = null;
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
            }
        };

        loadVoices();

        // Some engines populate voices asynchronously. Poll briefly as a
        // failsafe, but cap the attempts so the interval can never run forever.
        if (synth.getVoices().length === 0) {
            let attempts = 0;
            interval = setInterval(() => {
                attempts += 1;
                loadVoices();
                if (attempts >= 20 && interval) {
                    clearInterval(interval);
                    interval = null;
                }
            }, 150);
        }

        synth.onvoiceschanged = loadVoices;

        return () => {
            if (interval) clearInterval(interval);
            synth.onvoiceschanged = null;
        };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            activeRef.current = false;
            clearAllTimeouts();
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.onstart = null;
                    recognitionRef.current.onend = null;
                    recognitionRef.current.onerror = null;
                    recognitionRef.current.onresult = null;
                    recognitionRef.current.abort();
                } catch {}
            }
        };
    }, [clearAllTimeouts]);

    const speakText = useCallback((text: string, onEnd: () => void) => {
        if (!synthesisRef.current) {
            setTimeout(onEnd, 1000);
            return;
        }

        if (resumeIntervalRef.current) {
            clearInterval(resumeIntervalRef.current);
            resumeIntervalRef.current = null;
        }

        const runSpeak = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Voice Selection Logic - 2026 Pro Standard (Strict Male Preference)
            const preferredVoices = [
                "Microsoft Andrew Online (Natural)",     // Windows 11 Premium Male
                "Microsoft Brian Online (Natural)",      // Windows Premium Male
                "Microsoft Christopher Online (Natural)",// Windows Premium Male
                "Microsoft Guy Online (Natural)",        // Windows Premium Male
                "Microsoft Ryan Online (Natural)",       // Windows Premium Male
                "Google US English Male",                // Chrome Premium Male
                "Google UK English Male",                // Chrome Premium UK Male
                "Jamie",                                 // macOS Premium Male
                "Daniel",                                // macOS/iOS UK Male
                "Arthur",                                // macOS Premium UK Male
                "Aaron",                                 // macOS Male
                "Alex"                                   // macOS Classic Male
            ];

            let availableVoices = voices;
            if (availableVoices.length === 0) {
                availableVoices = window.speechSynthesis.getVoices();
            }

            let selectedVoice = null;
            for (const name of preferredVoices) {
                selectedVoice = availableVoices.find(v => v.name.includes(name));
                if (selectedVoice) break;
            }

            // Deep fallback: Look for ANY voice that explicitly says "Male" or "Boy"
            if (!selectedVoice) {
                selectedVoice = availableVoices.find(v => v.lang.startsWith("en") && (v.name.includes("Male") || v.name.includes("Boy")));
            }
            
            // Final fallback: just get the first English voice if nothing else exists
            if (!selectedVoice) {
                selectedVoice = availableVoices.find(v => v.lang.startsWith("en"));
            }

            if (selectedVoice) utterance.voice = selectedVoice;
            
            // 2026 Premium Audio Hacks
            utterance.rate = 1.05;  // Slightly faster cadence for an intelligent, snappy feel
            utterance.pitch = 0.95; // Slightly lower pitch for a deeper, more authoritative male presence
            utterance.volume = 1.0;

            // CRITICAL HACK: Chrome 15-second SpeechSynthesis Bug Bypass
            resumeIntervalRef.current = setInterval(() => {
                if (synthesisRef.current && synthesisRef.current.speaking) {
                    synthesisRef.current.pause();
                    synthesisRef.current.resume();
                }
            }, 10000);

            utterance.onend = () => {
                if (resumeIntervalRef.current) {
                    clearInterval(resumeIntervalRef.current);
                    resumeIntervalRef.current = null;
                }
                if (activeRef.current) {
                    onEnd();
                }
            };
            
            utterance.onerror = (e: any) => {
                console.warn("TTS Event Error:", e.error || "interrupted");
                if (resumeIntervalRef.current) {
                    clearInterval(resumeIntervalRef.current);
                    resumeIntervalRef.current = null;
                }
                // Avoid calling onEnd if we explicitly cancelled or it was interrupted naturally
                if (activeRef.current && e.error !== "canceled" && e.error !== "interrupted") {
                    onEnd();
                }
            };

            synthesisRef.current?.speak(utterance);
        };

        if (typeof window !== "undefined" && window.speechSynthesis) {
            // Cancel and resume fix for iOS Safari and Chrome Android
            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
                window.speechSynthesis.cancel();
                setTimeout(runSpeak, 50); // slight delay to allow buffer clear
            } else {
                runSpeak();
            }
        } else {
            setTimeout(onEnd, 100);
        }
    }, [voices]);

    const getAIResponse = useCallback(async (userText: string, history: ConversationEntry[]): Promise<string> => {
        try {
            const res = await fetch("/api/voice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transcript: userText, history }),
            });
            if (!res.ok) throw new Error("Voice API error");
            const data = await res.json();
            return data.response || "I'd love to help you explore our AI solutions. What specific challenge are you facing?";
        } catch {
            // Intelligent local fallback
            const lower = userText.toLowerCase();
            if (lower.includes("hello") || lower.includes("hi")) {
                return "Welcome to Mindscape Analytics! I'm the Architect. How can I help transform your business with AI today?";
            }
            if (lower.includes("voice") || lower.includes("call")) {
                return "We build autonomous voice agents that handle sales calls, support, and appointment booking 24/7. Want to see a custom demo for your industry?";
            }
            if (lower.includes("price") || lower.includes("cost")) {
                return "Our solutions start at $999 per month for standard automation. Would you like a free AI audit to scope your specific needs?";
            }
            return "That's a great question. Our team specializes in exactly that kind of challenge. Would you like to share your email so our architects can follow up with a detailed proposal?";
        }
    }, []);

    const startTextProtocol = useCallback(() => {
        setIsTextMode(true);
        activeRef.current = true;
        setIsActive(true);
        setStatus("CONNECTING");
        
        const welcome = "Establishing secure connection to MSA Agent Core in Text Mode. I am the Architect. How can I assist with your organization's AI transformation today?";
        setAgentResponse(welcome);
        setStatus("SPEAKING");
        
        if (synthesisRef.current && synthesisRef.current.paused) {
            synthesisRef.current.resume();
        }

        speakText(welcome, () => {
            if (activeRef.current) {
                setStatus("LISTENING");
            }
        });
    }, [speakText]);

    const triggerFallback = useCallback(() => {
        let countdown = 4;
        setMicFallbackCountdown(countdown);
        setPermissionError("Microphone blocked. Auto-switching to Text Mode in...");
        setStatus("IDLE");
        if (micFallbackIntervalRef.current) clearInterval(micFallbackIntervalRef.current);
        micFallbackIntervalRef.current = setInterval(() => {
            countdown -= 1;
            setMicFallbackCountdown(countdown);
            if (countdown <= 0) {
                if (micFallbackIntervalRef.current) {
                    clearInterval(micFallbackIntervalRef.current);
                    micFallbackIntervalRef.current = null;
                }
                setPermissionError(null);
                setMicFallbackCountdown(null);
                startTextProtocol();
            }
        }, 1000);
    }, [startTextProtocol]);

    const startListening = useCallback(() => {
        if (!activeRef.current) return;
        
        clearAllTimeouts();

        // Safely abort previous instances to prevent overlap mic locks
        if (recognitionRef.current) {
            try {
                recognitionRef.current.onstart = null;
                recognitionRef.current.onend = null;
                recognitionRef.current.onerror = null;
                recognitionRef.current.onresult = null;
                recognitionRef.current.abort();
            } catch {}
            recognitionRef.current = null;
        }

        setStatus("LISTENING");

        if (typeof window === "undefined") return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            // Browsers without Web Speech API (like Firefox) use the fully interactive hybrid mode.
            setStatus("LISTENING");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        let finalTranscript = "";

        recognition.onstart = () => {
            recognitionActiveRef.current = true;
        };

        recognition.onresult = (event: any) => {
            if (!activeRef.current) return;
            
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            
            if (interimTranscript) setTranscript(interimTranscript);
        };

        recognition.onend = () => {
            recognitionActiveRef.current = false;
            if (!activeRef.current) return;
            
            if (finalTranscript) {
                processUserInputRef.current?.(finalTranscript);
            } else {
                // Centralized single-restart mechanism inside onend with guard check
                setStatus("LISTENING");
                restartTimeoutRef.current = setTimeout(() => {
                    if (activeRef.current && !recognitionActiveRef.current) {
                        startListening();
                    }
                }, 1000);
            }
        };

        recognition.onerror = (event: any) => {
            console.warn("STT Error:", event.error);
            recognitionActiveRef.current = false;
            
            // Mic Blocked or Service Blocked: Terminate gracefully to prevent permissions prompts loops
            if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                triggerFallback();
            } else if (event.error === "no-speech") {
                setStatus("LISTENING");
                restartTimeoutRef.current = setTimeout(() => {
                    if (activeRef.current && !recognitionActiveRef.current) {
                        startListening();
                    }
                }, 1000);
            } else {
                // Network or other generic error, retry gently
                setStatus("LISTENING");
                restartTimeoutRef.current = setTimeout(() => {
                    if (activeRef.current && !recognitionActiveRef.current) {
                        startListening();
                    }
                }, 1000);
            }
        };

        try { 
            recognition.start(); 
        } catch (e) {
            console.warn("Recognition start error:", e);
            recognitionActiveRef.current = false;
        }
    }, [clearAllTimeouts, triggerFallback]);

    const processUserInput = useCallback(async (userText: string) => {
        if (!activeRef.current) return;
        setTranscript(userText);
        setStatus("THINKING");

        const newHistory: ConversationEntry[] = [...conversationHistory, { role: "user", content: userText }];
        const aiResponse = await getAIResponse(userText, newHistory);

        if (!activeRef.current) return;

        const updatedHistory: ConversationEntry[] = [...newHistory, { role: "assistant", content: aiResponse }];
        setConversationHistory(updatedHistory);
        setAgentResponse(aiResponse);
        setStatus("SPEAKING");
        setTurnCount(prev => prev + 1);

        // Capture lead if email detected in user input
        const emailMatch = userText.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch) {
            try {
                fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: emailMatch[0],
                        source: "voice",
                        message: `Voice conversation: ${updatedHistory.map(h => `${h.role}: ${h.content}`).join(" | ")}`,
                    }),
                });
            } catch {}
        }

        speakText(aiResponse, () => {
            if (activeRef.current) {
                listeningTimeoutRef.current = setTimeout(() => startListening(), 800);
            }
        });
    }, [conversationHistory, getAIResponse, speakText, startListening]);

    useEffect(() => {
        processUserInputRef.current = processUserInput;
    }, [processUserInput]);

    const toggleProtocol = () => {
        if (isActive) {
            activeRef.current = false;
            setIsActive(false);
            setStatus("IDLE");
            setTranscript("");
            setAgentResponse("");
            setConversationHistory([]);
            setTurnCount(0);
            setIsTextMode(false);
            
            clearAllTimeouts();

            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.onstart = null;
                    recognitionRef.current.onend = null;
                    recognitionRef.current.onerror = null;
                    recognitionRef.current.onresult = null;
                    recognitionRef.current.abort();
                } catch {}
                recognitionRef.current = null;
            }
        } else {
            // Unlocks speech synthesis synchronously in response to the user gesture
            if (typeof window !== "undefined" && window.speechSynthesis) {
                try {
                    const silent = new SpeechSynthesisUtterance("");
                    silent.volume = 0;
                    window.speechSynthesis.speak(silent);
                    if (window.speechSynthesis.paused) {
                        window.speechSynthesis.resume();
                    }
                } catch (e) {
                    console.warn("Silent utterance setup warning:", e);
                }
            }

            setPermissionError(null);
            setIsTextMode(false);

            const SpeechRecognition = typeof window !== "undefined" && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

            const initProtocol = (forceTextMode = false) => {
                if (forceTextMode) {
                    setIsTextMode(true);
                }
                activeRef.current = true;
                setIsActive(true);
                setStatus("CONNECTING");
                
                const welcome = "Establishing secure connection to MSA Agent Core. I am the Architect. How can I assist with your organization's AI transformation today?";
                setAgentResponse(welcome);
                setStatus("SPEAKING");
                
                if (synthesisRef.current && synthesisRef.current.paused) {
                    synthesisRef.current.resume();
                }

                speakText(welcome, () => {
                    if (activeRef.current) {
                        listeningTimeoutRef.current = setTimeout(() => startListening(), 500);
                    }
                });
            };

            if (SpeechRecognition) {
                initProtocol(false);
            } else {
                setPermissionError("Voice recognition is not natively supported in this environment. Continuing in Text Mode.");
                initProtocol(true);
                setTimeout(() => setPermissionError(null), 10000);
            }
        }
    };

    return (
        <section id="ai-employee-section" className="relative w-full overflow-hidden bg-transparent pt-0 pb-8 lg:pb-16 -mt-2 content-deferred">
            <div aria-hidden className="absolute top-1/2 right-0 -translate-y-1/2 w-[900px] h-[900px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none opacity-40 translate-x-1/3 transform-gpu" />
            <div aria-hidden className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none opacity-20 -translate-x-1/2 -translate-y-1/2 transform-gpu" />

            <div className="container-standard relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] lg:gap-x-16 items-start">

                    {/* 1. TOP: Heading & Description */}
                    <div className="flex flex-col items-start text-left space-y-4 lg:space-y-10 order-1 lg:mb-12 pt-4 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: prefersReducedMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-3 lg:space-y-8"
                        >

                             <h2 className="fluid-h2 text-foreground relative not-italic">
                                THE ERA OF AI <br />
                                <span className="drop-shadow-[0_0_40px_hsl(var(--secondary)/0.35)] bg-gradient-to-r from-secondary to-secondary/50 bg-clip-text text-transparent not-italic">
                                    IS HERE.
                                </span>
                            </h2>

                            <p className="text-foreground/70 dark:text-foreground/60 text-base md:text-xl lg:text-2xl font-medium max-w-xl leading-relaxed tracking-tight border-l-[3px] border-secondary/15 pl-6 lg:pl-10">
                                Transform your organization with self-evolving digital employees&mdash;autonomous agents that handle mission-critical workflows with near-zero latency and elastic scalability.
                            </p>

                            {/* Voice Intelligence Section */}
                            <div className="mt-8 space-y-4 border-l-[3px] border-secondary/15 pl-6 lg:pl-10 relative">
                                <div className="absolute -left-[3px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-secondary to-transparent opacity-50" />
                                <h3 className="text-base md:text-lg lg:text-xl font-black text-white uppercase leading-tight not-italic">
                                    Speak to <br className="hidden lg:block" />
                                    <span className="text-white/40 not-italic">The Architect.</span>
                                </h3>
                                <p className="text-sm md:text-base text-foreground/60 font-medium max-w-md leading-relaxed not-italic">
                                    A live AI conversation powered by MSA Agent. Ask about our services, get instant answers, and experience the future of enterprise voice intelligence.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. MIDDLE: Visual Hub */}
                    <div className="relative order-2 lg:row-span-2 flex justify-center items-center py-0 lg:py-0 min-h-[350px] md:min-h-[550px] lg:min-h-[950px] scale-[0.78] sm:scale-90 md:scale-95 lg:scale-100 transition-transform duration-700 -my-14 lg:my-0">
                        <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.06)_0%,transparent_75%)] opacity-40" />
                            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
                            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
                        </div>

                        <div className="relative w-full h-[550px] lg:h-[950px] flex items-center justify-center">
                            {!prefersReducedMotion && (
                                <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                                    <div className="absolute w-[140%] aspect-square rounded-full border border-secondary/5 opacity-[0.05] hidden lg:block transform-gpu animate-[spin_60s_linear_infinite]" />
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="relative w-full max-w-[300px] md:max-w-[500px] lg:max-w-[720px] h-[480px] md:h-[750px] lg:h-[950px] z-20 group transform-gpu"
                            >
                                <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[5rem] border border-white/5 bg-zinc-950/40 backdrop-blur-lg overflow-hidden shadow-[0_100px_200px_-40px_rgba(0,0,0,1)] ring-1 ring-white/5">
                                    <Image src="/images/team/zeeshan-keerio.webp" alt="Zeeshan Keerio, Founder of Mindscape Analytics" fill sizes="(min-width: 1024px) 720px, (min-width: 768px) 500px, 300px" className="object-cover object-top contrast-[1.05] grayscale-[0.02] group-hover:grayscale-0 transition-[filter] duration-[3s]" priority />
                                    <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />
                                    <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-background via-background/40 to-transparent z-10 pointer-events-none" />

                                    <div className="absolute inset-x-0 bottom-6 lg:bottom-10 z-20 flex flex-col items-center gap-4 px-4">
                                        {/* Voice Terminal Overlay */}
                                        <AnimatePresence>
                                            {permissionError && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                                    className="w-[90%] max-w-sm bg-zinc-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-4 mb-2 text-center pointer-events-auto z-30 shadow-2xl"
                                                >
                                                    {/* Header */}
                                                    <div className="flex items-center gap-2 justify-center mb-2">
                                                        <MicOff className="w-3.5 h-3.5 text-amber-400" />
                                                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-black">MIC UNAVAILABLE</span>
                                                    </div>
                                                    {/* Message */}
                                                    <p className="text-[11px] text-white/60 leading-relaxed mb-3">
                                                        {permissionError}
                                                    </p>
                                                    {/* Countdown badge */}
                                                    {micFallbackCountdown !== null && micFallbackCountdown > 0 && (
                                                        <div className="flex items-center justify-center gap-2 mb-3">
                                                            <div className="w-8 h-8 rounded-full border-2 border-amber-400/60 flex items-center justify-center">
                                                                <span className="text-sm font-black text-amber-400">{micFallbackCountdown}</span>
                                                            </div>
                                                            <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">AUTO SWITCHING</span>
                                                        </div>
                                                    )}
                                                    {/* Instant switch button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            // Clear the countdown interval
                                                            if (micFallbackIntervalRef.current) {
                                                                clearInterval(micFallbackIntervalRef.current);
                                                                micFallbackIntervalRef.current = null;
                                                            }
                                                            setPermissionError(null);
                                                            setMicFallbackCountdown(null);
                                                            // Slight delay so error overlay exits before text mode mounts
                                                            setTimeout(() => startTextProtocol(), 100);
                                                        }}
                                                        className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-[10px] text-black font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                                                    >
                                                        ⚡ Switch to Text Mode Now
                                                    </button>
                                                </motion.div>
                                            )}
                                            {(transcript || agentResponse || isTextMode) && isActive && !permissionError && !micFallbackCountdown && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 20 }} 
                                                    animate={{ opacity: 1, y: 0 }} 
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="w-[90%] max-w-sm bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-left shadow-2xl relative overflow-hidden pointer-events-auto z-30"
                                                >
                                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
                                                    <div role="log" aria-live="polite" className="space-y-3 max-h-[150px] overflow-y-auto custom-scrollbar mb-2">
                                                        {transcript && (
                                                            <div className="flex gap-2 items-start">
                                                                <span className="text-[9px] font-mono text-white/30 uppercase mt-1 shrink-0">YOU</span>
                                                                <p className="text-xs lg:text-sm text-white/70 leading-snug">&quot;{transcript}&quot;</p>
                                                            </div>
                                                        )}
                                                        {agentResponse && (
                                                            <div className="flex gap-2 items-start pt-2 border-t border-white/5">
                                                                <span className="text-[9px] font-mono text-secondary uppercase mt-1 shrink-0">AI</span>
                                                                <p className="text-xs lg:text-sm text-white leading-snug">{agentResponse}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {isTextMode && (status === "LISTENING" || status === "IDLE") && (
                                                        <form 
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                if (!textInput.trim()) return;
                                                                const query = textInput;
                                                                setTextInput("");
                                                                processUserInput(query);
                                                            }}
                                                            className="flex gap-2 mt-3 pt-3 border-t border-white/10"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={textInput}
                                                                onChange={(e) => setTextInput(e.target.value)}
                                                                aria-label="Type your message to The Architect"
                                                                placeholder="Type your query to the Architect..."
                                                                className="flex-1 h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/35 focus:outline-none focus:border-secondary/50 transition-colors"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="h-9 px-3 rounded-lg bg-white text-black font-mono text-[10px] font-black uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all cursor-pointer shrink-0"
                                                            >
                                                                SEND
                                                            </button>
                                                        </form>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Action Button */}
                                        <button
                                            type="button"
                                            onClick={toggleProtocol}
                                            aria-label={isActive ? "Terminate voice session with The Architect" : "Start a voice session with The Architect"}
                                            aria-pressed={isActive}
                                            className={cn(
                                                "group relative px-6 py-3 lg:px-8 lg:py-4 rounded-full backdrop-blur-md transition-all overflow-hidden flex items-center justify-center gap-3 lg:gap-4 w-[90%] max-w-sm",
                                                isActive 
                                                    ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
                                                    : "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out",
                                                isActive ? "via-white/10" : "via-black/5"
                                            )} />
                                            
                                            <div className={cn(
                                                "relative shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors",
                                                isActive ? "bg-red-600 border-white/20" : "bg-black/5 border-black/10"
                                            )}>
                                                <AnimatePresence mode="wait">
                                                    {status === "IDLE" && <Mic key="mic" size={14} className="text-black/60" />}
                                                    {status === "CONNECTING" && <Globe key="globe" size={14} className="text-white animate-spin" />}
                                                    {status === "LISTENING" && <Volume2 key="vol" size={14} className="text-white animate-pulse" />}
                                                    {status === "THINKING" && <Zap key="zap" size={14} className="text-white animate-bounce" />}
                                                    {status === "SPEAKING" && <Phone key="phone" size={14} className="text-white animate-pulse" />}
                                                </AnimatePresence>
                                                {isActive && !prefersReducedMotion && (
                                                    <motion.div
                                                        aria-hidden
                                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="absolute inset-0 rounded-full border border-white/50"
                                                    />
                                                )}
                                            </div>

                                            <div className="flex flex-col items-start text-left">
                                                <span className={cn(
                                                    "text-[9px] lg:text-[11px] font-black uppercase tracking-[0.15em] transition-colors not-italic",
                                                    isActive ? "text-white" : "text-black group-hover:text-black/80"
                                                )}>
                                                    {isActive ? "Terminate Protocol" : "Speak to The Architect"}
                                                </span>
                                                <span className={cn(
                                                    "text-[6px] lg:text-[7px] font-mono tracking-[0.3em] uppercase not-italic",
                                                    isActive ? "text-white/70" : "text-black/50"
                                                )}>
                                                    {isActive 
                                                        ? status === "LISTENING" 
                                                            ? isTextMode 
                                                                ? "HYBRID TEXT MODE • TYPE BELOW" 
                                                                : "LISTENING..." 
                                                            : status === "THINKING" 
                                                                ? "PROCESSING WITH MSA CORE..." 
                                                                : status === "SPEAKING" 
                                                                    ? "SPEAKING..." 
                                                                    : "ABORT CONNECTION"
                                                        : ""
                                                    }
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                    {!prefersReducedMotion && (
                                        <motion.div aria-hidden animate={{ y: ["-100%", "300%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-x-0 h-[40%] bg-gradient-to-b from-transparent via-secondary/5 to-transparent z-30 opacity-50 border-b border-white/10 transform-gpu will-change-transform" />
                                    )}
                                </div>

                                {TAGS.map((tag) => (
                                    <motion.div
                                        key={tag.name}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: prefersReducedMotion ? 0 : 1.2 + tag.delay, duration: 0.6 }}
                                        className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            left: `calc(50% + ${tag.x * tagScale}px)`,
                                            top: `calc(50% + ${tag.y * tagScale}px)`,
                                        }}
                                    >
                                        <div className={cn("px-4 py-2 lg:px-6 lg:py-2.5 rounded-full border backdrop-blur-sm flex items-center gap-2 lg:gap-3 shadow-xl relative group", tag.bg, tag.border)}>
                                            <div className={cn("w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full", !prefersReducedMotion && "animate-pulse", tag.dot)} />
                                            <span className="text-[7px] lg:text-[9px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] whitespace-nowrap text-white/90">
                                                {tag.name}
                                            </span>
                                            <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* 3. Feature Cards */}
                    <div className="order-3 lg:col-start-1 lg:row-start-2 pt-0 lg:pt-0 -mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-10 w-full max-w-2xl"
                        >
                            <div className="group p-5 lg:p-10 rounded-[1.2rem] lg:rounded-[3rem] bg-foreground/2 border border-border/30 backdrop-blur-md transition-colors hover:border-secondary/20 shadow-xl">
                                <Cpu className="w-5 h-5 lg:w-8 lg:h-8 text-secondary mb-3 lg:mb-6 opacity-40" />
                                <h4 className="text-[8px] lg:text-[11px] font-mono font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-foreground/50 mb-1 lg:mb-3">Cognitive Capacity</h4>
                                <p className="text-lg lg:text-3xl font-bold text-foreground leading-tight tracking-tight">Infinite Parallelism</p>
                            </div>
                            <div className="group p-5 lg:p-10 rounded-[1.2rem] lg:rounded-[3rem] bg-foreground/2 border border-border/30 backdrop-blur-md transition-colors hover:border-secondary/20 shadow-xl">
                                <ShieldCheck className="w-5 h-5 lg:w-8 lg:h-8 text-secondary mb-3 lg:mb-6 opacity-40" />
                                <h4 className="text-[8px] lg:text-[11px] font-mono font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-foreground/50 mb-1 lg:mb-3">System Reliability</h4>
                                <p className="text-lg lg:text-3xl font-bold text-foreground leading-tight tracking-tight">Enterprise-Grade Reliability</p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
