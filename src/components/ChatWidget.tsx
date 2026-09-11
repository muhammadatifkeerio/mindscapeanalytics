"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, Mail, Activity, ShieldCheck, Plus, Rocket, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: number;
}

const GREETING = `Welcome to Mindscape Analytics! I'm Zee - your gateway to enterprise automation, voice agents, and full-stack SaaS solutions.\n\nHow can I help transform your business today?`;

const LEAD_PROMPT_THRESHOLD = 3; // Ask for email after 3 exchanges

const formatMarkdown = (text: string) => {
    if (!text) return { __html: '' };
    
    // Parse tables first
    let parsedText = text;
    if (parsedText.includes('|')) {
        const lines = parsedText.split('\n');
        let inTable = false;
        let tableRowsCount = 0;
        const newLines = [];
        let currentTableHtml = "";
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('|') && line.endsWith('|')) {
                // Check if it's a separator line like |---|---|
                if (line.match(/^\|(?:\s*[-:]+\s*\|)+$/)) {
                    continue; // Skip separator line
                }
                
                if (!inTable) {
                    inTable = true;
                    tableRowsCount = 0;
                    currentTableHtml = '<div class="overflow-x-auto my-4 rounded-xl border border-border"><table class="w-full text-sm text-left border-collapse">';
                }
                
                const cells = line.split('|').filter((_, index, array) => index !== 0 && index !== array.length - 1);
                
                currentTableHtml += '<tr class="border-b border-border last:border-b-0 hover:bg-foreground/[0.02] transition-colors">';
                cells.forEach((cell) => {
                    const content = cell.trim();
                    // If it's the first row of the table, treat as header
                    if (tableRowsCount === 0) { 
                         currentTableHtml += `<th class="px-4 py-3 font-bold bg-foreground/[0.05] border-r border-border last:border-r-0 text-foreground">${content}</th>`;
                    } else {
                         currentTableHtml += `<td class="px-4 py-3 border-r border-border last:border-r-0 text-foreground/80">${content}</td>`;
                    }
                });
                currentTableHtml += '</tr>';
                tableRowsCount++;
            } else {
                if (inTable) {
                    inTable = false;
                    currentTableHtml += '</table></div>';
                    newLines.push(currentTableHtml);
                    currentTableHtml = "";
                }
                newLines.push(lines[i]);
            }
        }
        if (inTable) {
            currentTableHtml += '</table></div>';
            newLines.push(currentTableHtml);
        }
        parsedText = newLines.join('\n');
    }

    const html = parsedText
        .replace(/###\s+(.*?)(?=\n|$)/g, '<h3 class="text-base font-bold mt-4 mb-2 text-foreground">$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-foreground/80 font-bold">$1</em>')
        .replace(/-\s+(.*?)(?=\n|$)/g, '<li class="ml-4 list-disc my-1">$1</li>')
        .replace(/---/g, '<hr class="my-4 border-border opacity-50" />')
        .replace(/\n/g, '<br />')
        // Clean breaks around block elements
        .replace(/(<br \/>)+<h3/g, '<h3')
        .replace(/<\/h3>(<br \/>)+/g, '</h3>')
        .replace(/(<br \/>)+<li/g, '<li')
        .replace(/<\/li>(<br \/>)+/g, '</li>')
        .replace(/(<br \/>)+<hr/g, '<hr')
        .replace(/hr(.*?)>(<br \/>)+/g, 'hr$1>')
        // Clean breaks around tables
        .replace(/(<br \/>)+<div class="overflow-x-auto/g, '<div class="overflow-x-auto')
        .replace(/<\/div>(<br \/>)+/g, '</div>');
        
    return { __html: html };
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: GREETING, timestamp: Date.now() },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showLeadCapture, setShowLeadCapture] = useState(false);
    const [leadEmail, setLeadEmail] = useState("");
    const [leadCaptured, setLeadCaptured] = useState(false);
    const [exchangeCount, setExchangeCount] = useState(0);
    const [isHudOpen, setIsHudOpen] = useState(false);
    
    // Premium Voice Mode States
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    const voiceActiveRef = useRef(false);
    const listeningActiveRef = useRef(false);
    const resumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize Speech and Voices for the Chatbot
    useEffect(() => {
        if (typeof window !== "undefined") {
            synthesisRef.current = window.speechSynthesis;
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                if (availableVoices.length > 0) {
                    setVoices(availableVoices);
                }
            };
            loadVoices();
            
            const interval = setInterval(() => {
                if (window.speechSynthesis.getVoices().length > 0) {
                    loadVoices();
                    clearInterval(interval);
                }
            }, 100);

            window.speechSynthesis.onvoiceschanged = loadVoices;
            return () => {
                clearInterval(interval);
                if (resumeIntervalRef.current) {
                    clearInterval(resumeIntervalRef.current);
                }
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
        }
    }, []);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat', handleOpenChat);
        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, showLeadCapture]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Show lead capture after threshold exchanges
    useEffect(() => {
        if (exchangeCount >= LEAD_PROMPT_THRESHOLD && !leadCaptured && !showLeadCapture) {
            setShowLeadCapture(true);
        }
    }, [exchangeCount, leadCaptured, showLeadCapture]);

    // Conversational Text-to-Speech Engine
    const speakResponse = useCallback((text: string) => {
        if (!synthesisRef.current || !voiceActiveRef.current) return;
        
        if (resumeIntervalRef.current) {
            clearInterval(resumeIntervalRef.current);
            resumeIntervalRef.current = null;
        }

        window.speechSynthesis.resume();
        synthesisRef.current.cancel();

        // Strip HTML/markdown syntax from response text
        const cleanText = text
            .replace(/###\s+/g, "")
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/-\s+/g, "")
            .replace(/<[^>]*>/g, "");

        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        const preferredVoices = [
            "Microsoft Christopher Online (Natural)",
            "Microsoft Andrew Online (Natural)",
            "Google US English Male",
            "Apple Daniel",
            "English (United States)"
        ];

        let availableVoices = voices;
        if (availableVoices.length === 0) {
            availableVoices = window.speechSynthesis.getVoices();
        }

        let selectedVoice = null;
        for (const name of preferredVoices) {
            selectedVoice = availableVoices.find((v: any) => v.name.includes(name));
            if (selectedVoice) break;
        }

        if (!selectedVoice) {
            selectedVoice = availableVoices.find((v: any) => v.lang.startsWith("en-US") && (v.name.includes("Male") || v.name.includes("Natural")));
        }

        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        resumeIntervalRef.current = setInterval(() => {
            if (synthesisRef.current && synthesisRef.current.speaking) {
                synthesisRef.current.resume();
            }
        }, 10000);

        utterance.onend = () => {
            if (resumeIntervalRef.current) {
                clearInterval(resumeIntervalRef.current);
                resumeIntervalRef.current = null;
            }
            if (voiceActiveRef.current) {
                startVoiceListening();
            }
        };

        utterance.onerror = () => {
            if (resumeIntervalRef.current) {
                clearInterval(resumeIntervalRef.current);
                resumeIntervalRef.current = null;
            }
            if (voiceActiveRef.current) {
                startVoiceListening();
            }
        };

        synthesisRef.current.speak(utterance);
    }, [voices]);

    // Conversational Speech-to-Text Engine
    const startVoiceListening = useCallback(() => {
        if (!voiceActiveRef.current) return;
        setIsListening(true);
        listeningActiveRef.current = true;

        if (typeof window === "undefined") return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsListening(false);
            listeningActiveRef.current = false;
            return;
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

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        let finalTranscript = "";

        recognition.onresult = (event: any) => {
            if (!voiceActiveRef.current) return;
            let interimTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            if (interimTranscript) {
                setInput(interimTranscript);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            listeningActiveRef.current = false;
            if (!voiceActiveRef.current) return;

            if (finalTranscript.trim()) {
                setInput(finalTranscript);
                submitVoiceMessage(finalTranscript);
            }
        };

        recognition.onerror = (event: any) => {
            console.error("Chat STT Error:", event.error);
            setIsListening(false);
            listeningActiveRef.current = false;
            
            if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                toggleVoiceMode(false);
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Chat recognition start error:", e);
            setIsListening(false);
            listeningActiveRef.current = false;
        }
    }, []);

    const toggleVoiceMode = (forcedValue?: boolean) => {
        const target = typeof forcedValue === "boolean" ? forcedValue : !isVoiceActive;
        
        setIsVoiceActive(target);
        voiceActiveRef.current = target;

        if (!target) {
            setIsListening(false);
            listeningActiveRef.current = false;
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
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
            if (typeof navigator !== "undefined" && navigator.mediaDevices) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(() => {
                        startVoiceListening();
                    })
                    .catch((err) => {
                        console.error("Mic Access Denied:", err);
                        setIsVoiceActive(false);
                        voiceActiveRef.current = false;
                    });
            } else {
                startVoiceListening();
            }
        }
    };

    const captureLead = useCallback(async () => {
        if (!leadEmail.trim()) return;
        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: leadEmail,
                    source: "chat",
                    message: messages.map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 2000),
                    metadata: { exchangeCount, capturedAt: new Date().toISOString() },
                }),
            });
            setLeadCaptured(true);
            setShowLeadCapture(false);
            const confirmation = `Thank you! I've noted your email (${leadEmail}). Our architects will follow up with a personalized proposal within 24 hours. Feel free to continue chatting!`;
            setMessages(prev => [...prev, {
                role: "assistant",
                content: confirmation,
                timestamp: Date.now(),
            }]);
            
            if (voiceActiveRef.current) {
                speakResponse(confirmation);
            }
        } catch {
            setShowLeadCapture(false);
        }
    }, [leadEmail, messages, exchangeCount, speakResponse]);

    const submitVoiceMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = { role: "user", content: trimmed, timestamp: Date.now() };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        const emailMatch = trimmed.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch && !leadCaptured) {
            try {
                fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: emailMatch[0],
                        source: "chat",
                        message: updatedMessages.map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 2000),
                    }),
                });
                setLeadCaptured(true);
                setShowLeadCapture(false);
            } catch { }
        }

        try {
            const res = await fetch("/api/voice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    transcript: trimmed,
                    history: messages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!res.ok) throw new Error("API error");
            const data = await res.json();
            const reply = data.response || "I'd be happy to help. Could you tell me more about your specific needs?";

            setMessages(prev => [...prev, {
                role: "assistant",
                content: reply,
                timestamp: Date.now(),
            }]);
            setExchangeCount(prev => prev + 1);

            if (voiceActiveRef.current) {
                speakResponse(reply);
            }
        } catch {
            const lower = trimmed.toLowerCase();
            let fallback = "That's an excellent question. Our team at Mindscape Analytics specializes in exactly this area. Would you like to schedule a strategy call?";
            if (lower.includes("price") || lower.includes("cost")) {
                fallback = "Our solutions start at $999/month for standard automation packages. Enterprise tiers include custom AI agents, voice integration, and dedicated support. Want a detailed quote?";
            } else if (lower.includes("voice") || lower.includes("agent")) {
                fallback = "We deploy autonomous AI voice agents using Vapi and Retell that handle sales, support, and appointment booking 24/7. They integrate with your CRM and process calls in real-time.";
            } else if (lower.includes("automation") || lower.includes("n8n")) {
                fallback = "We architect n8n automation workflows that connect 400+ apps — CRM sync, lead nurturing, invoice processing, and more. Most clients see 60-80% time savings.";
            }
            setMessages(prev => [...prev, { role: "assistant", content: fallback, timestamp: Date.now() }]);
            setExchangeCount(prev => prev + 1);

            if (voiceActiveRef.current) {
                speakResponse(fallback);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        if (synthesisRef.current) {
            synthesisRef.current.cancel();
        }

        const userMessage: Message = { role: "user", content: trimmed, timestamp: Date.now() };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        const emailMatch = trimmed.match(/[\w.-]+@[\w.-]+\.\w+/);
        if (emailMatch && !leadCaptured) {
            try {
                fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: emailMatch[0],
                        source: "chat",
                        message: updatedMessages.map(m => `${m.role}: ${m.content}`).join("\n").slice(0, 2000),
                    }),
                });
                setLeadCaptured(true);
                setShowLeadCapture(false);
            } catch { }
        }

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!res.ok) throw new Error("API error");
            const data = await res.json();
            const reply = data.content || "I'd be happy to help. Could you tell me more about your specific needs?";

            setMessages(prev => [...prev, {
                role: "assistant",
                content: reply,
                timestamp: Date.now(),
            }]);
            setExchangeCount(prev => prev + 1);

            if (voiceActiveRef.current) {
                speakResponse(reply);
            }
        } catch {
            // Intelligent local fallback
            const lower = trimmed.toLowerCase();
            let fallback = "That's an excellent question. Our team at Mindscape Analytics specializes in exactly this area. Would you like to schedule a strategy call?";
            if (lower.includes("price") || lower.includes("cost")) {
                fallback = "Our solutions start at $999/month for standard automation packages. Enterprise tiers include custom AI agents, voice integration, and dedicated support. Want a detailed quote?";
            } else if (lower.includes("voice") || lower.includes("agent")) {
                fallback = "We deploy autonomous AI voice agents using Vapi and Retell that handle sales, support, and appointment booking 24/7. They integrate with your CRM and process calls in real-time.";
            } else if (lower.includes("automation") || lower.includes("n8n")) {
                fallback = "We architect n8n automation workflows that connect 400+ apps — CRM sync, lead nurturing, invoice processing, and more. Most clients see 60-80% time savings.";
            }
            setMessages(prev => [...prev, { role: "assistant", content: fallback, timestamp: Date.now() }]);
            setExchangeCount(prev => prev + 1);

            if (voiceActiveRef.current) {
                speakResponse(fallback);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Trigger Button — quiet until needed; no pulse badge */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-[0_4px_20px_hsl(var(--foreground)/0.08)] backdrop-blur-md transition-[background-color,border-color,opacity] duration-200 hover:border-foreground/30 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-6 md:right-6"
                        aria-label="Open chat assistant"
                    >
                        <MessageSquare className="h-5 w-5 text-foreground/75" aria-hidden="true" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Chat with Mindscape Analytics"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-[min(620px,85vh)] w-[calc(100vw-32px)] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-[0_16px_48px_hsl(var(--foreground)/0.12)] sm:w-[420px] md:bottom-6 md:right-6"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-foreground/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-foreground/5 border border-border flex items-center justify-center relative">
                                    <Bot className="w-5 h-5 text-foreground/60" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Zee</h3>
                                    <p className="text-[10px] font-sans text-foreground/50">Online · Mindscape Analytics</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setIsHudOpen(!isHudOpen)}
                                    aria-label={isHudOpen ? "Hide status panel" : "Show status panel"}
                                    aria-pressed={isHudOpen}
                                    className={cn(
                                        "relative flex h-11 w-11 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                        isHudOpen ? "bg-secondary/10 text-secondary" : "text-foreground/40 hover:bg-foreground/5 hover:text-foreground/80"
                                    )}
                                >
                                    <Activity className="h-4 w-4" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close chat"
                                    className="flex h-11 w-11 items-center justify-center rounded-lg text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                >
                                    <X className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        {isHudOpen ? (
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin bg-card/10 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-secondary flex items-center gap-2 mb-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                                Platform Core Console
                                            </span>
                                            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">
                                                Operational HUD
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[9px] font-mono font-black uppercase tracking-wider">Status: Nominal</span>
                                        </div>
                                    </div>

                                    {/* HUD Quick Actions */}
                                    <div className="space-y-3">
                                        <span className="text-[8px] font-black uppercase tracking-[0.25em] text-foreground/3 block">Console_Initiators</span>
                                        
                                        <a href="/contact" className="flex items-center justify-between p-4 bg-foreground/[0.02] hover:bg-foreground/[0.05] border border-border/45 rounded-2xl group transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                                    <ShieldCheck size={14} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/80">Initialize Audit</span>
                                            </div>
                                            <Plus size={14} className="opacity-40 group-hover:rotate-90 transition-transform text-foreground" />
                                        </a>

                                        <a href="/contact" className="flex items-center justify-between p-4 bg-foreground/[0.02] hover:bg-foreground/[0.05] border border-border/45 rounded-2xl group transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/60">
                                                    <MessageSquare size={14} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/80">Global Support</span>
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                        </a>
                                    </div>

                                    {/* Live Operations Feed */}
                                    <div className="space-y-3 bg-foreground/[0.01] border border-border/30 rounded-2xl p-4 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none rotate-12">
                                            <Rocket size={100} strokeWidth={0.5} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-foreground/30">Live_Operations_Feed</span>
                                            <span className="text-[7px] font-mono text-secondary tracking-widest uppercase animate-pulse">SECURE SYNC</span>
                                        </div>
                                        <div className="flex flex-col gap-2 opacity-80 font-mono text-[9px] tracking-tight leading-normal">
                                            <div className="flex items-center justify-between">
                                                <span className="text-secondary font-bold">[AGENT_402]</span>
                                                <span className="text-foreground/50">AUDITING_SYS_X</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-foreground/35 font-bold">[AGENT_109]</span>
                                                <span className="text-emerald-400">REVENUE_DEPLOYED</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-secondary font-bold">[CORE_SYS]</span>
                                                <span className="text-foreground/50">SYNCING_LEDGER_DATA</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsHudOpen(false)}
                                    className="w-full mt-4 py-3 rounded-xl bg-foreground text-background text-xs font-black uppercase tracking-wider hover:bg-foreground/80 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Back to AI Conversation
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Messages */}
                                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            {msg.role === "assistant" && (
                                                <div className="w-6 h-6 rounded-lg bg-foreground/5 border border-border flex items-center justify-center shrink-0 mt-1">
                                                    <Sparkles className="w-3 h-3 text-secondary" />
                                                </div>
                                            )}
                                            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                                    ? "bg-foreground text-background rounded-br-md"
                                                    : "bg-foreground/[0.04] border border-border text-foreground/80 rounded-bl-md"
                                                }`}>
                                                {msg.role === "assistant" ? (
                                                    <div dangerouslySetInnerHTML={formatMarkdown(msg.content)} className="space-y-1" />
                                                ) : (
                                                    msg.content.split("\n").map((line, li) => (
                                                        <p key={li} className={li > 0 ? "mt-2" : ""}>{line}</p>
                                                    ))
                                                )}
                                            </div>
                                            {msg.role === "user" && (
                                                <div className="w-6 h-6 rounded-lg bg-foreground flex items-center justify-center shrink-0 mt-1">
                                                    <User className="w-3 h-3 text-background" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex gap-2.5">
                                            <div className="w-6 h-6 rounded-lg bg-foreground/5 border border-border flex items-center justify-center shrink-0">
                                                <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                                            </div>
                                            <div className="px-4 py-3 rounded-2xl bg-foreground/[0.04] border border-border rounded-bl-md flex items-center gap-2">
                                                <Loader2 className="w-3 h-3 animate-spin text-foreground/30" />
                                                <span className="text-xs text-foreground/30 font-mono">Processing...</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Lead Capture Prompt */}
                                    <AnimatePresence>
                                        {showLeadCapture && !leadCaptured && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-4 space-y-3"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-secondary" />
                                                    <p className="text-xs font-bold text-foreground uppercase tracking-wider">Get a Personalized Proposal</p>
                                                </div>
                                                <p className="text-xs text-foreground/50">Drop your email and our architects will send you a custom strategy within 24 hours.</p>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="email"
                                                        value={leadEmail}
                                                        onChange={(e) => setLeadEmail(e.target.value)}
                                                        placeholder="your@email.com"
                                                        className="flex-1 h-9 px-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-secondary"
                                                        onKeyDown={(e) => { if (e.key === "Enter") captureLead(); }}
                                                    />
                                                    <button onClick={captureLead} className="h-9 px-4 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/80 transition-colors uppercase tracking-wider">
                                                        Send
                                                    </button>
                                                </div>
                                                <button onClick={() => setShowLeadCapture(false)} className="text-[10px] text-foreground/30 hover:text-foreground/50 transition-colors">
                                                    Maybe later
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Input Bar */}
                                <div className="px-4 py-3 border-t border-border bg-foreground/[0.01]">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => toggleVoiceMode()}
                                            className={cn(
                                                "w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 relative overflow-hidden",
                                                isVoiceActive 
                                                    ? "bg-secondary text-white shadow-[0_0_15px_rgba(255,46,99,0.4)] border border-secondary" 
                                                    : "bg-foreground/[0.03] border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/[0.06]"
                                            )}
                                            title={isVoiceActive ? "Turn off Voice Mode" : "Turn on Voice Mode"}
                                        >
                                            {isVoiceActive ? (
                                                <>
                                                    <Mic className="w-4 h-4 animate-pulse text-white" />
                                                    {isListening && (
                                                        <span className="absolute inset-0 bg-white/20 animate-ping rounded-xl pointer-events-none" />
                                                    )}
                                                </>
                                            ) : (
                                                <MicOff className="w-4 h-4 opacity-70" />
                                            )}
                                        </button>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                            placeholder={isVoiceActive ? (isListening ? "Listening... Speak now" : "Processing voice...") : "Ask about AI automation, pricing..."}
                                            className="flex-1 h-11 px-4 rounded-xl bg-foreground/[0.03] border border-border text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-secondary/50 transition-colors"
                                            disabled={isLoading}
                                        />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!input.trim() || isLoading}
                                            className="w-11 h-11 rounded-xl bg-foreground text-background flex items-center justify-center hover:bg-foreground/80 transition-colors disabled:opacity-30 disabled:hover:bg-foreground shrink-0"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
