import type { Metadata } from 'next'
import { SEO_CONFIG } from '@/config/seo'

export const metadata: Metadata = {
    title: "AI, Software & Digital Product Projects | Mindscape Analytics",
    description: "Explore TENVO Business OS, Smart Dairy & Cattle Farm Management, DisposIQ, RSIQ Pro, and custom AI applications developed by Mindscape Analytics. See live products and available digital assets.",
    alternates: { canonical: "/projects" },
    openGraph: {
        title: "AI, Software & Digital Product Projects | Mindscape Analytics",
        description: "See working products and software projects built by Mindscape Analytics, with links to live platforms and available digital assets.",
        url: "https://www.mindscapeanalytics.com/projects",
        images: [SEO_CONFIG.defaultSocialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI, Software & Digital Product Projects | Mindscape Analytics",
        description: "Explore TENVO, Smart Dairy, DisposIQ, RSIQ Pro, custom AI systems, and reusable digital products.",
        images: [SEO_CONFIG.defaultSocialImage],
    },
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
