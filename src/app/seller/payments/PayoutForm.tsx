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
        <div className="space-y-8">
            {/* Method Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => setMethod("stripe")}
                    className={`p-10 rounded-[2.5rem] border transition-all text-left relative overflow-hidden group ${method === "stripe"
                            ? "bg-foreground/5 border-foreground/20"
                            : "bg-foreground/[0.01] border-border opacity-40 hover:opacity-100 hover:border-border"
                        }`}
                >
                    <div className="relative z-10">
                        <CreditCard size={32} className={`mb-6 ${method === "stripe" ? "text-foreground" : "text-foreground/20"}`} />
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2">Stripe Connect</h3>
                        <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-medium">Standard Fiat Rails</p>
                    </div>
                    {method === "stripe" && (
                        <div className="absolute top-8 right-8 text-blue-500">
                            <CheckCircle2 size={24} />
                        </div>
                    )}
                </button>

                <button
                    onClick={() => setMethod("crypto")}
                    className={`p-10 rounded-[2.5rem] border transition-all text-left relative overflow-hidden group ${method === "crypto"
                            ? "bg-foreground/5 border-foreground/20"
                            : "bg-foreground/[0.01] border-border opacity-40 hover:opacity-100 hover:border-border"
                        }`}
                >
                    <div className="relative z-10">
                        <Wallet size={32} className={`mb-6 ${method === "crypto" ? "text-foreground" : "text-foreground/20"}`} />
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2">Crypto Wallet</h3>
                        <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-medium">Decentralized Settlement</p>
                    </div>
                    {method === "crypto" && (
                        <div className="absolute top-8 right-8 text-blue-500">
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
                        className="bg-foreground/[0.02] border border-border rounded-[3rem] p-12 relative overflow-hidden"
                    >
                        <div className="max-w-xl">
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Financial Bridge Configuration</h2>
                            <p className="text-foreground/40 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-10">
                                Connect your commercial terminal to the Stripe infrastructure to enable fiat currency distributions.
                            </p>

                            {stripeConnected ? (
                                <div className="flex items-center gap-4 px-6 py-4 bg-green-500/10 border border-green-500/20 rounded-2xl mb-12">
                                    <CheckCircle2 size={20} className="text-green-500" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-foreground">Registry Active</div>
                                        <div className="text-[9px] text-foreground/40 uppercase tracking-tight">Commercial rails initialized and verified.</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 px-6 py-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-12">
                                    <AlertCircle size={20} className="text-amber-500" />
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-foreground">Awaiting Handshake</div>
                                        <div className="text-[9px] text-foreground/40 uppercase tracking-tight">Stripe Connect identity not localized.</div>
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
                                    className="px-12 py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-foreground/90 transition-all flex items-center gap-4 group"
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
                        className="bg-foreground/[0.02] border border-border rounded-[3rem] p-12 relative overflow-hidden"
                    >
                        <form action={action} className="max-w-xl">
                            <input type="hidden" name="payoutMethod" value="crypto" />
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Digital Asset Distribution</h2>
                            <p className="text-foreground/40 text-[11px] font-black uppercase tracking-widest leading-relaxed mb-10">
                                Input your destination address for decentralized settlements. Alpha, USDT, and ETH protocols supported.
                            </p>

                            <div className="space-y-6 mb-12">
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-4 block">Destination Address</label>
                                    <input
                                        name="payoutDetails"
                                        defaultValue={initialMethod === "crypto" ? initialDetails : ""}
                                        placeholder="0x..."
                                        className="w-full bg-foreground/5 border border-border rounded-2xl px-6 py-5 text-sm font-medium focus:border-foreground/20 outline-none transition-all placeholder:text-foreground/10"
                                        required
                                    />
                                </div>
                                <p className="text-[9px] text-foreground/20 uppercase tracking-tight">
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
                                className="px-12 py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-foreground/90 transition-all flex items-center gap-4 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
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
