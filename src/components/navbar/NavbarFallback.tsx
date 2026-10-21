import Link from "next/link";
import Image from "@/components/SmartImage";
import { cn } from "@/lib/utils";
import { navShellTransition } from "@/components/navbar/motion";

/** Minimal shell shown while nav location (search params) resolves  -  prevents layout shift. */
/**
 * SOURCE OF TRUTH KEYWORDS: NavbarFallback, safe-area inset, loading shell, mobile viewport, layout stability
 * WHAT: Minimal fixed navigation shell used while the route-aware navbar resolves.
 * WHY: Match the final header's phone safe-area spacing so hydration does not cause a vertical jump.
 * WHERE: Suspense fallback from src/components/Navbar.tsx on public routes.
 */
export function NavbarFallback() {
    return (
        <nav
            aria-label="Primary Navigation"
            aria-busy="true"
            className={cn(
                "pointer-events-none fixed top-0 left-0 right-0 z-50 px-4 md:px-0 flex flex-col items-center pt-[max(1.5rem,env(safe-area-inset-top))] sm:pt-8",
                navShellTransition
            )}
        >
            <div className="pointer-events-auto w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full border border-transparent">
                <Link href="/" aria-label="Mindscape Analytics Home" className="flex items-center dark:rounded-md dark:bg-white dark:px-1 dark:py-0.5">
                    <Image
                        src="/images/brand/mindscape-analytics-logo-dark.webp"
                        alt=""
                        width={180}
                        height={62}
                        className="h-8 w-auto object-contain opacity-100 sm:h-9"
                        priority
                    />
                </Link>
                <div className="h-10 w-10 xl:hidden rounded-2xl bg-secondary/5 border border-secondary/10" aria-hidden />
            </div>
        </nav>
    );
}
