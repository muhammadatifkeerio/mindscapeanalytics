import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Cloud Infrastructure & DevOps | Mindscape Analytics",
    description: "Modern cloud architectures, container orchestration, and automated CI/CD pipelines defined by security and efficiency.",
    openGraph: {
        title: "Cloud Infrastructure | Mindscape Analytics",
        description: "Building the resilient, scalable foundation for your digital future.",
    }
}

export default function CloudLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
