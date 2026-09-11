import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Mindscape Analytics | Elite Agentic Workflows & Enterprise AI Architecture",
  description: "The world's premier provider of Agentic AI and Autonomous Workflows. Powered by MSA AGENT CORE and Mistral Large 3. We architect self-evolving digital workforces for global enterprises.",
  openGraph: {
    title: "Mindscape Analytics | First Agentic AI, Gen AI & Automation Solutions",
    description: "The world's first Agentic AI and Gen AI solutions company. We architect high-performance automation, enterprise SaaS, and mission-critical web applications. Lead by Zeeshan Keerio.",
    url: "https://mindscapeanalytics.com",
    siteName: "Mindscape Analytics",
    images: [
      {
        url: "https://mindscapeanalytics.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mindscape Analytics Deep Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindscape Analytics | Enterprise AI, Asset Marketplace & Elite Talent Hub",
    description: "Mission-critical AI software architecture, premium digital asset marketplace, and high-performance engineering talent for global organizations.",
    images: ["/og-bg.webp"],
  },
};

export default function Home() {
  return <HomeClient />;
}
