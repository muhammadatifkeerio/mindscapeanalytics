import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "AI & Software Development Company | Mindscape Analytics",
  description: "AI agents, workflow automation, SaaS and web apps, data platforms, and cloud infrastructure—built by Mindscape Analytics, with China sourcing through production.",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "zh-CN": "/zh-cn", "x-default": "/" },
  },
  openGraph: {
    title: "AI & Software Development Company | Mindscape Analytics",
    description: "Build AI agents, automation workflows, SaaS and web applications, data platforms, and cloud infrastructure, with China sourcing through production.",
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
    title: "AI & Software Development | Mindscape Analytics",
    description: "AI agents, SaaS and web applications, cloud infrastructure, data platforms, and China sourcing through production.",
    images: ["/images/og-mindscape-2026.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
