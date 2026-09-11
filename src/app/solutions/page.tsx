import { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
    title: "Solution Architectures | Mindscape Analytics",
    description: "Explore our intelligent AI ecosystems, industrial cloud foundations, and enterprise core systems built for scale and absolute reliability.",
    openGraph: {
        title: "Solution Architectures | Mindscape Analytics",
        description: "Explore our intelligent AI ecosystems, industrial cloud foundations, and enterprise core systems built for scale and absolute reliability.",
        url: "https://mindscapeanalytics.com/solutions",
        siteName: "Mindscape Analytics",
        images: [
            {
                url: "/og-bg.webp",
                width: 1200,
                height: 630,
                alt: "Mindscape Analytics Solutions",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function SolutionsPage() {
    return <SolutionsClient />;
}
