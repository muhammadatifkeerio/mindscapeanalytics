"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * SOURCE OF TRUTH KEYWORDS: syncBrandIcon, theme icon, transparent logo mark, favicon, dark mode
 * WHAT: Points browser icon links at the transparent light or dark M mark.
 * WHY: Browser chrome should follow the site's selected theme rather than only the operating-system preference.
 * WHERE: ThemeToggle and initial theme hydration in src/app/layout.tsx.
 */
function syncBrandIcon(isDark: boolean) {
    const iconPath = isDark
        ? "/images/brand/mindscape-icon-dark-2026.png"
        : "/images/brand/mindscape-icon-light-2026.png";
    document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((icon) => {
        icon.href = iconPath;
    });
}

/**
 * SOURCE OF TRUTH KEYWORDS: theme subscription, root dark class, storage event, theme toggle
 * WHAT: Subscribes React to theme changes made by the theme control or another browser tab.
 * WHY: Keep the control state derived from the root theme without a render-triggering effect.
 * WHERE: Global theme toggle in the shared navigation.
 */
function subscribeToTheme(onChange: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key !== "mindscape-theme") return;
        const isDark = window.localStorage.getItem("mindscape-theme") === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.style.colorScheme = isDark ? "dark" : "light";
        syncBrandIcon(isDark);
        onChange();
    };
    document.documentElement.addEventListener("mindscape-theme-change", onChange);
    window.addEventListener("storage", onStorage);
    return () => {
        document.documentElement.removeEventListener("mindscape-theme-change", onChange);
        window.removeEventListener("storage", onStorage);
    };
}

/**
 * SOURCE OF TRUTH KEYWORDS: root theme snapshot, light mode, dark mode
 * WHAT: Reads the live appearance state set on the document root.
 * WHY: The root bootstrap script runs before React and is the canonical theme state.
 * WHERE: Client snapshot consumed by the global theme toggle.
 */
function getThemeSnapshot() {
    return document.documentElement.classList.contains("dark");
}

/**
 * SOURCE OF TRUTH KEYWORDS: server-rendered theme snapshot, hydration, default light mode
 * WHAT: Supplies the deterministic pre-hydration theme used during server rendering.
 * WHY: Keep server and initial client markup stable until the root theme is available.
 * WHERE: Server snapshot consumed by useSyncExternalStore in the global theme toggle.
 */
function getServerThemeSnapshot() {
    return false;
}

/**
 * SOURCE OF TRUTH KEYWORDS: ThemeToggle, light theme default, dark mode, localStorage, color scheme
 * WHAT: A persistent light/dark appearance control for every public surface.
 * WHY: Light mode is the Mindscape default while visitors can opt into a dark reading environment.
 * WHERE: Global navigation via NavbarInner.
 */
export function ThemeToggle() {
    const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);

    function toggleTheme() {
        const nextIsDark = !isDark;
        document.documentElement.classList.toggle("dark", nextIsDark);
        document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
        window.localStorage.setItem("mindscape-theme", nextIsDark ? "dark" : "light");
        syncBrandIcon(nextIsDark);
        document.documentElement.dispatchEvent(new Event("mindscape-theme-change"));
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
