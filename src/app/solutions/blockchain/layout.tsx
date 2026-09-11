import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Blockchain & Web3 Solutions | Mindscape Analytics",
    description: "Decentralized trust systems, smart contracts, and secure DApps for transparent enterprise operations.",
    openGraph: {
        title: "Blockchain Solutions | Mindscape Analytics",
        description: "Architecting trust and transparency with enterprise-grade decentralized systems.",
    }
}

export default function BlockchainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
