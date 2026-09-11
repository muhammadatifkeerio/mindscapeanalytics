"use client";

import React, { useActionState, useState } from "react";
import { updatePayouts } from "@/app/_actions/update-payouts";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface PayoutFormProps {
    initialMethod: string;
    initialDetails: string;
}

const initialState = {
    error: null as string | null,
    success: false,
};

export default function PayoutForm({ initialMethod, initialDetails }: PayoutFormProps) {
    const [state, formAction, isPending] = useActionState(updatePayouts, initialState);
    const [selectedMethod, setSelectedMethod] = useState(initialMethod);

    return (
        <form action={formAction} className="space-y-8">
            {state?.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center">
                    {state.error}
                </div>
            )}

            {state?.success && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-3">
                    <CheckCircle2 size={16} />
                    Protocol Updated Successfully
                </div>
            )}

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 ml-1">Liquidity Network</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { id: "crypto_eth", label: "Ethereum Network", description: "MetaMask / ERC20 Addresses" },
                        { id: "crypto_sol", label: "Solana Network", description: "Phantom / Base58 Addresses" },
                        { id: "crypto_btc", label: "Bitcoin Network", description: "Native SegWit / Taproot" },
                        { id: "stripe", label: "Stripe Connect", description: "Direct Card Settlements" },
                        { id: "paypal", label: "PayPal Wallet", description: "Digital Disbursement" },
                        { id: "bank", label: "Global Bank", description: "IBAN / SWIFT / Wire" },
                    ].map((method) => (
                        <label
                            key={method.id}
                            className={`p-5 rounded-2xl border transition-all cursor-pointer group relative ${selectedMethod === method.id
                                ? "bg-foreground/10 border-foreground/20 ring-1 ring-white/20"
                                : "bg-foreground/[0.02] border-border hover:border-border"
                                }`}
                        >
                            <input
                                type="radio"
                                name="payoutMethod"
                                value={method.id}
                                className="sr-only"
                                checked={selectedMethod === method.id}
                                onChange={() => setSelectedMethod(method.id)}
                            />
                            <div className="font-bold text-sm tracking-wide uppercase">{method.label}</div>
                            <div className="text-[9px] text-foreground/30 uppercase tracking-widest mt-1">{method.description}</div>
                            {selectedMethod === method.id && (
                                <div className="absolute top-4 right-4 text-foreground">
                                    <CheckCircle2 size={14} />
                                </div>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 ml-1">Destination Address / ID</label>
                <input
                    type="text"
                    name="payoutDetails"
                    defaultValue={initialDetails}
                    required
                    placeholder="Enter wallet address, IBAN, or email ID..."
                    className="w-full px-6 py-5 bg-foreground/[0.03] border border-border rounded-2xl text-foreground placeholder:text-foreground/10 focus:outline-none focus:border-foreground/20 focus:bg-foreground/[0.05] transition-all font-mono text-sm tracking-widest"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/90 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                >
                    {isPending ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        <>
                            Sync Handshake Parameters
                            <ArrowRight size={14} />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
