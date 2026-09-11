import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Solutions | Mindscape Analytics",
    description: "Enterprise-grade AI, Blockchain, and Cloud solutions architected for the digital elite.",
    openGraph: {
        title: "Solutions | Mindscape Analytics",
        description: "Architecting the future with precision-engineered AI and software solutions.",
    }
}

export default function SolutionsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
