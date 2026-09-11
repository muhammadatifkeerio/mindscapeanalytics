import { Metadata } from "next";
import EnterpriseSoftwareClient from "./EnterpriseSoftwareClient";

export const metadata: Metadata = {
    title: "Enterprise Software Architectures | Mindscape Analytics",
    description: "Building the digital backbone of modern organizations with scalable, resilient, and secure application architectures that power global operations.",
    openGraph: {
        title: "Enterprise Software Architectures | Mindscape Analytics",
        description: "Building the digital backbone of modern organizations with scalable, resilient, and secure application architectures that power global operations.",
        url: "https://mindscapeanalytics.com/solutions/enterprise-software",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
    },
};

export default function EnterpriseSoftwarePage() {
    return <EnterpriseSoftwareClient />;
}
