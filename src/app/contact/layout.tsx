import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact Mindscape Analytics | AI Consulting & Development",
    description: "Ready to transform your business? Schedule a consultation with our AI architects today.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact Us | Mindscape Analytics",
        description: "Start your journey towards enterprise intelligence.",
    }
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
