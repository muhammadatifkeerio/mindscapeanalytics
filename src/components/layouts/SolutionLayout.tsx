"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    Brain,
    Code,
    Cloud,
    Shield,
    ArrowRight,
    ChevronRight
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const solutions = [
    {
        id: "ai-genai",
        name: "AI Agents & Workflows",
        icon: Brain,
        href: "/solutions/ai-genai"
    },
    {
        id: "cloud-infrastructure",
        name: "Cloud & Infra",
        icon: Cloud,
        href: "/solutions/cloud-infrastructure"
    },
    {
        id: "enterprise-software",
        name: "SaaS Application Development",
        icon: Code,
        href: "/solutions/enterprise-software"
    },
    {
        id: "china-sourcing",
        name: "China Direct Factory Sourcing",
        icon: Cloud,
        href: "/china-sourcing"
    },
    {
        id: "services",
        name: "Managed Operation Units",
        icon: Shield,
        href: "/services"
    }
];

/** SOURCE OF TRUTH KEYWORDS: service questions, buyer intent, project scope, AWS costs, AI integration, software ownership
 * WHAT: Practical questions visitors ask before starting a service engagement.
 * WHY: Explain the work and next steps using service-specific information.
 * WHERE: The shared solution detail layout.
 */
const solutionQuestions = [
    {
        id: "ai-genai",
        questions: [
            { question: "Can you connect an AI agent or chatbot to our existing tools?", answer: "We review your CRM, APIs, data sources, and access requirements, then design the integration around the workflow. The scope can include knowledge retrieval, lead capture, appointment booking, and a handoff to your team." },
            { question: "What is included in an AI workflow development project?", answer: "We agree on the workflow, data sources, expected outputs, and review points. Delivery can include agent logic, tool integrations, evaluation, deployment, monitoring, and ongoing improvements based on the agreed scope." },
            { question: "How do we start an AI application project?", answer: "Share the process you want to improve, the tools your team uses, and examples of the expected result. We use that information to assess feasibility and propose a scope, delivery plan, and relevant evaluation criteria." },
        ],
    },
    {
        id: "cloud-infrastructure",
        questions: [
            { question: "Can you optimize the cost of an existing AWS application?", answer: "We review the cost baseline, resource usage, workload requirements, and reliability needs. Recommendations can cover resource sizing, storage, application architecture, and unnecessary recurring spend. Savings are evaluated against the actual workload." },
            { question: "Do you deploy web applications and AI workloads to AWS?", answer: "Yes. We plan the infrastructure and deployment around the application, including compute, databases, environment configuration, release pipelines, monitoring, and recovery needs. Service selection follows the workload and budget." },
            { question: "What should we provide for a cloud architecture review?", answer: "Start with your architecture overview, application requirements, recent cost breakdown, traffic patterns, and the problems you want to solve. We then agree on the scope and any access needed for the review." },
        ],
    },
    {
        id: "enterprise-software",
        questions: [
            { question: "Can you handle the full web application development process?", answer: "We work across product discovery, UI/UX design, frontend and backend engineering, database design, integrations, testing, cloud deployment, and ongoing improvement. The scope is agreed around your users, workflows, and launch requirements." },
            { question: "Can you build AI features into a SaaS application?", answer: "Yes. We can integrate assistants, business knowledge retrieval, workflow automation, and connected tools into an application. Permissions, evaluation, operating costs, and human review are considered as part of the design." },
            { question: "Can we see products Mindscape has developed?", answer: "Our projects include TENVO business operations software, Smart Dairy & Cattle Farm Management, and DisposIQ bakery production and disposal automation. The project catalog links to the live products so you can explore their workflows." },
        ],
    },
]

interface SolutionLayoutProps {
    children: React.ReactNode
    currentSolutionId: string
    title: string
    subtitle: string
    heroImage?: string
}

