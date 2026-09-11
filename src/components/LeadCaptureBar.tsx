"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Sticky lead capture — stays off the hero. Appears only after the visitor
 * scrolls past the first viewport (or reaches mid-page on short pages).
 */
export default function LeadCaptureBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const dismissed = sessionStorage.getItem("msa_lead_bar_dismissed");
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        const handleScroll = () => {
            const pastHero = window.scrollY > window.innerHeight * 0.9;
            const midPage =
                (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) *
                    100 >
                35;
            if (pastHero || midPage) setIsVisible(true);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const dismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem("msa_lead_bar_dismissed", "true");
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || isSubmitting) return;
        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "lead_bar",
                    service: "Free AI Audit",
                    message: "Requested free AI audit via lead capture bar",
                }),
            });
            if (!res.ok) throw new Error("Request failed");
            setIsSubmitted(true);
            sessionStorage.setItem("msa_lead_bar_dismissed", "true");
        } catch {
            setError("Couldn't send that — try again in a moment.");
            setIsSubmitting(false);
        }
    };

    if (isDismissed || !isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                role="region"
                aria-label="Free AI audit offer"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none fixed inset-x-0 bottom-0 z-[40] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-6"
            >
                <div className="pointer-events-auto mx-auto max-w-2xl">
                    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-[0_-4px_24px_hsl(var(--foreground)/0.06)] backdrop-blur-md">
                        <button
                            type="button"
                            onClick={dismiss}
                            aria-label="Dismiss audit offer"
                            className={`absolute right-1.5 top-1.5 z-10 flex h-11 w-11 items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-foreground/5 hover:text-foreground/70 ${focusRing}`}
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <div className="px-4 py-3.5 pr-14 md:px-6 md:py-4">
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center gap-2.5 py-1"
                                    role="status"
                                >
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-foreground/70" aria-hidden="true" />
                                    <span className="text-center text-sm text-foreground/80">
                                        Thanks — we&apos;ll follow up within a day.
                                    </span>
                                </motion.div>
                            ) : (
                                <form
                                    onSubmit={submit}
                                    className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                                >
                                    <div className="min-w-0 shrink-0 text-left sm:max-w-[11rem]">
                                        <p className="text-sm font-medium text-foreground">Free AI audit</p>
                                        <p className="text-xs text-foreground/55">
                                            Optional — after you&apos;ve seen the work
                                        </p>
                                    </div>
                                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                                        <div className="flex min-w-0 gap-2">
                                            <label htmlFor="lead-bar-email" className="sr-only">
                                                Work email
                                            </label>
                                            <input
                                                id="lead-bar-email"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    if (error) setError(null);
                                                }}
                                                placeholder="Work email"
                                                required
                                                aria-invalid={error ? true : undefined}
                                                aria-describedby={error ? "lead-bar-error" : undefined}
                                                className={`h-11 min-w-0 flex-1 rounded-xl border border-border/70 bg-foreground/[0.03] px-3.5 text-sm text-foreground placeholder:text-foreground/40 ${focusRing}`}
                                            />
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                aria-label={isSubmitting ? "Sending request" : "Request free AI audit"}
                                                className={`inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-foreground px-4 text-xs font-semibold uppercase tracking-wide text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                                            >
                                                {isSubmitting ? (
                                                    "…"
                                                ) : (
                                                    <>
                                                        <span className="hidden sm:inline">Request</span>
                                                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        {error ? (
                                            <p id="lead-bar-error" role="alert" className="text-xs text-foreground/70">
                                                {error}
                                            </p>
                                        ) : null}
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
