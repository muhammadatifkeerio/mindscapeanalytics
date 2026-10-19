import { NextResponse } from "next/server";
import { z } from "zod";
import { withBaseHandler } from "@/lib/base-handler";
import { BadRequestError } from "@/lib/api-error";
import { chatRequestSchema } from "@/lib/types";

/**
 * SOURCE OF TRUTH KEYWORDS: POST /api/chat, Gemini, chatRequestSchema, withBaseHandler
 * WHAT: Server-side Gemini chat completion for Zee.
 * WHY: Keep provider credentials private, avoid forwarding chat data to fallback providers, and cap usage.
 * WHERE: ChatWidget.
 */

const SYSTEM_PROMPT = `You are Zee, the helpful website assistant for Mindscape Analytics LLC. Be warm, concise, accurate, and practical. Help visitors understand the company, its services, and its four public products. Never invent prices, client outcomes, availability, capabilities, or guarantees. When information is not provided, say so and offer to connect the visitor with the team using the human contact option.

Mindscape Analytics works across AI agents and workflow automation, data and cloud engineering, custom digital products, business intelligence, and factory-direct product sourcing from China through production. It supports businesses with strategy, architecture, implementation, and ongoing improvement.

Current portfolio:
- Smart Dairy and Cattle Farm Management: https://cattle.mindscapeanalytics.com/
- RSIQ Pro, AI-powered market intelligence: https://rsiq.mindscapeanalytics.com/
- Tenvo, an intelligent business platform: https://www.tenvo.store/
- DisposiQ, production and disposal operations intelligence: https://disposiq.tenvo.store/

For a human conversation, direct visitors to the in-chat contact option or https://mindscapeanalytics.com/contact. Do not claim to have checked live product status or to be a human. Prefer short paragraphs and clear bullets when useful.`;

const geminiResponseSchema = z.object({
    candidates: z.array(z.object({
        content: z.object({
            parts: z.array(z.object({ text: z.string().optional() })).optional(),
        }).optional(),
    })).optional(),
});

export const POST = withBaseHandler(async (req) => {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        throw new BadRequestError("Invalid JSON in request body");
    }

    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
        throw new BadRequestError("Invalid chat payload", parsed.error.format());
    }

    const apiKey = process.env["X-goog-api-key"]?.trim() || process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
    if (!apiKey) {
        return NextResponse.json({ error: { message: "The assistant is temporarily unavailable. Please use the contact option." } }, { status: 503 });
    }

    const model = process.env.GEMINI_CHAT_MODEL?.trim() || "gemini-flash-latest";
    let response: Response;
    try {
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: parsed.data.messages.slice(-12).map((message) => ({
                    role: message.role === "assistant" ? "model" : "user",
                    parts: [{ text: message.content }],
                })),
                generationConfig: { maxOutputTokens: 700, temperature: 0.35 },
            }),
            signal: AbortSignal.timeout(25_000),
        });
    } catch {
        return NextResponse.json({ error: { message: "The assistant could not connect just now. Please try again or contact our team." } }, { status: 503 });
    }

    if (!response.ok) {
        console.error("[GEMINI_CHAT_ERROR]", response.status);
        return NextResponse.json({ error: { message: "The assistant is temporarily unavailable. Please try again or contact our team." } }, { status: 503 });
    }

    const payload: unknown = await response.json();
    const result = geminiResponseSchema.safeParse(payload);
    const content = result.success ? result.data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim() : "";
    if (!content) {
        return NextResponse.json({ error: { message: "The assistant did not return a response. Please try again or contact our team." } }, { status: 502 });
    }

    return NextResponse.json({ content });
}, { maxRequests: 12, windowMs: 60_000 });
