import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Mindscape Analytics | AI, Data, Products & Production",
  description: "Autonomous AI agents, decision-grade data systems, digital products, and factory-direct sourcing from China to production.",
  openGraph: {
    title: "Mindscape Analytics | AI, Data, Products & Production",
    description: "Build intelligent systems and take products from idea to production with Mindscape Analytics.",
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
    title: "Mindscape Analytics | AI, Data, Products & Production",
    description: "Build the intelligent system your next stage needs.",
    images: ["/images/og-image.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
