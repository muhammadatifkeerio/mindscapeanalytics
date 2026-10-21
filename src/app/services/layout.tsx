import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "AI, SaaS Development & China Sourcing Services | Mindscape Analytics",
    alternates: { canonical: "/services" },
    description: "Explore AI agents, voice automation, SaaS application development, data engineering, cloud architecture, and China direct factory sourcing. Discuss your project with Mindscape Analytics.",
    openGraph: {
        title: "AI, SaaS Development & China Sourcing Services | Mindscape Analytics",
        description: "AI automation, SaaS application development, data and cloud engineering, and China direct factory sourcing for growing businesses.",
        url: "https://mindscapeanalytics.com/services",
    }
}

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
