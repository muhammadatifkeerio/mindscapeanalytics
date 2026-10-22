import { getProtectedContext } from "@/lib/get-session";
export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Plus, Package, CheckCircle, XCircle, Edit } from "lucide-react";
import { redirect } from "next/navigation";
import DeleteAssetButton from "./DeleteAssetButton";
import * as productService from "@/services/product.service";
import { ROUTES } from "@/config/resources";

export default async function SellerProductsPage() {
    const ctx = await getProtectedContext();

    if (!ctx) {
        redirect(`${ROUTES.signIn}?callbackUrl=/seller/products`);
    }

    if (!ctx.isSeller) {
        redirect(ROUTES.becomeSeller);
    }

    const products = await productService.listForSeller(ctx.userId);

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 flex flex-col items-start justify-between gap-5 border-b border-border pb-8 sm:mb-16 sm:flex-row sm:items-end sm:pb-10 lg:mb-20 lg:pb-12">
                        <div>
                            <h1
                                className="mb-3 text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl"
                                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                            >
                                ASSET <span className="text-foreground/20 not-italic">REGISTRY.</span>
                            </h1>
                            <p className="text-sm text-muted-foreground sm:text-base">Manage and update your published digital assets.</p>
                        </div>
                        <Link href="/seller/products/new">
                            <button className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-sm transition-opacity hover:opacity-90 sm:w-auto">
                                <Plus size={16} />
                                Initialize New Asset
                            </button>
                        </Link>
                    </div>

                    <div className="mb-8 flex items-start gap-3 rounded-xl border border-border bg-muted/60 px-4 py-4 sm:mb-12 sm:px-6">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                            Settlement Protocol: Distributions reflect the aggregate value following a 10-day verification threshold and a 10% enterprise commission deduction.
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center sm:py-24">
                            <Package size={44} strokeWidth={1} className="mx-auto mb-5 text-muted-foreground" />
                            <h2 className="mb-3 text-xl font-semibold tracking-tight">Your inventory is empty</h2>
                            <p className="mb-8 text-sm leading-6 text-muted-foreground">Create a listing to make your digital product available in the shop.</p>
                            <Link href="/seller/products/new">
                                <button className="min-h-11 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
                                    Create an asset listing
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-colors hover:border-brand/30"
                                >
                                    <div className="aspect-[16/10] bg-foreground/5 relative overflow-hidden">
                                        {product.images[0]?.url ? (
                                            <img
                                                src={product.images[0].url}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                                                <Package size={48} strokeWidth={1} />
                                            </div>
                                        )}

                                        {/* Status HUD */}
                                        <div className="absolute top-6 right-6">
                                            {product.approvedForSale ? (
                                            <div className="flex items-center gap-2 rounded-full border border-green-600/20 bg-green-600/10 px-3 py-1 text-[10px] font-semibold text-green-800 dark:text-green-300">
                                                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                                    SYNCHRONIZED
                                                </div>
                                            ) : (
                                            <div className="flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1 text-[10px] font-medium text-muted-foreground">
                                                    <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                                                    PENDING_REVIEW
                                                </div>
                                            )}
                                        </div>

                                        {/* Scanline Effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                                    </div>

                                    <div className="p-4 sm:p-5">
                                        <div className="mb-2 text-xs font-medium capitalize text-muted-foreground">{product.category.replaceAll('_', ' ')}</div>
                                        <h3 className="mb-3 line-clamp-2 text-base font-semibold leading-6">{product.name}</h3>
                                        <p className="mb-5 line-clamp-2 text-sm leading-5 text-muted-foreground">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-border">
                                            <div className="text-lg font-semibold tracking-tight">
                                                <span className="mr-1 text-muted-foreground">$</span>
                                                {product.price}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Link href={`/seller/products/${product.id}/edit`}>
                                                    <button aria-label={`Edit ${product.name}`} className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted active:scale-95">
                                                        <Edit size={16} />
                                                    </button>
                                                </Link>
                                                <DeleteAssetButton
                                                    productId={product.id}
                                                    action={async (formData: FormData) => {
                                                        'use server';
                                                        const { deleteProduct } = await import("@/app/_actions/delete-product");
                                                        await deleteProduct(formData);
                                                        const { revalidatePath } = await import("next/cache");
                                                        revalidatePath("/seller/products");
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
