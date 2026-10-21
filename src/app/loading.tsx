import Image from "@/components/SmartImage";

/**
 * SOURCE OF TRUTH KEYWORDS: Branded route loading screen, Mindscape logo, light theme
 * WHAT: Lightweight, accessible loading fallback for route segments that suspend while rendering.
 * WHY: Keep navigation feedback on-brand without blocking already-rendered page content behind a timed splash.
 * WHERE: Root App Router loading boundary, inherited by routes without a closer loading.tsx.
 */
export default function Loading() {
    return (
        <main className="grid min-h-[100svh] place-items-center bg-background px-6 text-foreground">
            <div role="status" aria-live="polite" className="flex flex-col items-center gap-6">
                <Image
                    src="/images/brand/mindscape-analytics-logo-dark.webp"
                    alt="Mindscape Analytics"
                    width={220}
                    height={88}
                    priority
                    className="h-auto w-44 sm:w-52"
                />
                <span aria-hidden="true" className="h-5 w-5 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
                <span className="sr-only">Loading Mindscape Analytics</span>
            </div>
        </main>
    );
}
