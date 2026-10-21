import { Metadata } from 'next'

export const metadata: Metadata = {
    alternates: { canonical: "/solutions/blockchain" },
    title: "Blockchain & Web3 Solutions | Mindscape Analytics",
    description: "Decentralized trust systems, smart contracts, and secure DApps for transparent enterprise operations.",
    openGraph: {
        title: "Blockchain Solutions | Mindscape Analytics",
        description: "Architecting trust and transparency with enterprise-grade decentralized systems.",
        images: ["/images/og-mindscape-2026.png"],
    }
}

export default function BlockchainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
