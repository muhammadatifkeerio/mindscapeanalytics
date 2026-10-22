import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Mindscape Analytics | TENVO Business Intelligence & AI Products",
  description: "Mindscape Analytics builds TENVO Business OS, Smart Dairy & Cattle Farm Management, RSIQ Pro, DisposIQ, AI agents, SaaS platforms, and China sourcing systems.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "zh-CN": "/zh-cn", "x-default": "/" },
  },
  openGraph: {
    title: "Mindscape Analytics | TENVO Business Intelligence & AI Products",
    description: "Explore TENVO Business OS, Smart Dairy & Cattle Farm Management, RSIQ Pro, DisposIQ, and custom AI and software systems from Mindscape Analytics.",
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
    title: "Mindscape Analytics | TENVO Business Intelligence & AI Products",
    description: "TENVO Business OS, Smart Dairy, RSIQ Pro, DisposIQ, AI agents, SaaS platforms, and China sourcing systems.",
    images: ["/images/og-mindscape-2026.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
