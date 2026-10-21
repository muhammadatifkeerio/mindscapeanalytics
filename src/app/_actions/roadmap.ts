"use server";

/**
 * SOURCE OF TRUTH KEYWORDS: generateAutomationRoadmap, roadmapSchema, callAI
 * WHAT: Public marketing helper that drafts an automation roadmap from a description or URL.
 * WHY: Zod-validate before calling the orchestrator; no DB side effects so the block is not required.
 * WHERE: GrowthHub / marketing surfaces.
 */

import { callAI } from "@/lib/ai-orchestrator";
import { roadmapSchema } from "@/lib/types";

export async function generateAutomationRoadmap(description: string) {
    const parsed = roadmapSchema.safeParse({ description });
    if (!parsed.success) {
        return { success: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    const isUrl = parsed.data.description.match(/https?:\/\/[^\s]+/);
    const systemPrompt = `
You are the "Mindscape Strategic Architect" (MSA-01).
You are powered by industrial-grade LLM infrastructure.

[TASK]:
${isUrl ? "The supplied URL has not been fetched or inspected. Treat it only as context, state that limitation clearly, and provide a preliminary roadmap with questions that would require a website review." : "Analyze the user's manual process and design an Agentic Automation Roadmap."}

[CONTEXT]: Mindscape Analytics LLC specializes in n8n, AI Agents, Voice Call agents, and Enterprise SaaS.

[OUTPUT_FORMAT]:
1. **STRATEGIC_AUDIT**: Short summary of the current state.
2. **AUTOMATION_NODES**: 3 high-impact agents to deploy (e.g., "Agent_Delta: 24/7 Voice Setter").
3. **EFFICIENCY_GAINS**: Projected ROI and hours saved.
4. **ARCHITECT_VERDICT**: Final recommendation.

[CONSTRAINTS]:
- Use monospaced headers.
- Professional, technical, and high-velocity tone.
- Keep it under 300 words.
- Do not claim measured ROI, savings, or website-specific observations without evidence in the user's description.
`;

    try {
        const result = await callAI({
            systemPrompt,
            prompt: isUrl ? `Analyze this website: ${parsed.data.description}` : `Analyze this process: ${parsed.data.description}`,
            provider: "GOOGLE",
            model: "gemini-3-flash",
        });
        return { success: true as const, roadmap: result.content };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Roadmap generation failed";
        return { success: false as const, error: message };
    }
}
