import { Resend } from "resend";

/**
 * SOURCE OF TRUTH KEYWORDS: notifyAdmin, Resend, Discord, lead email, lazy client
 * WHAT: Admin lead notifications via Discord + Resend.
 * WHY: Construct Resend lazily so `next build` page collection does not log missing keys twice.
 * WHERE: /api/leads and /api/contact after lead.service writes.
 */

const EMAIL_FROM = process.env.EMAIL_FROM || "Mindscape Analytics <noreply@mindscapeanalytics.com>";
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const ADMIN_EMAILS = (process.env.ALLOWED_ADMINS || "contact@mindscapeanalytics.com,imzeeshan.ai@gmail.com")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

let resendClient: Resend | null | undefined;

function getResend(): Resend | null {
    if (resendClient !== undefined) return resendClient;
    const key = process.env.RESEND_API_KEY;
    resendClient = key ? new Resend(key) : null;
    return resendClient;
}

export async function notifyAdmin(payload: {
    title: string;
    name: string;
    email: string;
    company?: string;
    phone?: string;
    service?: string;
    message?: string;
    score?: number;
    color?: number;
}) {
    // 1. DISCORD NOTIFICATION (Primary Automation)
    if (DISCORD_WEBHOOK_URL) {
        try {
            const embed = {
                title: payload.title,
                color: payload.color || 0x000000,
                fields: [
                    { name: 'IDENTIFIER', value: payload.name || 'N/A', inline: true },
                    { name: 'NODE_EMAIL', value: payload.email, inline: true },
                    { name: 'CORPORATE', value: payload.company || 'N/A', inline: true },
                    { name: 'PROTOCOL', value: payload.service?.toUpperCase() || 'N/A', inline: true },
                    { name: 'PHONE', value: payload.phone || 'N/A', inline: true },
                    { name: 'SCORE', value: `${payload.score || 0}/100`, inline: true },
                    { name: 'SIGNAL_PAYLOAD', value: payload.message?.substring(0, 1024) || 'NO_MESSAGE' },
                ],
                timestamp: new Date().toISOString(),
                footer: { text: 'MINDSCAPE_ANALYTICS // LEAD_ENGINE' },
            };

            await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ embeds: [embed] }),
            });
        } catch (err) {
            console.error('[NOTIFY_DISCORD_ERROR]', err);
        }
    }

    // 2. EMAIL NOTIFICATION
    const resend = getResend();
    if (resend) {
        console.log(`[NOTIFY_EMAIL_START] Target: ${ADMIN_EMAILS.join(", ")}`);
        const emailHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px; border: 1px solid #333; border-radius: 12px;">
                <h2 style="letter-spacing: 0.2em; border-bottom: 1px solid #333; padding-bottom: 20px; font-weight: 900; color: #fff;">${payload.title.replace('🚀 ', '').replace('🔥 ', '')}</h2>
                <div style="margin: 30px 0;">
                    <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">SOURCE_IDENTITY</p>
                    <p style="font-size: 16px; margin: 0; font-weight: 700;">${payload.name || 'N/A'}</p>
                </div>
                <div style="margin: 30px 0;">
                    <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">PROTOCOL_EMAIL</p>
                    <p style="font-size: 16px; margin: 0; font-weight: 700;">${payload.email}</p>
                </div>
                <div style="margin: 30px 0;">
                    <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">INTEREST_AREA</p>
                    <p style="font-size: 16px; margin: 0; font-weight: 700;">${payload.service?.toUpperCase() || 'N/A'}</p>
                </div>
                <div style="margin: 30px 0; padding: 20px; background: #111; border-left: 4px solid #fff;">
                    <p style="color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">MESSAGE_PAYLOAD</p>
                    <p style="line-height: 1.6; margin: 0;">${payload.message || 'NO_MESSAGE'}</p>
                </div>
                <div style="margin-top: 40px; border-top: 1px solid #333; pt: 20px; color: #444; font-size: 10px; letter-spacing: 0.1em;">
                    LEAD_SCORE: ${payload.score || 0}/100 // SYSTEM: MINDSCAPE_CORE
                </div>
            </div>
        `;

        try {
            console.log(`[NOTIFY_EMAIL_ATTEMPT] Using From: ${EMAIL_FROM} | To: ${ADMIN_EMAILS.join(', ')}`);
            const { data, error } = await resend.emails.send({
                from: EMAIL_FROM,
                to: ADMIN_EMAILS,
                replyTo: payload.email,
                subject: `[${payload.score && payload.score >= 50 ? 'HOT_SIGNAL' : 'SIGNAL'}] ${payload.name || payload.email} // ${payload.service?.toUpperCase() || 'GENERAL'}`,
                html: emailHtml,
            });

            if (error) {
                console.error('[NOTIFY_EMAIL_PRIMARY_ERROR]', error);
                
                // Fallback Phase: Individual delivery with domain bypass
                console.log('[NOTIFY_EMAIL_RECOVERY] Attempting individual delivery bypass...');
                for (const email of ADMIN_EMAILS) {
                    try {
                        const isDomainError = error.name === 'validation_error' || error.message?.toLowerCase().includes('verified');
                        const recoveryFrom = isDomainError ? 'Mindscape <onboarding@resend.dev>' : EMAIL_FROM;
                        
                        console.log(`[NOTIFY_EMAIL_RECOVERY_SINGLE] Target: ${email} | From: ${recoveryFrom}`);
                        const recoveryResult = await resend.emails.send({
                            from: recoveryFrom,
                            to: [email],
                            replyTo: payload.email,
                            subject: `[RECOVERY_SIGNAL] ${payload.name || payload.email}`,
                            html: emailHtml,
                        });
                        
                        if (recoveryResult.error) {
                            console.warn(`[NOTIFY_EMAIL_RECOVERY_FAILED] ${email}:`, recoveryResult.error);
                        } else {
                            console.log(`[NOTIFY_EMAIL_RECOVERY_SUCCESS] ${email}`);
                        }
                    } catch (innerErr) {
                        console.error(`[NOTIFY_EMAIL_RECOVERY_CRITICAL] ${email}:`, innerErr);
                    }
                }
            } else {
                console.log('[NOTIFY_EMAIL_SUCCESS]', data?.id);
            }
        } catch (err) {
            console.error('[NOTIFY_EMAIL_CRITICAL_ERROR]', err);
        }
    } else {
        console.warn('[NOTIFY_EMAIL_SKIPPED] RESEND_API_KEY not configured.');
    }
}
