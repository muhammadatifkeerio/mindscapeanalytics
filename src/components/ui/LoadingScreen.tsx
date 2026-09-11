"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0b]"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.05] blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Mechanical Reveal Text */}
                <div className="overflow-hidden mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                        className="text-3xl md:text-5xl lg:text-7xl font-black text-center flex flex-col items-center tracking-[-0.05em] leading-none uppercase"
                    >
                        <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">MINDSCAPE</span>
                        <span className="text-foreground/20 dark:text-foreground/10 tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs lg:text-sm mt-3 lg:mt-6 font-mono">ANALYTICS</span>
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-6"
                >
                    <span className="text-[10px] font-mono font-black text-white/30 tracking-[0.5em] uppercase">
                        Architecting Intelligence
                    </span>

                    {/* Industrial Progress Bar */}
                    <div className="relative w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="absolute top-0 left-0 h-full bg-white"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/10" />
            <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-white/10" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-white/10" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/10" />
        </motion.div>
    );
}
