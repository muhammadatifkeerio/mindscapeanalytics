import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "AI, SaaS Development & China Sourcing Services | Mindscape Analytics",
    alternates: { canonical: "/services" },
    description: "Web and SaaS application development, UI/UX design, AI agents, workflows, chatbots, AWS cost optimization and deployment, and China sourcing. Build your next product with Mindscape Analytics.",
    openGraph: {
        title: "AI, SaaS Development & China Sourcing Services | Mindscape Analytics",
        description: "AI automation, SaaS application development, data and cloud engineering, and China direct factory sourcing for growing businesses.",
        url: "https://mindscapeanalytics.com/services",
        images: ["/images/og-mindscape-2026.png"],
    }
}

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
