import { createAuthClient } from "better-auth/react"
import { lastLoginMethodClient, twoFactorClient, usernameClient, adminClient } from "better-auth/client/plugins"

const getBaseURL = () => {
    if (typeof window !== "undefined") return window.location.origin;
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseURL().replace(/\/$/, ""),
    user: {
        additionalFields: {
            // 'username' handled by usernameClient()
            role: {
                type: "string",
                required: false,
            },
            isSeller: {
                type: "boolean",
                required: false,
            },
            sellerVerified: {
                type: "boolean",
                required: false,
            },
            stripeAccountId: {
                type: "string",
                required: false,
            },
        },
    },
    plugins: [
        adminClient(),
        usernameClient(),
        twoFactorClient(),
        lastLoginMethodClient(),
    ]
})

export type SessionUser = typeof authClient.$Infer.Session.user & {
    role?: string | null;
    isSeller?: boolean | null;
    sellerVerified?: boolean | null;
    stripeAccountId?: string | null;
};
export type Session = Omit<typeof authClient.$Infer.Session, "user"> & {
    user: SessionUser;
};
