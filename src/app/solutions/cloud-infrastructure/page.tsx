import { Metadata } from "next";
import CloudInfrastructureClient from "./CloudInfrastructureClient";

export const metadata: Metadata = {
    title: "AWS Cost Optimization, Architecture & Deployment | Mindscape Analytics",
    description: "Plan and deploy AWS infrastructure for web and AI applications. Mindscape helps with cloud cost optimization, workload sizing, data pipelines, CI/CD, monitoring, and production support.",
    openGraph: {
        title: "AWS Cost Optimization, Architecture & Deployment | Mindscape Analytics",
        description: "Cost-aware AWS architecture, application deployment, data engineering, CI/CD, monitoring, and infrastructure optimization.",
        url: "https://www.mindscapeanalytics.com/solutions/cloud-infrastructure",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
        images: ["/images/og-mindscape-2026.png"],
    },
};

export default function CloudInfrastructurePage() {
    return <CloudInfrastructureClient />;
}
