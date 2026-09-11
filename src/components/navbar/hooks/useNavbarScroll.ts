"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 20;

export function useNavbarScroll() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const next = window.scrollY > SCROLL_THRESHOLD;
                setIsScrolled((prev) => (prev === next ? prev : next));
                ticking = false;
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return isScrolled;
}
