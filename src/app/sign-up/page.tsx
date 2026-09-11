
"use client";

import { authClient } from "@/lib/auth-client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Loader2, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as zod from "zod";

function SignUpContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "";
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedName = name.trim();
        const trimmedUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');

        // Best Practice: Schema Validation
        try {
            const signupSchema = zod.object({
                name: zod.string().min(2, "Identity must be at least 2 characters."),
                email: zod.string().email("Invalid terminal ID format."),
                password: zod.string().min(8, "Establish Cipher must be at least 8 characters."),
                username: zod.string().min(3, "Nomenclature error: Username must be at least 3 characters.").optional().or(zod.literal("")),
            });

            signupSchema.parse({ name: trimmedName, email: trimmedEmail, password, username: trimmedUsername });
        } catch (err: any) {
            if (err instanceof zod.ZodError) {
                setError(err.issues[0]?.message || "Validation rejection.");
            } else {
                setError("Protocol validation failed.");
            }
            setLoading(false);
            return;
        }

        // Helper: Utility for synchronization delays
        const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

        // Auto-generate username from name if blank
        const generateUsername = () => {
            const base = trimmedName.toLowerCase()
                .replace(/[^a-z0-9]/g, '_')
                .replace(/_+/g, '_');
            return base + '_' + Math.random().toString(36).substring(2, 7);
        };

        let finalUsername = trimmedUsername;
        if (!finalUsername && trimmedName) {
            finalUsername = generateUsername();
        }

        // Single attempt with targeted retry only for auto-generated username collisions
        const attemptSignUp = async (uname: string, retryCount = 0): Promise<{ success: boolean; shouldRetry: boolean; errorMsg: string }> => {
            try {
                console.log(`[AUTH_SIGNUP_ATTEMPT] Attempt ${retryCount + 1}`, { email: trimmedEmail, username: uname });

                const { data, error: authError } = await authClient.signUp.email({
                    email: trimmedEmail,
                    password,
                    name: trimmedName,
                    username: uname,
                });

                if (authError) {
                    const code = (authError as any).code || "";
                    const status = (authError as any).status;

                    console.warn("[AUTH_SIGNUP_ERROR]", { code, status, message: authError.message });

                    // Username collision — retry only if auto-generated
                    if (code === "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER" || code === "USERNAME_IS_ALREADY_TAKEN") {
                        if (!username.trim() && retryCount < 3) {
                            return { success: false, shouldRetry: true, errorMsg: "" };
                        }
                        return { success: false, shouldRetry: false, errorMsg: `Nomenclature Conflict: "${uname}" is already registered.` };
                    }

                    // Email already registered — user needs to sign in instead
                    if (status === 422 || code === "USER_ALREADY_EXISTS") {
                        return { success: false, shouldRetry: false, errorMsg: "Email already registered. Please sign in." };
                    }

                    // Unknown auth error
                    return { success: false, shouldRetry: false, errorMsg: authError.message || "Registry synchronization failed." };
                }

                return { success: true, shouldRetry: false, errorMsg: "" };
            } catch (err: any) {
                const isNetworkError = err instanceof TypeError && err.message?.includes("fetch");

                // Exponential Backoff for Network Errors (Cold Starts)
                if (isNetworkError && retryCount < 2) {
                    const delay = [1000, 3000][retryCount] || 5000;
                    console.log(`[AUTH_SIGNUP_BACKOFF] Network jitter detected. Retrying in ${delay}ms...`);
                    await wait(delay);
                    return attemptSignUp(uname, retryCount + 1);
                }

                console.error("[AUTH_SIGNUP_CRITICAL]", err?.message);
                return {
                    success: false,
                    shouldRetry: false,
                    errorMsg: isNetworkError
                        ? "Connection timed out. Registry warming up — please try again momentarily."
                        : (err?.message || "Unexpected terminal rejection.")
                };
            }
        };

        // Main Execution Loop
        let result = await attemptSignUp(finalUsername);

        // Handle auto-username retries separately to maintain backoff scope
        if (result.shouldRetry && !username.trim()) {
            for (let retry = 0; retry < 2; retry++) {
                finalUsername = generateUsername();
                result = await attemptSignUp(finalUsername, retry + 1);
                if (!result.shouldRetry) break;
            }
        }

        if (result.success) {
            console.log("[AUTH_SIGNUP_SUCCESS] Identity registry handshake complete. Redirecting...");
            setSuccessMsg("System Access Granted. Synchronizing profile...");
            setTimeout(() => {
                window.location.href = callbackUrl || "/shop";
            }, 1500);
            return;
        }

        setError(result.errorMsg);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-transparent text-foreground selection:bg-foreground selection:text-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Global CinematicBackground handles depth, removed local blurs */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Area */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block group">
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Image
                                src="/images/logo/mindscape-analytics.png"
                                alt="Mindscape Analytics"
                                width={240}
                                height={56}
                                className="h-14 w-auto brightness-0 invert opacity-100 transition-all duration-500 group-hover:scale-110"
                            />
                        </div>
                        <h1
                            className="text-[10px] font-black tracking-[0.5em] uppercase text-foreground/40"
                        >
                            ENTITY<span className="text-foreground/20"> // </span>REGISTRY
                        </h1>
                    </Link>
                    <p className="text-foreground/40 text-xs font-black uppercase tracking-[0.3em] mt-4">
                        Initialize Access Profile
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-foreground/5/40 backdrop-blur-3xl border border-border rounded-[2.5rem] p-10 shadow-2xl">
                    <form onSubmit={handleSignUp} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-wider text-center space-y-3"
                            >
                                <p>{error}</p>
                                {error.toLowerCase().includes("sign in") && (
                                    <Link
                                        href={callbackUrl ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/sign-in"}
                                        className="inline-block text-foreground bg-foreground/10 border border-foreground/20 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-foreground/20 transition-all"
                                    >
                                        Go to Sign In →
                                    </Link>
                                )}
                            </motion.div>
                        )}
                        {successMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold uppercase tracking-wider text-center space-y-3"
                            >
                                <p>{successMsg}</p>
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Identity (Full Name)</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-foreground transition-colors" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-transparent/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-white/30 focus:bg-foreground/[0.07] transition-all"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Nomenclature (Username - Optional)</label>
                                <div className="relative">
                                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center font-mono text-[10px] text-foreground/20">@</div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-transparent/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-white/30 focus:bg-foreground/[0.07] transition-all"
                                        placeholder="unique_id"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Terminal ID (Email)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-foreground transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-white/30 focus:bg-foreground/[0.07] transition-all"
                                        placeholder="user@mindscape.com"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Establish Cipher (Password)</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-foreground transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-white/30 focus:bg-foreground/[0.07] transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-institutional w-full"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    Finalize Registration
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-border text-center space-y-4">
                        <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">
                            Authorized Personnel?
                        </p>
                        <Link
                            href={callbackUrl ? `/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/sign-in"}
                            className="inline-block text-foreground font-black uppercase tracking-widest text-[10px] hover:text-foreground/60 transition-colors underline underline-offset-8 decoration-white/20"
                        >
                            Access Console Sign-In
                        </Link>
                    </div>
                </div>

                {/* Footer Security Note */}
                <div className="mt-10 flex items-center justify-center gap-2 text-foreground/20">
                    <Shield size={12} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Data Protocol Initialized</span>
                </div>
            </motion.div>
        </div>
    );
}

export default function SignUpPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.5em] animate-pulse">Initializing Identity Registry...</div>
            </div>
        }>
            <SignUpContent />
        </Suspense>
    );
}
