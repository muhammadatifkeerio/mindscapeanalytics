export const dynamic = "force-dynamic";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ShieldCheck, Server, AlertTriangle } from "lucide-react";

export default async function AdminSettingsPage() {
    const session = await getSession();

    if (!session?.user || session.user.role !== "admin") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <AlertTriangle className="text-red-500 mb-4" size={48} />
                <h2 className="text-2xl font-black uppercase tracking-tight">Access Restricted</h2>
                <p className="text-foreground/40 text-sm uppercase tracking-widest mt-2">Level 4 Administrative privileges required.</p>
            </div>
        );
    }

    const admins = process.env.ALLOWED_ADMINS?.split(",") || [];

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-5xl font-black mb-2 tracking-tighter uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}>
                    PLATFORM CONFIG.
                </h1>
                <p className="text-foreground/40 font-medium uppercase tracking-widest text-sm">Restricted administrative override panel.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Security Section */}
                <div className="p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-border backdrop-blur-md">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-foreground/5 flex items-center justify-center text-blue-400">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-xl font-bold uppercase tracking-tight">Access Control</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] uppercase font-black text-foreground/40 tracking-widest mb-3">Authorized Global Administrators:</p>
                            <div className="flex flex-col gap-2">
                                {admins.map((admin, i) => (
                                    <div key={i} className="px-4 py-3 rounded-xl bg-foreground/5 border border-border text-sm font-mono text-green-400">
                                        {admin}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Toggles */}
                <div className="p-8 rounded-[2.5rem] bg-foreground/[0.02] border border-border backdrop-blur-md">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-foreground/5 flex items-center justify-center text-amber-500">
                            <Server size={20} />
                        </div>
                        <h2 className="text-xl font-bold uppercase tracking-tight">Network Switches</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-border">
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide">Maintenance Mode</h3>
                                <p className="text-[10px] text-foreground/40 uppercase tracking-widest">Halt all seller traffic & checkouts.</p>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-black/50 border border-border text-xs font-black uppercase text-foreground/40 cursor-not-allowed">
                                Disabled
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/5 border border-border">
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide">Global Commission Rate</h3>
                                <p className="text-[10px] text-foreground/40 uppercase tracking-widest">Current institutional take-rate.</p>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-black/50 border border-border text-xs font-black uppercase text-green-400">
                                5.0%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
