import { NextResponse } from "next/server";
import { withBaseHandler } from "@/lib/base-handler";
import { BadRequestError } from "@/lib/api-error";
import { contactFormSchema } from "@/lib/types";
import { notifyAdmin } from "@/lib/notifications";
import * as leadService from "@/services/lead.service";

/**
 * SOURCE OF TRUTH KEYWORDS: POST /api/contact, contactFormSchema, lead.service, withBaseHandler
 * WHAT: Contact form ingress — validate, persist as a lead, notify.
 * WHY: Same lead home as /api/leads so scoring cannot drift; 5 req/min public cap.
 * WHERE: /contact page.
 */

export const POST = withBaseHandler(async (request) => {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        throw new BadRequestError("Invalid JSON in request body");
    }

    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
        throw new BadRequestError("Invalid form data", validationResult.error.format());
    }

    const data = validationResult.data;
    const leadInput = { ...data, source: "contact" };
    const score = leadService.scoreLead(leadInput);

    try {
        await leadService.createLead(leadInput, score);
        await notifyAdmin({
            title: "NEW CONTACT INQUIRY",
            ...data,
            score,
            color: 0xffffff,
        });
    } catch (error) {
        console.error("[CONTACT_PROCESS_ERROR]", error);
    }

    return NextResponse.json({
        success: true,
        message: "Transmission successful. Lead synchronized.",
    });
}, { maxRequests: 5, windowMs: 60_000 });
