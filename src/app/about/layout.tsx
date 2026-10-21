import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About Mindscape Analytics | AI, Data & Product Engineering",
    description: "Meet the team behind Mindscape Analytics and learn how we combine AI engineering, data systems, software products, and China sourcing.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About Us | Mindscape Analytics",
        description: "Our team builds practical AI, data, software, and sourcing systems for real business operations.",
    }
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
