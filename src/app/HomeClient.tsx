"use client";

import { useState } from "react";
import Image from "@/components/SmartImage";
import Link from "next/link";
import { ArrowRight, Bot, Boxes, Check, Database, Factory, Globe2, LineChart, PackageCheck, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCaptureBar from "@/components/LeadCaptureBar";
import BrandCardShowcase from "./_components/BrandCardShowcase";
import HeroReviews from "./_components/HeroReviews";
import HeroPortrait from "./_components/HeroPortrait";
import TeamMoments from "@/components/TeamMoments";

const portfolio = [
    { name: "TENVO Business OS", descriptor: "Mindscape Analytics' flagship business intelligence platform for storefronts, POS, inventory, manufacturing, finance, and AI-assisted analytics", image: "/images/projects/tenvo-card.webp", width: 1824, height: 862, href: "https://www.tenvo.store/" },
    { name: "Smart Dairy & Cattle Farm Management", descriptor: "A connected operating system for dairy and cattle farms", image: "/images/projects/smart-dairy-card.webp", width: 1754, height: 896, href: "https://cattle.mindscapeanalytics.com/" },
    { name: "RSIQ Pro", descriptor: "AI-powered market intelligence", image: "/images/projects/rsiq-pro-card.webp", width: 1863, height: 844, href: "https://rsiq.mindscapeanalytics.com/" },
    { name: "DisposiQ", descriptor: "Bakery production and disposal automation", image: "/images/projects/disposiq-card.webp", width: 1864, height: 843, href: "https://disposiq.tenvo.store/" },
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: service paths, e-commerce intelligence, AI voice receptionist, export sales, China sourcing, custom software
 * WHAT: The primary buyer needs and matching service destinations shown on the homepage.
 * WHY: Helps visitors choose a relevant offer without sorting through the full technical catalog.
 * WHERE: Homepage service discovery section immediately below the hero.
 */
const servicePaths = [
    { title: "E-commerce intelligence", copy: "Connect sales, costs, marketing, and stock to understand margins and inventory risk.", icon: LineChart, href: "/ecommerce" },
    { title: "AI voice receptionist", copy: "Answer common calls, qualify inquiries, book appointments, and route requests to staff.", icon: Bot, href: "/services/ai-voice-receptionist" },
    { title: "Export sales operations", copy: "Organize export inquiries, RFQs, multilingual follow-up, quotations, and distributor pipelines.", icon: TrendingUp, href: "/services/foreign-trade-automation" },
    { title: "China sourcing & checks", copy: "Evaluate suppliers, coordinate samples, and plan inspection and production handoff.", icon: Factory, href: "/services/china-sourcing" },
    { title: "Custom software and data", copy: "Build business applications, data pipelines, and dashboards around how your team works.", icon: Database, href: "/solutions/enterprise-software" },
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

/**
 * SOURCE OF TRUTH KEYWORDS: automation offer, sales automation, marketing automation, lead generation, buyer benefits, workflow outcomes
 * WHAT: Defines the three buyer-facing automation paths and their concrete operational outcomes.
 * WHY: Lets visitors identify a relevant starting point before discussing a custom connected workflow.
 * WHERE: Homepage automation-flow section below service discovery.
 */
const automationOffers = [
    { label: "Sales automation", title: "Turn interest into a reliable next step.", copy: "Capture inquiries, qualify the fit, prepare follow-ups, and keep your team focused on the conversations that need people.", outcomes: ["Faster response handoff", "Clearer pipeline context"], icon: TrendingUp },
    { label: "Marketing automation", title: "Make campaigns easier to measure and improve.", copy: "Connect approved campaign signals, content activity, and audience responses so the next action is based on evidence—not guesswork.", outcomes: ["Connected campaign signals", "Reviewable follow-up actions"], icon: LineChart },
    { label: "Lead generation", title: "Build a lead engine your team can review.", copy: "Define your ideal customer, research the right accounts, enrich the record, and route qualified opportunities into the right workflow.", outcomes: ["Better-fit opportunities", "Human-approved outreach"], icon: Users },
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: Mindscape homepage, AI agency hero, China sourcing, Tenvo, light theme, rose accent
 * WHAT: The primary 2026 marketing experience for Mindscape Analytics.
 * WHY: Unifies AI, data, product engineering, and factory-direct sourcing into one credible conversion path.
 * WHERE: Rendered by src/app/page.tsx at the public root route.
 */
export default function HomeClient() {
    const [activeJourneyStep, setActiveJourneyStep] = useState(0);
    const [serviceMotionPaused, setServiceMotionPaused] = useState(false);
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
            <section className="relative isolate overflow-hidden pt-[max(7rem,calc(env(safe-area-inset-top)_+_5.5rem))] md:pt-32">
                <div className="container-standard relative grid items-center gap-8 pb-10 sm:gap-10 sm:pb-14 lg:grid-cols-[1fr_1.1fr_0.55fr] lg:gap-6 lg:pb-8">
                    <div className="relative z-10 order-2 w-full max-w-xl lg:order-1 lg:py-10">
                        <div className="mb-5 flex items-center gap-3 text-xs font-semibold text-brand">
                            AI, data &amp; operating systems
                        </div>
                        <h1 className="max-w-[15ch] text-balance font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                            Make operations work together.
                        </h1>
                        <p className="mt-5 max-w-[58ch] text-pretty leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
                            Mindscape builds business software and AI workflows for e-commerce teams, manufacturers, and exporters. Connect your systems, spot what needs attention, and keep people in control of important decisions.
                        </p>
                        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <Link href="/contact" className="msa-button group w-full justify-between sm:w-auto">
                                Discuss your workflow
                                <span className="msa-button-orb"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                            </Link>
                            <Link href="#service-pathways" className="msa-text-link w-full justify-center sm:w-auto">Choose a service <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                        </div>
                        <HeroReviews />
                    </div>
                    <div className="relative order-1 flex h-[clamp(17rem,70vw,25rem)] items-end justify-center overflow-hidden lg:order-2 lg:h-[min(74svh,44rem)]">
                        <HeroPortrait />
                    </div>
                    <aside className="relative order-3 hidden self-center border-t border-border pt-5 lg:block">
                        <p className="text-xs leading-5 text-muted-foreground">One connected delivery team</p>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">AI · Data · Products · Production</p>
                        <p className="mt-8 max-w-[12ch] font-heading text-[clamp(1.75rem,2.8vw,3rem)] font-semibold leading-tight tracking-[-.03em]">Your AI system doesn’t sleep.</p>
                    </aside>
                </div>

                <div className="relative z-20 mt-5 hidden border-y border-border/75 bg-card/70 py-5 before:absolute before:left-1/2 before:top-0 before:h-px before:w-24 before:-translate-x-1/2 before:bg-brand sm:block md:mt-0">
                    <div className="container-standard flex flex-col items-center gap-5 md:flex-row md:justify-between"><p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:text-left">Built across the Mindscape product portfolio</p><div className="flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold text-foreground/70 sm:gap-x-8 lg:gap-x-10">{portfolio.map((item) => <span key={item.name} className={item.name === "Smart Dairy & Cattle Farm Management" ? "hidden sm:inline" : undefined}>{item.name}</span>)}</div></div>
                </div>
            </section>

            <section id="service-pathways" className="container-standard scroll-mt-24 py-10 md:py-14" aria-labelledby="service-pathways-heading">
                <div className="mb-5 max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand">Choose your starting point</p>
                    <h2 id="service-pathways-heading" className="mt-2 text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">What would you like to improve?</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Choose a service. We will help define the scope.</p>
                </div>
                {/* SOURCE OF TRUTH KEYWORDS: service card row, horizontal overflow, keyboard navigation, compact services, hover motion, reduced motion
                    WHAT: Five equal desktop cards with a native horizontal row on smaller screens.
                    WHY: Keeps service discovery compact while preserving readable copy and full-card link targets.
                    WHERE: Homepage service pathways. */}
                <div className="service-loop-window" data-paused={serviceMotionPaused}>
                <div className="service-loop-track grid auto-cols-[minmax(16rem,80%)] grid-flow-col gap-3 overflow-x-auto px-1 pb-4 pt-2 snap-x snap-proximity sm:auto-cols-[minmax(15rem,38%)] lg:auto-cols-auto lg:grid-cols-5">
                    {[...servicePaths, ...servicePaths].map(({ title, copy, icon: Icon, href }, index) => (
                        <Link key={`${title}-${index}`} href={href} aria-hidden={index >= servicePaths.length ? true : undefined} tabIndex={index >= servicePaths.length ? -1 : undefined} className={`${index >= servicePaths.length ? "service-path-copy " : ""}service-path-card group flex min-w-0 snap-start flex-col rounded-xl border border-border bg-card p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:p-5`}>
                            <span className="flex items-center justify-between gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand"><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span><ArrowRight className="service-path-arrow h-4 w-4 text-muted-foreground" aria-hidden="true" /></span>
                            <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight">{title}</h3>
                            <p className="mt-2 flex-1 text-[13px] leading-5 text-muted-foreground">{copy}</p>
                            <span className="mt-4 text-xs font-semibold text-brand">View service</span>
                        </Link>
                    ))}
                </div>
                </div>
                <button type="button" onClick={() => setServiceMotionPaused((paused) => !paused)} aria-pressed={serviceMotionPaused} className="service-loop-control min-h-11 text-xs font-semibold text-muted-foreground sm:hidden">{serviceMotionPaused ? "Resume service cards" : "Pause service cards"}</button>
                <p className="mt-1 hidden text-xs text-muted-foreground sm:block lg:hidden">Swipe or scroll to explore all five services.</p>
            </section>

            {/*
             * SOURCE OF TRUTH KEYWORDS: Homepage proof narrative, operating system journey, click-selected preview, multilingual operations, commerce margin, inventory
             * WHAT: A click-selected explanation of Mindscape's operational system capabilities.
             * WHY: Makes product proof understandable without scroll-triggered state, autoplay media, or claims that the visitor cannot verify.
             * WHERE: Homepage after the capability overview and before the sourcing service path.
             */}
            {/*
             * SOURCE OF TRUTH KEYWORDS: Operating journey, click controls, commerce margin, inventory, supplier evidence, human approval
             * WHAT: Shows how Mindscape connects operating signals to explainable decisions through an interactive, illustrative software preview.
             * WHY: Uses simple click controls and concrete interface examples, with no scroll-linked animation.
             * WHERE: Homepage between capability overview and China sourcing section.
             */}
            <section className="hidden" aria-hidden="true">
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

            {/*
             * SOURCE OF TRUTH KEYWORDS: automation workflow visualization, sales flow, marketing flow, lead generation, connected nodes, buyer conversion
             * WHAT: Presents Mindscape's three core automation offers as an animated, human-reviewed operating flow.
             * WHY: Makes the value of an automation engagement tangible before a visitor commits to a discovery conversation.
             * WHERE: Homepage between service discovery and sourcing delivery.
             */}
            <section className="relative overflow-hidden border-y border-border bg-card py-16 sm:py-20 md:py-28" aria-labelledby="automation-flow-heading">
                <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:radial-gradient(hsl(var(--brand)/.18)_1px,transparent_1px)] [background-size:22px_22px]" />
                <div className="container-standard relative">
                    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
                        <div className="max-w-xl">
                            <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">What we make work for you</p>
                            <h2 id="automation-flow-heading" className="mt-4 text-balance font-heading text-[clamp(2.7rem,5vw,5.6rem)] font-semibold leading-[0.93] tracking-[-0.045em]">Move every good signal closer to revenue.</h2>
                            <p className="mt-6 text-lg leading-8 text-muted-foreground">We design connected sales, marketing, and lead-generation workflows around your team&apos;s real decisions—so automation prepares the work and people stay in control.</p>
                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                {["Designed around your current tools", "Clear approval points", "Practical, measurable handoffs", "Built to evolve with your team"].map((benefit) => <div key={benefit} className="flex items-start gap-3 rounded-xl border border-border bg-background/80 p-4 text-sm font-medium"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />{benefit}</div>)}
                            </div>
                            <Link href="/contact?plan=automation-workflow-review" className="msa-button mt-8 w-full justify-between sm:w-auto">Map your automation opportunity <span className="msa-button-orb"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span></Link>
                        </div>

                        <div className="rounded-3xl border border-border bg-background/95 p-4 shadow-[0_22px_70px_hsl(var(--foreground)/0.1)] sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand"><Boxes className="h-5 w-5" aria-hidden="true" /></span><div><p className="text-sm font-semibold">Connected automation canvas</p><p className="text-xs text-muted-foreground">Illustrative flow · your tools and approval rules</p></div></div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand"><span className="h-2 w-2 animate-pulse rounded-full bg-brand motion-reduce:animate-none" aria-hidden="true" /> Live workflow concept</span>
                            </div>

                            <div className="relative mt-5 overflow-hidden rounded-2xl border border-border bg-muted/35 p-4 sm:p-6">
                                <svg viewBox="0 0 900 420" className="absolute inset-0 h-full w-full" aria-hidden="true">
                                    <defs><linearGradient id="automation-flow-gradient" x1="0" x2="1"><stop offset="0%" stopColor="hsl(var(--brand))" stopOpacity="0.18" /><stop offset="52%" stopColor="hsl(var(--brand))" stopOpacity="0.7" /><stop offset="100%" stopColor="hsl(var(--brand))" stopOpacity="0.18" /></linearGradient></defs>
                                    {[92, 210, 328].map((y) => <path key={y} d={`M72 ${y} C260 ${y - 46}, 500 ${y + 46}, 828 ${y}`} fill="none" stroke="url(#automation-flow-gradient)" strokeWidth="3" strokeDasharray="7 10" />)}
                                    <g className="motion-reduce:hidden">
                                        {[["M72 92 C260 46, 500 138, 828 92", "4.8s"], ["M72 210 C260 164, 500 256, 828 210", "5.6s"], ["M72 328 C260 282, 500 374, 828 328", "6.4s"]].map(([path, duration]) => <circle key={path} r="7" fill="hsl(var(--brand))"><animateMotion dur={duration} repeatCount="indefinite" path={path} /></circle>)}
                                    </g>
                                </svg>
                                <div className="relative space-y-5">
                                    {automationOffers.map(({ label, title, outcomes, icon: Icon }, index) => (
                                        <article key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/80 bg-background/90 p-4 sm:grid-cols-[11rem_1fr_auto] sm:gap-5">
                                            <div className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand"><Icon className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-xs font-semibold uppercase tracking-[.12em] text-brand">0{index + 1} · {label}</p><p className="mt-1 text-sm font-semibold">{title}</p></div></div>
                                            <div className="hidden items-center justify-between gap-2 sm:flex">{["Signal", "Enrich", "Approve", "Act"].map((node, nodeIndex) => <span key={node} className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground"><span className="grid h-7 w-7 place-items-center rounded-full border border-brand/30 bg-card text-[10px] font-semibold text-foreground">{nodeIndex + 1}</span>{node}</span>)}</div>
                                            <div className="col-span-2 flex flex-wrap gap-2 sm:col-span-1 sm:justify-end">{outcomes.map((outcome) => <span key={outcome} className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">{outcome}</span>)}</div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-4 text-xs leading-5 text-muted-foreground">The visual is a workflow representation, not a claim about prebuilt integrations or automated decisions. We confirm systems, permissions, and human review points during discovery.</p>
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
