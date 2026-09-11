import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Elite Assets | Mindscape Analytics Marketplace",
    description: "Premium marketplace to Sell Digital Products, Sell pre built softwares, Sell n8n workfllows, and buy automations. Buy web components, buy workflows, and buy automations engineered for scale.",
    keywords: [
        "Sell Digital Products", "Sell pre built softwares", "Sell n8n workfllows",
        "marketplace", "software selling platforms", "buy web", "buy componenets",
        "buy wrokflows", "buy automations", "digital assets"
    ],
    openGraph: {
        title: "MSA Asset Terminal | Engineering for the Elite",
        description: "Premium architectural assets for modern enterprise scale.",
        url: "https://mindscapeanalytics.com/shop",
    },
};

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
