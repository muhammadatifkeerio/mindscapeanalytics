export const dynamic = "force-dynamic";
import { notFound, redirect } from "next/navigation";
import { getProtectedContext } from "@/lib/get-session";
import EditProductClient from "./EditProductClient";
import * as productService from "@/services/product.service";
import { ROUTES } from "@/config/resources";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const ctx = await getProtectedContext();
    if (!ctx) redirect(ROUTES.signIn);

    const product = await productService.getById(id);
    if (!product) notFound();
    if (!ctx.hasFullAccess && product.sellerId !== ctx.userId) {
        redirect("/admin/products");
    }

    return <EditProductClient product={product} />;
}
