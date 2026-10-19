"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * SOURCE OF TRUTH KEYWORDS: syncBrandIcon, theme icon, transparent logo mark, favicon, dark mode
 * WHAT: Points browser icon links at the transparent light or dark M mark.
 * WHY: Browser chrome should follow the site's selected theme rather than only the operating-system preference.
 * WHERE: ThemeToggle and initial theme hydration in src/app/layout.tsx.
 */
function syncBrandIcon(isDark: boolean) {
    const iconPath = isDark
        ? "/images/brand/mindscape-icon-dark.png"
        : "/images/brand/mindscape-icon-light.png";
    document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((icon) => {
        icon.href = iconPath;
    });
}

/**
 * SOURCE OF TRUTH KEYWORDS: ThemeToggle, light theme default, dark mode, localStorage, color scheme
 * WHAT: A persistent light/dark appearance control for every public surface.
 * WHY: Light mode is the Mindscape default while visitors can opt into a dark reading environment.
 * WHERE: Global navigation via NavbarInner.
 */
export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkTheme = document.documentElement.classList.contains("dark");
        setIsDark(isDarkTheme);
        syncBrandIcon(isDarkTheme);
    }, []);

    function toggleTheme() {
        const nextIsDark = !isDark;
        document.documentElement.classList.toggle("dark", nextIsDark);
        document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
        window.localStorage.setItem("mindscape-theme", nextIsDark ? "dark" : "light");
        syncBrandIcon(nextIsDark);
        setIsDark(nextIsDark);
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Use light theme" : "Use dark theme"}
            aria-pressed={isDark}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent"
        >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}
