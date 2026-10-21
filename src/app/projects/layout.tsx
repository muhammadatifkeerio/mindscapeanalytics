import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "AI, Software & Digital Product Projects | Mindscape Analytics",
    description: "Explore shipped Mindscape products across farm operations, business software, market intelligence, production workflows, and ready-to-acquire digital assets.",
    alternates: { canonical: "/projects" },
    openGraph: {
        title: "AI, Software & Digital Product Projects | Mindscape Analytics",
        description: "See working products and software projects built by Mindscape Analytics, with links to live platforms and available digital assets.",
    }
}

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
