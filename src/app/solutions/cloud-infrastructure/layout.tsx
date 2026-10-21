import { Metadata } from 'next'

export const metadata: Metadata = {
    alternates: { canonical: "/solutions/cloud-infrastructure" },
    title: "Cloud Infrastructure & DevOps | Mindscape Analytics",
    description: "Modern cloud architectures, container orchestration, and automated CI/CD pipelines defined by security and efficiency.",
    openGraph: {
        title: "Cloud Infrastructure | Mindscape Analytics",
        description: "Building the resilient, scalable foundation for your digital future.",
        images: ["/images/og-mindscape-2026.png"],
    }
}

export default function CloudLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
