import React from "react";
import AddForm from "./components/add-form";
import PageHeader from "@/components/layouts/page-header";

type Props = {};

export default function AddProductPage({}: Props) {
  return (
    <div>
      <PageHeader title="Tambah Barang" />
      <AddForm />
    </div>
  );
}
