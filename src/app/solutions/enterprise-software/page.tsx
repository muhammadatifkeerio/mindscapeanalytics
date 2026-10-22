import { Metadata } from "next";
import EnterpriseSoftwareClient from "./EnterpriseSoftwareClient";

export const metadata: Metadata = {
    title: "Web & SaaS Application Development | Mindscape Analytics",
    description: "End-to-end web application and SaaS development: UI/UX design, AI features, APIs, databases, cloud deployment, and ongoing support. Explore TENVO, farm management, and production software we built.",
    alternates: { canonical: "/solutions/enterprise-software" },
    openGraph: {
        title: "Web & SaaS Application Development | Mindscape Analytics",
        description: "From UI/UX design and application engineering to AI integration, cloud deployment, and product support.",
        url: "https://www.mindscapeanalytics.com/solutions/enterprise-software",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
        images: ["/images/og-mindscape-2026.png"],
    },
};

export default function EnterpriseSoftwarePage() {
    return <EnterpriseSoftwareClient />;
}
