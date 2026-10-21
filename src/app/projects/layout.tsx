import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "AI, Software & Digital Product Projects | Mindscape Analytics",
    description: "Explore TENVO Business OS, Smart Dairy & Cattle Farm Management, DisposIQ, RSIQ Pro, and custom AI applications developed by Mindscape Analytics. See live products and available digital assets.",
    alternates: { canonical: "/projects" },
    openGraph: {
        title: "AI, Software & Digital Product Projects | Mindscape Analytics",
        description: "See working products and software projects built by Mindscape Analytics, with links to live platforms and available digital assets.",
        url: "https://mindscapeanalytics.com/projects",
        images: ["/images/og-mindscape-2026.png"],
    }
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
