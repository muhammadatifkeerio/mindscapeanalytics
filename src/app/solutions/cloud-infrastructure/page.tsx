import { Metadata } from "next";
import CloudInfrastructureClient from "./CloudInfrastructureClient";

export const metadata: Metadata = {
    title: "Data Engineering & Cloud Infrastructure | Mindscape Analytics",
    description: "Build data pipelines, analytics platforms, and reliable cloud infrastructure. Mindscape Analytics designs, deploys, and optimizes systems around your workload and budget.",
    openGraph: {
        title: "Data Engineering & Cloud Infrastructure | Mindscape Analytics",
        description: "Data pipelines, analytics platforms, cloud deployment, and infrastructure optimization around your workload and budget.",
        url: "https://mindscapeanalytics.com/solutions/cloud-infrastructure",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
    },
};

export default function CloudInfrastructurePage() {
    return <CloudInfrastructureClient />;
}
