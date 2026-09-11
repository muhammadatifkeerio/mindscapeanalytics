export const dynamic = "force-dynamic";

import { getProtectedContext } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PayoutForm from "./PayoutForm";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as sellerService from "@/services/seller.service";
import { ROUTES } from "@/config/resources";

export default async function SellerPaymentsPage() {
    const ctx = await getProtectedContext();

    if (!ctx) {
        redirect(`${ROUTES.signIn}?callbackUrl=/seller/payments`);
    }

    const user = await sellerService.getPayoutProfile(ctx.userId);

    if (!user) {
        redirect("/become-seller");
    }

    return (
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6 max-w-[1500px] mx-auto">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller" className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground mb-12 transition-all group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Dashboard</span>
                    </Link>

                    <div className="mb-16">
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-foreground/5 border border-border rounded-full mb-6">
                            <Shield size={12} className="text-blue-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">Settlement Protocol v1.0</span>
                        </div>
                        <h1
                            className="text-6xl font-black mb-6 uppercase tracking-tighter"
                            style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
                        >
                            PAYOUT <span className="text-foreground/20">CONFIGURATION.</span>
                        </h1>
                        <p className="text-foreground/40 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-2xl">
                            All generated value is aggregated within the institutional vault. Distributions are executed following a mandatory 10-day verification threshold.
                        </p>
                    </div>

                    <PayoutForm
                        initialMethod={user.payoutMethod || "stripe"}
                        initialDetails={user.payoutDetails || ""}
                        stripeConnected={!!user.stripeAccountId && user.sellerVerified}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
