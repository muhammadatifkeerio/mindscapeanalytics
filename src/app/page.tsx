import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Business Intelligence & AI Systems | Mindscape Analytics",
  description: "Multilingual business software, AI workflows, analytics, and China sourcing support connecting commerce, finance, inventory, and production operations.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "zh-CN": "/zh-cn", "x-default": "/" },
  },
  openGraph: {
    title: "Business Intelligence & AI Systems | Mindscape Analytics",
    description: "Explore multilingual business software, AI workflows, analytics, and operations systems from Mindscape Analytics.",
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
    title: "Business Intelligence & AI Systems | Mindscape Analytics",
    description: "Multilingual business software, AI workflows, analytics, and China sourcing support.",
    images: ["/images/og-mindscape-2026.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
