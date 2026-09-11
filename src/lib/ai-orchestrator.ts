/**
 * Mindscape AI Orchestrator // 2026 Edition
 * 
 * Unified interface for NVIDIA NIM, Google Gemini, and OpenRouter.
 * Optimized for high-fidelity reasoning and cost-efficiency.
 */

export type AIProvider = "NVIDIA" | "GOOGLE" | "OPENROUTER";

export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}

export interface AIResponse {
    content: string;
    provider: AIProvider;
    model: string;
}

export async function callAI({
    prompt,
    messages = [],
    systemPrompt = "You are the Strategic AI Architect for Mindscape Analytics. Provide industrial-grade, concise, and actionable intelligence.",
    provider = "GOOGLE",
    model,
    temperature = 0.2,
}: {
    prompt?: string;
    messages?: Message[];
    systemPrompt?: string;
    provider?: AIProvider;
    model?: string;
    temperature?: number;
}): Promise<AIResponse> {
    
    // Construct messages array for chat-based APIs
    const conversationHistory: Message[] = messages.length > 0 
        ? [{ role: "system", content: systemPrompt }, ...messages]
        : [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt || "" }
        ];

    // 1. GOOGLE GEMINI (Primary Priority for Chatbot)
    if (provider === "GOOGLE") {
        const apiKey = process.env.GOOGLE_AI_STUDIO_API;
        const targetModel = model || "gemini-3-flash"; // May 2026 low-cost Gemini model
        
        try {
            // Google API uses a different format for history
            const contents = conversationHistory
                .filter(m => m.role !== "system")
                .map(m => ({
                    role: m.role === "user" ? "user" : "model",
                    parts: [{ text: m.content }]
                }));

            const systemInstruction = conversationHistory.find(m => m.role === "system")?.content;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system_instruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
                    contents,
                    generationConfig: { temperature }
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    content: data.candidates[0].content.parts[0].text,
                    provider: "GOOGLE",
                    model: targetModel
                };
            } else {
                console.error("[AI] Google Gemini API error:", await response.text());
            }
        } catch (e) {
            console.error("Google Gemini Fallback triggered", e);
        }
    }

    // 2. NVIDIA NIM (Primary for Logic/Reasoning or Fallback 1)
    if (provider === "NVIDIA" || provider === "GOOGLE") {
        const apiKey = process.env.NVIDIA_NIM_API_KEY;
        const targetModel = (provider === "NVIDIA" ? model : undefined) || "mistralai/mistral-large-3-675b-instruct-2512";
        
        try {
            const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: targetModel,
                    messages: conversationHistory,
                    temperature,
                    max_tokens: 2048,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    content: data.choices[0].message.content,
                    provider: "NVIDIA",
                    model: targetModel
                };
            } else {
                console.error("[AI] NVIDIA NIM API error:", await response.text());
            }
        } catch (e) {
            console.error("NVIDIA NIM Fallback triggered", e);
        }
    }

    // 3. OPENROUTER (High-Speed Global Router / Absolute Fallback)
    const orApiKey = process.env.OPENROUTER_API_KEY;
    const orModel = (provider === "OPENROUTER" ? model : undefined) || "meta-llama/llama-3.1-405b-instruct";
    
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${orApiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://mindscapeanalytics.com",
                "X-Title": "Mindscape Analytics",
            },
            body: JSON.stringify({
                model: orModel,
                messages: conversationHistory,
                temperature,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return {
                content: data.choices[0].message.content,
                provider: "OPENROUTER",
                model: orModel
            };
        } else {
            console.error("[AI] OpenRouter API error:", await response.text());
        }
    } catch (e) {
        console.error("OpenRouter Fallback triggered", e);
    }

    // Final failsafe if all APIs fail
    return {
        content: "I'm currently experiencing high network latency and cannot connect to my intelligence nodes. Please reach out via the contact form or email us directly.",
        provider: "OPENROUTER",
        model: "failsafe"
    };
}

