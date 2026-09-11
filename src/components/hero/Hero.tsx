"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CalButton from "../CalButton";
import HeroBackdrop from "./HeroBackdrop";
import HeroStage from "./HeroStage";
import { heroFocusRing, heroRevealStyle } from "./motion";

/** Locked case-study titles from CaseStudies.tsx — names only, no invented metrics. */
const PROOF_NAMES = ["Tenvo", "DBLynx", "Fuel Station ERP", "Enterprise ERP"] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: Hero, HeroStage, mobile hero, justify-end, packaged deployments, View packages
 * WHAT: Persuade hero — copy-led on phone/tablet, left spine + deployment mesh from lg up.
 * WHY: The mesh sat under CTAs on small screens and top-aligned copy left a dead viewport.
 * WHERE: Homepage via src/components/Hero.tsx
 */
export default function Hero() {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative isolate flex min-h-[100svh] min-h-dvh w-full flex-col justify-end overflow-x-hidden bg-background pb-[max(5.75rem,calc(env(safe-area-inset-bottom)+4.75rem))] pt-[max(5.75rem,calc(env(safe-area-inset-top)+5rem))] md:min-h-[100svh] md:justify-center md:overflow-hidden md:pb-24 md:pt-32 lg:min-h-screen"
        >
            <HeroBackdrop />
            <HeroStage />

            <div className="container-standard relative z-10 w-full">
                <div className="flex w-full max-w-xl flex-col items-start lg:max-w-2xl">
                    <p
                        className="hero-reveal font-heading text-[clamp(1.5rem,6vw,2.35rem)] font-bold leading-none tracking-[-0.03em] text-foreground"
                        style={heroRevealStyle(40)}
                    >
                        Mindscape Analytics
                    </p>

                    <h1
                        id="hero-heading"
                        className="hero-reveal-solid mt-5 w-full max-w-[18ch] font-heading text-[clamp(2.15rem,9.2vw,3.85rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-foreground sm:mt-5 md:mt-6"
                    >
                        Deploy intelligence{" "}
                        <span className="hero-accent-word relative inline-block">that runs itself</span>
                    </h1>

                    <p
                        className="hero-reveal mt-5 max-w-lg font-sans text-sm leading-relaxed tracking-[0.01em] text-foreground/70 sm:mt-5 md:text-[15px]"
                        style={heroRevealStyle(120)}
                    >
                        <span className="text-foreground/80">In production for </span>
                        {PROOF_NAMES.map((name, i) => (
                            <span key={name}>
                                {i > 0 ? (
                                    <span className="text-foreground/40" aria-hidden="true">
                                        {" "}
                                        ·{" "}
                                    </span>
                                ) : null}
                                <span className="text-foreground/75">{name}</span>
                            </span>
                        ))}
                        <span className="text-foreground/45"> · </span>
                        <Link
                            href="/projects"
                            className={`whitespace-nowrap text-foreground underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline ${heroFocusRing} rounded-sm`}
                        >
                            See work
                        </Link>
                    </p>

                    <p
                        className="hero-reveal mt-4 max-w-md font-sans text-base leading-relaxed text-foreground/80 sm:mt-5 md:mt-6 md:text-lg"
                        style={heroRevealStyle(180)}
                    >
                        Packaged AI deployments that cut operational cost, with shop assets and
                        custom agents available when you need them.
                    </p>

                    <div
                        className="hero-reveal mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:max-w-md sm:gap-3.5 md:max-w-xl md:flex-row md:items-center md:gap-5"
                        style={heroRevealStyle(280)}
                    >
                        <Link
                            href="/pricing"
                            className={`hero-cta-primary group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-background transition-[transform,box-shadow] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] md:min-h-12 md:w-auto md:px-8 ${heroFocusRing}`}
                        >
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/25 to-transparent transition-[transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-full"
                            />
                            <span className="relative">View packages</span>
                            <ArrowRight
                                aria-hidden="true"
                                className="relative h-4 w-4 transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                            />
                        </Link>

                        <CalButton
                            ariaLabel="Or chat with us"
                            className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-border px-5 py-3.5 font-sans text-sm font-medium text-foreground/85 transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] active:bg-foreground/5 md:min-h-12 md:w-auto md:border-0 md:px-1 md:py-2 md:text-foreground/70 md:hover:bg-transparent md:hover:text-foreground md:hover:underline md:underline-offset-4 ${heroFocusRing}`}
                        >
                            Or chat with us
                        </CalButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
