"use client";

import Image from "next/image";
import { useState } from "react";

const cards = [
    {
        name: "Mindscape Analytics",
        front: "/images/brand/mindscape-card-front.webp",
        back: "/images/brand/mindscape-card-back.webp",
    },
    {
        name: "Tenvo",
        front: "/images/tenvo/tenvo-card-front.webp",
        back: "/images/tenvo/tenvo-card-back.webp",
    },
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: BrandCardShowcase, Mindscape business card, Tenvo business card, 3D flip, reduced motion
 * WHAT: Presents the supplied two-sided company cards as accessible flip interactions.
 * WHY: Makes the provided identity assets tangible without reducing their print-quality artwork to decorative thumbnails.
 * WHERE: Marketing homepage brand section.
 */
export default function BrandCardShowcase() {
    const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            {cards.map((card) => {
                const isFlipped = Boolean(flippedCards[card.name]);
                return (
                    <div key={card.name} className="min-w-0">
                        <button
                            type="button"
                            aria-label={`${isFlipped ? "Show front of" : "Show back of"} ${card.name} business card`}
                            aria-pressed={isFlipped}
                            onClick={() => setFlippedCards((current) => ({ ...current, [card.name]: !current[card.name] }))}
                            className="group block w-full rounded-[1.35rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
                        >
                            <span className="sr-only" aria-live="polite">{card.name} card showing {isFlipped ? "back" : "front"}.</span>
                            <span className="business-card-scene block aspect-[1.75] w-full">
                                <span className={`business-card-inner relative block h-full w-full rounded-[1.35rem] shadow-[0_24px_70px_hsl(var(--foreground)/0.14)] ${isFlipped ? "is-flipped" : ""}`}>
                                    <span className="business-card-face absolute inset-0 block overflow-hidden rounded-[1.35rem] ring-1 ring-black/10">
                                        <Image src={card.front} alt="" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                                    </span>
                                    <span className="business-card-face business-card-back absolute inset-0 block overflow-hidden rounded-[1.35rem] ring-1 ring-black/10">
                                        <Image src={card.back} alt="" fill sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                                    </span>
                                </span>
                            </span>
                        </button>
                        <div className="mt-4 flex items-center justify-between gap-4">
                            <p className="font-semibold tracking-tight">{card.name}</p>
                            <p className="text-xs text-muted-foreground">{isFlipped ? "Back" : "Front"} · Hover or tap to flip</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
