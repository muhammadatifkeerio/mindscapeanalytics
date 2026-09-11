"use client";

/**
 * SOURCE OF TRUTH KEYWORDS: ChatWidgetLazy, next/dynamic, ssr:false, code splitting
 * WHAT: Client wrapper so ChatWidget can skip SSR without violating Server Component dynamic() rules.
 * WHY: Root layout is an RSC; Next 16 forbids `dynamic(..., { ssr: false })` there.
 * WHERE: src/app/layout.tsx
 */

import dynamic from "next/dynamic";

export const ChatWidgetLazy = dynamic(() => import("@/components/ChatWidget"), {
    ssr: false,
});
