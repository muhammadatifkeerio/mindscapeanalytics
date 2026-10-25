import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import SolutionLayout from "@/components/layouts/SolutionLayout";
import { SEO_CONFIG } from "@/config/seo";

/**
 * SOURCE OF TRUTH KEYWORDS: China sourcing packages, supplier shortlist, sample QC, procurement retainer, factory vetting, service pricing
 * WHAT: Commercial definitions for the fixed-price sourcing and inspection offers.
 * WHY: Keeps price, scope, and exclusions visible before a buyer starts an inquiry.
 * WHERE: /services/china-sourcing package comparison.
 */
const sourcingOffers = [
    { name: "Digital Supplier Shortlist", price: "$299", summary: "A decision-ready comparison for one clearly defined product requirement.", includes: ["Requirements review", "Up to five relevant supplier candidates", "Available business and capability checks", "Comparison matrix and next-step notes"], plan: "digital-supplier-shortlist" },
    { name: "Document & Listing Verification", price: "$199", summary: "A focused review of one supplier and the records provided for the engagement.", includes: ["Supplier identity review", "Document and listing consistency checks", "Recorded concerns and open questions", "Written verification report"], plan: "supplier-verification-report" },
    { name: "Factory or Sample Inspection", price: "$349", summary: "A scheduled Tianjin or Beijing inspection against an agreed checklist.", includes: ["Pre-inspection checklist", "Photo-supported observations", "Sample or process findings", "Written inspection report"], plan: "factory-sample-inspection" },
    { name: "Expanded Factory or EV Inspection", price: "$499", summary: "A broader on-ground review for a factory, vehicle, or higher-detail inspection brief.", includes: ["Expanded agreed checklist", "Photo-supported site observations", "Issues requiring buyer review", "Consolidated inspection report"], plan: "expanded-factory-ev-inspection" },
] as const;

export const metadata: Metadata = {
    title: "China Factory Vetting, Sample QC & Procurement | Mindscape Analytics",
    description: "Fixed-price supplier shortlists, supplier verification, and Tianjin or Beijing factory, sample, and EV inspection reports for international buyers.",
    alternates: { canonical: "/services/china-sourcing" },
    openGraph: { title: "China Factory Vetting & Procurement Support", description: "Supplier research, verification, sample coordination, and on-ground inspection support in Tianjin and Beijing.", url: "https://mindscapeanalytics.com/services/china-sourcing", images: [SEO_CONFIG.defaultSocialImage], type: "website" },
};

/**
 * SOURCE OF TRUTH KEYWORDS: China sourcing page, fixed price procurement, Stripe invoice, QC retainer, buyer conversion, inspection disclaimer
 * WHAT: Expanded China sourcing service page with transparent packages and a working inquiry path.
 * WHY: Lets buyers choose a defined starting point without overstating inspection or certification outcomes.
 * WHERE: Services navigation, sitemap, footer, and legacy sourcing redirect.
 */
export default function ChinaSourcingPage() {
    return (
        <SolutionLayout currentSolutionId="china-sourcing" title="China factory vetting, sample QC, and procurement support" subtitle="Move from a product requirement to a documented supplier decision. Choose a digital shortlist, a focused verification report, or on-ground inspection support in Tianjin and Beijing.">
            <section aria-labelledby="sourcing-offers">
                <div className="flex flex-col gap-5 border-b border-border pb-10 md:flex-row md:items-end md:justify-between"><div><h2 id="sourcing-offers" className="fluid-h2">Choose a defined starting point.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Each package begins with a written brief. We confirm product scope, location, access, and timing before payment so the work and report boundaries are clear.</p></div><Link href="/services/tianjin-inspection" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-brand underline underline-offset-4">Inspection details <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
                <div className="divide-y divide-border">
                    {sourcingOffers.map((offer) => <article key={offer.name} className="grid gap-6 py-9 md:grid-cols-[1fr_auto] md:items-start md:gap-10"><div><div className="flex flex-wrap items-baseline gap-x-4 gap-y-2"><h3 className="font-heading text-2xl font-semibold tracking-tight">{offer.name}</h3><p className="text-xl font-semibold text-brand">{offer.price}</p></div><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{offer.summary}</p><ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">{offer.includes.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />{item}</li>)}</ul></div><Link href={`/contact?plan=${offer.plan}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 font-semibold text-white transition-opacity hover:opacity-90">Start this request</Link></article>)}
                </div>
            </section>
            <section className="mt-16 grid gap-8 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:grid-cols-[1fr_.8fr]" aria-labelledby="retainer-heading"><div><h2 id="retainer-heading" className="font-heading text-3xl font-semibold tracking-tight">Ongoing QC and procurement retainers</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">For recurring orders, we can scope supplier communication, sample checkpoints, production follow-up, issue tracking, and reporting as a monthly operating cadence. Retainer pricing is based on supplier count, inspection frequency, locations, and reporting depth.</p><Link href="/contact?plan=qc-procurement-retainer" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand underline underline-offset-4">Discuss a retainer <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div><div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-brand" aria-hidden="true" />Tianjin and Beijing coverage</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Work outside the stated service area, laboratory testing, shipping, duties, travel, and third-party fees are quoted separately when required.</p><p className="mt-4 text-sm leading-6 text-muted-foreground">Reports document observations against the agreed checklist. They are not legal, engineering, safety, customs, or certification opinions.</p></div></section>
            <section className="mt-16 border-y border-border py-10" aria-labelledby="payment-heading"><h2 id="payment-heading" className="font-heading text-2xl font-semibold">Clear commercial handling</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Approved engagements are billed by Mindscape Analytics LLC through a secure Stripe invoice as supply-chain data and inspection consulting services. A paid invoice confirms only the written scope and schedule shown in the engagement terms; supplier selection and purchasing decisions remain with the buyer.</p></section>
        </SolutionLayout>
    );
}
