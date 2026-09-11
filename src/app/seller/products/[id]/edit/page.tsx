
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
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link href="/seller/products" className="inline-flex items-center gap-2 text-foreground/40 hover:text-foreground mb-12 transition-all group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Registry</span>
                    </Link>

                    <div className="mb-16">
                        <h1
                            className="text-6xl font-black mb-4 uppercase tracking-tighter"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                        >
                            RECONFIGURE <span className="text-foreground/20">ASSET.</span>
                        </h1>
                        <p className="text-muted-foreground text-[11px] font-black uppercase tracking-[0.5em]">Authorized Listing Re-Configuration</p>
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
