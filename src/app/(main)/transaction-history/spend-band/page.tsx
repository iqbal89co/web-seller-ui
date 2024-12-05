import React from "react";
import PageHeader from "@/components/layouts/page-header";
import SpendBand from "./spend-band";

export default async function ProductsPage() {
  return (
    <div>
      <PageHeader title="Daftar Transaksi (Spend Band)" />
      <SpendBand />
    </div>
  );
}
