import { productService } from "@/service/product";
import CashierForm from "./components/cashier-form";
import PageHeader from "@/components/layouts/page-header";
import { Toaster } from "@/components/ui/toaster";

export const dynamic = "force-dynamic";

export default async function CashierPage() {
  const { getAllProductsServer } = productService;

  const products = await getAllProductsServer();

  return (
    <div>
      <PageHeader title="Transaksi" />
      <CashierForm products={products} />
      <Toaster />
    </div>
  );
}
