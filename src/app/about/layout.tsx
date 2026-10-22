import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About Mindscape Analytics | AI & Software Engineering",
    description: "Meet the people building AI agents, data systems, software products, cloud infrastructure, and China sourcing programs at Mindscape Analytics.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About Us | Mindscape Analytics",
        description: "Our team builds practical AI, data, software, and sourcing systems for real business operations.",
        url: "https://www.mindscapeanalytics.com/about",
        siteName: "Mindscape Analytics",
        images: [{ url: "/images/og-mindscape-2026.png", width: 1200, height: 630, alt: "Mindscape Analytics builds AI agents, software products, cloud systems, and China sourcing programs." }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Mindscape Analytics | AI & Software Engineering",
        description: "Meet the team building AI agents, data systems, software products, cloud infrastructure, and China sourcing programs.",
        images: ["/images/og-mindscape-2026.png"],
    },
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
