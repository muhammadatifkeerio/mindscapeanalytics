import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "About Mindscape Analytics | Vision & Team",
    description: "Meet the innovators, engineers, and strategists democratizing AI for the enterprise.",
    openGraph: {
        title: "About Us | Mindscape Analytics",
        description: "Building the future of enterprise intelligence with transparency and precision.",
    }
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
