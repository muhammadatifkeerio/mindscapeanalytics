
import { notFound, redirect } from "next/navigation";
import { getProtectedContext } from "@/lib/get-session";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/_actions/product";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import * as productService from "@/services/product.service";
import { ROUTES } from "@/config/resources";

export default async function SellerEditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const ctx = await getProtectedContext();

    if (!ctx) {
        redirect(`${ROUTES.signIn}?callbackUrl=/seller/products/${id}/edit`);
    }

    const product = await productService.getById(id);
    if (!product) notFound();
    if (!ctx.hasFullAccess && product.sellerId !== ctx.userId) {
        redirect("/seller");
    }

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller/products" className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-12">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to inventory</span>
                    </Link>

                    <div className="mb-8 sm:mb-12">
                        <h1
                            className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl"
                        >
                            Edit asset
                        </h1>
                        <p className="text-sm text-muted-foreground">Update your listing details and published files.</p>
                    </div>

                    <ProductForm
                        initialData={product}
                        action={updateProduct}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
