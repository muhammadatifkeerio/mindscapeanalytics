import { NextResponse } from "next/server";
import { withBaseHandler } from "@/lib/base-handler";
import { BadRequestError } from "@/lib/api-error";
import { leadSchema } from "@/lib/types";
import { notifyAdmin } from "@/lib/notifications";
import * as leadService from "@/services/lead.service";

/**
 * SOURCE OF TRUTH KEYWORDS: POST /api/leads, leadSchema, lead.service, withBaseHandler
 * WHAT: Public lead capture with Zod + 24h dedupe + admin notify.
 * WHY: Contact magnets and forms share one write home; rate spine is global.
 * WHERE: LeadCaptureBar, AIAuditLeadMagnet, chat handoff.
 */

export const POST = withBaseHandler(async (request) => {
    const body: unknown = await request.json();
    const validation = leadSchema.safeParse(body);
    if (!validation.success) {
        throw new BadRequestError("Invalid data", validation.error.format());
    }

    const data = validation.data;
    const existingLead = await leadService.findRecentDuplicate(data.email, data.source);
    if (existingLead) {
        return NextResponse.json({
            success: true,
            message: "Lead already captured",
            leadId: existingLead.id,
        });
    }

    const score = leadService.scoreLead(data);
    const lead = await leadService.createLead(data, score);

    await notifyAdmin({
        title: score >= 50 ? "HIGH-VALUE LEAD CAPTURED" : "NEW LEAD CAPTURED",
        name: data.name || "Anonymous",
        email: data.email,
        company: data.company,
        phone: data.phone,
        service: data.service,
        message: data.message,
        score,
        color: score >= 50 ? 0xff4500 : 0x00ff00,
    });

    return NextResponse.json({ success: true, leadId: lead.id, score });
}, { maxRequests: 10, windowMs: 60_000 });
