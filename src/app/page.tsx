import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AI, Data & Business Software for Commerce | Mindscape Analytics",
  description: "Business software, analytics, and AI workflows for e-commerce teams, manufacturers, and exporters. Connect sales, inventory, production, and sourcing operations.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "zh-CN": "/zh-cn", "x-default": "/" },
  },
  openGraph: {
    title: "AI, Data & Business Software for Commerce | Mindscape Analytics",
    description: "Explore business software, analytics, and AI workflows for e-commerce teams, manufacturers, and exporters.",
    url: "https://mindscapeanalytics.com",
    siteName: "Mindscape Analytics",
    images: [
      {
        url: "/images/og-mindscape-2026.png",
        width: 1200,
        height: 630,
        alt: "Mindscape Analytics builds AI agents, software products, cloud systems, and China sourcing programs.",
      },
    ],
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI, Data & Business Software for Commerce | Mindscape Analytics",
    description: "Business software and AI workflows for commerce, manufacturing, and export teams.",
    images: ["/images/og-mindscape-2026.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
