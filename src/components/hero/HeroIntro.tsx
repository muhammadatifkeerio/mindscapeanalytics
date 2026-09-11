"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";

const STORAGE_KEY = "msa-intro-shown";
const DURATION_MS = 1100;

/**
 * Branded site-load intro. Overlay only — hero paints underneath (LCP-safe).
 * Skippable via button or Escape. Skipped under reduced-motion / after first play.
 */
export default function HeroIntro() {
    const [visible, setVisible] = useState(false);

    const dismiss = useCallback(() => {
        setVisible(false);
        sessionStorage.setItem(STORAGE_KEY, "1");
    }, []);

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
        if (reduceMotion || alreadyShown) return;

        setVisible(true);
        const timer = window.setTimeout(dismiss, DURATION_MS);
        return () => window.clearTimeout(timer);
    }, [dismiss]);

    useEffect(() => {
        if (!visible) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") dismiss();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [visible, dismiss]);

    return (
        <AnimatePresence>
            {visible ? (
                <motion.div
                    key="intro-shell"
                    className="fixed inset-0 z-[9999]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                    <LoadingScreen />
                    <button
                        type="button"
                        onClick={dismiss}
                        className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4 z-[10000] rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-sans text-xs font-medium text-white/70 backdrop-blur-sm transition-[color,background-color,border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.97] md:right-8"
                    >
                        Skip
                    </button>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
