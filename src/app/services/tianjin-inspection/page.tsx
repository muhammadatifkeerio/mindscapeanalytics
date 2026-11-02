import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SolutionLayout from "@/components/layouts/SolutionLayout";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
    title: "Tianjin & Beijing Factory, Sample and EV Inspection",
    description: "Book a defined, photo-supported factory, sample, supplier, or EV inspection report in Tianjin or Beijing, with scope confirmed before payment.",
    alternates: { canonical: "/services/tianjin-inspection" },
    openGraph: { title: "Tianjin & Beijing Inspection Reports", description: "On-ground inspection support for international buyers, documented against an agreed checklist.", url: "https://mindscapeanalytics.com/services/tianjin-inspection", images: [SEO_CONFIG.defaultSocialImage], type: "website" },
};

/**
 * SOURCE OF TRUTH KEYWORDS: Tianjin inspection, Beijing factory inspection, EV inspection, sample QC report, photo evidence, buyer checklist
 * WHAT: Dedicated inspection service detail and conversion page for the Beijing–Tianjin area.
 * WHY: Gives searchers a precise local service destination and sets responsible report boundaries.
 * WHERE: /services/tianjin-inspection and China sourcing cross-links.
 */
export default function TianjinInspectionPage() {
    const steps = [["Define the checklist", "Tell us what is being inspected, the site, seller contact, timing, and the decisions the report needs to support."], ["Confirm access and scope", "We check location, scheduling, access, requested observations, and any items that require a qualified third party."], ["Conduct the review", "The assigned reviewer records observable conditions and available evidence against the agreed checklist."], ["Receive the report", "You receive organized findings, supporting photos where permitted, noted limitations, and questions to raise before your decision."]] as const;
    return <SolutionLayout currentSolutionId="tianjin-inspection" title="Tianjin and Beijing inspection reports" subtitle="Get independent, checklist-based observations on supplier documents, samples, factories, and eligible vehicle inspections. Each report helps buyers make a more informed decision.">
        <section aria-labelledby="inspection-fit"><h2 id="inspection-fit" className="fluid-h2">A documented view before your next decision.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">Inspection scope can cover visible sample details, packing, quantity checks, observable production conditions, supplier-provided records, or an agreed vehicle checklist. We confirm what can be evaluated before accepting the engagement.</p><ul className="mt-8 grid gap-4 border-y border-border py-7 sm:grid-cols-2">{["Factory and production-site observations", "Sample and packaging checklist reviews", "Supplier document and listing consistency", "Eligible EV condition and documentation observations"].map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />{item}</li>)}</ul></section>
        <section className="mt-16" aria-labelledby="inspection-process"><h2 id="inspection-process" className="font-heading text-3xl font-semibold tracking-tight">How the inspection works</h2><ol className="mt-7 divide-y divide-border border-y border-border">{steps.map(([title, body], index) => <li key={title} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr_1.5fr] sm:gap-6"><span className="text-sm font-semibold text-brand">0{index + 1}</span><h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">{body}</p></li>)}</ol></section>
        <section className="mt-16 rounded-2xl bg-foreground p-7 text-background sm:p-10" aria-labelledby="inspection-start"><h2 id="inspection-start" className="max-w-2xl font-heading text-3xl font-semibold tracking-tight">Start with the site, product, and decision deadline.</h2><p className="mt-4 max-w-2xl leading-7 text-background/70">Packages range from $199 to $499. We confirm the applicable package, access, exclusions, and date before sending a Stripe invoice. No site visit is scheduled until the written scope is accepted.</p><div className="mt-7 flex flex-wrap gap-5"><Link href="/contact?plan=tianjin-beijing-inspection" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-background px-6 font-semibold text-foreground">Request an inspection <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/services/china-sourcing" className="inline-flex min-h-12 items-center font-semibold underline underline-offset-4">Compare sourcing packages</Link></div></section>
    </SolutionLayout>;
}
