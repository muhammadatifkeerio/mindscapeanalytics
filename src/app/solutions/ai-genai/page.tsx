import { Metadata } from "next";
import AIGenAIClient from "./AIGenAIClient";

export const metadata: Metadata = {
    title: "AI Agent, Workflow & Chatbot Development | Mindscape Analytics",
    description: "Build AI agents, automated workflows, customer support chatbots, RAG systems, and generative AI applications. Mindscape connects your business data, tools, and CRM with production software.",
    openGraph: {
        title: "AI Agent, Workflow & Chatbot Development | Mindscape Analytics",
        description: "Custom AI agents, workflow automation, chatbots, RAG, and generative AI applications built around your business operations.",
        url: "https://www.mindscapeanalytics.com/solutions/ai-genai",
        siteName: "Mindscape Analytics",
        locale: "en_US",
        type: "website",
        images: ["/images/og-mindscape-2026.png"],
    },
};

export default function AIGenAIPage() {
    return <AIGenAIClient />;
}
