import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM || 'MSA Architect <noreply@mindscapeanalytics.com>';

let resendInstance: Resend | null = null;

function getResend(): Resend {
    if (!RESEND_API_KEY) {
        throw new Error(
            "RESEND_API_KEY environment variable is not set. " +
            "Email sending is unavailable. Configure this in your .env file."
        );
    }
    if (!resendInstance) {
        resendInstance = new Resend(RESEND_API_KEY);
    }
    return resendInstance;
}

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}): Promise<{ success: boolean; error?: string }> {
    try {
        const resend = getResend();
        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [to],
            subject,
            html,
        });

        if (error) {
            console.error("[EMAIL_SEND_ERROR]", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err: unknown) {
        const error = err as Error;
        console.error("[EMAIL_CRITICAL_ERROR]", error.message);
        return { success: false, error: error.message };
    }
}
