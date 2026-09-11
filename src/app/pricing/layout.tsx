import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Pricing & Investment | Mindscape Analytics - AI Ecosystems",
    description: "Precision-engineered pricing models for AI Starter Systems, Growth Automation, and Enterprise Ecosystems. Transparent investment protocols for high-fidelity technical outcomes.",
    openGraph: {
        title: "Pricing | Mindscape Analytics",
        description: "Scale your infrastructure with clear, performance-driven investment models.",
    }
}

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
