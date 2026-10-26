import type { Metadata } from 'next'
import { SEO_CONFIG } from '@/config/seo'

export const metadata: Metadata = {
    title: "AI, SaaS, Foreign Trade & China Sourcing Services | Mindscape Analytics",
    alternates: { canonical: "/services" },
    description: "AI agents, SaaS development, foreign-trade sales automation, AWS architecture, and China sourcing and inspection services from Mindscape Analytics.",
    openGraph: {
        title: "AI, SaaS, Foreign Trade & China Sourcing Services | Mindscape Analytics",
        description: "AI automation, SaaS development, foreign-trade sales systems, cloud engineering, and China factory sourcing for growing businesses.",
        url: "https://mindscapeanalytics.com/services",
        images: [SEO_CONFIG.defaultSocialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI, SaaS, Foreign Trade & China Sourcing Services | Mindscape Analytics",
        description: "AI automation, SaaS development, foreign-trade sales systems, cloud engineering, and China factory sourcing.",
        images: [SEO_CONFIG.defaultSocialImage],
    },
}

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
