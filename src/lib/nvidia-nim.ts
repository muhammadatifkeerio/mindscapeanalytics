/**
 * NVIDIA NIM (Inference Microservices) Utility
 * 
 * Powered by NVIDIA's high-performance inference fleet.
 * Default model: Llama 3.1 70B for mission-critical reasoning.
 */

const NVIDIA_NIM_API_KEY = process.env.NVIDIA_NIM_API_KEY;
const API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export type NimMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

export async function callNvidiaNim({
    messages,
    model = "mistralai/mistral-large-3-675b-instruct-2512",
    temperature = 0.15,
    max_tokens = 2048,
}: {
    messages: NimMessage[];
    model?: string;
    temperature?: number;
    max_tokens?: number;
}) {
    if (!NVIDIA_NIM_API_KEY) {
        throw new Error("NVIDIA_NIM_API_KEY is not configured.");
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NVIDIA_NIM_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
                max_tokens,
                top_p: 1,
                stream: false,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "NVIDIA NIM API Error");
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("[NVIDIA_NIM_ERROR]", error);
        throw error;
    }
}
