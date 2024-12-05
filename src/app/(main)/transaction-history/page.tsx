import React from "react";
import PageHeader from "@/components/layouts/page-header";
import { Toaster } from "@/components/ui/toaster";
import TransactionHistoryList from "./transaction-history-list";

export default async function ProductsPage() {
  return (
    <div>
      <PageHeader title="Daftar Transaksi" />
      <TransactionHistoryList />
      <Toaster />
    </div>
  );
}
