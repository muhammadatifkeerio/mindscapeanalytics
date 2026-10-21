"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, CheckCircle2, Sparkles, Shield, Globe, Users } from 'lucide-react';

export default function AIAuditLeadMagnet() {
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || isSubmitting) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/leads", {
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
            if (!response.ok) throw new Error("We could not send your request. Please try again or contact us directly.");
            setIsSubmitted(true);
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "We could not send your request. Please try again.");
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


                            <div className="space-y-6">
                                <h2 className="fluid-h2 font-black uppercase not-italic">
                                    AI AUTOMATION <br /> 
                                    <span className="text-brand">READINESS.</span>
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
                                        <p className="text-xs text-foreground/50">Your request is in. We’ll follow up at the email address you provided.</p>
                                        <a className="text-sm font-semibold text-brand underline underline-offset-4" href="mailto:info@mindscapeanalytics.com">Email us directly</a>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="email"
                                                aria-label="Work email"
                                                autoComplete="email"
                                                maxLength={254}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                required
                                                className="flex-1 h-14 px-6 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-secondary transition-colors text-sm"
                                            />
                                            <input
                                                type="text"
                                                aria-label="Company (optional)"
                                                autoComplete="organization"
                                                maxLength={120}
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
                                        {error && <p role="alert" className="text-sm text-destructive text-center">{error} <a className="underline underline-offset-4" href="mailto:info@mindscapeanalytics.com">Email us instead</a>.</p>}
                                        <p className="text-[10px] text-foreground/20 text-center font-bold uppercase tracking-widest">No spam. Mission-critical intelligence only.</p>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: TRUST & TECH (5/12) */}
                        <div className="lg:col-span-5 p-8 md:p-16 bg-foreground/[0.01] space-y-12 flex flex-col justify-center">
                            
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-foreground">A practical first step</h3>
                                <p className="text-sm leading-6 text-muted-foreground">We’ll review your goals, identify process and data constraints, then recommend a sensible next step. If a fit is unclear, we’ll say so.</p>
                                <ul className="space-y-4 text-sm text-muted-foreground">
                                    {[
                                        { icon: Target, text: "Clarify the operational problem and desired outcome" },
                                        { icon: Zap, text: "Identify automation opportunities and integration needs" },
                                        { icon: Sparkles, text: "Outline a roadmap you can discuss with our team" },
                                    ].map((item) => (
                                        <li key={item.text} className="flex items-start gap-3"><item.icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" /><span>{item.text}</span></li>
                                    ))}
                                </ul>
                                <div className="border-t border-border pt-5 text-xs text-muted-foreground">No compliance certifications or outcome guarantees are implied by this request.</div>
                                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                                    <a className="inline-flex items-center gap-2 font-medium text-foreground underline underline-offset-4" href="mailto:info@mindscapeanalytics.com"><Shield aria-hidden="true" className="h-4 w-4" />Email Mindscape</a>
                                    <a className="inline-flex items-center gap-2 font-medium text-foreground underline underline-offset-4" href="https://www.linkedin.com/company/mindscapeanalytics/" target="_blank" rel="noreferrer"><Globe aria-hidden="true" className="h-4 w-4" />LinkedIn</a>
                                    <a className="inline-flex items-center gap-2 font-medium text-foreground underline underline-offset-4" href="tel:+13072106155"><Users aria-hidden="true" className="h-4 w-4" />Call our team</a>
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
