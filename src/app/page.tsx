import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AI, Data & Software for Real Operations | Mindscape Analytics",
  description: "Mindscape Analytics designs autonomous AI agents, decision-grade data systems, and custom digital products—and helps companies source from China and scale production.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "zh-CN": "/zh-cn", "x-default": "/" },
  },
  openGraph: {
    title: "AI, Data & Software for Real Operations | Mindscape Analytics",
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
    title: "AI, Data & Software for Real Operations | Mindscape Analytics",
    description: "AI agents, business software, farm management systems, and data platforms for real operating needs.",
    images: ["/images/og-mindscape-2026.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
