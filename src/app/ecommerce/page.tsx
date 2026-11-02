import type { Metadata } from "next";
import Image from "@/components/SmartImage";
import Link from "next/link";
import { ArrowRight, BarChart3, Boxes, Workflow } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SEO_CONFIG, serializeJsonLd } from "@/config/seo";

export const metadata: Metadata = {
    title: "E-Commerce Profit & Inventory Systems | Mindscape Analytics",
    description: "Profit and inventory reporting for commerce teams: define contribution margin, blended marketing efficiency, and stock runway across your operation.",
    alternates: { canonical: "/ecommerce" },
    openGraph: { title: "E-Commerce Profit & Inventory Systems", description: "Define contribution margin, blended marketing efficiency, and stock runway with reporting designed around your commerce operation.", url: "https://mindscapeanalytics.com/ecommerce", type: "website", images: [SEO_CONFIG.defaultSocialImage] },
    twitter: { card: "summary_large_image", title: "E-Commerce Profit & Inventory Systems | Mindscape Analytics", description: "Define contribution margin, blended marketing efficiency, and inventory runway across your commerce operation.", images: [SEO_CONFIG.defaultSocialImage] },
};

const offers = [
    { icon: BarChart3, title: "Margin and performance visibility", copy: "Bring orders, discounts, returns, product costs, payment costs, fulfillment, and marketing data into a traceable management view." },
    { icon: Boxes, title: "Inventory and availability control", copy: "Make stock movement, product availability, material readiness, and operational exceptions visible before they become a customer problem." },
    { icon: Workflow, title: "Commerce workflows that act", copy: "Connect reports, alerts, approvals, customer context, and the next operational task without removing human judgment." },
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: commerce proof gallery, multilingual operating system, financial forecast, inventory movement, SKU profitability, product interface
 * WHAT: Supplied product-interface examples illustrating operational capabilities without claiming customer outcomes.
 * WHY: Buyers need to see the operational surface before starting an architecture conversation.
 * WHERE: /ecommerce proof gallery; assets live under public/images/proof.
 */
const proofScreens = [
    { src: "/images/proof/financial-forecast.webp", alt: "Multilingual financial forecast dashboard comparing recorded and forecast revenue.", title: "Finance and forecasting" },
    { src: "/images/proof/sku-profitability.webp", alt: "Multilingual SKU profitability dashboard showing revenue, costs, and product-level margin analysis.", title: "Traceable product economics" },
    { src: "/images/proof/inventory-movement.webp", alt: "Multilingual inventory movement report showing stock changes, closing quantity, COGS, and warehouse filters.", title: "Inventory and COGS control" },
    { src: "/images/proof/production-health.webp", alt: "Multilingual production and operations health view showing material readiness, recipes, lots, and warehouse use.", title: "Production and material readiness" },
    { src: "/images/proof/operations-dashboard.webp", alt: "Multilingual executive operations dashboard showing revenue, orders, inventory, opportunities, and business-health insights.", title: "Executive operating view" },
    { src: "/images/proof/growth-market-fit.webp", alt: "Supplier market-fit workspace showing public-source evidence, regional acquisition channels, and source-bound certification notes.", title: "Evidence-led market qualification" },
    { src: "/images/proof/growth-lead-dossier.webp", alt: "B2B lead dossier showing public company facts, evidence boundaries, qualification rationale, and localized outreach drafting.", title: "Accountable buyer research" },
    { src: "/images/proof/growth-prospects.webp", alt: "Buyer discovery table that labels prospect results and mailbox status as unverified until independently confirmed.", title: "Transparent prospect workflows" },
] as const;

const questions = [
    ["Which commerce systems can be connected?", "The scope starts with the systems your team already uses, such as commerce platforms, advertising data, inventory records, fulfillment tools, finance data, and customer-support workflows. We confirm available access and data quality before defining the build."],
    ["Does Mindscape promise a specific profit increase?", "No. The work improves visibility, workflow consistency, and operational decision-making. Actual commercial results depend on product economics, demand, operating discipline, data quality, and decisions outside the system."],
    ["How does an engagement begin?", "We begin with a short architecture conversation to understand the operating question, current systems, ownership, data availability, and the decision the team needs to make more reliably."],
] as const;

const commerceSchema = {
    "@context": "https://schema.org",
    "@graph": [
        { "@type": "Service", "@id": "https://mindscapeanalytics.com/ecommerce#service", name: "E-Commerce Profit and Inventory Intelligence", description: "Commerce data, inventory, profitability, and operational workflow systems designed around real business operations.", url: "https://mindscapeanalytics.com/ecommerce", provider: { "@id": "https://mindscapeanalytics.com/#organization" }, areaServed: ["United States", "United Kingdom", "European Union", "United Arab Emirates"] },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://mindscapeanalytics.com/" }, { "@type": "ListItem", position: 2, name: "E-Commerce Intelligence", item: "https://mindscapeanalytics.com/ecommerce" }] },
        { "@type": "FAQPage", mainEntity: questions.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
    ],
};

/**
 * SOURCE OF TRUTH KEYWORDS: ecommerce intelligence, commerce profitability, inventory operations, structured data, FAQPage, decision systems
 * WHAT: Focused public landing page for commerce teams improving margin visibility, inventory control, and operating workflows.
 * WHY: Gives one commercial search intent a clear destination instead of competing with the broader corporate homepage.
 * WHERE: /ecommerce, sitemap, llms.txt, structured-data graph, and internal conversion paths.
 */
export default function EcommercePage() {
    return <div className="min-h-screen bg-background text-foreground"><Navbar /><main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(commerceSchema) }} />
        <section className="container-standard pt-36 pb-20 md:pt-44 md:pb-28">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">E-commerce profit and inventory intelligence</p>
            <h1 className="mt-5 max-w-4xl text-balance font-heading text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[.92] tracking-[-.05em]">Know your product margins, inventory risks, and next action.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Connect sales, product costs, returns, fulfillment, advertising, and stock movement in one operating view. See how contribution margin, blended marketing efficiency, and inventory runway are defined before deciding what to build.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/contact?plan=ecommerce-profit-inventory" className="msa-button">Discuss your commerce operation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/projects" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-card px-5 font-semibold transition-colors hover:border-brand/50">Explore shipped systems <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        </section>
        <section className="border-y border-border bg-muted/45 py-20 md:py-28" aria-labelledby="commerce-proof-heading"><div className="container-standard"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">Product interface examples</p><h2 id="commerce-proof-heading" className="mt-4 text-balance font-heading text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.045em]">One multilingual system for the work behind commerce.</h2><p className="mt-5 leading-7 text-muted-foreground">These supplied product screens illustrate finance, inventory, production, and buyer-research workflows. Figures and records shown are interface examples; they are not verified customer outcomes, live integrations, or proof of deliverability.</p></div><div className="mt-12 grid gap-6 sm:grid-cols-2">{proofScreens.map(({ src, alt, title }, index) => <figure key={src} className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"><a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size product interface example: ${title}`}><Image src={src} alt={alt} width={1600} height={900} priority={index === 0} sizes="(max-width: 639px) 100vw, 50vw" className="block h-auto w-full transition-transform duration-300 hover:scale-[1.01]" /></a><figcaption className="border-t border-border px-5 py-4 text-sm font-semibold text-foreground">{title}</figcaption></figure>)}</div></div></section>
        <section className="border-y border-border bg-muted/45 py-20 md:py-28"><div className="container-standard"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">Decision-ready operations</p><h2 className="mt-4 text-balance font-heading text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.045em]">Replace disconnected reports with one accountable operating view.</h2></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{offers.map(({ icon: Icon, title, copy }) => <article key={title} className="rounded-3xl border border-border bg-card p-7 sm:p-8"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-brand"><Icon className="h-5 w-5" aria-hidden="true" /></span><h3 className="mt-7 text-2xl font-semibold tracking-[-.035em]">{title}</h3><p className="mt-4 leading-7 text-muted-foreground">{copy}</p></article>)}</div></div></section>
        <section className="container-standard py-20 md:py-28" aria-labelledby="audit-heading">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">Start with a defined diagnostic</p>
            <h2 id="audit-heading" className="mt-4 font-heading text-4xl font-semibold tracking-tight">Three questions before you build.</h2>
            <ol className="mt-8 divide-y divide-border border-y border-border">
                <li className="py-5"><h3 className="text-xl font-semibold">Can you explain contribution margin?</h3><p className="mt-2 leading-7 text-muted-foreground">Map net sales, product costs, payment and fulfillment costs, and marketing spend. Contribution margin after marketing (often called CM3) excludes overhead and taxes unless separately included.</p></li>
                <li className="py-5"><h3 className="text-xl font-semibold">Can you reconcile marketing efficiency?</h3><p className="mt-2 leading-7 text-muted-foreground">Define MER as agreed revenue divided by total marketing spend for the same period. Keep platform-reported ROAS separate and document returns, currencies, and attribution assumptions.</p></li>
                <li className="py-5"><h3 className="text-xl font-semibold">Do you know your inventory runway?</h3><p className="mt-2 leading-7 text-muted-foreground">Compare usable stock with expected demand and replenishment lead time. Forecasts should show assumptions, missing inputs, and uncertainty.</p></li>
            </ol>
            <p className="mt-6 max-w-3xl leading-7 text-muted-foreground">The diagnostic scope includes a source inventory, metric definitions, data-quality gaps, and a prioritized implementation roadmap. We agree the fee, access, and turnaround before work starts.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
                <article className="rounded-3xl border border-border bg-card p-7"><h3 className="text-2xl font-semibold">Profit intelligence sprint</h3><p className="mt-4 leading-7 text-muted-foreground">An agreed reporting view, documented margin definitions, source reconciliation, and a handoff walkthrough. Sources, historical coverage, refresh cadence, acceptance checks, and support are fixed in the proposal.</p></article>
                <article className="rounded-3xl border border-border bg-card p-7"><h3 className="text-2xl font-semibold">Inventory operations sprint</h3><p className="mt-4 leading-7 text-muted-foreground">An agreed stock and demand view, exception alerts, review rules, and a handoff walkthrough. Warehouse coverage, forecast assumptions, integrations, and ongoing maintenance are fixed in the proposal.</p></article>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Both sprints are quoted after discovery. Connector subscriptions, source-data cleanup, and additional integrations are itemized separately when required.</p>
            <Link href="/contact?plan=ecommerce-diagnostic" className="msa-button mt-7">Discuss your diagnostic <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/contact?plan=commerce-agency-partner" className="mt-6 block font-semibold underline underline-offset-4">Agency partner? Discuss reporting delivery for your clients</Link>
        </section>
        <section className="container-standard pb-24 md:pb-32"><div className="rounded-3xl border border-border bg-card p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand">Questions</p><h2 className="mt-4 font-heading text-4xl font-semibold tracking-[-.04em]">Plan the system around your actual operation.</h2><div className="mt-8 divide-y divide-border border-y border-border">{questions.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer py-2 text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{answer}</p></details>)}</div></div></section>
    </main><Footer /></div>;
}
