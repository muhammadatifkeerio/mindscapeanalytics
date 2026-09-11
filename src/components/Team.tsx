"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Linkedin } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

const team = [
    {
        name: "Zeeshan Keerio",
        role: "Founder & CEO",
        bio: "Visionary AI specialist with extensive experience in developing cutting-edge artificial intelligence solutions.",
        image: "/images/team/founder.webp",
        linkedin: "https://linkedin.com/in/zeeshan-keerio",
        email: "mailto:zeeshan.keerio@mindscapeanalytics.com"
    },
    {
        name: "Muhammad Atif",
        role: "Full Stack Developer",
        bio: "Versatile developer specializing in creating scalable, user-friendly applications with modern technologies.",
        image: "/images/team/muhammad-atif-new.jpeg",
        linkedin: "#",
        email: "mailto:atif@mindscapeanalytics.com"
    },
    {
        name: "Saleem Raza",
        role: "Accounting and Finance Business Consultant",
        bio: "Worked closely with clients to understand their business needs, configure accounting modules, and ensure accurate data migration and smooth system integration. Also delivered user training and post-implementation support to ensure a seamless transition.",
        image: "/images/team/saleem-raza.jpeg",
        linkedin: "#",
        email: "#"
    },
    {
        name: "Ghulam Akbar",
        role: "Business Dev Manager",
        bio: "Strategic leader focused on driving growth through market expansion and high-value partnerships.",
        image: "/images/team/Akbar_keerio.webp",
        linkedin: "#",
        email: "mailto:akbar@mindscapeanalytics.com"
    },
    {
        name: "Syed Athar",
        role: "Brand & Media Specialist",
        bio: "Creative expert dedicated to building compelling brand identities and high-impact digital media strategies.",
        image: "/images/team/syed-ather.webp",
        linkedin: "#",
        email: "#"
    },
    {
        name: "Farhan Murad",
        role: "Cybersecurity Analyst",
        bio: "Security specialist focused on proactive threat detection and ensuring the integrity of digital infrastructure.",
        image: "/images/team/farhankeerio.webp",
        linkedin: "#",
        email: "#"
    }
];

// Team card with 3D tilt effect
function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    return (
        <div className="group relative">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl bg-transparent border border-border overflow-hidden transition-all duration-500 will-change-transform group-hover:border-foreground/20 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* --- HUD Elements --- */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-border z-20 group-hover:border-white/30 transition-colors" />
                <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-border z-20 group-hover:border-white/30 transition-colors" />

                <div className="absolute top-1/2 left-2 flex flex-col gap-1 items-center opacity-5 z-20 font-mono">
                    <span className="text-[8px] vertical-text py-2">MEMBER_ID:00{index + 1}</span>
                    <div className="w-[1px] h-8 bg-foreground" />
                </div>
                <div className="aspect-[3/4] relative overflow-hidden">
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            priority={index < 3}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                    <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase font-heading transition-colors leading-none">{member.name}</h3>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="w-1 h-1 bg-foreground/40 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                            <p className="text-[10px] font-mono uppercase text-foreground/20">{member.role}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <p className="text-foreground/40 text-[13px] leading-relaxed mb-5 group-hover:text-foreground/60 transition-colors line-clamp-3">
                        {member.bio}
                    </p>
                    <div className="flex gap-4">
                        <a
                            href={member.linkedin}
                            className="w-10 h-10 rounded-xl bg-foreground/5 border border-border flex items-center justify-center text-foreground/20 hover:text-foreground hover:bg-foreground/10 hover:border-foreground/20 transition-all"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                            href={member.email}
                            className="w-10 h-10 rounded-xl bg-foreground/5 border border-border flex items-center justify-center text-foreground/20 hover:text-foreground hover:bg-foreground/10 hover:border-foreground/20 transition-all"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </div>
    );
}

export default function Team() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const isInView = useInView(sectionRef);
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate team members for seamless loop
    const duplicatedTeam = [...team, ...team, ...team];

    const startAnimation = useCallback(async () => {
        if (!containerRef.current) return;

        const scrollWidth = containerRef.current.scrollWidth / 3;

        await controls.start({
            x: [0, -scrollWidth],
            transition: {
                duration: 25,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
            }
        });
    }, [controls]);

    useEffect(() => {
        if (isInView && !isPaused) {
            startAnimation();
        } else {
            controls.stop();
        }
    }, [isInView, isPaused, startAnimation, controls]);

    return (
        <section ref={sectionRef} id="team" className="relative pt-0 pb-32 overflow-hidden bg-transparent">
            {/* Parallax background accent removed for performance */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-foreground/[0.03] blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full">
                <div className="mb-16 px-6 md:px-12">
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground font-heading leading-[0.85]">
                        THE{" "}
                        <span className="text-foreground/30">
                            ARCHITECTS.
                        </span>
                    </h2>
                </div>

                <div
                    className="relative w-full overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <motion.div
                        ref={containerRef}
                        animate={controls}
                        className="flex gap-8 px-4 transform-gpu-fix"
                        style={{ width: "max-content" }}
                    >
                        {duplicatedTeam.map((member, index) => (
                            <div key={`${member.name}-${index}`} className="w-[300px] md:w-[380px] flex-shrink-0">
                                <TeamCard member={member} index={index % team.length} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
