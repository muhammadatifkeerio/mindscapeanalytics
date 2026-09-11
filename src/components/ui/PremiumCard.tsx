"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface PremiumCardProps {
    title: string
    icon: React.ComponentType<any>
    description: string
    features?: string[]
    link: string
    image?: string
    imagePosition?: "top" | "right" | "bottom"
    tag?: string
    index?: number
}

export function PremiumCard({
    title,
    icon: Icon,
    description,
    features = [],
    link,
    image,
    imagePosition = "top",
    tag
}: PremiumCardProps) {
    return (
        <div className="group relative h-full bg-card dark:bg-[#0f0f11] border border-border/50 dark:border-[#27272a] rounded-[2rem] flex flex-col p-6 overflow-hidden">
            {/* Top Tag or Icon */}
            <div className="flex items-center justify-between mb-6 z-10 relative">
                {tag ? (
                    <span className="px-3 py-1 bg-foreground/5 text-foreground text-[10px] font-black tracking-widest uppercase rounded-full border border-border/50">
                        {tag}
                    </span>
                ) : (
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-card dark:bg-[#1a1a1c] border border-border/50 dark:border-[#27272a] group-hover:border-foreground/30 transition-colors">
                        <Icon className="h-5 w-5 text-foreground" />
                    </div>
                )}

                {tag && (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-card dark:bg-[#1a1a1c] border border-border/50 dark:border-[#27272a] group-hover:border-foreground/30 transition-colors">
                        <Icon className="h-4 w-4 text-foreground" />
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className={cn(
                "flex z-10 relative flex-grow",
                imagePosition === "right" ? "flex-col md:flex-row items-stretch gap-6" : "flex-col gap-4"
            )}>
                
                {/* Image Top */}
                {image && imagePosition === "top" && (
                    <div className="relative w-full h-48 lg:h-56 rounded-xl overflow-hidden border border-border/50 dark:border-[#27272a] group-hover:border-foreground/30 transition-colors">
                        <Image src={image} alt={title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}

                {/* Text Content */}
                <div className={cn("flex flex-col flex-grow", imagePosition === "right" ? "w-full md:w-1/2" : "w-full")}>
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground dark:text-white mb-3 tracking-tight group-hover:text-foreground/80 transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted-foreground dark:text-zinc-400 text-xs leading-relaxed mb-6">
                        {description}
                    </p>

                    {features.length > 0 && (
                        <div className="space-y-2 mb-6 mt-auto">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center text-[9px] font-mono font-bold text-muted-foreground dark:text-zinc-400 uppercase tracking-wider">
                                    <div className="w-1 h-1 bg-foreground/50 rounded-full mr-2" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    )}

                    <Link href={link} className="mt-auto inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-foreground hover:text-foreground/80 transition-colors group/link mt-4 pt-4 border-t border-border/50 dark:border-[#27272a]/50">
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>

                {/* Image Right/Bottom */}
                {image && (imagePosition === "right" || imagePosition === "bottom") && (
                    <div className={cn(
                        "relative rounded-xl overflow-hidden border border-border/50 dark:border-[#27272a] group-hover:border-foreground/30 transition-colors",
                        imagePosition === "right" ? "w-full md:w-1/2 min-h-[160px]" : "w-full h-48 mt-4"
                    )}>
                        <Image src={image} alt={title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}
            </div>
        </div>
    )
}
