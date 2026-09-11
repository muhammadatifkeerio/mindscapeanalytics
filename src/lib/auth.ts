import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { admin, username, twoFactor, lastLoginMethod } from "better-auth/plugins";

const allowedAdmins = (process.env.ALLOWED_ADMINS || "")
    .split(",")
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);

// Core Auth Configuration - Hardened for MSA high-performance registry
const getBaseURL = () => {
    if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
};

const baseURL = getBaseURL().replace(/\/$/, "");

if (!baseURL && process.env.NODE_ENV === "production") {
    console.warn("[AUTH_CONFIG_WARNING] No baseURL defined for production. BetterAuth might fail to resolve redirects.");
}

export const auth = betterAuth({
    baseURL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustHost: true,
    trustedOrigins: [
        "https://www.mindscapeanalytics.com",
        "https://mindscapeanalytics.com",
        "https://mindscapeanalytics.vercel.app",
        "https://mindscapeanalytics-main.vercel.app",
        "https://mindscape-analytics-main.vercel.app"
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            // 'username' is handled by the username() plugin
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
            isSeller: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            sellerVerified: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            stripeAccountId: {
                type: "string",
                required: false,
            },
        },
    },
    logger: {
        level: process.env.NODE_ENV === "production" ? "error" : "warn",
    },
    plugins: [
        admin(),
        username(),
        twoFactor(),
        lastLoginMethod(),
        nextCookies()
    ],
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    try {
                        const email = user.email.toLowerCase();
                        if (allowedAdmins.length > 0 && allowedAdmins.includes(email)) {
                            console.log(`[AUTH_SUCCESS] Initializing admin handshake for ${email}`);
                            await prisma.user.update({
                                where: { id: user.id },
                                data: { role: "admin" }
                            }).catch(err => {
                                console.error("[AUTH_ELEVATION_DB_ERROR] Registry rejection:", err.message);
                            });
                        }
                    } catch (error) {
                        const err = error instanceof Error ? error : new Error("Auth hook failed");
                        console.error("[AUTH_HOOK_ERROR] Stream integrity protected:", err.message);
                    }
                }
            }
        }
    }
});
