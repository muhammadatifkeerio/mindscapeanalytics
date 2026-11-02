import type { Metadata } from 'next'
import { SEO_CONFIG } from '@/config/seo'

export const metadata: Metadata = {
    title: "AI, E-Commerce & Software Services | Mindscape Analytics",
    alternates: { canonical: "/services" },
    description: "Business intelligence, e-commerce reporting, AI workflows, SaaS engineering, foreign-trade systems, and China supplier sourcing from Mindscape Analytics.",
    openGraph: {
        title: "AI, E-Commerce & Software Services | Mindscape Analytics",
        description: "Business intelligence, e-commerce reporting, AI workflows, software engineering, foreign-trade systems, and China sourcing.",
        url: "https://mindscapeanalytics.com/services",
        images: [SEO_CONFIG.defaultSocialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI, E-Commerce & Software Services | Mindscape Analytics",
        description: "Business intelligence, e-commerce reporting, AI workflows, software engineering, foreign-trade systems, and China sourcing.",
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
