export const dynamic = "force-dynamic";
import { getProtectedContext } from "@/lib/get-session";
import { CreditCard, Wallet, Landmark, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import React from "react";
import PayoutForm from "./PayoutForm";
import * as sellerService from "@/services/seller.service";

export default async function PaymentsPage() {
    const ctx = await getProtectedContext();

    if (!ctx) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <AlertCircle className="text-destructive mb-4" size={48} />
                <h2 className="text-2xl font-black uppercase tracking-tight">Access Restricted</h2>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mt-2">Vendor terminal privileges required.</p>
            </div>
        );
    }

    const user = await sellerService.getPayoutProfile(ctx.userId);

    return (
        <div className="space-y-12">
            <div>
                <h1
                    className="text-5xl font-black mb-2 tracking-tighter uppercase"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                >
                    SETTLEMENT PROTOCOLS.
                </h1>
                <p className="text-foreground/40 font-medium uppercase tracking-widest text-sm">Configure your financial liquidity and network destinations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Config & Stats branches by role */}
                {ctx.hasFullAccess ? (
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-border">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-2">Total Platform Volume</h3>
                            <div className="text-5xl font-black tracking-tighter text-foreground/90">$0.00</div>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-border">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-2">Pending Institutional Payouts</h3>
                            <div className="text-5xl font-black tracking-tighter text-amber-500/90 hover:text-amber-400 transition-colors cursor-pointer blur-sm hover:blur-none">$0.00</div>
                            <p className="text-[8px] uppercase tracking-widest text-foreground/20 mt-4 leading-relaxed">Financial routing engine active. Automated disbursements executed bi-monthly.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-border backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-foreground/[0.02] group-hover:text-foreground/[0.05] transition-colors">
                                <ShieldCheck size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-foreground/40 mb-6">Verification Status</h3>
                                {user?.sellerVerified ? (
                                    <div className="space-y-4">
                                        <div className="text-3xl font-black text-green-400 tracking-tighter uppercase">Active Protocol</div>
                                        <p className="text-[10px] text-foreground/40 uppercase tracking-widest leading-relaxed">Your vendor terminal is fully synchronized for institutional settlements.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="text-3xl font-black text-amber-500 tracking-tighter uppercase">Manual Verification</div>
                                        <p className="text-[10px] text-foreground/40 uppercase tracking-widest leading-relaxed">Our architects are auditing your terminal profile. This typically resolves within 24-48 hours.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Configuration Area */}
                        <div className="lg:col-span-2 p-10 rounded-[3rem] bg-foreground/[0.02] border border-border backdrop-blur-2xl">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 rounded-2xl bg-foreground/5 flex items-center justify-center">
                                    <Landmark className="text-foreground" size={20} />
                                </div>
                                <h2 className="text-xl font-bold uppercase tracking-tight">Handshake Parameters</h2>
                            </div>

                            <PayoutForm
                                initialMethod={user?.payoutMethod || ""}
                                initialDetails={user?.payoutDetails || ""}
                            />
                        </div>
                    </>
                )}
            </div>
            {/* Security Note */}
            <div className="p-8 rounded-3xl border border-border bg-foreground/[0.01] flex items-center gap-6 opacity-40">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground mb-1">Secure Settlement Protocol</h4>
                    <p className="text-[9px] uppercase tracking-wider text-foreground/40">Financial parameters are encrypted and localized within the MSA cluster. Changes require manual audit trail verification.</p>
                </div>
            </div>
        </div>
    );
}
