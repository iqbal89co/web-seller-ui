import React from "react";
import ProductList from "./product-list";
import PageHeader from "@/components/layouts/page-header";
import { Toaster } from "@/components/ui/toaster";

export default async function ProductsPage() {
  return (
    <div>
      <PageHeader title="Daftar Barang" />
      <ProductList />
      <Toaster />
    </div>
  );
}
