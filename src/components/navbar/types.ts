export type NavContext = "site" | "shop" | "seller" | "admin";

export type NavIconKey =
    | "shield-check"
    | "activity"
    | "bar-chart-3"
    | "globe"
    | "arrow-left"
    | "layers"
    | "package"
    | "credit-card"
    | "shopping-cart";

export interface NavSubLink {
    name: string;
    href: string;
    icon?: NavIconKey;
}

export interface NavLink {
    name: string;
    label: string;
    href: string;
    icon?: NavIconKey;
    prefetch?: boolean;
    submenu?: NavSubLink[];
}

export interface ContextTheme {
    label: string;
    color: string;
    bg: string;
    border: string;
}

/** Current route used for precise nav active matching (path + hash + query). */
export interface NavLocation {
    pathname: string;
    hash: string;
    searchParams: URLSearchParams;
}
