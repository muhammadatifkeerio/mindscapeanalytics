import { Metadata } from "next";
import EnterpriseSoftwareClient from "./EnterpriseSoftwareClient";

export const metadata: Metadata = {
    title: "SaaS Application Development & Custom Software | Mindscape Analytics",
    description: "Build custom SaaS applications, business portals, ERP and inventory systems with Mindscape Analytics. From product design and secure integrations to cloud deployment and ongoing support.",
    alternates: { canonical: "/solutions/enterprise-software" },
    openGraph: {
        title: "SaaS Application Development & Custom Software | Mindscape Analytics",
        description: "Turn your business workflow into a custom SaaS application, with product design, software engineering, cloud deployment, and ongoing support.",
        url: "https://mindscapeanalytics.com/solutions/enterprise-software",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
    },
};

export default function EnterpriseSoftwarePage() {
    return <EnterpriseSoftwareClient />;
}
