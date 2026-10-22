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
        <div className="min-h-screen bg-background text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>

            <Navbar />

            <main className="relative z-10 mx-auto max-w-[1500px] px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-12">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to dashboard</span>
                    </Link>

                    <div className="mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-3 px-3 py-1 bg-foreground/5 border border-border rounded-full mb-6">
                            <Shield size={12} className="text-blue-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">Settlement Protocol v1.0</span>
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Payout settings
                        </h1>
                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
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
