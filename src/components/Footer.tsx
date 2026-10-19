import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const companyLinks = [
    ["Solutions", "/solutions"],
    ["Projects", "/projects"],
    ["Pricing", "/pricing"],
    ["About", "/about"],
    ["Contact", "/contact"],
] as const;

const exploreLinks = [
    ["AI asset shop", "/shop"],
    ["China sourcing", "/contact"],
    ["Tenvo", "https://www.tenvo.store/"],
    ["Insights", "/blog"],
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: Footer, Mindscape contact, China sourcing, Tenvo, legal links, brand close
 * WHAT: Global conversion and navigation close for public pages.
 * WHY: Ends every surface with a concise route back into the company, portfolio, and contact paths.
 * WHERE: Homepage and public marketing routes.
 */
export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container-standard py-16 md:py-24">
                <div className="grid gap-14 lg:grid-cols-[1.2fr_0.7fr_0.7fr]">
                    <div>
                        <Link href="/" aria-label="Mindscape Analytics home" className="inline-flex dark:rounded-md dark:bg-white dark:p-1">
                            <Image src="/images/brand/mindscape-analytics-logo-dark.png" alt="Mindscape Analytics" width={300} height={120} className="h-auto w-[250px] object-contain sm:w-[290px]" />
                        </Link>
                        <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">AI agents, data systems, digital products, and factory-direct sourcing, designed as one connected path from intelligence to execution.</p>
                        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand">Get in touch <ArrowUpRight className="h-4 w-4" /></Link>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Company</h2>
                        <ul className="mt-6 space-y-4 text-sm text-muted-foreground">{companyLinks.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-foreground">{label}</Link></li>)}</ul>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Explore</h2>
                        <ul className="mt-6 space-y-4 text-sm text-muted-foreground">{exploreLinks.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-foreground">{label}</Link></li>)}</ul>
                    </div>
                </div>

                <div className="mt-16 grid gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:grid-cols-3">
                    <a href="mailto:info@mindscapeanalytics.com" className="flex items-center gap-2 hover:text-foreground"><Mail className="h-4 w-4" /> info@mindscapeanalytics.com</a>
                    <a href="tel:+13072106155" className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4" /> +1 307 210 6155</a>
                    <p className="flex items-center gap-2 md:justify-self-end"><MapPin className="h-4 w-4" /> Sheridan, Wyoming, USA</p>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Mindscape Analytics LLC. All rights reserved.</p>
                    <div className="flex gap-5"><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/seller">Seller policy</Link></div>
                </div>
            </div>
        </footer>
    );
}
