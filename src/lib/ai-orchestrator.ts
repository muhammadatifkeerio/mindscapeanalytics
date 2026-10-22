import "server-only";

import { z } from "zod";
import type { AIMessage, AIProvider, AIRequest, AIResponse } from "@/lib/types";

const openAIResponseSchema = z.object({ output: z.array(z.object({ content: z.array(z.object({ text: z.string().optional() })).optional() })).optional() });
const geminiResponseSchema = z.object({ candidates: z.array(z.object({ content: z.object({ parts: z.array(z.object({ text: z.string().optional() })).optional() }).optional() })).optional() });
const chatCompletionSchema = z.object({ choices: z.array(z.object({ message: z.object({ content: z.string() }) })).min(1) });

/** SOURCE OF TRUTH KEYWORDS: extractOpenAIText, Responses API, output items, Zod validation, chatbot reply, safe parsing
 * WHAT: Extracts assistant text from a validated OpenAI Responses API payload.
 * WHY: REST responses store generated text in typed output content items.
 * WHERE: OpenAI branch in callAI.
 */
function extractOpenAIText(payload: object): string {
    const parsed = openAIResponseSchema.safeParse(payload);
    return parsed.success ? parsed.data.output?.flatMap((item) => item.content ?? []).map((item) => item.text ?? "").join("").trim() ?? "" : "";
}

/** SOURCE OF TRUTH KEYWORDS: callAI, Gemini default, OpenAI fallback, low-cost model, provider failover, server-only
 * WHAT: Generates text through configured providers with ordered credential-aware failover.
 * WHY: Chat, voice, and roadmap features need one reliable model path.
 * WHERE: /api/chat, /api/voice, and roadmap actions.
 */
export async function callAI(request: AIRequest): Promise<AIResponse> {
    const systemPrompt = request.systemPrompt ?? "You are the Mindscape Analytics assistant. Be concise, accurate, and helpful.";
    const messages: AIMessage[] = request.messages?.length ? request.messages : [{ role: "user", content: request.prompt ?? "" }];
    const allProviders = ["GOOGLE", "OPENAI", "NVIDIA", "OPENROUTER"] as const;
    const providers: AIProvider[] = request.provider ? [request.provider, ...allProviders.filter((provider) => provider !== request.provider)] : [...allProviders];

    for (const provider of providers) {
        try {
            if (provider === "OPENAI") {
                const apiKey = process.env.OPENAI_API_KEY?.trim();
                if (!apiKey) continue;
                const model = request.provider === provider && request.model ? request.model : process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-6-luna";
                const response = await fetch("https://api.openai.com/v1/responses", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ model, instructions: systemPrompt, input: messages.filter((message) => message.role !== "system"), reasoning: { effort: "none" }, max_output_tokens: request.maxOutputTokens ?? 700 }),
                    signal: AbortSignal.timeout(25_000),
                });
                if (!response.ok) { console.error("[AI_OPENAI_ERROR]", response.status); continue; }
                const payload: object = await response.json();
                const content = extractOpenAIText(payload);
                if (content) return { content, provider, model };
            }

            if (provider === "GOOGLE") {
                const apiKey = process.env.GOOGLE_AI_STUDIO_API?.trim() || process.env.X_goog_api_key?.trim() || process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
                if (!apiKey) continue;
                const model = request.provider === provider && request.model ? request.model : process.env.GEMINI_CHAT_MODEL?.trim() || "gemini-3.5-flash-lite";
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
                    body: JSON.stringify({
                        systemInstruction: { parts: [{ text: systemPrompt }] },
                        contents: messages.filter((message) => message.role !== "system").map((message) => ({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: message.content }] })),
                        generationConfig: { maxOutputTokens: request.maxOutputTokens ?? 700, temperature: request.temperature ?? 0.35 },
                    }),
                    signal: AbortSignal.timeout(25_000),
                });
                if (!response.ok) { console.error("[AI_GOOGLE_ERROR]", response.status); continue; }
                const payload: object = await response.json();
                const parsed = geminiResponseSchema.safeParse(payload);
                const content = parsed.success ? parsed.data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() : "";
                if (content) return { content, provider, model };
            }

            if (provider === "NVIDIA" || provider === "OPENROUTER") {
                const apiKey = provider === "NVIDIA" ? process.env.NVIDIA_NIM_API_KEY?.trim() : process.env.OPENROUTER_API_KEY?.trim();
                if (!apiKey) continue;
                const model = request.provider === provider && request.model ? request.model : provider === "NVIDIA" ? "mistralai/mistral-large-3-675b-instruct-2512" : "meta-llama/llama-3.3-70b-instruct";
                const endpoint = provider === "NVIDIA" ? "https://integrate.api.nvidia.com/v1/chat/completions" : "https://openrouter.ai/api/v1/chat/completions";
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", ...(provider === "OPENROUTER" ? { "HTTP-Referer": "https://www.mindscapeanalytics.com", "X-Title": "Mindscape Analytics" } : {}) },
                    body: JSON.stringify({ model, messages: [{ role: "system", content: systemPrompt }, ...messages], temperature: request.temperature ?? 0.35, max_tokens: request.maxOutputTokens ?? 700 }),
                    signal: AbortSignal.timeout(25_000),
                });
                if (!response.ok) { console.error(`[AI_${provider}_ERROR]`, response.status); continue; }
                const payload: object = await response.json();
                const parsed = chatCompletionSchema.safeParse(payload);
                if (parsed.success) return { content: parsed.data.choices[0].message.content.trim(), provider, model };
            }
        } catch (error) {
            console.error(`[AI_${provider}_FAILURE]`, error instanceof Error ? error.message : "Provider request failed");
        }
    }
    throw new Error("No configured AI provider returned a valid response.");
}
