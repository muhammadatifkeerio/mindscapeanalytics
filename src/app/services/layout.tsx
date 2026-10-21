import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "AI Automation, Data & Software Services | Mindscape Analytics",
    alternates: { canonical: "/services" },
    description: "Explore AI agent and voice automation, lead-generation systems, data engineering, cloud architecture, and custom SaaS built around real business workflows.",
    openGraph: {
        title: "AI Automation, Data & Software Services | Mindscape Analytics",
        description: "Practical AI automation, lead-generation systems, data engineering, cloud architecture, and custom software for business operations.",
    }
}

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
