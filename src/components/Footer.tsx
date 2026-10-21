import Image from "@/components/SmartImage";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import WechatNumber from "@/components/WechatNumber";

const companyLinks = [
    ["Solutions", "/solutions"],
    ["Projects", "/projects"],
    ["Pricing", "/pricing"],
    ["About", "/about"],
    ["Contact", "/contact"],
] as const;

const exploreLinks = [
    ["AI asset shop", "/shop"],
    ["China Direct Factory Sourcing", "/china-sourcing"],
    ["SaaS Application Development", "/solutions/enterprise-software"],
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
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.6fr_0.6fr_1.25fr] lg:gap-12">
                    <div>
                        <Link href="/" aria-label="Mindscape Analytics home" className="inline-flex dark:rounded-md dark:bg-white dark:p-1">
                            <Image src="/images/brand/mindscape-analytics-logo-dark.webp" alt="Mindscape Analytics" width={300} height={120} className="h-auto w-[250px] object-contain sm:w-[290px]" />
                        </Link>
                        <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">AI agents, data systems, digital products, and factory-direct sourcing, designed as one connected path from intelligence to execution.</p>
                        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand">Get in touch <ArrowUpRight className="h-4 w-4" /></Link>
                        <Link href="/zh-cn" lang="zh-CN" className="mt-4 block w-fit text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground">中文服务与产品</Link>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Company</h2>
                        <ul className="mt-6 space-y-4 text-sm text-muted-foreground">{companyLinks.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-foreground">{label}</Link></li>)}</ul>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Explore</h2>
                        <ul className="mt-6 space-y-4 text-sm text-muted-foreground">{exploreLinks.map(([label, href]) => <li key={label}><Link href={href} className="transition-colors hover:text-foreground">{label}</Link></li>)}</ul>
                    </div>
                    <div className="lg:justify-self-end lg:w-full lg:max-w-sm">
                        <h2 className="text-sm font-semibold">Talk with our team</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">Choose the direct contact option that works for you.</p>
                        <div className="mt-5 space-y-5 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                            <a href="mailto:info@mindscapeanalytics.com" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><Mail className="h-4 w-4 shrink-0 text-brand" /> info@mindscapeanalytics.com</a>
                            <div className="border-t border-border pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">🇺🇸 United States</p>
                                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                                    <a href="tel:+13072106155" className="font-semibold text-foreground hover:underline">+1 307 210 6155</a>
                                    <a href="https://wa.me/13072106155" target="_blank" rel="noreferrer" aria-label="Message the US team on WhatsApp" className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                                </div>
                            </div>
                            <div className="border-t border-border pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">🇨🇳 China · WeChat</p>
                                <WechatNumber compact />
                            </div>
                            <p className="flex items-start gap-2 border-t border-border pt-4 text-xs leading-5 text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Sheridan, Wyoming, USA · Beijing, China</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Mindscape Analytics LLC. All rights reserved.</p>
                    <div className="flex gap-5"><Link href="/legal/privacy">Privacy</Link><Link href="/legal/terms">Terms</Link><Link href="/legal/seller">Seller policy</Link></div>
                </div>
            </div>
        </footer>
    );
}
