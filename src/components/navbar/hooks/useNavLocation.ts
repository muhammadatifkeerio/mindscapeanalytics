"use client";

import { useMemo, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { NavLocation } from "@/components/navbar/types";

function subscribeToHash(onChange: () => void) {
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
}

function getClientHash() {
    return window.location.hash.slice(1);
}

function getServerHash() {
    return "";
}

export function useNavLocation(): NavLocation {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hash = useSyncExternalStore(subscribeToHash, getClientHash, getServerHash);

    return useMemo(
        () => ({
            pathname,
            hash,
            searchParams: new URLSearchParams(searchParams.toString()),
        }),
        [pathname, hash, searchParams]
    );
}
