"use client";

import Image from "@/components/SmartImage";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const moments = [
    {
        title: "At the Mindscape office",
        detail: "The team together at our workspace.",
        image: "/images/team/mindscape-team-office-2026.webp",
        alt: "Mindscape Analytics team gathered together at the office",
    },
    {
        title: "Mindscape Analytics UAE team event",
        detail: "The Mindscape Analytics team together at a UAE event.",
        image: "/images/team/team-mindscapeanalytics-uae-event.webp",
        alt: "Mindscape Analytics team together at a UAE event",
    },
];

export default function TeamMoments({ compact = false }: { compact?: boolean }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const activeMoment = compact ? moments[1] : moments[activeIndex];

    useEffect(() => {
        if (compact || isPaused || prefersReducedMotion !== false) return;

        const intervalId = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % moments.length);
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, [compact, isPaused, prefersReducedMotion]);

    const showNextMoment = () => {
        setActiveIndex((index) => (index + 1) % moments.length);
    };

    const handlePhotoEnter = () => {
        if (compact) return;
        setIsPaused(true);
        showNextMoment();
    };

    const copy = (
        <>
            <h2
                id="team-moments-heading"
                className="max-w-[14ch] text-balance font-heading text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
            >
                The people behind the work.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                From our office to industry events, meet the team working together behind Mindscape Analytics.
            </p>
            {compact && (
                <div className="mt-8 border-t border-border/80 pt-5">
                    <p className="font-semibold tracking-tight">{activeMoment.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{activeMoment.detail}</p>
                    <p className="mt-4 text-xs font-medium text-brand">Mindscape Analytics · UAE team event</p>
                </div>
            )}
        </>
    );

    return (
        <section
            aria-labelledby="team-moments-heading"
            className={compact ? "border-y border-border py-16 md:py-20" : "py-20 md:py-28"}
        >
            <div className="container-standard">
                <div className={compact ? "grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14" : "space-y-8"}>
                    {compact ? <div>{copy}</div> : <div className="max-w-3xl">{copy}</div>}

                    <figure className={compact ? "min-w-0" : "mx-auto w-full max-w-6xl"}>
                        <div
                            className="[perspective:1400px]"
                            onMouseEnter={handlePhotoEnter}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted shadow-[0_18px_50px_rgba(30,20,24,0.12)] ring-1 ring-border/80">
                                <AnimatePresence mode="sync" initial={false}>
                                    <motion.div
                                        key={activeMoment.image}
                                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035, filter: "blur(4px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, filter: "blur(2px)" }}
                                        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.2, 0.75, 0.2, 1] }}
                                        className="absolute inset-0 [backface-visibility:hidden]"
                                    >
                                        <Image
                                            src={activeMoment.image}
                                            alt={activeMoment.alt}
                                            fill
                                            sizes="(max-width: 1023px) 100vw, 65vw"
                                            className={compact ? "object-cover opacity-[0.93]" : "object-cover opacity-[0.95]"}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/[0.04]" />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {!compact && (
                            <figcaption className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="font-semibold tracking-tight">{activeMoment.title}</p>
                                    <p className="mt-1 text-sm text-muted-foreground">{activeMoment.detail}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-muted-foreground">
                                        {activeIndex + 1} of {moments.length} · Changes every 5 seconds
                                    </span>
                                    <button
                                        type="button"
                                        onClick={showNextMoment}
                                        aria-label="Show the next team photo"
                                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card/80 text-foreground transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                                    >
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                </div>
                            </figcaption>
                        )}
                    </figure>
                </div>
            </div>
        </section>
    );
}
