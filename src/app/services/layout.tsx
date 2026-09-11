import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Enterprise Services | Mindscape Analytics - AI & SaaS Development",
    description: "High-tier agent developement, voice call agent architecture, UI/UX design, and SaaS developement. We build Ecommerce Development solutions and custom AI systems for the digital elite.",
    keywords: [
        "agent developement", "voice call agent", "UI/UX design", "SaaS developement",
        "Ecommerce Development", "AI Automation", "Enterprise Software", "Custom Software Development"
    ],
    openGraph: {
        title: "Services | Mindscape Analytics",
        description: "Architecting the future of your business with precision-engineered AI and software solutions.",
    }
}

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
