"use client";

/**
 * SOURCE OF TRUTH KEYWORDS: FeatureGate, hasPermission, RESOURCES, client mirror
 * WHAT: UX-only permission gate that reuses resolveCapabilities from the adapter.
 * WHY: Client eligibility must mirror the registry; the server block remains authoritative.
 * WHERE: client chrome that should hide actions the actor cannot perform.
 */

import { authClient } from "@/lib/auth-client";
import { hasPermission, resolveCapabilities, toAuthUserFields } from "@/lib/adapters";
import type { Permission } from "@/lib/types";
import type { ReactNode } from "react";

interface FeatureGateProps {
    permission: Permission;
    children: ReactNode;
    fallback?: ReactNode;
}

export function FeatureGate({ permission, children, fallback = null }: FeatureGateProps) {
    const { data: session, isPending } = authClient.useSession();
    if (isPending) return fallback;
    if (!session?.user) return fallback;

    const identity = resolveCapabilities(
        toAuthUserFields({
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
            role: "role" in session.user && typeof session.user.role === "string" ? session.user.role : null,
            isSeller: "isSeller" in session.user && typeof session.user.isSeller === "boolean" ? session.user.isSeller : null,
            sellerVerified:
                "sellerVerified" in session.user && typeof session.user.sellerVerified === "boolean"
                    ? session.user.sellerVerified
                    : null,
        }),
    );
    if (!hasPermission(identity, permission)) return fallback;
    return <>{children}</>;
}
