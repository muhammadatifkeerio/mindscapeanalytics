import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Enterprise Software Development | Mindscape Analytics",
    description: "Scalable, secure, and mission-critical software architectures built for high-growth organizations.",
    openGraph: {
        title: "Enterprise Software | Mindscape Analytics",
        description: "Engineering the digital backbone of your enterprise with precision and scale.",
    }
}

export default function EnterpriseSoftwareLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
