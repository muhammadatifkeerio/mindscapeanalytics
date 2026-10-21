import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AI, Data & Software for Real Operations | Mindscape Analytics",
  description: "Mindscape Analytics builds AI agents, business software, farm management systems, and data platforms, and helps bring products from China sourcing to production.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "zh-CN": "/zh-cn" },
  },
  openGraph: {
    title: "AI, Data & Software for Real Operations | Mindscape Analytics",
    description: "Build AI agents, business software, farm management systems, and data platforms with Mindscape Analytics.",
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
