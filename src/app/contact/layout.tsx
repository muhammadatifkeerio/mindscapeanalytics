import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact Mindscape Analytics | AI Consulting & Development",
    description: "Contact Mindscape Analytics about AI agents, lead generation, data systems, custom software, or China sourcing and production.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact Us | Mindscape Analytics",
        description: "Tell us about your workflow, product, or data challenge and discuss practical next steps with our team.",
    }
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
