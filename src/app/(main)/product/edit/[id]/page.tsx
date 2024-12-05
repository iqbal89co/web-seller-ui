import React from "react";
import EditForm from "./components/edit-form";
import PageHeader from "@/components/layouts/page-header";
import { productService } from "@/service/product";
import { Toaster } from "@/components/ui/toaster";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditProductPage({ params }: Props) {
  const { getProductServer } = productService;
  const product = await getProductServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Barang" />
      <EditForm
        code={product?.data?.code}
        name={product?.data?.name}
        unit={product?.data?.unit}
        barcode={product?.data?.barcode}
        category_id={product?.data?.category_id}
        brand_id={product?.data?.brand_id}
        selling_price={product?.data?.selling_price}
      />
      <Toaster />
    </div>
  );
}
