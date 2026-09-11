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
        <div className="min-h-screen bg-monochrome-cinematic text-foreground relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            </div>
            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-20 pb-12 border-b border-border">
                        <div>
                            <h1
                                className="text-6xl font-black mb-4 uppercase tracking-tighter"
                                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                            >
                                ASSET <span className="text-foreground/20 not-italic">REGISTRY.</span>
                            </h1>
                            <p className="text-foreground/40 text-[11px] font-black uppercase tracking-[0.5em]">Localized Proprietary Architectures</p>
                        </div>
                        <Link href="/seller/products/new">
                            <button className="flex items-center gap-4 px-10 py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/90 shadow-2xl transition-all active:scale-95 group">
                                <Plus size={16} />
                                Initialize New Asset
                            </button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 px-6 py-4 bg-foreground/[0.02] border border-border rounded-2xl mb-12">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30">
                            Settlement Protocol: Distributions reflect the aggregate value following a 10-day verification threshold and a 10% enterprise commission deduction.
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <div className="text-center py-32 border border-dashed border-border rounded-[3rem] bg-foreground/[0.01]">
                            <Package size={80} strokeWidth={0.5} className="mx-auto mb-10 text-foreground/5" />
                            <h2 className="text-xl font-black mb-4 uppercase tracking-tighter">Zero Localizations Localized</h2>
                            <p className="text-foreground/20 text-[10px] font-black uppercase tracking-[0.4em] mb-12 leading-loose">The registry is currently void of architectural primitives.</p>
                            <Link href="/seller/products/new">
                                <button className="px-12 py-5 bg-foreground text-background rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-foreground/90 transition-all">
                                    Initialize First Protocol
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-foreground/[0.02] border border-border rounded-[2.5rem] overflow-hidden group hover:border-foreground/20 transition-all shadow-2xl relative"
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
                                                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2 backdrop-blur-md">
                                                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                                                    SYNCHRONIZED
                                                </div>
                                            ) : (
                                                <div className="px-3 py-1 bg-foreground/5 border border-border text-foreground/40 text-[8px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-2 backdrop-blur-md">
                                                    <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                                                    PENDING_REVIEW
                                                </div>
                                            )}
                                        </div>

                                        {/* Scanline Effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                                    </div>

                                    <div className="p-10">
                                        <div className="text-[8px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-3">{product.category.replace('_', ' ')} //</div>
                                        <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">{product.name}</h3>
                                        <p className="text-foreground/40 text-[10px] font-medium uppercase tracking-tight mb-8 line-clamp-2 leading-relaxed">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-border">
                                            <div className="text-2xl font-black tracking-tightest">
                                                <span className="text-[10px] text-foreground/20 mr-1">$</span>
                                                {product.price}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Link href={`/seller/products/${product.id}/edit`}>
                                                    <button className="w-12 h-12 flex items-center justify-center bg-foreground/5 border border-border rounded-2xl text-foreground/40 hover:text-foreground hover:bg-foreground/10 transition-all active:scale-90">
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
