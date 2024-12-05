import React from "react";
import AddForm from "./components/add-form";
import PageHeader from "@/components/layouts/page-header";

export default function AddCategoryPage() {
  return (
    <div>
      <PageHeader title="Tambah Kategori" />
      <AddForm />
    </div>
  );
}
