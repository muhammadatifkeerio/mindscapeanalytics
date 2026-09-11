import type { NavContext, NavLink, NavLocation, NavSubLink } from "./types";

export function getNavContext(pathname: string): NavContext {
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/seller") || pathname.startsWith("/become-seller")) return "seller";
    if (
        pathname.startsWith("/shop") ||
        pathname.startsWith("/cart") ||
        pathname.startsWith("/checkout") ||
        pathname.startsWith("/product")
    ) {
        return "shop";
    }
    return "site";
}

export function isExternalHref(href: string): boolean {
    return href.startsWith("http");
}

/** Strip query string and hash from an internal href for path comparison. */
export function normalizeNavPath(href: string): string {
    if (isExternalHref(href)) return href;
    return href.split("#")[0].split("?")[0] || "/";
}

interface ParsedInternalHref {
    path: string;
    hash: string;
    query: URLSearchParams;
}

export function parseInternalHref(href: string): ParsedInternalHref | null {
    if (isExternalHref(href)) return null;

    const hashIndex = href.indexOf("#");
    const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    const hash = hashIndex >= 0 ? href.slice(hashIndex + 1).split("?")[0] : "";

    const queryIndex = withoutHash.indexOf("?");
    const path = (queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash) || "/";
    const queryString = queryIndex >= 0 ? withoutHash.slice(queryIndex + 1) : "";

    return { path, hash, query: new URLSearchParams(queryString) };
}

function pathsMatch(pathname: string, hrefPath: string): boolean {
    const normalizedPath = normalizeNavPath(pathname);
    const normalizedHref = normalizeNavPath(hrefPath);

    if (normalizedHref === "/") {
        return normalizedPath === "/";
    }

    return (
        normalizedPath === normalizedHref ||
        normalizedPath.startsWith(`${normalizedHref}/`)
    );
}

function queryEntriesMatch(hrefQuery: URLSearchParams, location: NavLocation): boolean {
    for (const [key, value] of hrefQuery.entries()) {
        if (location.searchParams.get(key) !== value) return false;
    }
    return true;
}

function hasQueryEntries(params: URLSearchParams): boolean {
    return [...params.keys()].length > 0;
}

/** Match internal href against full location (path, hash, query). */
export function hrefMatchesLocation(href: string, location: NavLocation): boolean {
    const parsed = parseInternalHref(href);
    if (!parsed) return false;

    if (parsed.path === "/") {
        if (normalizeNavPath(location.pathname) !== "/") return false;
    } else if (!pathsMatch(location.pathname, parsed.path)) {
        return false;
    }

    const hrefHasHash = parsed.hash.length > 0;
    const hrefHasQuery = hasQueryEntries(parsed.query);

    if (hrefHasHash && location.hash !== parsed.hash) return false;
    if (hrefHasQuery && !queryEntriesMatch(parsed.query, location)) return false;

    if (!hrefHasHash && !hrefHasQuery) {
        if (location.hash) return false;
        if (location.searchParams.toString()) return false;
    }

    return true;
}

export function isNavSubLinkActive(location: NavLocation, sub: NavSubLink): boolean {
    if (isExternalHref(sub.href)) return false;

    const subPath = normalizeNavPath(sub.href);
    if (subPath === "/") return false;

    return hrefMatchesLocation(sub.href, location);
}

export function isNavLinkActive(location: NavLocation, link: NavLink): boolean {
    if (link.submenu?.length) {
        if (pathsMatch(location.pathname, link.href)) return true;
        return link.submenu.some((sub) => isNavSubLinkActive(location, sub));
    }

    return hrefMatchesLocation(link.href, location);
}
