import { Metadata } from "next";
import AIGenAIClient from "./AIGenAIClient";

export const metadata: Metadata = {
    title: "AI & Generative AI Solutions | Mindscape Analytics",
    description: "Architecting context-aware intelligence, agentic workflows, and custom LLM tuning that transforms how enterprises think, create, and operate.",
    openGraph: {
        title: "AI & Generative AI Solutions | Mindscape Analytics",
        description: "Architecting context-aware intelligence, agentic workflows, and custom LLM tuning that transforms how enterprises think, create, and operate.",
        url: "https://mindscapeanalytics.com/solutions/ai-genai",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
    },
};

export default function AIGenAIPage() {
    return <AIGenAIClient />;
}
