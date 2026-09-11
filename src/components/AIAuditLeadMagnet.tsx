"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Bot, Target, Zap, CheckCircle2, Sparkles, Mail, Shield, Globe, Users, TrendingUp, Award, Cpu, Database } from 'lucide-react';

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
    const [display, setDisplay] = useState(`${prefix}0${suffix}`);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (v) => setDisplay(v));
        return () => unsubscribe();
    }, [rounded]);

    return (
        <motion.span
            onViewportEnter={() => {
                animate(count, target, { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] });
            }}
            viewport={{ once: true }}
        >
            {display}
        </motion.span>
    );
}

const businessStats = [
    { icon: Bot, value: 47, suffix: "+", label: "Agents", color: "text-emerald-400" },
    { icon: Zap, value: 2.4, suffix: "M+", label: "Tasks", color: "text-amber-400" },
    { icon: Users, value: 35, suffix: "+", label: "Clients", color: "text-blue-400" },
    { icon: TrendingUp, value: 340, suffix: "%", label: "ROI", color: "text-purple-400" },
];

const testimonials = [
    {
        quote: "Reduced response time from 4h to 30s. The ROI was immediate.",
        name: "Sarah Chen",
        role: "VP Ops, FinServe",
        metric: "98% Faster",
    }
];

export default function AIAuditLeadMagnet() {
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || isSubmitting) return;
        setIsSubmitting(true);

        try {
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    company: company || undefined,
                    source: "audit",
                    service: "Free AI Automation Audit",
                    message: "Requested AI readiness audit from landing page lead magnet",
                }),
            });
            setIsSubmitted(true);
        } catch {
            window.location.href = `/contact?plan=ai-audit&email=${encodeURIComponent(email)}`;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 border-t border-border bg-transparent relative overflow-hidden group">
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-foreground/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container-standard relative z-10">
                <div className="bg-foreground/[0.02] border border-border rounded-[3rem] overflow-hidden backdrop-blur-xl">
                    <div className="flex flex-col lg:grid lg:grid-cols-12">
                        
                        {/* LEFT COLUMN: THE OFFER & FORM (7/12) */}
                        <div className="lg:col-span-7 p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-border space-y-10">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-foreground/5 border border-border">
                                <Bot className="w-4 h-4 text-foreground/60" />
                                <span className="text-foreground/60 text-[9px] font-mono font-black tracking-[0.4em] uppercase">Free Infrastructure Review</span>
                            </div>

                            <div className="space-y-6">
                                <h2 className="fluid-h2 font-black uppercase not-italic">
                                    AI AUTOMATION <br /> 
                                    <span className="bg-gradient-to-r from-secondary via-foreground/80 to-secondary bg-[length:200%_auto] bg-clip-text text-transparent shimmer-sweep">READINESS.</span>
                                </h2>
                                <p className="text-lg text-foreground/40 font-medium leading-relaxed uppercase tracking-tighter max-w-2xl">
                                    Stop guessing. Our engineers will map out the exact AI system architecture required to scale your organization.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                {[
                                    { icon: Target, step: "1", title: "Identify Gaps" },
                                    { icon: Zap, step: "2", title: "System Design" },
                                    { icon: Sparkles, step: "3", title: "Custom Roadmap" }
                                ].map((item) => (
                                    <div key={item.step} className="flex items-center gap-3 bg-foreground/5 p-4 rounded-xl border border-border">
                                        <item.icon className="w-5 h-5 text-foreground/40" />
                                        <div>
                                            <div className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/20">Step {item.step}</div>
                                            <div className="text-xs font-bold uppercase tracking-wider text-foreground/80">{item.title}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                {isSubmitted ? (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 py-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h3 className="text-lg font-black uppercase tracking-wider">Audit Requested</h3>
                                        <p className="text-xs text-foreground/40">Architectural analysis delivered within 48 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                required
                                                className="flex-1 h-14 px-6 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-secondary transition-colors text-sm"
                                            />
                                            <input
                                                type="text"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                placeholder="Company"
                                                className="flex-1 h-14 px-6 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-secondary transition-colors text-sm"
                                            />
                                        </div>
                                        <button type="submit" disabled={isSubmitting} className="btn-institutional group w-full py-5 not-italic">
                                            <span className="relative z-10 flex items-center justify-center gap-4">
                                                {isSubmitting ? "Processing..." : "Secure My Free Audit"}
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                            </span>
                                        </button>
                                        <p className="text-[10px] text-foreground/20 text-center font-bold uppercase tracking-widest">No spam. Mission-critical intelligence only.</p>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: TRUST & TECH (5/12) */}
                        <div className="lg:col-span-5 p-8 md:p-16 bg-foreground/[0.01] space-y-12 flex flex-col justify-center">
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {businessStats.map((stat) => (
                                    <div key={stat.label} className="p-5 rounded-2xl bg-foreground/[0.02] border border-border/30 text-center">
                                        <stat.icon className={`w-4 h-4 mx-auto mb-2 ${stat.color} opacity-40`} />
                                        <div className="text-xl font-black text-foreground tracking-tight">
                                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                        </div>
                                        <p className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-foreground/30">{stat.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Featured Testimonial */}
                            <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/20 relative">
                                <Award className="absolute -top-3 -right-3 w-8 h-8 text-secondary opacity-20" />
                                <div className="text-[8px] font-mono font-black uppercase tracking-[0.3em] text-secondary mb-3">Featured Result</div>
                                <p className="text-sm text-foreground/70 leading-relaxed font-medium mb-4">
                                    &ldquo;{testimonials[0].quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-secondary/10">
                                    <div className="w-8 h-8 rounded-full bg-foreground/5 border border-border flex items-center justify-center text-[10px] font-black">
                                        {testimonials[0].name[0]}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-foreground">{testimonials[0].name}</p>
                                        <p className="text-[8px] font-mono text-foreground/30 uppercase tracking-wider">{testimonials[0].role}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: Shield, text: "SOC 2" },
                                    { icon: Globe, text: "GDPR" },
                                    { icon: Zap, text: "99.9% SLA" },
                                    { icon: Users, text: "24/7" },
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-foreground/[0.02] border border-border/30">
                                        <badge.icon className="w-3 h-3 text-foreground/20" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground/40">{badge.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Architecture Tag */}
                            <div className="pt-6 text-center border-t border-border/20">
                                <span className="text-[9px] font-mono text-foreground/20 tracking-[0.4em] font-black uppercase block mb-4 not-italic">
                                    Infrastructure // MSA CORE
                                </span>
                                <div className="flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                                    <span className="text-[9px] font-black tracking-widest uppercase text-foreground not-italic">MSA AGENT</span>
                                    <span className="text-[9px] font-black tracking-widest uppercase text-foreground not-italic">MISTRAL</span>
                                    <span className="text-[9px] font-black tracking-widest uppercase text-foreground not-italic">ANTHROPIC</span>
                                </div>
                            </div>
                        </div>

                        {/* Agentic Scanning Overlay */}
                        <motion.div 
                            initial={{ top: "-100%" }}
                            animate={{ top: "200%" }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent pointer-events-none z-20"
                        />
                        <motion.div 
                            initial={{ top: "-100%" }}
                            animate={{ top: "200%" }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 4 }}
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/10 to-transparent pointer-events-none z-20"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}
