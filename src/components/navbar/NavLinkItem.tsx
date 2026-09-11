import Link from "next/link";
import { memo } from "react";
import type { ComponentProps } from "react";
import { isExternalHref } from "./utils";

interface NavLinkItemProps extends Omit<ComponentProps<typeof Link>, "href"> {
    href: string;
    prefetch?: boolean;
}

export const NavLinkItem = memo(function NavLinkItem({ href, prefetch, children, ...props }: NavLinkItemProps) {
    const external = isExternalHref(href);

    return (
        <Link
            href={href}
            prefetch={prefetch ? true : undefined}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            {...props}
        >
            {children}
        </Link>
    );
});
