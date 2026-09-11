export const dynamic = "force-dynamic";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BecomeSellerForm from "./BecomeSellerForm";
import { Check, Store, TrendingUp, Shield, ArrowRight, Zap, ShieldCheck, Lock } from "lucide-react";

export default async function BecomeSellerPage() {
    const session = await getSession();

    if (!session?.user) {
        // Encode the callback URL so sign-in knows where to send them back
        redirect(`/sign-in?callbackUrl=${encodeURIComponent("/become-seller")}`);
    }

    const isSeller = (session.user as any).isSeller || false;

    if (isSeller) {
        redirect("/seller");
    }

    return (
        <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0">
                {/* Global CinematicBackground handles depth */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 [mask-image:linear-gradient(180deg,black,transparent)]" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <div className="inline-block px-4 py-1.5 bg-foreground/5 border border-border rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-foreground/40">
                            Vendor Onboarding
                        </div>
                        <h1
                            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none uppercase"
                            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                        >
                            MONETIZE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary/80 to-secondary/40">GENIUS.</span>
                        </h1>
                        <p className="text-lg text-foreground/40 max-w-2xl mx-auto font-medium tracking-tight border-t border-border pt-8 mt-8">
                            Transform your high-performance code into a persistent revenue stream. Join our global network of elite software architects.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                icon: <Store size={32} strokeWidth={1} />,
                                title: "ARCHITECT PROFILE",
                                desc: "Industrial-grade presence with dedicated stores for your digital assets."
                            },
                            {
                                icon: <TrendingUp size={32} strokeWidth={1} />,
                                title: "CAPITAL OPTIMIZATION",
                                desc: "Retain 85% of valuation with instantaneous, secure Stripe settlements."
                            },
                            {
                                icon: <Shield size={32} strokeWidth={1} />,
                                title: "SECURITY PROTOCOLS",
                                desc: "End-to-end encryption and verified fulfillment for all transactions."
                            }
                        ].map((benefit, i) => (
                            <div key={i} className="bg-foreground/[0.02] border border-border rounded-[2.5rem] p-10 text-center group hover:border-foreground/20 transition-all">
                                <div className="w-20 h-20 bg-foreground/5 border border-border rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-foreground/10 transition-colors">
                                    <div className="text-foreground/40 group-hover:text-foreground transition-colors">{benefit.icon}</div>
                                </div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-foreground/80">{benefit.title}</h3>
                                <p className="text-[11px] text-foreground/40 leading-relaxed uppercase tracking-tighter">
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Application Form */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        {/* Process Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-foreground/[0.03] border border-border rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 text-foreground/[0.02] group-hover:text-foreground/[0.04] transition-colors pointer-events-none">
                                    <Zap size={150} strokeWidth={0.5} />
                                </div>

                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-foreground/40 mb-10 pb-6 border-b border-border flex items-center gap-4">
                                    <Check size={14} />
                                    Operational Flow
                                </h3>

                                <ul className="space-y-8 relative z-10">
                                    {[
                                        { s: "01", t: "ARCHITECT REVIEW", d: "Submissions analyzed within 24-48 hours via core devops." },
                                        { s: "02", t: "STRIPE INTEGRATION", d: "Onboard via secure Connect protocol for global settlements." },
                                        { s: "03", t: "ASSET ALLOCATION", d: "Initialize listings and reach our elite enterprise audience." }
                                    ].map((step, i) => (
                                        <li key={i} className="flex gap-6 items-start">
                                            <span className="font-heading text-[10px] font-black text-foreground/20 mt-1">{step.s}</span>
                                            <div>
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/80 mb-1">{step.t}</h4>
                                                <p className="text-[9px] text-foreground/40 uppercase tracking-tighter leading-relaxed">{step.d}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center gap-4 p-6 bg-foreground/[0.02] border border-border rounded-3xl">
                                <ShieldCheck size={20} className="text-foreground/20" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30">Standardized Marketplace Agreement Active</span>
                            </div>
                        </div>

                        {/* Form Panel */}
                        <div className="lg:col-span-3 bg-foreground/[0.02] border border-border rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-2xl">
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">EXECUTE <span className="text-secondary">ONBOARDING</span></h2>

                            <BecomeSellerForm />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
