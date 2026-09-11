/** CSS-only dropdown visibility — avoids Framer mount/unmount lag on hover */

export const dropdownPanelMotion =
    "transition-[opacity,transform,visibility] duration-150 ease-out";

export function dropdownPanelState(isOpen: boolean): string {
    return isOpen
        ? "opacity-100 translate-y-0 visible pointer-events-auto will-change-[opacity,transform]"
        : "opacity-0 -translate-y-1 invisible pointer-events-none";
}

/** Nav shell / link micro-interactions — prefer targeted props over transition-all */
export const navShellTransition =
    "transition-[padding,background-color,border-color,box-shadow] duration-200 ease-out";
export const navLinkTransition =
    "transition-[color,background-color,opacity,box-shadow] duration-150 ease-out";

export const navFocusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
