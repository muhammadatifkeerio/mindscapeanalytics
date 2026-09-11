import "server-only";

/**
 * SOURCE OF TRUTH KEYWORDS: lead.service, Lead, score, dedupe, Prisma Json
 * WHAT: Lead capture persistence and 24h dedupe.
 * WHY: Contact, chat, and lead magnet share one write path so scoring cannot drift.
 * WHERE: /api/leads, /api/contact.
 */

import { prisma } from "@/lib/prisma";
import type { LeadInput } from "@/lib/types";
import type { Prisma } from "@/generated/prisma";

export function scoreLead(data: LeadInput): number {
    let score = 10;
    if (data.name) score += 15;
    if (data.company) score += 25;
    if (data.phone) score += 20;
    if (data.service) score += 15;
    if (data.message && data.message.length > 50) score += 15;
    return Math.min(score, 100);
}

export async function findRecentDuplicate(email: string, source: string) {
    return prisma.lead.findFirst({
        where: {
            email,
            source,
            createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
    });
}

export async function createLead(data: LeadInput, score: number) {
    const metadata: Prisma.InputJsonValue = data.metadata ?? {};
    return prisma.lead.create({
        data: {
            email: data.email,
            name: data.name || null,
            company: data.company || null,
            phone: data.phone || null,
            source: data.source,
            service: data.service || null,
            message: data.message || null,
            score,
            metadata,
        },
    });
}
