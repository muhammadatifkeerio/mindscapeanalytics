import { Metadata } from 'next'

export const metadata: Metadata = {
    alternates: { canonical: "/solutions/ai-genai" },
    title: "AI & GenAI Solutions | Mindscape Analytics",
    description: "Custom Large Language Models, Agentic Workflows, and Neural Architectures engineered for enterprise scale.",
    openGraph: {
        title: "AI & GenAI | Mindscape Analytics",
        description: "Architecting context-aware intelligence that transforms how enterprises think, create, and operate.",
        images: ["/images/og-mindscape-2026.png"],
    }
}

export default function AIGenAILayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
