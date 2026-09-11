import type { CSSProperties } from "react";

/** Accessible focus ring, mirroring the navbar's `navFocusRing` (brand-neutral `--ring`). */
export const heroFocusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Brand ease-out (Emil / design engineering — strong ease-out, never ease-in). */
export const heroEase = "cubic-bezier(0.23, 1, 0.32, 1)";

/** Stagger delay for the CSS-only `.hero-reveal` keyframe. Non-LCP elements only. */
export function heroRevealStyle(delayMs: number): CSSProperties {
    return { animationDelay: `${delayMs}ms` };
}
