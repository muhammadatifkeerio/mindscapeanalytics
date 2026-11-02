"use client";

import { useState } from "react";
import Image from "@/components/SmartImage";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, Boxes, Check, Database, Factory, Globe2, LineChart, PackageCheck, Sparkles, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCaptureBar from "@/components/LeadCaptureBar";
import BrandCardShowcase from "./_components/BrandCardShowcase";
import HeroReviews from "./_components/HeroReviews";
import TeamMoments from "@/components/TeamMoments";

const portfolio = [
    { name: "TENVO Business OS", descriptor: "Mindscape Analytics' flagship business intelligence platform for storefronts, POS, inventory, manufacturing, finance, and AI-assisted analytics", image: "/images/projects/tenvo-card.webp", width: 1824, height: 862, href: "https://www.tenvo.store/" },
    { name: "Smart Dairy & Cattle Farm Management", descriptor: "A connected operating system for dairy and cattle farms", image: "/images/projects/smart-dairy-card.webp", width: 1754, height: 896, href: "https://cattle.mindscapeanalytics.com/" },
    { name: "RSIQ Pro", descriptor: "AI-powered market intelligence", image: "/images/projects/rsiq-pro-card.webp", width: 1863, height: 844, href: "https://rsiq.mindscapeanalytics.com/" },
    { name: "DisposiQ", descriptor: "Bakery production and disposal automation", image: "/images/projects/disposiq-card.webp", width: 1864, height: 843, href: "https://disposiq.tenvo.store/" },
] as const;

const capabilities = [
    { title: "Autonomous AI agents", copy: "Deploy digital operators that research, qualify, coordinate, and complete repeatable work across your existing stack.", icon: Bot },
    { title: "Data products that decide", copy: "Turn fragmented operational data into governed pipelines, live intelligence, and decision systems your team can trust.", icon: Database },
    { title: "Foreign trade growth systems", copy: "Connect export inquiries, multilingual follow-up, quotations, distributor development, CRM, and reporting in one commercial workflow.", icon: TrendingUp },
    { title: "Factory-direct sourcing", copy: "Move from product idea to production through our direct China factory network, with sourcing, validation, and delivery coordination.", icon: Factory },
] as const;

