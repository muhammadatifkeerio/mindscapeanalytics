import ShopClient from "./ShopClient";
import { resolvePagination } from "@/lib/types/pagination";
import * as productService from "@/services/product.service";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
    const products = await productService.listApproved(resolvePagination({ pageSize: 48 }));
    return <ShopClient initialProducts={products} />;
}
