"use client";

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
    { name: "Smart Dairy & Cattle Farm Management", descriptor: "A connected operating system for dairy and cattle farms", image: "/images/projects/smart-dairy-card.webp", width: 1754, height: 896, href: "https://cattle.mindscapeanalytics.com/" },
    { name: "RSIQ Pro", descriptor: "AI-powered market intelligence", image: "/images/projects/rsiq-pro-card.webp", width: 1863, height: 844, href: "https://rsiq.mindscapeanalytics.com/" },
    { name: "Tenvo", descriptor: "AI agents for modern businesses", image: "/images/projects/tenvo-card.webp", width: 1824, height: 862, href: "https://www.tenvo.store/" },
    { name: "DisposiQ", descriptor: "Production and disposal operations intelligence", image: "/images/projects/disposiq-card.webp", width: 1864, height: 843, href: "https://disposiq.tenvo.store/" },
] as const;

const capabilities = [
    { title: "Autonomous AI agents", copy: "Deploy digital operators that research, qualify, coordinate, and complete repeatable work across your existing stack.", icon: Bot },
    { title: "Data products that decide", copy: "Turn fragmented operational data into governed pipelines, live intelligence, and decision systems your team can trust.", icon: Database },
    { title: "Factory-direct sourcing", copy: "Move from product idea to production through our direct China factory network, with sourcing, validation, and delivery coordination.", icon: Factory },
] as const;

const process = [
    ["Discover", "We map the bottleneck, data, economics, and delivery constraints."],
    ["Architect", "We design the agent, software, sourcing, and operating model around the outcome."],
    ["Deploy", "We ship into production, connect the stack, and establish observable workflows."],
    ["Evolve", "We measure performance and improve the system as your business changes."],
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
                            AI, data, products & production
                        </div>
                        <h1 className="max-w-[12ch] text-balance font-heading text-[clamp(2.65rem,10vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] sm:max-w-[14ch] sm:text-[clamp(3rem,5.2vw,5rem)]">
                            AI that works for you.
                        </h1>
                        <p className="mt-4 max-w-[54ch] text-pretty text-base leading-7 text-muted-foreground sm:mt-7 md:text-lg md:leading-8">
                            Mindscape builds autonomous AI agents, decision-grade data systems, and digital products, then helps ambitious companies take physical products from China sourcing to production.
                        </p>
                        <div className="mt-5 flex flex-col items-stretch gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                            <Link href="/contact" className="msa-button group w-full justify-between sm:w-auto">
                                Get in touch
                                <span className="msa-button-orb"><ArrowRight className="h-4 w-4" /></span>
                            </Link>
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

            <section className="border-y border-border bg-muted/45 py-20 md:py-28">
                <div className="container-standard">
                    <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.7fr]"><p className="max-w-4xl text-balance font-heading text-[clamp(2.6rem,5.2vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">From one business question to an orchestrated system.</p><p className="max-w-lg text-base leading-7 text-muted-foreground lg:justify-self-end">Agents coordinate research, structured data, human approvals, and production actions, while your team remains in control of the decisions that matter.</p></div>
                    <div className="mt-16 overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-sm">
                        <div className="grid gap-px bg-border md:grid-cols-[0.8fr_1.2fr_0.8fr]">
                            <div className="bg-card p-7 md:p-9"><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Input</p><p className="mt-5 text-xl font-medium">“Find and validate a production partner for our new retail product.”</p></div>
                            <div className="relative overflow-hidden bg-card p-7 md:p-9"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(hsl(var(--border)/.7)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/.7)_1px,transparent_1px)] [background-size:32px_32px]" /><div className="relative flex min-h-40 items-center justify-center gap-4">{[Bot, Globe2, LineChart, PackageCheck].map((Icon, index) => <motion.span key={index} animate={reduceMotion ? undefined : { y: [0, index % 2 ? 7 : -7, 0] }} transition={{ duration: 3.5 + index * 0.4, repeat: Infinity }} className="grid h-14 w-14 place-items-center rounded-2xl bg-background text-foreground shadow-md"><Icon className="h-5 w-5" /></motion.span>)}</div><p className="relative mt-4 text-center text-xs text-muted-foreground">Research → qualify → model → coordinate</p></div>
                            <div className="bg-card p-7 md:p-9"><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Outcome</p><ul className="mt-5 space-y-3 text-sm text-muted-foreground"><li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Structured supplier shortlist</li><li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Production risk map</li><li className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> Human-approved next steps</li></ul></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-standard py-24 md:py-36">
                <div className="grid overflow-hidden rounded-[1.75rem] border border-brand/15 bg-accent/55 lg:grid-cols-[0.88fr_1.12fr]">
                    <div className="p-8 sm:p-12 lg:p-16"><Factory className="h-9 w-9 text-brand" /><h2 className="mt-12 max-w-[10ch] text-balance font-heading text-[clamp(2.7rem,5vw,5.8rem)] font-semibold leading-[0.93] tracking-[-0.04em]">China sourcing, connected to production.</h2><p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground">Our direct factory relationships help companies turn product requirements into a production path. We coordinate sourcing, supplier fit, validation, samples, and the operational intelligence around delivery.</p><Link href="/china-sourcing" className="mt-9 inline-flex items-center gap-2 border-b border-brand/40 pb-1 font-semibold text-brand">Explore China direct factory sourcing <ArrowRight className="h-4 w-4" /></Link></div>
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

            <section className="px-4 pb-4 md:px-6 md:pb-6"><div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-muted/45 px-6 py-20 sm:px-10 md:py-28"><div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/15 blur-[110px]" aria-hidden="true" /><div className="container-standard relative z-10 text-center"><h2 className="mx-auto max-w-[13ch] text-balance font-heading text-[clamp(3rem,6.2vw,7rem)] font-medium leading-[0.92] tracking-[-0.04em]">Build the system your next stage needs.</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">Bring us the bottleneck, the product idea, or the operating ambition. We’ll help turn it into a practical path to production.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href="https://cal.com/mindscape/strategy" className="msa-button">Start a conversation <ArrowRight className="h-4 w-4" /></a><Link href="/shop" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-border bg-card px-6 font-semibold text-foreground transition-colors hover:border-brand/50">Explore AI assets</Link></div></div></div></section>
            <Footer />
        </main>
    );
}
