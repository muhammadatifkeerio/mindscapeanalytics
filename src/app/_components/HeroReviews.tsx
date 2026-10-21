"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Star } from "lucide-react";

const reviews = [
    { name: "wonderboy786", location: "Canada", age: "8 months ago", rating: 5, quote: "A Data Genius!" },
    { name: "goldenJaguar005", location: "United States", age: "5 months ago", rating: 5, quote: "Delivered in a timely manner. Very responsive and accommodating. :)" },
    { name: "potusIn", location: "El Salvador", age: "8 months ago", rating: 5, quote: "Great skills, commitment and good communication with seller along the way. Recommended provider to bring your ideas to reality." },
    { name: "osacar1112", location: "Belgium", age: "8 months ago", rating: 5, quote: "perfect work" },
    { name: "javier_vuela_ll", location: "Colombia", age: "9 months ago", rating: 4.7, quote: "It has been a good user experience. Despite the language gap, the seller has shown all his willingness to solve my doubts and observations. I recommend your services." },
    { name: "omarfr123", location: "United Kingdom", age: "10 months ago", rating: 5, quote: "Excellent work, Zeeshan was on time, polite, professional and I am very happy with the service and results I received. Will use him again and highly recommend." },
    { name: "talsavet", location: "United States", age: "11 months ago", rating: 5, quote: "Great work!!" },
    { name: "amyhumphries279", location: "United Kingdom", age: "11 months ago", rating: 5, quote: "Super fast delivery, exactly what I needed. Great communication. Would recommend." },
    { name: "alexandrasanax", location: "United States", age: "11 months ago", rating: 5, quote: "Great seller, will hire again, thanks!" },
] as const;

/**
 * SOURCE OF TRUTH KEYWORDS: hero reviews, verified Fiverr feedback, 4-second carousel, reduced motion
 * WHAT: A single-row mobile review summary and desktop carousel of the nine supplied client reviews.
 * WHY: Keeps social proof visible in the hero without letting it crowd the headline and primary actions.
 * WHERE: Rendered beneath the homepage hero actions in src/app/HomeClient.tsx.
 */
export default function HeroReviews() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);
    const reduceMotion = useReducedMotion();
    const review = reviews[activeIndex];

    useEffect(() => {
        if (reduceMotion || isPaused || isInteracting) return;
        const intervalId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % reviews.length);
        }, 4000);
        return () => window.clearInterval(intervalId);
    }, [isInteracting, isPaused, reduceMotion]);

    const changeReview = (direction: -1 | 1) => {
        setActiveIndex((current) => (current + direction + reviews.length) % reviews.length);
    };

    return (
        <section
            role="region"
            aria-label="Client reviews from Fiverr"
            aria-roledescription="carousel"
            aria-live="off"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onFocus={() => setIsInteracting(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsInteracting(false);
            }}
            className="mt-5 border-t border-border/80 pt-3 sm:mt-11 sm:pt-4"
        >
            <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:gap-x-5">
                <div role="img" className="flex items-center gap-1 text-brand" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => {
                        const fill = Math.max(0, Math.min(1, review.rating - index));
                        return (
                            <span key={index} className={`relative h-3.5 w-3.5 ${index === 0 ? "inline-flex" : "hidden sm:inline-flex"}`} aria-hidden="true">
                                <Star className="absolute inset-0 h-3.5 w-3.5 fill-border/50 text-border/50" />
                                <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                                    <Star className="h-3.5 w-3.5 fill-current text-brand" />
                                </span>
                            </span>
                        );
                    })}
                    <span className="ml-1 whitespace-nowrap text-[11px] font-semibold text-muted-foreground">{review.rating.toFixed(1)}<span className="hidden sm:inline"> / 5</span></span>
                </div>

                <div className="sr-only min-w-0 sm:not-sr-only sm:col-start-2 sm:row-start-1">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                            key={review.name}
                            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                            transition={{ duration: reduceMotion ? 0 : 0.18 }}
                            className="line-clamp-2 text-sm font-semibold leading-5 text-foreground sm:line-clamp-1"
                        >
                            “{review.quote}”
                        </motion.p>
                    </AnimatePresence>
                </div>

                <div className="col-start-2 row-start-1 flex min-w-0 items-center gap-2 sm:col-start-3">
                    <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand sm:grid" aria-hidden="true">{review.name.slice(0, 1).toUpperCase()}</span>
                    <div className="min-w-0 text-xs leading-4 text-muted-foreground">
                        <p className="truncate"><span className="font-semibold text-foreground">{review.name}</span><span aria-hidden="true"> · </span>{review.location}</p>
                        <p className="truncate">Fiverr client · {review.age}</p>
                    </div>
                </div>

                <div className="col-start-3 row-start-1 flex items-center justify-end gap-0.5 sm:col-start-4">
                    <span className="mr-1 hidden whitespace-nowrap text-[10px] tabular-nums text-muted-foreground sm:inline">{String(activeIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
                    <button type="button" onClick={() => changeReview(-1)} aria-label="Previous review" className="hidden h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid"><ArrowLeft className="h-4 w-4" /></button>
                    {!reduceMotion && <button type="button" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? "Resume automatic reviews" : "Pause automatic reviews"} aria-pressed={isPaused} className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>}
                    <button type="button" onClick={() => changeReview(1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowRight className="h-4 w-4" /></button>
                </div>
            </div>
            <span className="sr-only" aria-live="polite">Review {activeIndex + 1} of {reviews.length}</span>
        </section>
    );
}
