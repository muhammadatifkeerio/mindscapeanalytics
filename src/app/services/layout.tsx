import type { Metadata } from 'next'
import { SEO_CONFIG } from '@/config/seo'

export const metadata: Metadata = {
    title: "AI, SaaS Development & China Sourcing Services | Mindscape Analytics",
    alternates: { canonical: "/services" },
    description: "Web and SaaS application development, UI/UX design, AI agents, workflows, chatbots, AWS cost optimization and deployment, and China sourcing. Build your next product with Mindscape Analytics.",
    openGraph: {
        title: "AI, SaaS Development & China Sourcing Services | Mindscape Analytics",
        description: "AI automation, SaaS application development, data and cloud engineering, and China direct factory sourcing for growing businesses.",
        url: "https://www.mindscapeanalytics.com/services",
        images: [SEO_CONFIG.defaultSocialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI, SaaS Development & China Sourcing Services | Mindscape Analytics",
        description: "AI automation, SaaS development, cloud engineering, and China direct factory sourcing for growing businesses.",
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
