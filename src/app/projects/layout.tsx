import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Portfolio | Mindscape Analytics - Institutional Case Studies",
    description: "Explore our archive of mission-critical AI automation and software projects. From autonomous POS systems to governance engines, witness the scale of our architectural intelligence.",
    openGraph: {
        title: "Project Portfolio | Mindscape Analytics",
        description: "Witness the industrial-grade performance of our AI and software ecosystems.",
    }
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