const process = [
    ["Discover", "We map the bottleneck, data, economics, and delivery constraints."],
    ["Architect", "We design the agent, software, sourcing, and operating model around the outcome."],
    ["Deploy", "We ship into production, connect the stack, and establish observable workflows."],
    ["Evolve", "We measure performance and improve the system as your business changes."],
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: Mindscape operating system, multilingual workflows, finance inventory production, buyer qualification, homepage proof, growth copilot
 * WHAT: The ordered proof stages used to explain the connected operating systems Mindscape designs and delivers.
 * WHY: Gives buyers a concrete journey from data signals to documented operational action without relying on unverified outcome claims.
 * WHERE: Homepage proof narrative between capability discovery and sourcing delivery.
 */
const operatingJourney = [
    { number: "01", title: "Bring the operating picture together", copy: "Compare commerce, advertising, warehouse, finance, and production signals in one view. Data sources and access are confirmed for each project.", icon: LineChart, detail: "Signals, in one working view" },
    { number: "02", title: "Trace margin from revenue to net", copy: "Review sales, product costs, fees, fulfillment, and marketing against a documented formula. Keep contribution margin distinct from platform ROAS.", icon: Database, detail: "Costs, visible and explainable" },
    { number: "03", title: "See inventory risk earlier", copy: "Compare usable stock with expected demand, replenishment lead time, and campaign plans. Forecasts show assumptions and missing inputs.", icon: PackageCheck, detail: "Stock levels, in context" },
    { number: "04", title: "Qualify suppliers with evidence", copy: "Compare supplier claims, pricing, capacity, certifications, and terms against source records; flag anything that still needs independent verification.", icon: Globe2, detail: "Growth, grounded in evidence" },
    { number: "05", title: "Put automation behind approval", copy: "Let workflows prepare summaries and suggested next steps while people retain approval over financial, inventory, and supplier decisions.", icon: Bot, detail: "Automation, with people in control" },
] as const;

const reveal = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * SOURCE OF TRUTH KEYWORDS: Mindscape homepage, AI agency hero, China sourcing, Tenvo, light theme, rose accent
 * WHAT: The primary 2026 marketing experience for Mindscape Analytics.
 * WHY: Unifies AI, data, product engineering, and factory-direct sourcing into one credible conversion path.
 * WHERE: Rendered by src/app/page.tsx at the public root route.
 */
export default function HomeClient() {
    const reduceMotion = useReducedMotion();
    const transition = reduceMotion ? { duration: 0 } : { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const };
    const [activeJourneyStep, setActiveJourneyStep] = useState(0);
    const [previewDecision, setPreviewDecision] = useState<"pending" | "approved" | "changes">("pending");

    const activeJourney = operatingJourney[activeJourneyStep];

    return (
        <main className="msa-home min-h-screen overflow-hidden bg-background text-foreground">
            <Navbar />
            <LeadCaptureBar />

            {/*
             * SOURCE OF TRUTH KEYWORDS: Homepage hero, mobile-first composition, portrait stage, responsive CTAs, desktop grid
             * WHAT: Responsive lead section that adapts its stacked phone layout into the established desktop grid.
             * WHY: Keep the offer and primary action clear on narrow screens without reserving desktop-sized empty space.
             * WHERE: Homepage first section, before the product portfolio strip.
             */}
            <section className="relative isolate min-h-0 overflow-hidden pt-[max(7rem,calc(env(safe-area-inset-top)_+_5.5rem))] lg:min-h-[100svh] md:pt-32">
                <div className="hero-halo" aria-hidden="true" />
                <div className="hero-particles" aria-hidden="true" />

                <div className="container-standard relative z-10 grid min-h-0 items-center gap-0 pb-10 sm:gap-10 sm:pb-14 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[0.9fr_1.15fr_0.75fr] lg:gap-0 lg:pb-8">
                    <motion.div initial="hidden" animate="visible" variants={reveal} transition={transition} className="relative z-20 order-last w-full max-w-xl sm:order-none lg:pb-20">
                        <div className="mb-7 hidden items-center gap-3 text-xs font-semibold text-brand sm:flex">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_0_7px_hsl(var(--brand)/0.1)]" />
                            AI, data & operating systems
                        </div>
                        <h1 className="max-w-[12ch] text-balance font-heading text-[clamp(2.65rem,10vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] sm:max-w-[14ch] sm:text-[clamp(3rem,5.2vw,5rem)]">
                            Make operations work together.
                        </h1>
                        <p className="mt-4 max-w-[54ch] text-pretty text-base leading-7 text-muted-foreground sm:mt-7 md:text-lg md:leading-8">
                            Mindscape builds multilingual operating systems that connect finance, inventory, production, growth workflows, and AI-assisted decisions. We help teams put those systems to work in their daily operations.
                        </p>
                        <div className="mt-5 flex flex-col items-stretch gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                            <Link href="/contact" className="msa-button group w-full justify-between sm:w-auto">
                                Get in touch
                                <span className="msa-button-orb"><ArrowRight className="h-4 w-4" /></span>
                            </Link>
                            <Link href="/ecommerce" className="msa-text-link w-full justify-center sm:w-auto">E-commerce profit &amp; inventory intelligence <ArrowRight className="h-4 w-4" /></Link>
                            <Link href="/projects" className="msa-text-link !hidden self-start sm:!inline-flex sm:self-auto">Explore our work <ArrowRight className="h-4 w-4" /></Link>
                        </div>
                        <HeroReviews />
                    </motion.div>

                    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...transition, delay: 0.12 }} className="relative z-10 order-first -mx-3 -mt-4 flex h-[clamp(17rem,78vw,23rem)] items-center justify-center overflow-hidden sm:order-none sm:mx-0 sm:mt-0 sm:h-auto sm:min-h-[480px] sm:items-end sm:self-end lg:min-h-[720px]">
                        <div className="absolute inset-x-[12%] bottom-[9%] h-[60%] rounded-[50%] bg-[hsl(var(--brand)/0.09)] blur-3xl" aria-hidden="true" />
                        <Image src="/images/hero/mindscape-intelligence-2026.webp" alt="An ethereal AI portrait visualizing connected intelligence" width={1024} height={1536} priority sizes="(max-width: 639px) 76vw, (max-width: 1023px) 48vw, 42vw" className="hero-portrait-image relative z-10 h-full w-auto max-w-full object-contain object-center mix-blend-multiply dark:mix-blend-screen sm:h-auto sm:max-h-[min(50svh,28rem)] sm:object-bottom lg:max-h-[78svh]" />
                        <motion.div animate={reduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-0 top-[27%] z-20 hidden w-60 rounded-2xl bg-card/95 p-4 shadow-[0_18px_60px_rgba(35,20,25,0.12)] ring-1 ring-border/70 backdrop-blur-xl md:block">
                            <div className="flex items-start gap-3">
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-foreground text-background"><Sparkles className="h-4 w-4" /></span>
                                <div><p className="text-xs text-muted-foreground">Example workflow</p><p className="mt-1 text-sm font-semibold">Research supplier landscape</p><div className="mt-3 space-y-2 text-[11px] text-muted-foreground"><p className="flex items-center gap-2"><Check className="h-3 w-3 text-brand" /> Validate requirements</p><p className="flex items-center gap-2"><Check className="h-3 w-3 text-brand" /> Compare factory fit</p></div></div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.aside initial="hidden" animate="visible" variants={reveal} transition={{ ...transition, delay: 0.22 }} className="relative z-20 hidden sm:block lg:pb-28 lg:pl-2">
                        <div className="mb-0 ml-auto max-w-none border-t border-border pt-4 lg:mb-12 lg:max-w-[260px] lg:pt-5">
                            <div className="flex items-end justify-between gap-4"><p className="text-xs leading-5 text-muted-foreground">One connected delivery team</p><span className="font-heading text-3xl font-semibold tracking-[-0.04em]">AI →</span></div>
                            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"><span>AI</span><span aria-hidden="true">·</span><span>Data</span><span aria-hidden="true">·</span><span>Products</span><span aria-hidden="true">·</span><span>Production</span></div>
                        </div>
                        <p className="max-w-[13ch] font-heading text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-[clamp(2.25rem,3.8vw,4.4rem)]">Your AI system doesn’t sleep.</p>
                    </motion.aside>
                </div>

                <div className="relative z-20 mt-5 hidden border-y border-border/75 bg-card/70 py-5 before:absolute before:left-1/2 before:top-0 before:h-px before:w-24 before:-translate-x-1/2 before:bg-brand sm:block md:mt-0">
                    <div className="container-standard flex flex-col items-center gap-5 md:flex-row md:justify-between"><p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:text-left">Built across the Mindscape product portfolio</p><div className="flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold text-foreground/70 sm:gap-x-8 lg:gap-x-10">{portfolio.map((item) => <span key={item.name} className={item.name === "Smart Dairy & Cattle Farm Management" ? "hidden sm:inline" : undefined}>{item.name}</span>)}</div></div>
                </div>
            </section>

            <section className="container-standard py-24 md:py-36">
                <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
                    <div className="lg:sticky lg:top-32 lg:self-start"><h2 className="text-balance font-heading text-[clamp(2.6rem,5vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.04em]">One partner from intelligence to execution.</h2><p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">Strategy is only valuable when it becomes an operating system. We combine AI, data, software, and supply-chain execution so fewer critical handoffs are left to chance.</p></div>
                    <div className="divide-y divide-border border-y border-border">
                        {capabilities.map(({ title, copy, icon: Icon }, index) => (
                            <motion.article key={title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ ...transition, delay: index * 0.08 }} className="group grid gap-5 py-9 sm:grid-cols-[56px_0.7fr_1fr] sm:items-start md:py-12">
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-foreground transition-colors group-hover:bg-brand group-hover:text-white"><Icon className="h-5 w-5" /></span><h3 className="text-xl font-semibold tracking-[-0.025em] md:text-2xl">{title}</h3><p className="max-w-xl leading-7 text-muted-foreground">{copy}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/*
             * SOURCE OF TRUTH KEYWORDS: Homepage proof narrative, operating system journey, native scroll motion, reduced motion, multilingual operations, qualified growth
             * WHAT: A scroll-led, text-first explanation of Mindscape's operational system capabilities.
             * WHY: Makes product proof understandable without scroll-jacking, autoplay media, or claims that the visitor cannot verify.
             * WHERE: Homepage after the capability overview and before the sourcing service path.
             */}
            {/*
             * SOURCE OF TRUTH KEYWORDS: Operating journey, interactive canvas, sticky preview, commerce margin, inventory, supplier evidence, human approval
             * WHAT: Shows how Mindscape connects operating signals to explainable decisions through an interactive, illustrative software preview.
             * WHY: Replaces five repetitive cards with a scroll-linked story and concrete interface examples while preserving readable content without motion.
             * WHERE: Homepage between capability overview and China sourcing section.
             */}
            <section className="border-y border-border bg-muted/45 py-14 md:py-20" aria-labelledby="operating-journey-heading">
                <div className="container-standard">
                    <div className="mb-7 max-w-3xl sm:mb-10">
                        <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand">How it works</p>
                        <h2 id="operating-journey-heading" className="mt-3 text-balance font-heading text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-tight tracking-[-0.03em]">Connect business data to better decisions.</h2>
                        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">See what changed across sales, costs, inventory, and operations, then decide what needs attention.</p>
                    </div>

                    <div className="grid items-start gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-9">
                        <ol className="order-2 space-y-2 lg:order-1" aria-label="Mindscape operating-system journey">
                            {operatingJourney.map(({ number, title, copy, icon: Icon, detail }, index) => (
                                <li key={title} className="lg:flex lg:items-center">
                                    <button
                                        type="button"
                                        aria-pressed={activeJourneyStep === index}
                                        onClick={() => setActiveJourneyStep(index)}
                                        className={`group relative w-full rounded-xl border p-4 text-left transition-colors duration-150 sm:p-5 ${activeJourneyStep === index ? "border-brand/40 bg-card" : "border-transparent bg-transparent hover:border-border hover:bg-card/65"}`}
                                    >
                                        {activeJourneyStep === index && <span className="absolute bottom-5 left-0 top-5 w-1 rounded-r-full bg-brand" aria-hidden="true" />}
                                        <span className="flex items-start gap-4 sm:gap-5">
                                            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${activeJourneyStep === index ? "bg-brand/10 text-brand" : "bg-background text-muted-foreground group-hover:text-foreground"}`}>
                                                <Icon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">
                                                    <span className={activeJourneyStep === index ? "text-brand" : ""}>{number}</span>
                                                    <span>{detail}</span>
                                                </span>
                                                <span className="mt-2 block text-lg font-semibold leading-snug tracking-[-.02em] text-foreground sm:text-xl">{title}</span>
                                                <span className="mt-2 block max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">{copy}</span>
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ol>

                        <div className="order-1 lg:order-2 lg:sticky lg:top-24">
                            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                                <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><Boxes className="h-4 w-4" aria-hidden="true" /></span>
                                        <div className="min-w-0"><p className="truncate text-sm font-semibold">Operating system preview</p><p className="text-xs text-muted-foreground">Illustrative interface · sample data</p></div>
                                    </div>
                                    <span className="hidden shrink-0 items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground sm:inline-flex"><span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" /> Preview mode</span>
                                </div>

                                <div className="border-b border-border px-4 py-3 lg:hidden">
                                    <div role="group" aria-label="Choose an operating system preview stage" className="grid grid-cols-5 gap-1">
                                        {operatingJourney.map((step, index) => (
                                            <button
                                                key={step.number}
                                                id={`journey-step-tab-${index}`}
                                                type="button"
                                                aria-pressed={activeJourneyStep === index}
                                                aria-controls="operating-journey-preview"
                                                onClick={() => setActiveJourneyStep(index)}
                                                className={`min-h-11 rounded-lg text-xs font-semibold transition-colors ${activeJourneyStep === index ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                                            >
                                                {step.number}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div
                                    id="operating-journey-preview"
                                    role="region"
                                    aria-label={`${activeJourney.number}: ${activeJourney.title}`}
                                    className="min-h-[390px] p-5 sm:min-h-[430px] sm:p-7"
                                >
                                        {activeJourneyStep === 0 && (
                                            <div>
                                                <div className="flex flex-wrap items-start justify-between gap-4">
                                                    <div><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">Unified command surface</p><h3 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-2xl">A shared view of operations</h3></div>
                                                    <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">Example source systems</span>
                                                </div>
                                                <div className="mt-5 flex flex-wrap gap-2">{["Shopify", "Amazon SP-API", "Meta Ads", "Warehouse"].map((source) => <span key={source} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium">{source}</span>)}</div>
                                                <div className="mt-5 grid grid-cols-2 gap-3">
                                                    {[ ["Orders", "1,284"], ["Net sales", "$84.2k"], ["Stock alerts", "03"], ["Data status", "Needs review"] ].map(([label, value]) => <div key={label} className="rounded-2xl border border-border bg-background p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{value}</p></div>)}
                                                </div>
                                                <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                                                    <div className="flex items-center justify-between gap-3"><p className="text-sm font-medium">Operating activity</p><span className="text-xs text-muted-foreground">Illustrative · 30 days</span></div>
                                                    <div aria-label="Illustrative activity chart" role="img" className="mt-4 flex h-16 items-end gap-1.5">{[36, 52, 44, 68, 56, 76, 61, 83, 67, 91, 72, 86, 65, 78, 94, 72, 88, 61, 82, 96, 74, 86, 68, 91].map((height, index) => <span key={index} className={`min-w-0 flex-1 rounded-t-sm ${index === 19 ? "bg-brand" : "bg-brand/20"}`} style={{ height: `${height}%` }} />)}</div>
                                                </div>
                                                <p className="mt-4 text-xs leading-5 text-muted-foreground">Example systems only. Connector availability and data access are confirmed during discovery.</p>
                                            </div>
                                        )}

                                        {activeJourneyStep === 1 && (
                                            <div>
                                                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">Contribution margin bridge</p><h3 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-2xl">Trace what remains after costs</h3></div><span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">Illustrative figures</span></div>
                                                <div className="mt-5 rounded-2xl border border-border bg-background p-4 sm:p-5">
                                                    <div className="flex items-center justify-between border-b border-border pb-4"><div><p className="text-xs text-muted-foreground">Example period · net sales</p><p className="mt-1 text-2xl font-semibold">$84,200</p></div><span className="rounded-lg bg-brand/10 px-3 py-2 text-sm font-semibold text-brand">CM3 · $22,700</span></div>
                                                    <div className="mt-4 space-y-4">{[
                                                        { label: "Net sales", value: "$84.2k", width: "100%", emphasize: true },
                                                        { label: "Product costs", value: "−$32.1k", width: "62%", emphasize: false },
                                                        { label: "Fulfillment and fees", value: "−$8.4k", width: "38%", emphasize: false },
                                                        { label: "Marketing spend", value: "−$21.0k", width: "52%", emphasize: false },
                                                        { label: "Contribution after marketing", value: "$22.7k", width: "48%", emphasize: true },
                                                    ].map((item) => <div key={item.label}><div className="mb-1.5 flex items-center justify-between gap-3 text-xs"><span className="text-muted-foreground">{item.label}</span><span className="font-semibold tabular-nums">{item.value}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${item.emphasize ? "bg-brand" : "bg-foreground/25"}`} style={{ width: item.width }} /></div></div>)}</div>
                                                </div>
                                                <p className="mt-4 text-xs leading-5 text-muted-foreground">A sample calculation only. Margin definitions, currency, returns, and included costs are agreed and documented for each business.</p>
                                            </div>
                                        )}

                                        {activeJourneyStep === 2 && (
                                            <div>
                                                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">Predictive inventory runway</p><h3 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-2xl">Plan around stock and lead time</h3></div><span className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand">Example risk scenario</span></div>
                                                <div className="mt-5 rounded-2xl border border-border bg-background p-5">
                                                    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs text-muted-foreground">Estimated stock coverage</p><p className="mt-2 text-4xl font-semibold tracking-[-.05em]">14 <span className="text-base font-medium text-muted-foreground">days</span></p></div><div className="text-sm sm:text-right"><p className="text-muted-foreground">Replenishment lead time</p><p className="mt-1 font-semibold">21 days · sample</p></div></div>
                                                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full w-[47%] rounded-full bg-brand" /></div>
                                                    <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Usable units</p><p className="mt-1 text-lg font-semibold">448</p></div><div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Expected daily use</p><p className="mt-1 text-lg font-semibold">32 units</p></div></div>
                                                </div>
                                                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-muted/70 p-4"><PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /><p className="text-sm leading-6"><span className="font-semibold">Review replenishment timing.</span> This example compares stock coverage with lead time; a forecast depends on demand history and planning assumptions.</p></div>
                                            </div>
                                        )}

                                        {activeJourneyStep === 3 && (
                                            <div>
                                                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">Supplier qualification</p><h3 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-2xl">Compare evidence before a decision</h3></div><span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">Evidence checklist</span></div>
                                                <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
                                                    <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-border bg-muted/55 px-4 py-3 text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground"><span>Qualification item</span><span>Next check</span></div>
                                                    {[
                                                        ["Quoted price", "Compare like terms"],
                                                        ["Minimum order", "Confirm quantity"],
                                                        ["Production capacity", "Request evidence"],
                                                        ["Certifications", "Verify issuer and scope"],
                                                        ["Lead time", "Confirm in writing"],
                                                    ].map(([item, action]) => <div key={item} className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border/70 px-4 py-3.5 last:border-b-0"><span className="text-sm font-medium">{item}</span><span className="flex items-center gap-2 text-right text-xs text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />{action}</span></div>)}
                                                </div>
                                                <p className="mt-4 text-xs leading-5 text-muted-foreground">The preview does not show verified suppliers or live quotes. Each claim needs a source and appropriate verification.</p>
                                            </div>
                                        )}

                                        {activeJourneyStep === 4 && (
                                            <div>
                                                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">Human review queue</p><h3 className="mt-2 text-xl font-semibold tracking-[-.03em] sm:text-2xl">Keep consequential actions reviewable</h3></div><span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">Demo only</span></div>
                                                <div className="mt-5 rounded-2xl border border-border bg-background p-5">
                                                    <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Bot className="h-5 w-5" aria-hidden="true" /></span><div><p className="text-sm font-semibold">Inventory review suggestion</p><p className="mt-1 text-xs text-muted-foreground">Prepared from the illustrative scenario</p></div></div><span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">Human approval</span></div>
                                                    <div className="mt-5 rounded-xl bg-muted/60 p-4"><p className="text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground">Proposed next step</p><p className="mt-2 text-sm leading-6">Review replenishment timing against current stock, demand assumptions, and supplier lead time.</p></div>
                                                    <div className="mt-4 flex flex-wrap items-center gap-2"><button type="button" onClick={() => setPreviewDecision("approved")} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"><Check className="h-4 w-4" aria-hidden="true" />Approve in preview</button><button type="button" onClick={() => setPreviewDecision("changes")} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold transition-colors hover:bg-muted">Request changes</button><span aria-live="polite" className="text-xs font-medium text-muted-foreground">{previewDecision === "pending" ? "Awaiting review" : previewDecision === "approved" ? "Approved in this preview" : "Changes requested in this preview"}</span></div>
                                                </div>
                                                <p className="mt-4 text-xs leading-5 text-muted-foreground">These demo controls do not submit data or connect to a business system.</p>
                                            </div>
                                        )}
                                </div>
                            </div>
                            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">All figures and records are illustrative. Integrations, forecasts, and workflows are scoped and validated with each client.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-standard py-24 md:py-36">
                <div className="grid overflow-hidden rounded-[1.75rem] border border-brand/15 bg-accent/55 lg:grid-cols-[0.88fr_1.12fr]">
                    <div className="p-8 sm:p-12 lg:p-16"><Factory className="h-9 w-9 text-brand" /><h2 className="mt-12 max-w-[10ch] text-balance font-heading text-[clamp(2.7rem,5vw,5.8rem)] font-semibold leading-[0.93] tracking-[-0.04em]">China sourcing, connected to production.</h2><p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground">Move from product requirements to a documented supplier decision with fixed-price shortlists, verification, sample coordination, and Tianjin or Beijing inspection support.</p><Link href="/services/china-sourcing" className="mt-9 inline-flex items-center gap-2 border-b border-brand/40 pb-1 font-semibold text-brand">Explore China sourcing and QC <ArrowRight className="h-4 w-4" /></Link></div>
                    <div className="relative min-h-[430px] bg-card p-8 sm:p-12 lg:p-16"><div className="absolute inset-0 opacity-45 [background-image:radial-gradient(circle_at_center,hsl(var(--brand)/.16)_1px,transparent_1.5px)] [background-size:26px_26px]" /><div className="relative ml-auto flex h-full max-w-xl flex-col justify-between"><div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-sm">{["Product brief", "Factory fit", "Sample validation", "Production handoff"].map((item, index) => <div key={item} className="min-h-32 bg-card p-5"><span className="text-xs text-brand">0{index + 1}</span><p className="mt-8 font-medium">{item}</p></div>)}</div><div className="mt-12 flex items-center justify-between border-t border-border pt-5 text-sm text-muted-foreground"><span>China factory network</span><span>Global delivery coordination</span></div></div></div>
                </div>
            </section>

            <section className="border-y border-border py-24 md:py-36">
                <div className="container-standard">
                    <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><h2 className="max-w-[10ch] text-balance font-heading text-[clamp(2.8rem,5.3vw,6rem)] font-semibold leading-[0.94] tracking-[-0.04em]">Products built in the real world.</h2><p className="max-w-md leading-7 text-muted-foreground">Our portfolio is where our thinking gets tested: commerce, enterprise data, industrial operations, and financial intelligence.</p></div>
                    <div className="mt-10 grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
                        {portfolio.map((item) => (
                            <article key={item.name} className="min-w-0">
                                <a href={item.href} aria-label={`Explore ${item.name}`} className="group block overflow-hidden rounded-2xl bg-card shadow-[0_8px_30px_rgba(33,24,27,0.08)] ring-1 ring-border/80 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(33,24,27,0.14)] focus-visible:outline-offset-4">
                                    <Image src={item.image} alt={`${item.name}: ${item.descriptor}`} width={item.width} height={item.height} className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.012]" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 760px" />
                                </a>
                                <div className="flex items-start justify-between gap-4 px-1 pt-4 sm:pt-5">
                                    <div><h3 className="text-lg font-semibold tracking-[-0.025em] sm:text-xl">{item.name}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.descriptor}</p></div>
                                    <a href={item.href} aria-label={`View ${item.name}`} className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-offset-2"><ArrowRight className="h-4 w-4" /></a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <TeamMoments compact />

            <section className="container-standard py-20 md:py-28" aria-labelledby="network-heading">
                <div className="mb-8 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">Ways to work with us</p><h2 id="network-heading" className="mt-4 text-balance font-heading text-[clamp(2.5rem,4.8vw,5rem)] font-semibold leading-[.94] tracking-[-.04em]">Build with the right people and tools.</h2></div>
                <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
                    <article className="flex flex-col items-start p-7 sm:p-10 md:border-r md:border-border">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-muted text-brand"><TrendingUp className="h-5 w-5" aria-hidden="true" /></span>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">Architect network</p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-[-.035em] sm:text-3xl">Sell with Mindscape</h3>
                        <p className="mt-3 max-w-lg leading-7 text-muted-foreground">Share useful digital products, SaaS foundations, and workflow assets with businesses looking for practical ways to build and automate.</p>
                        <ul className="mt-5 space-y-2 text-sm text-muted-foreground"><li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> List software and digital assets</li><li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> Reach customers through the Mindscape Shop</li></ul>
                        <Link href="/become-seller" className="msa-button mt-7 min-h-12">Become a seller <ArrowRight className="h-4 w-4" /></Link>
                    </article>
                    <article className="flex flex-col items-start border-t border-border bg-muted/35 p-7 sm:p-10 md:border-l-0 md:border-t-0">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-background text-brand"><Users className="h-5 w-5" aria-hidden="true" /></span>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">Talent and delivery</p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-[-.035em] sm:text-3xl">Hire for the work ahead</h3>
                        <p className="mt-3 max-w-lg leading-7 text-muted-foreground">Tell us what you’re building. We’ll discuss the engineering, AI, data, or product expertise that fits your scope and delivery needs.</p>
                        <ul className="mt-5 space-y-2 text-sm text-muted-foreground"><li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> Project-based or ongoing support</li><li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand" /> Clear scope before work begins</li></ul>
                        <Link href="/outsourcing" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-background px-5 font-semibold text-foreground transition-colors hover:border-brand/50 hover:text-brand">Explore team augmentation <ArrowRight className="h-4 w-4" /></Link>
                    </article>
                </div>
            </section>

            <section className="container-standard py-20 md:py-28">
                <div className="mb-10 grid gap-5 md:grid-cols-[1fr_.7fr] md:items-end">
                    <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">Two sides of the same ambition</p><h2 className="mt-4 max-w-[12ch] text-balance font-heading text-[clamp(2.5rem,4.8vw,5rem)] font-semibold leading-[.94] tracking-[-.04em]">Brands built for momentum.</h2></div>
                    <p className="max-w-lg leading-7 text-muted-foreground md:justify-self-end">Tap or hover a card to turn it over. Each side uses the original artwork supplied for Mindscape Analytics and Tenvo.</p>
                </div>
                <BrandCardShowcase />
            </section>

            <section className="container-standard py-24 md:py-36">
                <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24"><div><Boxes className="h-8 w-8 text-brand" /><h2 className="mt-8 text-balance font-heading text-[clamp(2.6rem,4.5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">How ideas become operating systems.</h2></div><ol className="divide-y divide-border border-y border-border">{process.map(([title, copy], index) => <li key={title} className="grid gap-4 py-8 sm:grid-cols-[44px_0.55fr_1fr] sm:items-baseline md:py-10"><span className="text-sm font-semibold text-brand">0{index + 1}</span><h3 className="text-xl font-semibold tracking-[-0.025em]">{title}</h3><p className="leading-7 text-muted-foreground">{copy}</p></li>)}</ol></div>
            </section>

            <section className="px-4 pb-4 md:px-6 md:pb-6"><div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-muted/45 px-6 py-20 sm:px-10 md:py-28"><div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/15 blur-[110px]" aria-hidden="true" /><div className="container-standard relative z-10 text-center"><h2 className="mx-auto max-w-[13ch] text-balance font-heading text-[clamp(3rem,6.2vw,7rem)] font-medium leading-[0.92] tracking-[-0.04em]">Build the system your next stage needs.</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">Bring us the bottleneck, the product idea, or the operating ambition. We’ll help turn it into a practical path to production.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))} className="msa-button">Start a conversation <ArrowRight className="h-4 w-4" /></button><Link href="/shop" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-border bg-card px-6 font-semibold text-foreground transition-colors hover:border-brand/50">Explore AI assets</Link></div></div></div></section>
            <Footer />
        </main>
    );
}
