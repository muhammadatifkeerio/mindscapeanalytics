import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/SmartImage";
import { ArrowRight, Mail, Phone } from "lucide-react";

/** SOURCE OF TRUTH KEYWORDS: Chinese market, Mandarin landing, China contact, localized services, zh-CN
 * WHAT: Chinese-language entry point explaining Mindscape's AI, software, and operations work.
 * WHY: Gives Chinese-speaking visitors a clear, localized route to learn about services and contact the team.
 * WHERE: Public /zh-cn route, linked from the English homepage and sitemap.
 */
export const metadata: Metadata = {
    title: "Mindscape Analytics | 中国企业 AI 与软件解决方案",
    description: "Mindscape Analytics 为企业设计和交付 AI 自动化、数据系统及定制软件。了解我们的产品与服务，并直接联系团队。",
    alternates: {
        canonical: "/zh-cn",
        languages: { "en-US": "/", "zh-CN": "/zh-cn" },
    },
    openGraph: {
        title: "Mindscape Analytics | 中国企业 AI 与软件解决方案",
        description: "为企业打造 AI 自动化、数据系统及定制软件。联系 Mindscape Analytics 团队。",
        url: "https://mindscapeanalytics.com/zh-cn",
        locale: "zh_CN",
        type: "website",
        images: [{ url: "/images/og-mindscape-2026.png", alt: "Mindscape Analytics 企业 AI、数据与软件解决方案" }],
    },
    twitter: { card: "summary_large_image", title: "Mindscape Analytics | 中国企业 AI 与软件解决方案", images: ["/images/og-mindscape-2026.png"] },
};

const products = [
    { name: "TENVO 商业运营平台", description: "连接线上商店、销售、库存、客户管理与运营数据。", href: "https://www.tenvo.store/" },
    { name: "Smart Dairy 智慧牧场系统", description: "集中管理牛群、产奶、饲料、健康与牧场运营。", href: "https://cattle.mindscapeanalytics.com/" },
    { name: "DBLynx 数据智能", description: "通过自然语言查询和探索企业数据。", href: "https://mindscapeanalytics.com/projects" },
    { name: "DisposiQ 生产运营智能", description: "整合生产、处置记录、团队活动与运营洞察。", href: "https://disposiq.tenvo.store/" },
];

export default function ChineseLandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="container-standard flex min-h-16 items-center justify-between gap-4">
                    <Link href="/zh-cn" aria-label="Mindscape Analytics 首页"><Image src="/images/brand/mindscape-analytics-logo-dark.webp" alt="Mindscape Analytics" width={220} height={88} className="h-auto w-40 object-contain sm:w-48" priority /></Link>
                    <nav aria-label="主导航" className="flex items-center gap-4 text-sm">
                        <Link href="/projects" className="hidden text-muted-foreground hover:text-foreground sm:inline">项目</Link>
                        <Link href="/contact" className="inline-flex min-h-10 items-center rounded-full bg-brand px-4 py-2 font-semibold text-white hover:opacity-90">联系团队</Link>
                        <Link href="/" lang="en" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">English</Link>
                    </nav>
                </div>
            </header>
            <main lang="zh-CN" className="container-standard pb-24 pt-36 sm:pt-44">
                <section className="grid gap-12 border-b border-border pb-16 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20 lg:pb-24">
                    <div>
                        <h1 className="max-w-4xl text-balance font-heading text-5xl font-semibold tracking-[-.04em] sm:text-6xl lg:text-7xl">把数据转化为<span className="text-brand">明智决策</span></h1>
                        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">Mindscape Analytics 为企业设计并交付 AI 自动化、数据系统和定制软件。从业务流程梳理、系统架构到部署，与团队一起把想法变成可用的产品。</p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">联系团队 <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                            <Link href="/projects" className="inline-flex min-h-12 items-center rounded-full border border-border px-6 py-3 font-semibold hover:bg-muted">查看项目</Link>
                        </div>
                    </div>
                    <aside className="border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                        <h2 className="text-xl font-semibold">为实际运营而设计</h2>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">我们围绕业务流程、数据来源、安全要求和部署成本开展工作，并在项目开始前明确范围与下一步。</p>
                        <div className="mt-6 flex flex-col gap-4 text-sm">
                            <a href="tel:+8617802267424" className="inline-flex items-center gap-3 font-medium hover:text-brand"><Phone aria-hidden="true" className="h-4 w-4" />中国团队：+86 178 0226 7424</a>
                            <a href="mailto:info@mindscapeanalytics.com" className="inline-flex items-center gap-3 font-medium hover:text-brand"><Mail aria-hidden="true" className="h-4 w-4" />info@mindscapeanalytics.com</a>
                        </div>
                    </aside>
                </section>

                <section className="pt-16 lg:pt-20" aria-labelledby="products-heading">
                    <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div><h2 id="products-heading" className="max-w-2xl text-3xl font-semibold tracking-[-.03em] sm:text-4xl">已构建并投入使用的产品</h2><p className="mt-3 max-w-2xl text-muted-foreground">浏览我们的软件与运营平台，了解不同业务场景中的实际应用。</p></div>
                        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">全部项目 <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                    </div>
                    <div className="divide-y divide-border border-y border-border">
                        {products.map((product) => (
                            <a key={product.name} href={product.href} target={product.href.startsWith("http") ? "_blank" : undefined} rel={product.href.startsWith("http") ? "noreferrer" : undefined} className="group grid gap-2 py-6 transition-colors hover:bg-muted/40 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
                                <div><h3 className="text-lg font-semibold group-hover:text-brand">{product.name}</h3><p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{product.description}</p></div>
                                <span className="inline-flex items-center gap-2 text-sm font-medium">了解项目 <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                            </a>
                        ))}
                    </div>
                </section>

                <section className="mt-16 flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                    <div><h2 className="text-xl font-semibold">告诉我们您的业务目标</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">说明目前的流程、挑战或想实现的产品，我们会与您讨论合适的下一步。</p></div>
                    <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 font-semibold text-background">开始沟通 <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                </section>
            </main>
            <footer lang="zh-CN" className="border-t border-border bg-background">
                <div className="container-standard flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Mindscape Analytics LLC。保留所有权利。</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-3">
                        <a href="tel:+8617802267424" className="inline-flex items-center gap-2 hover:text-foreground"><Phone aria-hidden="true" className="h-4 w-4" />+86 178 0226 7424</a>
                        <a href="mailto:info@mindscapeanalytics.com" className="inline-flex items-center gap-2 hover:text-foreground"><Mail aria-hidden="true" className="h-4 w-4" />电子邮件联系</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
