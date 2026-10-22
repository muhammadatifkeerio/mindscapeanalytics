import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/SmartImage";
import BrandLogo from "@/components/BrandLogo";
import { ArrowRight, ArrowUpRight, Factory, Globe2, Mail, Search, Workflow } from "lucide-react";
import WechatNumber from "@/components/WechatNumber";

/** SOURCE OF TRUTH KEYWORDS: China market, Chinese factories, overseas growth, factory sourcing, AI software, zh-CN
 * WHAT: Localized Chinese landing page for factory growth, China supply-chain collaboration, and shipped software products.
 * WHY: Helps Chinese manufacturers and international sourcing teams quickly identify the right collaboration path and contact Mindscape.
 * WHERE: Public /zh-cn route, linked from the global footer and sitemap.
 */
export const metadata: Metadata = {
    title: "中国工厂出海与中国供应链合作｜Mindscape Analytics",
    description: "支持中国制造企业拓展海外市场、开发 B2B 客户并数字化销售流程；为国际采购团队提供中国工厂寻源、供应商沟通、样品与生产协同。涵盖 AI、SaaS 与运营系统。",
    alternates: {
        canonical: "/zh-cn",
        languages: { "en-US": "/", "zh-CN": "/zh-cn", "x-default": "/" },
    },
    openGraph: {
        title: "中国工厂出海与中国供应链合作｜Mindscape Analytics",
        description: "连接中国制造与全球市场：海外客户开发、AI 与业务软件，以及中国工厂寻源和生产协同。",
        url: "https://www.mindscapeanalytics.com/zh-cn",
        locale: "zh_CN",
        type: "website",
        images: [{ url: "/images/og-mindscape-2026.png", alt: "Mindscape Analytics：AI、软件与中国供应链协作" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "中国工厂出海与中国供应链合作｜Mindscape Analytics",
        description: "海外增长、AI 与软件开发、中国工厂寻源和生产协同。",
        images: ["/images/og-mindscape-2026.png"],
    },
};

const products = [
    {
        name: "TENVO Business OS",
        label: "商业运营平台",
        description: "连接线上商店、POS、库存、客户、财务与业务分析，帮助团队在一个系统中管理日常运营。",
        href: "https://www.tenvo.store/",
        image: "/images/projects/tenvo-card.webp",
        imageAlt: "TENVO 商业运营平台产品界面",
    },
    {
        name: "DisposiQ",
        label: "生产运营智能",
        description: "集中查看生产流程、处置记录、团队活动与运营数据，让执行过程更清晰、可追踪。",
        href: "https://disposiq.tenvo.store/",
        image: "/images/projects/disposiq-card.webp",
        imageAlt: "DisposiQ 生产运营管理平台",
    },
    {
        name: "DBLynx",
        label: "企业数据智能",
        description: "通过自然语言探索企业数据库与运营数据，帮助团队更直接地获得业务洞察。",
        href: "/projects/dblynx-regional-bank",
        image: "/images/projects/dblynx-card.webp",
        imageAlt: "DBLynx 企业数据智能产品界面",
    },
] as const;

const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://www.mindscapeanalytics.com/zh-cn#webpage",
            url: "https://www.mindscapeanalytics.com/zh-cn",
            name: "中国工厂出海与中国供应链合作｜Mindscape Analytics",
            description: "面向中国制造企业和国际采购团队的海外增长、AI 软件与供应链协作服务。",
            inLanguage: "zh-CN",
            isPartOf: { "@id": "https://www.mindscapeanalytics.com/#website" },
            about: { "@id": "https://www.mindscapeanalytics.com/#organization" },
            breadcrumb: { "@id": "https://www.mindscapeanalytics.com/zh-cn#breadcrumb" },
        },
        {
            "@type": "BreadcrumbList",
            "@id": "https://www.mindscapeanalytics.com/zh-cn#breadcrumb",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "首页", item: "https://www.mindscapeanalytics.com/" },
                { "@type": "ListItem", position: 2, name: "中文服务", item: "https://www.mindscapeanalytics.com/zh-cn" },
            ],
        },
        {
            "@type": "Service",
            "@id": "https://www.mindscapeanalytics.com/zh-cn#china-services",
            name: "中国供应链协作、海外市场增长与企业软件开发",
            serviceType: ["中国工厂寻源与生产协同", "B2B 海外市场与客户开发系统", "AI 自动化与 SaaS 软件开发"],
            provider: { "@id": "https://www.mindscapeanalytics.com/#organization" },
            areaServed: [{ "@type": "Country", name: "China" }, { "@type": "Country", name: "United States" }],
            url: "https://www.mindscapeanalytics.com/zh-cn",
            availableLanguage: ["zh-CN", "en"],
        },
    ],
};

