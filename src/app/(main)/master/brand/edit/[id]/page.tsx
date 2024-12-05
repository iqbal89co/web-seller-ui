import React from "react";
import EditForm from "./components/edit-form";
import PageHeader from "@/components/layouts/page-header";
import { brandService } from "@/service/brand";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditBrandPage({ params }: Props) {
  const { getBrandServer } = brandService;
  const brand = await getBrandServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Merk" />
      <EditForm brandName={brand?.data?.name} brandSlug={brand?.data?.slug} />
    </div>
  );
}
