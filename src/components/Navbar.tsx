import { Suspense } from "react";
import NavbarInner from "@/components/navbar/NavbarInner";
import { NavbarFallback } from "@/components/navbar/NavbarFallback";

export default function Navbar() {
    return (
        <Suspense fallback={<NavbarFallback />}>
            <NavbarInner />
        </Suspense>
    );
}
