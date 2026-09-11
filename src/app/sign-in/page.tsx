
"use client";

import { authClient } from "@/lib/auth-client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const normalizedEmail = email.trim().toLowerCase();

        try {
            console.log("[AUTH_SIGNIN_ATTEMPT]", { email: normalizedEmail });
            const { data, error: authError } = await authClient.signIn.email({
                email: normalizedEmail,
                password,
            });

            if (authError) {
                console.warn("[AUTH_SIGNIN_ERROR]", authError);
                const code = (authError as any).code || "";

                if (code === "INVALID_EMAIL_OR_PASSWORD") {
                    setError("ACCESS DENIED: Credentials mismatch. Please verify or request a new profile.");
                } else {
                    setError(`SYSTEM EXCEPTION: ${authError.message || "Authentication attempt failed."}`);
                }
            } else if (data) {
                const userRole = (data.user as any).role || "user";
                const isSeller = (data.user as any).isSeller || false;

                let target = "/shop";
                if (callbackUrl) {
                    target = callbackUrl;
                } else if (userRole === "admin") {
                    target = "/admin";
                } else if (userRole === "seller" || isSeller) {
                    target = "/seller";
                }

                console.log("[AUTH_SIGNIN_SUCCESS] Handshaking with terminal...", { target });
                window.location.href = target;
            }
        } catch (err: any) {
            console.error("[AUTH_SIGNIN_CRITICAL_CATCH]", err);
            if (err instanceof TypeError && err.message?.includes("fetch")) {
                setError("Protocol Timeout: The registry is currently warming up. Please wait 10 seconds and retry.");
            } else {
                setError("Critical Gateway Failure. Please verify your network and retry.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-foreground selection:bg-foreground selection:text-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-foreground/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-foreground/[0.03] blur-[100px] rounded-full" />
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
                            SECURE<span className="text-foreground/20"> // </span>GATEWAY
                        </h1>
                    </Link>
                    <p className="text-foreground/40 text-xs font-black uppercase tracking-[0.3em] mt-4">
                        Secure Authentication Protocol
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-foreground/5/40 backdrop-blur-3xl border border-border rounded-[2.5rem] p-10 shadow-2xl">
                    <form onSubmit={handleSignIn} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-wider text-center space-y-3"
                            >
                                <p>{error}</p>
                                {error.includes("Credentials mismatch") && (
                                    <Link
                                        href={callbackUrl ? `/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/sign-up"}
                                        className="inline-block text-foreground bg-foreground/10 border border-foreground/20 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-foreground/20 transition-all font-bold"
                                    >
                                        Register New Account →
                                    </Link>
                                )}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Terminal ID (Email)</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-foreground transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                        className="w-full bg-transparent/50 border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-white/30 focus:bg-foreground/[0.07] transition-all"
                                        placeholder="user@mindscape.com"
                                    />
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 mb-2 ml-1">Access Cipher (Password)</label>
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
                                    Establish Link
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-border text-center space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 leading-relaxed">
                            READY TO TRANSFORM YOUR BUSINESS WITH <br />
                            <span className="text-foreground">INDUSTRIAL INTELLIGENCE</span>?
                        </p>
                        <Link
                            href={callbackUrl ? `/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/sign-up"}
                            className="inline-block text-foreground font-black uppercase tracking-widest text-[10px] hover:text-foreground/60 transition-colors underline underline-offset-8 decoration-white/20"
                        >
                            Request Access Profile
                        </Link>
                        <div className="pt-4">
                            <button
                                onClick={() => alert("Password reset protocol initiated. Please check your terminal (email) if configured.")}
                                className="text-foreground/20 hover:text-foreground/40 text-[8px] font-black uppercase tracking-widest transition-colors"
                            >
                                Forgot Access Cipher?
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Security Note */}
                <div className="mt-10 flex items-center justify-center gap-2 text-foreground/20">
                    <Shield size={12} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">End-to-End Encryption Enabled</span>
                </div>
            </motion.div>
        </div>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.5em] animate-pulse">Initializing Security Gateway...</div>
            </div>
        }>
            <SignInContent />
        </Suspense>
    );
}
