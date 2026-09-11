
export const dynamic = "force-dynamic";

import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import NewSellerProductClient from "@/app/seller/products/new/NewSellerProductClient";

export default async function NewSellerProductPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/sign-in?callbackUrl=/seller/products/new");
    }

    const isSeller = session.user.role === "seller" || (session.user as any).isSeller;
    const isAdmin = session.user.role === "admin";

    if (!isSeller && !isAdmin) {
        redirect("/become-seller");
    }

    return <NewSellerProductClient />;
}
