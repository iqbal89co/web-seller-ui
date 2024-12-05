import React from "react";
import AddForm from "./components/add-form";
import PageHeader from "@/components/layouts/page-header";

export default function AssBrandPage() {
  return (
    <div>
      <PageHeader title="Tambah Merk" />
      <AddForm />
    </div>
  );
}