export default function SolutionLayout({
    children,
    currentSolutionId,
    title,
    subtitle
}: SolutionLayoutProps) {
    /** SOURCE OF TRUTH KEYWORDS: service schema, breadcrumbs, solution identity, JSON-LD, provider
     * WHAT: Describes each service using its visible title, summary, and existing navigation URL.
     * WHY: Keeps search entities and breadcrumbs aligned with the content visitors actually see.
     * WHERE: Shared solution pages, including China sourcing.
     */
    const currentSolution = solutions.find((solution) => solution.id === currentSolutionId)
    const questions = solutionQuestions.find((solution) => solution.id === currentSolutionId)?.questions
    const breadcrumbItems = [
        { name: "Home", item: "https://www.mindscapeanalytics.com/" },
        ...(currentSolution?.href.startsWith("/solutions/") ? [{ name: "Solutions", item: "https://www.mindscapeanalytics.com/solutions" }] : []),
        ...(currentSolution ? [{ name: title, item: `https://www.mindscapeanalytics.com${currentSolution.href}` }] : []),
    ]
    const searchData = currentSolution ? {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": `https://www.mindscapeanalytics.com${currentSolution.href}#service`,
                name: title,
                description: subtitle,
                url: `https://www.mindscapeanalytics.com${currentSolution.href}`,
                provider: { "@id": "https://www.mindscapeanalytics.com/#organization" },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
            },
        ],
    } : null

    return (
        <div className="min-h-screen bg-transparent text-foreground relative overflow-x-clip">
            {searchData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchData).replace(/</g, "\\u003c") }} />}
            {/* Cinematic Background Layer - Harmonized with Global */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-10 left-0 w-[60%] h-[60%] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] opacity-20" />
                <div className="absolute bottom-10 right-0 w-[50%] h-[50%] translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] opacity-15" />
            </div>
            <Navbar />

            {/* Premium Solution Hero */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,black,transparent)] opacity-10" />

                {/* Background Glow - Optimized */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] rounded-full pointer-events-none" />

                <div className="container-standard relative z-10 text-center">
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {currentSolution && <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
                            <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                                {breadcrumbItems.map((item, index) => <li key={item.item} className="inline-flex items-center gap-2">{index > 0 && <span aria-hidden="true">/</span>}{index === breadcrumbItems.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.item} className="underline-offset-4 hover:underline">{item.name}</Link>}</li>)}
                            </ol>
                        </nav>}
                        <h1 className="fluid-h1 mb-8">
                            {title}
                        </h1>
                        <p className="fluid-body max-w-3xl mx-auto opacity-60">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container-standard py-20">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sticky Sidebar Navigation */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h3 className="text-foreground font-black text-sm uppercase tracking-widest mb-6 border-b border-border pb-4">
                                    Our Solutions
                                </h3>
                                <nav className="space-y-2">
                                    {solutions.map((solution) => {
                                        const isActive = solution.id === currentSolutionId
                                        return (
                                            <Link
                                                key={solution.id}
                                                href={solution.href}
                                                className={cn(
                                                    "flex items-center justify-between p-4 rounded-xl transition-all group",
                                                    isActive
                                                        ? "bg-foreground text-background font-bold border-transparent"
                                                        : "bg-foreground/5 border border-border text-foreground/40 hover:text-foreground hover:bg-foreground/10"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <solution.icon className={cn("w-5 h-5", isActive ? "text-background" : "group-hover:text-foreground transition-colors")} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{solution.name}</span>
                                                </div>
                                                <ChevronRight className={cn("w-4 h-4 opacity-0 transition-all", isActive ? "opacity-100" : "group-hover:opacity-100 group-hover:translate-x-1")} />
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>

                            {/* Sidebar CTA - Glassmorphism */}
                            <div className="p-8 rounded-2xl bg-foreground/[0.02] backdrop-blur-xl border border-border">
                                <h4 className="text-xl font-bold mb-4">Need a custom solution?</h4>
                                <p className="text-sm text-foreground/40 mb-6">
                                    Our engineers are ready to build the next generation of your enterprise.
                                </p>
                                <Link href="/contact" className="flex items-center text-sm font-bold group">
                                    Contact Us
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="w-full flex-1">
                        {children}
                        {questions && <section aria-labelledby="service-questions" className="mt-20 border-t border-border pt-12">
                            <h2 id="service-questions" className="font-heading text-3xl font-semibold tracking-tight">Planning your project</h2>
                            <div className="mt-7 divide-y divide-border">
                                {questions.map(({ question, answer }) => <details key={question} className="py-5"><summary className="cursor-pointer py-2 text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{question}</summary><p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{answer}</p></details>)}
                            </div>
                            <div className="mt-6 flex flex-wrap gap-6 text-sm font-semibold"><Link href="/projects" className="underline underline-offset-4">Explore shipped products</Link><Link href="/zeeshan-keerio" className="underline underline-offset-4">Meet the lead engineer</Link><Link href="/contact" className="underline underline-offset-4">Discuss your project</Link></div>
                        </section>}
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}
