import type { Metadata } from "next";
import { SEO_CONFIG } from "@/config/seo";

export const metadata: Metadata = {
    title: "AI Software, Automations & Digital Products | Mindscape Shop",
    description: "Browse production-ready AI tools, SaaS applications, automation workflows, data products, and reusable software assets from Mindscape Analytics and approved sellers.",
    alternates: { canonical: "/shop" },
    openGraph: {
        title: "AI Software, Automations & Digital Products | Mindscape Shop",
        description: "Browse reusable AI tools, SaaS applications, workflows, data products, and production-ready software assets.",
        url: "https://www.mindscapeanalytics.com/shop",
        images: [SEO_CONFIG.defaultSocialImage],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Software, Automations & Digital Products | Mindscape Shop",
        description: "Browse reusable AI tools, SaaS applications, workflows, data products, and production-ready software assets.",
        images: [SEO_CONFIG.defaultSocialImage],
    },
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
