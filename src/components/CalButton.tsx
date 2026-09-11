"use client";

import React, { ReactNode } from "react";

/**
 * Opens the site chat widget (`open-chat`). Labels must describe chat, not booking.
 */
export default function CalButton({
    children,
    className = "",
    ariaLabel = "Open chat with Mindscape Analytics",
}: {
    children: ReactNode;
    className?: string;
    ariaLabel?: string;
}) {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            className={className}
        >
            {children}
        </button>
    );
}