export default function ChineseLandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c") }} />
            <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="container-standard flex min-h-16 items-center justify-between gap-4">
                    <Link href="/zh-cn" aria-label="Mindscape Analytics 中文首页">
                        <BrandLogo alt="Mindscape Analytics" width={220} height={74} className="h-auto w-36 object-contain sm:w-44" priority />
                    </Link>
                    <nav aria-label="主导航" className="flex items-center gap-3 text-sm sm:gap-6">
                        <a href="#合作方向" className="hidden text-muted-foreground transition-colors hover:text-foreground md:inline">合作方向</a>
                        <a href="#产品案例" className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline">产品案例</a>
                        <Link href="/contact" className="inline-flex min-h-10 items-center rounded-full bg-brand px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90">联系团队</Link>
                        <Link href="/" lang="en" className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground">EN</Link>
                    </nav>
                </div>
            </header>

            <main lang="zh-CN">
                <section className="container-standard grid gap-12 pb-16 pt-20 sm:pt-28 lg:grid-cols-[1.1fr_.7fr] lg:items-center lg:gap-20 lg:pb-24 lg:pt-32">
                    <div>
                        <h1 className="max-w-4xl text-balance font-heading text-5xl font-semibold leading-[1.06] tracking-[-.04em] sm:text-6xl lg:text-7xl">连接中国制造，<span className="text-brand">拓展全球增长。</span></h1>
                        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">Mindscape Analytics 与中国制造企业和国际采购团队合作：支持工厂拓展海外客户、建设 AI 与业务软件，也帮助采购方对接中国供应链并推进样品和生产沟通。</p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">讨论合作机会 <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                            <a href="#产品案例" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted">查看已上线产品 <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-5 text-sm font-medium text-muted-foreground" aria-label="主要服务领域">
                            <span>海外市场与客户开发</span><span>AI 与企业软件</span><span>中国工厂与供应链协作</span>
                        </div>
                    </div>

                    <aside className="relative overflow-hidden rounded-2xl bg-foreground p-7 text-background sm:p-9">
                        <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
                        <div aria-hidden="true" className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
                        <div className="relative">
                            <p className="text-sm font-medium text-background/65">面向中国制造与国际采购</p>
                            <h2 className="mt-4 max-w-sm font-heading text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-4xl">从业务机会，到清晰的执行路径。</h2>
                            <p className="mt-4 max-w-md leading-7 text-background/75">先明确产品、市场与运营目标，再共同确定合适的研究、软件或供应链协作范围。</p>
                            <div className="mt-8 border-t border-white/20 pt-6">
                                <p className="text-xs font-semibold uppercase tracking-[.12em] text-background/60">中国团队 · 电话 / 微信</p>
                                <WechatNumber compact locale="zh-CN" inverse />
                                <a href="mailto:info@mindscapeanalytics.com" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-background/90 underline underline-offset-4 hover:text-white"><Mail aria-hidden="true" className="h-4 w-4" />info@mindscapeanalytics.com</a>
                            </div>
                        </div>
                    </aside>
                </section>

                <section id="合作方向" className="border-y border-border bg-muted/40 py-16 sm:py-20" aria-labelledby="partnership-heading">
                    <div className="container-standard">
                        <div className="grid gap-5 pb-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:pb-14">
                            <h2 id="partnership-heading" className="max-w-xl font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl lg:text-5xl">为两端的业务，解决真正的跨境难题。</h2>
                            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">制造商需要更有效地触达海外买家；采购团队需要更清晰地找到合适工厂、沟通产品要求并推进生产。我们围绕这两类目标组织服务。</p>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
                            <article className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
                                <div className="flex items-center gap-3 text-brand"><Globe2 aria-hidden="true" className="h-5 w-5" /><span className="text-sm font-semibold">中国制造企业</span></div>
                                <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">拓展海外市场与客户。</h3>
                                <p className="mt-3 max-w-xl leading-7 text-muted-foreground">围绕目标国家、产品定位和理想买家，建设可持续运作的市场研究、线索管理与销售流程。</p>
                                <ul className="mt-6 space-y-3 text-sm leading-6 sm:text-base">
                                    <li className="flex gap-3"><Search aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />目标市场与买家研究，梳理产品机会和客户画像</li>
                                    <li className="flex gap-3"><Search aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />海外 B2B 线索研究与客户开发工作流</li>
                                    <li className="flex gap-3"><Workflow aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />网站、CRM、数据系统与 AI 自动化，支持询盘跟进</li>
                                </ul>
                                <Link href="/contact" className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-brand underline underline-offset-4">讨论海外增长方案 <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
                            </article>

                            <article className="flex flex-col rounded-2xl bg-brand p-6 text-white sm:p-8">
                                <div className="flex items-center gap-3 text-white/80"><Factory aria-hidden="true" className="h-5 w-5" /><span className="text-sm font-semibold">国际采购团队</span></div>
                                <h3 className="mt-5 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">对接中国工厂与生产资源。</h3>
                                <p className="mt-3 max-w-xl leading-7 text-white/80">从产品需求出发，梳理供应商筛选标准、报价与样品沟通，并协调生产和交付准备。</p>
                                <ul className="mt-6 space-y-3 text-sm leading-6 sm:text-base">
                                    <li className="flex gap-3"><Search aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-white/75" />工厂寻源、供应商匹配与资料初步核查</li>
                                    <li className="flex gap-3"><Workflow aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-white/75" />报价、产品规格、样品反馈与供应商沟通协同</li>
                                    <li className="flex gap-3"><ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-white/75" />明确生产节点、责任分工与交付准备</li>
                                </ul>
                                <Link href="/china-sourcing" className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-white underline underline-offset-4">了解中国工厂寻源服务 <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="container-standard py-16 sm:py-20" aria-labelledby="digital-heading">
                    <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
                        <div>
                            <h2 id="digital-heading" className="max-w-lg font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl">用数字系统，把增长流程连起来。</h2>
                            <p className="mt-5 max-w-lg leading-7 text-muted-foreground">海外市场拓展和供应链协作都依赖稳定的信息流。我们设计并交付 AI 工作流、客户开发系统和定制软件，让团队把重复工作交给系统，把关键判断留给人。</p>
                            <Link href="/solutions/ai-genai" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">了解 AI 与软件服务 <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                        </div>
                        <div className="divide-y divide-border border-y border-border">
                            <div className="grid gap-2 py-5 sm:grid-cols-[minmax(9rem,.65fr)_1.35fr] sm:gap-8"><h3 className="font-semibold">AI 与自动化</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">用于线索整理、客户响应、内部知识检索与跨系统流程的 AI Agent、聊天助手和自动化工作流。</p></div>
                            <div className="grid gap-2 py-5 sm:grid-cols-[minmax(9rem,.65fr)_1.35fr] sm:gap-8"><h3 className="font-semibold">SaaS 与业务软件</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">从需求梳理、UI/UX、数据与 API 集成，到云端部署和持续改进，交付可贴合运营流程的 Web 应用。</p></div>
                            <div className="grid gap-2 py-5 sm:grid-cols-[minmax(9rem,.65fr)_1.35fr] sm:gap-8"><h3 className="font-semibold">云架构与部署</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">评估工作负载、架构与云账单，规划 AWS 成本优化、CI/CD 和监控。过往项目云成本节省最高达 70%；实际效果取决于原有架构、使用量与服务配置。</p></div>
                        </div>
                    </div>
                </section>

                <section id="产品案例" className="border-y border-border bg-muted/40 py-16 sm:py-20" aria-labelledby="products-heading">
                    <div className="container-standard">
                        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div><h2 id="products-heading" className="font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl">已经构建并上线的产品。</h2><p className="mt-3 max-w-2xl leading-7 text-muted-foreground">通过真实运行的软件产品，了解我们如何把运营流程、数据和产品体验落到系统中。</p></div>
                            <Link href="/projects" className="inline-flex min-h-10 items-center gap-2 font-semibold underline underline-offset-4">查看全部项目 <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {products.map((product) => (
                                <Link key={product.name} href={product.href} target={product.href.startsWith("http") ? "_blank" : undefined} rel={product.href.startsWith("http") ? "noreferrer" : undefined} className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                                    <div className="relative aspect-[1.65/1] overflow-hidden bg-muted"><Image src={product.image} alt={product.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div>
                                    <div className="p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-[.1em] text-brand">{product.label}</p><h3 className="mt-2 font-heading text-xl font-semibold tracking-tight">{product.name}</h3><p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">{product.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">查看产品 <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="container-standard py-16 sm:py-20" aria-labelledby="process-heading">
                    <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
                        <div><h2 id="process-heading" className="max-w-md font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl">先把目标讲清楚，再确定下一步。</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">合作范围因产品、市场和供应链要求而异。我们先对齐需求，再给出清楚、可讨论的执行方案。</p></div>
                        <ol className="divide-y divide-border border-y border-border">
                            <li className="grid gap-2 py-5 sm:grid-cols-[minmax(10rem,.65fr)_1.35fr] sm:gap-8"><h3 className="font-semibold">说明业务目标</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">介绍公司、产品或系统需求，以及目标市场、采购要求和当前阶段。</p></li>
                            <li className="grid gap-2 py-5 sm:grid-cols-[minmax(10rem,.65fr)_1.35fr] sm:gap-8"><h3 className="font-semibold">确认范围与匹配方式</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">共同梳理优先事项、必要信息、交付边界和需要参与的合作方。</p></li>
                            <li className="grid gap-2 py-5 sm:grid-cols-[minmax(10rem,.65fr)_1.35fr] sm:gap-8"><h3 className="font-semibold">推进试点或项目</h3><p className="text-sm leading-6 text-muted-foreground sm:text-base">按确认的计划开展市场研究、系统开发或供应商与生产协同，并明确后续责任。</p></li>
                        </ol>
                    </div>
                </section>

                <section className="border-t border-border bg-muted/40 py-16 sm:py-20" aria-labelledby="faq-heading">
                    <div className="container-standard grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
                        <div><h2 id="faq-heading" className="max-w-md font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl">合作前，先了解这些。</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">如果你的需求还在形成中，也可以先把目标和现状发给我们。</p></div>
                        <div className="divide-y divide-border border-y border-border">
                            <details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">Mindscape 与哪些团队合作？<span aria-hidden="true" className="text-brand transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">我们与需要拓展海外市场的中国制造企业，以及需要对接中国工厂和生产资源的国际采购团队合作，也为两类团队开发 AI、数据与业务软件。</p></details>
                            <details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">可以协助工厂核验和样品评估吗？<span aria-hidden="true" className="text-brand transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">可按项目范围讨论供应商资料初核、报价沟通、样品评估和生产协调。具体核验方式、现场工作和责任边界会在项目开始前确认；如需认证或第三方检验，将另行明确安排与责任。</p></details>
                            <details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">如何开始沟通？<span aria-hidden="true" className="text-brand transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">请提供公司和产品简介、目标市场或采购目的、当前挑战与期望时间。我们会据此讨论适合的下一步和所需信息。</p></details>
                        </div>
                    </div>
                </section>

                <section className="container-standard py-16 sm:py-20">
                    <div className="flex flex-col gap-6 rounded-2xl bg-foreground p-7 text-background sm:flex-row sm:items-center sm:justify-between sm:p-10">
                        <div><h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-[-.035em] sm:text-4xl">让我们一起找到合适的合作路径。</h2><p className="mt-3 max-w-2xl leading-7 text-background/70">无论是海外客户开发、AI 与软件项目，还是中国工厂寻源，请告诉我们你希望推进的目标。</p></div>
                        <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-background px-6 py-3 font-semibold text-foreground transition-opacity hover:opacity-90">联系 Mindscape <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                    </div>
                </section>
            </main>

            <footer lang="zh-CN" className="border-t border-border bg-background">
                <div className="container-standard grid gap-8 pb-24 pt-10 text-sm text-muted-foreground sm:grid-cols-[1fr_auto] sm:items-end sm:pb-24 lg:pb-10">
                    <div><p className="font-semibold text-foreground">Mindscape Analytics</p><p className="mt-2 max-w-xl leading-6">AI、软件与跨境业务协作，服务中国制造企业和国际采购团队。</p><p className="mt-5">© 2026 Mindscape Analytics LLC。保留所有权利。</p></div>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end"><Link href="/projects" className="underline underline-offset-4 hover:text-foreground">项目</Link><Link href="/china-sourcing" className="underline underline-offset-4 hover:text-foreground">中国工厂寻源</Link><a href="mailto:info@mindscapeanalytics.com" className="underline underline-offset-4 hover:text-foreground">电子邮件</a></div>
                </div>
            </footer>
        </div>
    );
}
