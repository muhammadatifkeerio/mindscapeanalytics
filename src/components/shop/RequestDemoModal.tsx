"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Cpu, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export function RequestDemoModal({ isOpen, onClose, productName }: RequestDemoModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    service: `[DEMO REQUEST] ${productName}`,
                    message: message || `I would like to request a demo and more information regarding the asset: ${productName}.`,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error?.message || 'Failed to submit request');
            }

            setSubmitStatus('success');
            setTimeout(() => {
                onClose();
                setTimeout(() => setSubmitStatus('idle'), 500);
            }, 2500);

        } catch (error: any) {
            setSubmitStatus('error');
            setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card dark:bg-[#0f0f11] w-full max-w-md rounded-3xl border border-border shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto relative"
                        >
                            {/* Decorative Top Line */}
                            <div className="h-1 w-full bg-secondary shadow-[0_0_20px_hsl(var(--secondary) / 0.3)]" />

                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none rotate-12">
                                <Cpu size={150} strokeWidth={0.5} />
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground hover:bg-foreground/10 rounded-full transition-all z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8 relative z-10">
                                <div className="mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_hsl(var(--secondary)/0.5)] animate-pulse" />
                                        Protocol Initialization
                                    </span>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">
                                        Request Demo
                                    </h3>
                                    <p className="text-foreground/40 text-xs font-medium uppercase tracking-widest mt-1">
                                        Asset: {productName}
                                    </p>
                                </div>

                                {submitStatus === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-2">
                                            <CheckCircle2 size={32} className="text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black uppercase tracking-widest text-foreground mb-2">Transmission complete</h4>
                                            <p className="text-[11px] text-foreground/40 font-mono uppercase tracking-widest">Our engineers will contact you shortly regarding the demo environment.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-4">
                                            <div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    disabled={isSubmitting}
                                                    placeholder="IDENTIFICATION (NAME)"
                                                    className="w-full bg-foreground/[0.02] border border-border rounded-xl px-5 py-4 text-xs text-foreground placeholder:text-foreground/20 font-black tracking-widest focus:outline-none focus:border-foreground/30 focus:bg-foreground/[0.05] transition-all uppercase disabled:opacity-50"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    disabled={isSubmitting}
                                                    placeholder="COMM LINK (EMAIL)"
                                                    className="w-full bg-foreground/[0.02] border border-border rounded-xl px-5 py-4 text-xs text-foreground placeholder:text-foreground/20 font-black tracking-widest focus:outline-none focus:border-foreground/30 focus:bg-foreground/[0.05] transition-all uppercase disabled:opacity-50"
                                                />
                                            </div>
                                            <div>
                                                <textarea
                                                    name="message"
                                                    disabled={isSubmitting}
                                                    placeholder="ADDITIONAL PARAMETERS (OPTIONAL MESSAGE)"
                                                    rows={3}
                                                    className="w-full bg-foreground/[0.02] border border-border rounded-xl px-5 py-4 text-xs text-foreground placeholder:text-foreground/20 font-black tracking-widest focus:outline-none focus:border-foreground/30 focus:bg-foreground/[0.05] transition-all uppercase resize-none disabled:opacity-50 custom-scrollbar"
                                                />
                                            </div>
                                        </div>

                                        {submitStatus === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-3"
                                            >
                                                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                                                <p className="text-[10px] text-red-400 font-mono tracking-widest uppercase">{errorMessage}</p>
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full mt-2 bg-foreground text-background py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-3 h-3 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                                                    Uplinking...
                                                </span>
                                            ) : (
                                                <>
                                                    Transmit Request
                                                    <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                        <p className="text-center text-[8px] text-foreground/20 uppercase tracking-[0.2em] mt-3">
                                            By requesting a demo, you agree to our terms of service and communications policy.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
