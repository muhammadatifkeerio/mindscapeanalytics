import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** SOURCE OF TRUTH KEYWORDS: insights, published articles, project learning, contact CTA
 * WHAT: Provides a transparent editorial placeholder with direct routes to verified public work.
 * WHY: The former page showed fictional authors, nonfunctional article links, and an unsupported subscriber count.
 * WHERE: /blog, until the company publishes complete, attributable articles.
 */
const resources = [
    { title: "AI products in day-to-day farm operations", description: "Explore the Smart Dairy and Cattle Farm Management System, with cattle, milk, feed, health, and farm-finance workflows in one operations view.", href: "https://cattle.mindscapeanalytics.com/", label: "Visit Smart Dairy" },
    { title: "Business operations connected to one workspace", description: "See TENVO’s storefront, POS, inventory, CRM, accounting, and analytics capabilities.", href: "https://www.tenvo.store/", label: "Visit TENVO" },
    { title: "Bakery production and disposal automation", description: "Explore DisposiQ’s bakery production tracking, disposal records, team activity, and operational insights.", href: "https://disposiq.tenvo.store/", label: "Visit DisposiQ" },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="container-standard pb-24 pt-36 sm:pt-44">
                <section className="max-w-4xl border-b border-border pb-12 sm:pb-16">
                    <h1 className="text-balance font-heading text-5xl font-semibold tracking-[-.04em] sm:text-6xl">Ideas built from real work</h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Our editorial library is in preparation. For now, explore live product experiences and the systems we build, or contact us to discuss a challenge in your business.</p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background">Browse projects <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
                        <Link href="/contact" className="inline-flex min-h-11 items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted">Talk with our team</Link>
                    </div>
                </section>
                <section className="pt-12" aria-labelledby="featured-work-heading">
                    <h2 id="featured-work-heading" className="text-2xl font-semibold tracking-tight">Explore our work</h2>
                    <div className="mt-5 divide-y divide-border border-y border-border">
                        {resources.map((resource) => (
                            <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" className="group grid gap-3 py-6 transition-colors hover:bg-muted/40 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
                                <div><h3 className="text-lg font-semibold group-hover:text-brand">{resource.title}</h3><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{resource.description}</p></div>
                                <span className="inline-flex items-center gap-2 text-sm font-medium">{resource.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                            </a>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
