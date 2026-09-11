import type { ContextTheme, NavContext, NavLink } from "@/components/navbar/types";

const siteLinks: NavLink[] = [
    {
        name: "Solutions",
        label: "AI & Data Solutions",
        href: "/solutions",
        submenu: [
            { name: "AI & GenAI", href: "/solutions/ai-genai" },
            { name: "Blockchain & Ledger", href: "/solutions/blockchain" },
            { name: "Cloud Infrastructure", href: "/solutions/cloud-infrastructure" },
            { name: "Enterprise Systems", href: "/solutions/enterprise-software" },
        ],
    },
    {
        name: "Our Products",
        label: "Flagship Platforms",
        href: "/projects",
        submenu: [
            { name: "DisposIQ", href: "https://disposiq.mindscapeanalytics.com/" },
            { name: "Smart DairyFarm", href: "https://cattle.mindscapeanalytics.com/" },
            { name: "RSIQ Pro", href: "https://rsiq.mindscapeanalytics.com/" },
            { name: "Tenvo", href: "https://tenvo.mindscapeanalytics.com/" },
            { name: "CyberTrader-X", href: "https://traderx.mindscapeanalytics.com/" },
            { name: "Agentic Hub", href: "/" },
        ],
    },
    {
        name: "Services",
        label: "Execution Services",
        href: "/services",
        submenu: [
            { name: "Strategic Analytics", href: "/services#analytics" },
            { name: "Data Engineering", href: "/services#engineering" },
            { name: "Custom Development", href: "/services#development" },
        ],
    },
    { name: "Shop", label: "AI Asset Shop", href: "/shop", prefetch: true },
    { name: "Insights", label: "Market Insights", href: "/blog" },
    { name: "About", label: "Institutional Profile", href: "/about" },
];

const shopLinks: NavLink[] = [
    { name: "All Assets", label: "Full Shop Inventory", href: "/shop" },
    {
        name: "Categories",
        label: "Shop Categories",
        href: "/shop",
        submenu: [
            { name: "AI Models", href: "/shop?category=AI Models" },
            { name: "Datasets", href: "/shop?category=Datasets" },
            { name: "SaaS Apps", href: "/shop?category=SaaS" },
        ],
    },
    { name: "Cart", label: "Checkout Process", href: "/cart", icon: "shopping-cart" },
    { name: "Corporate", label: "Return to Main Site", href: "/", icon: "globe" },
];

const sellerLinks: NavLink[] = [
    { name: "Dashboard", label: "Seller Stats", href: "/seller", icon: "bar-chart-3" },
    { name: "Inventory", label: "Manage Products", href: "/seller/products", icon: "package" },
    { name: "Payments", label: "Revenue Tracking", href: "/seller/payments", icon: "credit-card" },
    { name: "Exit", label: "Return to Site", href: "/", icon: "arrow-left" },
];

const adminLinks: NavLink[] = [
    { name: "Console", label: "Admin HUD", href: "/admin", icon: "shield-check" },
    { name: "Assets", label: "Global Inventory", href: "/admin/products", icon: "layers" },
    { name: "Orders", label: "Customer Orders", href: "/admin/orders", icon: "shopping-cart" },
    { name: "Revenue", label: "Platform Payouts", href: "/admin/payments", icon: "activity" },
    { name: "Exit", label: "Return to Site", href: "/", icon: "arrow-left" },
];

export function getNavLinks(context: NavContext): NavLink[] {
    switch (context) {
        case "shop":
            return shopLinks;
        case "seller":
            return sellerLinks;
        case "admin":
            return adminLinks;
        default:
            return siteLinks;
    }
}

export function getContextTheme(context: NavContext): ContextTheme | null {
    switch (context) {
        case "admin":
            return {
                label: "ADMIN CONSOLE",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-600/10 dark:bg-emerald-400/10",
                border: "border-emerald-600/20 dark:border-emerald-400/20",
            };
        case "seller":
            return {
                label: "SELLER TERMINAL",
                color: "text-amber-600 dark:text-amber-400",
                bg: "bg-amber-600/10 dark:bg-amber-400/10",
                border: "border-amber-600/20 dark:border-amber-400/20",
            };
        case "shop":
            return {
                label: "AI ASSET SHOP",
                color: "text-secondary",
                bg: "bg-secondary/10",
                border: "border-secondary/20",
            };
        default:
            return null;
    }
}
