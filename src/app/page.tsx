import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AI, SaaS Development & China Sourcing | Mindscape Analytics",
  description: "Build AI agents, custom SaaS applications, and data systems with Mindscape Analytics. Software design, cloud deployment, and China direct factory sourcing for growing businesses.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "zh-CN": "/zh-cn", "x-default": "/" },
  },
  openGraph: {
    title: "AI, SaaS Development & China Sourcing | Mindscape Analytics",
    description: "Build autonomous AI agents, decision-grade data systems, and custom digital products, with China sourcing through production.",
    url: "https://mindscapeanalytics.com",
    siteName: "Mindscape Analytics",
    images: [
      {
        url: "/images/og-mindscape-2026.png",
        alt: "Mindscape Analytics: turning data into smart decisions with AI, analytics, automation, and custom software.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI, SaaS Development & China Sourcing | Mindscape Analytics",
    description: "AI agents, business software, farm management systems, and data platforms for real operating needs.",
    images: ["/images/og-mindscape-2026.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
