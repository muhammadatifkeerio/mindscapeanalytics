import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Solutions | Mindscape Analytics",
    alternates: { canonical: "/solutions" },
    description: "Plan and build AI agents, data platforms, cloud infrastructure, and enterprise software around your workflows, integration needs, and operating goals.",
    openGraph: {
        title: "Solutions | Mindscape Analytics",
        description: "Explore AI, data, cloud, and enterprise software solutions designed around practical business operations.",
        images: ["/images/og-mindscape-2026.png"],
    }
}

export default function SolutionsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
