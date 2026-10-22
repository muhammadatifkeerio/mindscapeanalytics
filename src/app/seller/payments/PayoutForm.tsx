"use client";

import React, { useState, useActionState } from "react";
import { updatePayouts } from "@/app/_actions/update-payouts";
import { CreditCard, Wallet, CheckCircle2, AlertCircle, Loader2, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PayoutFormProps {
    initialMethod: string;
    initialDetails: string;
    stripeConnected: boolean;
}

export default function PayoutForm({ initialMethod, initialDetails, stripeConnected }: PayoutFormProps) {
    const [method, setMethod] = useState(initialMethod);
    const [state, action, isPending] = useActionState(updatePayouts, { error: null, success: false });

    return (
        <div className="space-y-5 sm:space-y-8">
            {/* Method Selection */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                <button
                    onClick={() => setMethod("stripe")}
                    className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-colors sm:p-6 ${method === "stripe"
                            ? "border-brand/40 bg-brand/5"
                            : "border-border bg-card hover:border-brand/30"
                        }`}
                >
                    <div className="relative z-10">
                        <CreditCard size={24} className={`mb-4 ${method === "stripe" ? "text-brand" : "text-muted-foreground"}`} />
                        <h3 className="mb-1 text-base font-semibold">Stripe Connect</h3>
                        <p className="text-sm text-muted-foreground">Receive payouts through Stripe.</p>
                    </div>
                    {method === "stripe" && (
                        <div className="absolute right-4 top-4 text-brand sm:right-6 sm:top-6">
                            <CheckCircle2 size={24} />
                        </div>
                    )}
                </button>

                <button
                    onClick={() => setMethod("crypto")}
                    className={`relative overflow-hidden rounded-2xl border p-4 text-left transition-colors sm:p-6 ${method === "crypto"
                            ? "border-brand/40 bg-brand/5"
                            : "border-border bg-card hover:border-brand/30"
                        }`}
                >
                    <div className="relative z-10">
                        <Wallet size={24} className={`mb-4 ${method === "crypto" ? "text-brand" : "text-muted-foreground"}`} />
                        <h3 className="mb-1 text-base font-semibold">Crypto wallet</h3>
                        <p className="text-sm text-muted-foreground">Receive payouts to a wallet address.</p>
                    </div>
                    {method === "crypto" && (
                        <div className="absolute right-4 top-4 text-brand sm:right-6 sm:top-6">
                            <CheckCircle2 size={24} />
                        </div>
                    )}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {method === "stripe" ? (
                    <motion.div
                        key="stripe"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8"
                    >
                        <div className="max-w-xl">
                            <h2 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">Stripe payout account</h2>
                            <p className="mb-6 text-sm leading-6 text-muted-foreground sm:mb-8">
                                Connect your commercial terminal to the Stripe infrastructure to enable fiat currency distributions.
                            </p>

                            {stripeConnected ? (
                                <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-600/20 bg-green-600/10 px-4 py-3 sm:mb-8">
                                    <CheckCircle2 size={20} className="text-green-500" />
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">Account connected</div>
                                        <div className="text-sm text-muted-foreground">Your Stripe payout account is verified.</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-600/20 bg-amber-600/10 px-4 py-3 sm:mb-8">
                                    <AlertCircle size={20} className="text-amber-500" />
                                    <div>
                                        <div className="text-sm font-semibold text-foreground">Setup needed</div>
                                        <div className="text-sm text-muted-foreground">Connect Stripe to receive payouts.</div>
                                    </div>
                                </div>
                            )}

                            <form action={async () => {
                                const { createStripeAccountLink } = await import("@/app/_actions/stripe");
                                const res = await createStripeAccountLink();
                                if (res.url) window.location.href = res.url;
                            }}>
                                <button
                                    type="submit"
                                    className="inline-flex min-h-11 items-center gap-3 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                                >
                                    {stripeConnected ? "Manage Account" : "Initialize Handshake"}
                                    <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="crypto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-6 lg:p-8"
                    >
                        <form action={action} className="max-w-xl">
                            <input type="hidden" name="payoutMethod" value="crypto" />
                            <h2 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">Crypto payout address</h2>
                            <p className="mb-6 text-sm leading-6 text-muted-foreground sm:mb-8">
                                Input your destination address for decentralized settlements. Alpha, USDT, and ETH protocols supported.
                            </p>

                            <div className="mb-8 space-y-4 sm:mb-10">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-foreground">Wallet address</label>
                                    <input
                                        name="payoutDetails"
                                        defaultValue={initialMethod === "crypto" ? initialDetails : ""}
                                        placeholder="0x..."
                                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        required
                                    />
                                </div>
                                <p className="text-sm leading-5 text-muted-foreground">
                                    Note: Ensure the address is accurate. Distributions across decentralized protocols are final.
                                </p>
                            </div>

                            {state?.error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-8 flex items-center gap-3">
                                    <AlertCircle size={16} className="text-red-500" />
                                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{state.error}</p>
                                </div>
                            )}

                            {state?.success && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl mb-8 flex items-center gap-3">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Protocol Updated Successfully</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="inline-flex min-h-11 items-center gap-3 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 active:scale-[.99] disabled:opacity-50"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Authorize Change
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
