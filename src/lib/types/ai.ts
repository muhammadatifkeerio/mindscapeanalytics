/** SOURCE OF TRUTH KEYWORDS: AIProvider, AIMessage, AIRequest, AIResponse, chatbot providers, model orchestration
 * WHAT: Shared contracts for provider-neutral AI text generation.
 * WHY: Chat, voice, and roadmap generation must use one typed provider boundary.
 * WHERE: ai-orchestrator and server-side AI routes/actions.
 */
export type AIProvider = "OPENAI" | "GOOGLE" | "NVIDIA" | "OPENROUTER";
export type AIMessage = { role: "system" | "user" | "assistant"; content: string };
export type AIRequest = { prompt?: string; messages?: AIMessage[]; systemPrompt?: string; provider?: AIProvider; model?: string; temperature?: number; maxOutputTokens?: number };
export type AIResponse = { content: string; provider: AIProvider; model: string };
