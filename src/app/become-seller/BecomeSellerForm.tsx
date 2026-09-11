"use client";

import { becomeSeller } from "@/app/_actions/become-seller";
import { ArrowRight, Lock, Check } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface FormState {
    error: string | null;
    success: boolean;
    url?: string | null; // Make url optional as it's not always present
}

const initialState: FormState = {
    error: null,
    success: false,
    url: null,
};

export default function BecomeSellerForm() {
    const [state, formAction, isActionPending] = useActionState<FormState, FormData>(becomeSeller, initialState);
    const router = useRouter();
    const sessionResult = authClient.useSession();
    const session = sessionResult.data;
    const isSessionPending = sessionResult.isPending;

    useEffect(() => {
        const finalizeEnrollment = async () => {
            if (state.success) {
                console.log("[BECOME_SELLER_SUCCESS] Refreshing session logic...");
                // Force client session refresh before redirecting
                await authClient.getSession({ query: { disableCookieCache: true } });

                if (state.url) {
                    window.location.href = state.url;
                } else {
                    router.push("/seller");
                }
            }
        };
        finalizeEnrollment();
    }, [state.success, state.url, router]);

    if (isSessionPending) {
        return (
            <div className="text-center py-12">
                <div className="inline-block px-4 py-2 border border-border rounded-full mb-4">
                    <span className="w-2 h-2 rounded-full bg-foreground animate-pulse inline-block mr-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Synchronizing Session...</span>
                </div>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="text-center py-12">
                <p className="text-foreground/40 text-[10px] font-black uppercase tracking-widest mb-6">Unauthorized Session Detected</p>
                <button
                    onClick={() => router.push("/sign-in?callbackUrl=/become-seller")}
                    className="px-8 py-4 bg-foreground text-background rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                    Establish Link to Continue
                </button>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-10">
            {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                    {state.error}
                </div>
            )}

            <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-1">Creator / Shop Name *</label>
                <input
                    type="text"
                    name="storeName"
                    required
                    placeholder="E.G. NEURAL_STUDIOS"
                    className="w-full px-6 py-4 bg-foreground/[0.03] border border-border rounded-2xl text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground/20 focus:bg-foreground/[0.05] transition-all backdrop-blur-xl uppercase font-bold tracking-widest text-sm"
                />
            </div>

            <div className="space-y-4">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-1">Asset Suite Description *</label>
                <textarea
                    name="storeDescription"
                    required
                    rows={5}
                    placeholder="Briefly describe your specialization. Our streamlined system now supports rapid one-image project listings for maximum efficiency..."
                    className="w-full px-6 py-6 bg-foreground/[0.03] border border-border rounded-3xl text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-foreground/20 focus:bg-foreground/[0.05] transition-all backdrop-blur-xl text-sm leading-relaxed"
                />
            </div>

            <div className="pt-8 border-t border-border">
                <p className="text-[9px] text-foreground/20 uppercase tracking-[0.2em] mb-8 text-center">
                    Note: Settlement protocols and network configurations can be localized within the dashboard after initial terminal enrollment.
                </p>
                <button
                    type="submit"
                    disabled={isActionPending}
                    className="w-full py-6 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-foreground/90 transition-all shadow-[0_0_50px_hsl(var(--foreground)/0.1)] active:scale-95 group flex items-center justify-center gap-4 disabled:opacity-50"
                >
                    {isActionPending ? "INITIALIZING..." : (
                        <>
                            Launch Your Shop
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>

            <div className="flex items-center justify-center gap-4 opacity-20">
                <Lock size={12} />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">End-to-End Encrypted Handshake</span>
            </div>
        </form>
    );
}
