import type { Metadata } from "next";
import Link from "next/link";
import SolutionLayout from "@/components/layouts/SolutionLayout";

/**
 * SOURCE OF TRUTH KEYWORDS: China sourcing, direct factory, supplier matching, sample validation, production coordination, service metadata
 * WHAT: Public sourcing service detail using the shared solution-page layout.
 * WHY: Give buyers and search engines a specific destination for the existing sourcing offer.
 * WHERE: Services navigation, homepage sourcing section, footer, and sitemap.
 */
export const metadata: Metadata = {
    title: "China Direct Factory Sourcing & Production | Mindscape Analytics",
    description: "Source physical products from China with Mindscape Analytics. Factory matching, supplier fit, samples, validation, production handoff, and delivery coordination for global buyers.",
    alternates: { canonical: "/china-sourcing" },
    openGraph: {
        title: "China Direct Factory Sourcing | Mindscape Analytics",
        description: "Move from product requirements to a coordinated production path with China factory sourcing, samples, and delivery planning.",
        url: "https://mindscapeanalytics.com/china-sourcing",
        images: ["/images/og-mindscape-2026.png"],
        type: "website",
    },
};

const stages = [
    ["Define the product", "Share specifications, materials, target quantities, budget, and destination so the sourcing brief reflects your business needs."],
    ["Find the factory fit", "We help identify suitable factories and coordinate discussions around capabilities, quotations, and supplier requirements."],
    ["Coordinate samples and validation", "Align sample requirements, review feedback, and resolve product details before the production handoff."],
    ["Plan production and delivery", "Coordinate production requirements, milestones, and delivery planning with the people responsible for each stage."],
] as const;

export default function ChinaSourcingPage() {
    return (
        <SolutionLayout currentSolutionId="china-sourcing" title="China Direct Factory Sourcing" subtitle="Take your physical product from requirements to a production path. Mindscape connects factory sourcing, sample coordination, and delivery planning with the operating systems behind your business.">
            <section aria-labelledby="sourcing-process">
                <h2 id="sourcing-process" className="fluid-h2">From product brief to production.</h2>
                <p className="mt-6 max-w-prose text-lg leading-8 text-muted-foreground">Our China factory relationships support companies developing physical products. We help translate your requirements into practical supplier conversations, samples, and a coordinated production handoff.</p>
                <ol className="mt-10 divide-y divide-border border-y border-border">
                    {stages.map(([title, description]) => <li key={title} className="py-7"><h3 className="font-heading text-xl font-semibold">{title}</h3><p className="mt-3 max-w-prose leading-7 text-muted-foreground">{description}</p></li>)}
                </ol>
                <h2 className="mt-16 font-heading text-3xl font-semibold tracking-tight">Tell us what you want to build.</h2>
                <p className="mt-4 max-w-prose leading-7 text-muted-foreground">Send your product specifications, quantity, and target market. We will discuss the sourcing scope, timeline, and next steps. For connected operations, explore our custom software and inventory systems.</p>
                <div className="mt-7 flex flex-wrap gap-5">
                    <Link href="/contact" className="inline-flex min-h-12 items-center rounded-full bg-foreground px-6 font-semibold text-background">Discuss your sourcing brief</Link>
                    <Link href="/solutions/enterprise-software" className="inline-flex min-h-12 items-center font-semibold underline underline-offset-4">Explore SaaS development</Link>
                    <Link href="/zh-cn" lang="zh-CN" className="inline-flex min-h-12 items-center font-semibold underline underline-offset-4">中文服务与产品</Link>
                </div>
            </section>
        </SolutionLayout>
    );
}
