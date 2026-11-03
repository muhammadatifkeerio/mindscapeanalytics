"use client"

import React from "react"
import { ArrowRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import Image from "@/components/SmartImage"
import { cn } from "@/lib/utils"

export interface PremiumCardProps {
    title: string
    icon: LucideIcon
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
        <div className="group relative h-full bg-card border border-border rounded-2xl flex flex-col p-6 overflow-hidden transition-colors duration-150 hover:border-brand/40">
            {/* Top Tag or Icon */}
            <div className="flex items-center justify-between mb-6 z-10 relative">
                {tag ? (
                    <span className="px-3 py-1 bg-foreground/5 text-foreground text-[10px] font-black tracking-widest uppercase rounded-full border border-border/50">
                        {tag}
                    </span>
                ) : (
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-muted border border-border/50 group-hover:border-foreground/30 transition-colors">
                        <Icon className="h-5 w-5 text-foreground" />
                    </div>
                )}

                {tag && (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted border border-border/50 group-hover:border-foreground/30 transition-colors">
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
                    <div className="relative w-full h-48 lg:h-56 rounded-xl overflow-hidden border border-border/50 group-hover:border-foreground/30 transition-colors">
                        <Image src={image} alt={title} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 480px" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}

                {/* Text Content */}
                <div className={cn("flex flex-col flex-grow", imagePosition === "right" ? "w-full md:w-1/2" : "w-full")}>
                    <h3 className="text-xl font-semibold text-foreground mb-3 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-6 mb-5">
                        {description}
                    </p>

                    {features.length > 0 && (
                        <ul className="space-y-2.5 mb-5 mt-auto">
                            {features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <Link href={link} className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-foreground transition-colors hover:text-brand group/link mt-2 pt-4 border-t border-border">
                        Explore service
                        <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>

                {/* Image Right/Bottom */}
                {image && (imagePosition === "right" || imagePosition === "bottom") && (
                    <div className={cn(
                        "relative rounded-xl overflow-hidden border border-border/50 group-hover:border-foreground/30 transition-colors",
                        imagePosition === "right" ? "w-full md:w-1/2 min-h-[160px]" : "w-full h-48 mt-4"
                    )}>
                        <Image src={image} alt={title} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 480px" className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}
            </div>
        </div>
    )
}
