import { NextResponse } from "next/server";
import { withBaseHandler } from "@/lib/base-handler";
import { BadRequestError } from "@/lib/api-error";
import { callAI } from "@/lib/ai-orchestrator";
import { voiceRequestSchema } from "@/lib/types";

/**
 * SOURCE OF TRUTH KEYWORDS: POST /api/voice, voiceRequestSchema, callAI, withBaseHandler
 * WHAT: Voice-concierge completion with short spoken replies.
 * WHY: Validate transcript; keep the expensive path on the public rate spine.
 * WHERE: VoiceAgentDemo, ChatWidget mic.
 */

const SYSTEM_PROMPT = `You are "Zee", the Mindscape Voice Architect, a highly intelligent, friendly AI concierge for Mindscape Analytics LLC.

[YOUR IDENTITY]:
- Your name is "Zee" (named after your creator, Zeeshan).
- You represent Mindscape Analytics: AI Automation, Voice Agents, SaaS Engineering, and Enterprise AI.
- Warm, charismatic, lightly witty.

[CONVERSATION RULES - CRITICAL FOR VOICE]:
- Respond in 1-3 SHORT sentences (max 40 words).
- Never use brackets, asterisks, markdown, or special formatting.
- Start your first response with a warm greeting mentioning Mindscape Analytics.
- After a couple of exchanges, ask for their email or offer to schedule a call.

[LEAD QUALIFICATION]:
- Identify industry, pain point, and budget through natural conversation.
- Offer a free AI audit or strategy call.`;

export const POST = withBaseHandler(async (req) => {
    const body: unknown = await req.json();
    const parsed = voiceRequestSchema.safeParse(body);
    if (!parsed.success) {
        throw new BadRequestError(parsed.error.issues[0]?.message ?? "Invalid voice payload");
    }

    try {
        const result = await callAI({
            systemPrompt: SYSTEM_PROMPT,
            messages: [
                ...parsed.data.history,
                { role: "user", content: parsed.data.transcript },
            ],
            provider: "GOOGLE",
            model: "gemini-3.1-flash-lite",
            temperature: 0.6,
        });

        const isLeadCapture = /email|schedule|call|contact|book|appointment|reach out/i.test(result.content);
        return NextResponse.json({
            response: result.content,
            provider: result.provider,
            isLeadCapture,
        });
    } catch (error) {
        console.error("[VOICE_AI_ERROR]", error instanceof Error ? error.message : error);
        return NextResponse.json({
            response:
                "Oops, it looks like my AI brain just hit a tiny speed bump! Could you share your email so we can connect?",
            provider: "FALLBACK",
            isLeadCapture: true,
        });
    }
}, { maxRequests: 20, windowMs: 60_000 });
