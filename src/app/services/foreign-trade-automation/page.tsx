import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Languages, Network, Workflow } from "lucide-react";
import SolutionLayout from "@/components/layouts/SolutionLayout";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
    title: "Foreign Trade Sales & Growth Automation | Mindscape Analytics",
    description: "Build a connected foreign-trade sales system for inquiries, multilingual follow-up, quotations, CRM pipelines, distributor development, and reporting.",
    alternates: { canonical: "/services/foreign-trade-automation" },
    openGraph: {
        title: "Foreign Trade Sales & Growth Automation",
        description: "Connect export inquiries, multilingual sales follow-up, quotations, distributors, CRM, and performance reporting in one practical workflow.",
        url: "https://mindscapeanalytics.com/services/foreign-trade-automation",
        images: [SEO_CONFIG.defaultSocialImage],
        type: "website",
    },
};

/**
 * SOURCE OF TRUTH KEYWORDS: foreign trade automation, export sales CRM, distributor development, RFQ workflow, multilingual follow-up, growth operations
 * WHAT: Public service page for manufacturers, exporters, suppliers, and distributors building repeatable international sales operations.
 * WHY: Connects Mindscape's AI, data, software, and China-market capabilities to the commercial workflow between an inquiry and a fulfilled order.
 * WHERE: /services/foreign-trade-automation, services navigation, footer, sitemap, and chatbot knowledge.
 */
export default function ForeignTradeAutomationPage() {
    const workflow = [
        ["Capture", "Bring website inquiries, referrals, trade-show contacts, and approved lead sources into one structured intake."],
        ["Qualify", "Classify market, product fit, order intent, timeline, and next action while keeping commercial judgment with your team."],
        ["Follow up", "Create multilingual response, reminder, and nurture workflows with review points for sensitive or high-value conversations."],
        ["Quote and hand off", "Connect RFQs, quotation status, samples, negotiation notes, and order handoff to the people responsible for delivery."],
        ["Measure", "Track pipeline stages, response times, source quality, distributor activity, and outcomes without inventing attribution."],
    ] as const;

    const systems = [
        { icon: Languages, title: "Multilingual inquiry desk", description: "Draft and organize responses, route inquiries, preserve context, and escalate conversations that need a person." },
        { icon: Workflow, title: "Export sales pipeline", description: "Make RFQs, quotations, samples, follow-ups, negotiations, and handoffs visible in a shared workflow." },
        { icon: Network, title: "Distributor growth operations", description: "Structure target accounts, partner outreach, onboarding information, territory notes, and recurring relationship reviews." },
    ] as const;

    return (
        <SolutionLayout currentSolutionId="foreign-trade-automation" title="Foreign trade sales and growth automation" subtitle="Connect export inquiries and follow-ups in one sales workflow. Track each step from first contact and qualification through quotation, distributor development, and order handoff.">
            <section aria-labelledby="trade-system-heading">
                <p className="mb-6 text-sm leading-6 text-muted-foreground">Need to handle incoming product calls and appointment requests as well? Explore our <Link href="/services/ai-voice-receptionist" className="font-semibold text-foreground underline underline-offset-4">AI voice receptionist and inquiry qualification service</Link>.</p>
                <h2 id="trade-system-heading" className="fluid-h2">Build the operating system behind international sales.</h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Designed for manufacturers, exporters, suppliers, distributors, and foreign-trade teams that need clearer ownership, faster response, and better pipeline visibility across markets.</p>
                <div className="mt-10 divide-y divide-border border-y border-border">
                    {systems.map(({ icon: Icon, title, description }) => <article key={title} className="grid gap-5 py-7 sm:grid-cols-[3rem_.75fr_1.25fr] sm:items-start sm:gap-7"><span className="grid h-11 w-11 place-items-center rounded-xl bg-muted text-brand"><Icon className="h-5 w-5" aria-hidden="true" /></span><h3 className="font-heading text-xl font-semibold tracking-tight">{title}</h3><p className="leading-7 text-muted-foreground">{description}</p></article>)}
                </div>
            </section>

            <section className="mt-16" aria-labelledby="trade-workflow-heading">
                <h2 id="trade-workflow-heading" className="font-heading text-3xl font-semibold tracking-tight">One workflow from inquiry to commercial handoff</h2>
                <ol className="mt-7 divide-y divide-border border-y border-border">{workflow.map(([title, description], index) => <li key={title} className="grid gap-3 py-6 sm:grid-cols-[3rem_.6fr_1.4fr] sm:gap-6"><span className="text-sm font-semibold text-brand">0{index + 1}</span><h3 className="font-semibold">{title}</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">{description}</p></li>)}</ol>
            </section>

            <section className="mt-16 grid gap-8 rounded-2xl border border-border bg-card p-7 sm:p-9 lg:grid-cols-[1fr_.8fr]" aria-labelledby="trade-scope-heading">
                <div><h2 id="trade-scope-heading" className="font-heading text-3xl font-semibold tracking-tight">Scope the system around your real sales process.</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">An engagement can include CRM design, approved data connections, inquiry classification, multilingual message assistance, quotation workflows, distributor tracking, dashboards, and human approval rules. We start with the channels and records your team already uses.</p><Link href="/contact?plan=foreign-trade-growth-automation" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-6 font-semibold text-background transition-opacity hover:opacity-90">Discuss your trade workflow <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
                <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><h3 className="font-semibold">Responsible automation</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">{["No guaranteed leads, orders, response rates, or market access", "Consent, platform rules, and regional communication requirements shape outreach", "Human review remains available for pricing, claims, negotiations, and commitments", "Performance reporting distinguishes observed outcomes from estimates"].map((item) => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />{item}</li>)}</ul></div>
            </section>
        </SolutionLayout>
    );
}
