"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { Linkedin, Github } from "@/components/icons/brand-icons";

const platformLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Pricing", href: "/pricing" },
];

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms of Service", href: "/legal/terms" },
];

const socialLinks = [
    { Icon: Linkedin, href: "https://linkedin.com/company/mindscapeanalytics", label: "LinkedIn" },
    { Icon: MessageSquare, href: "https://cal.com/mindscape/strategy", label: "Book Strategy Call" },
    { Icon: Github, href: "https://github.com/mindscapeai", label: "GitHub" },
    { Icon: Mail, href: "mailto:contact@mindscapeanalytics.com", label: "Email" }
];

export default function Footer() {
    return (
        <footer className="relative bg-transparent border-t border-border pt-16 md:pt-24 pb-0 overflow-hidden">
            {/* Shimmering Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsla(var(--foreground),0.05),transparent_50%)] pointer-events-none" />

            <div className="container-standard relative z-20 pb-32 md:pb-40 lg:pb-64">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-20">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8"
                    >
                        <Link href="/" className="inline-block group relative w-fit">
                            {/* HUD Bracket */}
                            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <Image
                            src="/images/logo/mindscape-analytics.png"
                            alt="Mindscape Analytics"
                            width={220}
                            height={52}
                            className="h-12 w-auto object-contain brightness-0 invert contrast-125 opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        </Link>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black tracking-[0.3em] uppercase text-foreground not-italic">
                                Institutional // Intelligence
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-secondary rounded-full shadow-[0_0_10px_hsl(var(--secondary) / 0.6)]" />
                                <span className="text-meta opacity-90 text-foreground/80 dark:text-foreground/70">Core // NODE_v4.02</span>
                            </div>
                            <p className="text-foreground/80 dark:text-foreground/70 text-sm leading-relaxed max-w-sm font-medium tracking-tight">
                                Architecting state-of-the-art AI automation and software solutions for the next generation of global enterprises.
                            </p>

                            <div className="flex flex-col items-center lg:items-start space-y-4 pt-6 border-t border-border text-center lg:text-left">
                                <div className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group">
                                    <MapPin size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs font-mono tracking-widest uppercase flex items-center gap-2 font-bold">
                                        Sheridan, WY, USA 🇺🇸
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group">
                                    <Mail size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs font-mono tracking-widest uppercase font-bold">info@mindscapeanalytics.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors group">
                                    <Phone size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-xs font-mono tracking-widest uppercase font-bold">+1 307 210 6155</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Platform Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-8"
                    >
                        <h4 className="text-foreground/90 font-black text-xs uppercase tracking-[0.4em] opacity-80 dark:opacity-50 border-l-2 border-border pl-4">Platform // Directory</h4>
                        <ul className="space-y-4">
                            {platformLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-foreground/80 dark:text-foreground/60 hover:text-foreground hover:text-secondary dark:hover:text-foreground transition-all text-sm font-bold flex items-center group"
                                    >
                                        <span className="w-0 h-px bg-secondary dark:bg-foreground group-hover:w-4 transition-all mr-0 group-hover:mr-3" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h4 className="text-foreground/90 font-black text-xs uppercase tracking-[0.4em] opacity-80 dark:opacity-50 border-l-2 border-border pl-4">Company // Access</h4>
                        <ul className="space-y-4">
                            {companyLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-foreground/80 dark:text-foreground/60 hover:text-foreground hover:text-secondary dark:hover:text-foreground transition-all text-sm font-bold flex items-center group"
                                    >
                                        <span className="w-0 h-px bg-secondary dark:bg-foreground group-hover:w-4 transition-all mr-0 group-hover:mr-3" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/legal/seller"
                                    className="text-foreground/70 hover:text-foreground transition-all text-sm font-bold flex items-center group"
                                >
                                    <span className="w-0 h-px bg-foreground group-hover:w-4 transition-all mr-0 group-hover:mr-3" />
                                    Seller Policy
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter & Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <h4 className="text-foreground/90 font-black text-xs uppercase tracking-[0.4em] opacity-80 dark:opacity-50 border-l-2 border-border pl-4">Terminal // Sync</h4>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const email = (e.target as any).email.value;
                                if (!email) return;
                                try {
                                    // Save to CRM
                                    fetch('/api/leads', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            email,
                                            source: 'newsletter',
                                            service: 'Newsletter',
                                            message: 'Newsletter subscription from footer',
                                        })
                                    });
                                    // Also send notification email
                                    const res = await fetch('/api/contact', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            name: 'Newsletter Subscriber',
                                            email: email,
                                            service: 'Newsletter',
                                            message: 'New newsletter subscription request.'
                                        })
                                    });
                                    if (res.ok) {
                                        alert('Subscription protocol initiated.');
                                        (e.target as any).reset();
                                    }
                                } catch (err) {
                                    console.error('Newsletter error:', err);
                                }
                            }}
                            className="relative group"
                        >
                            <input
                                name="email"
                                type="email"
                                placeholder="IDENTIFY EMAIL"
                                className="w-full h-14 border border-border/80 rounded-xl px-6 text-base md:text-xs text-foreground placeholder:text-foreground/50 dark:placeholder:text-foreground/30 font-black tracking-widest focus:outline-none focus:border-secondary transition-all uppercase font-mono shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] bg-card dark:bg-[#0f0f11]"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 h-10 w-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-xl active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                        <div className="flex gap-4">
                            {socialLinks.map(({ Icon, href, label }, i) => (
                                <motion.a
                                    key={i}
                                    href={href}
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-foreground hover:text-secondary hover:border-secondary/60 !border-border/100 transition-all border shadow-md bg-card dark:bg-[#0f0f11]"
                                    title={label}
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Massive Metallic Shimmer Background Text */}
            <div className="absolute inset-x-0 bottom-24 md:bottom-16 pointer-events-none select-none flex items-end justify-center z-0 overflow-hidden opacity-30 dark:opacity-70 h-[30%] md:h-[60%] lg:h-[80%]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full flex justify-center"
                >
                    <h2
                        className="w-full text-center font-black font-heading tracking-[-0.05em] leading-[0.75] text-transparent bg-clip-text flex flex-col pointer-events-none whitespace-nowrap"
                        style={{
                            fontSize: "clamp(3rem, 15vw, 25rem)",
                            backgroundImage: "linear-gradient(180deg, hsla(var(--foreground),0.12) 0%, hsla(var(--foreground),0.02) 100%)",
                        }}
                    >
                        <span>MINDSCAPE</span>
                        <span>ANALYTICS</span>
                    </h2>
                </motion.div>
            </div>

            {/* Final Bottom Bar */}
            <div className="absolute bottom-0 inset-x-0 z-30 w-full border-t border-border bg-background/90 md:bg-background/40 backdrop-blur-xl">
                <div className="container-standard py-6 md:py-4 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
                    <p className="text-foreground/40 text-[9px] font-mono font-black tracking-[0.3em] uppercase text-center md:text-left">
                        © 2026 // MINDSCAPE ANALYTICS LLC. <span className="hidden md:inline">FOUNDED 2025. ALL RIGHTS RESERVED.</span>
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8">
                        <span className="text-foreground/30 text-[7px] md:text-[8px] font-black tracking-[0.4em] uppercase flex items-center gap-2 group hover:text-foreground transition-colors cursor-default">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-400 transition-colors shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                            System Active
                        </span>
                        <span className="text-foreground/30 text-[7px] md:text-[8px] font-black tracking-[0.4em] uppercase flex items-center gap-2 group hover:text-foreground transition-colors cursor-default">
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-foreground/20 rounded-full group-hover:bg-foreground transition-colors" />
                            Grade-A Security
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
