import { Metadata } from "next";
import CloudInfrastructureClient from "./CloudInfrastructureClient";

export const metadata: Metadata = {
    title: "Cloud Infrastructure Solutions | Mindscape Analytics",
    description: "High-performance, scalable cloud foundations defined by sub-10ms global latency and infinite horizontal growth capability.",
    openGraph: {
        title: "Cloud Infrastructure Solutions | Mindscape Analytics",
        description: "High-performance, scalable cloud foundations defined by sub-10ms global latency and infinite horizontal growth capability.",
        url: "https://mindscapeanalytics.com/solutions/cloud-infrastructure",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
    },
};

export default function CloudInfrastructurePage() {
    return <CloudInfrastructureClient />;
}
