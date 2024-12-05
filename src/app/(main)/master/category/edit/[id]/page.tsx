import React from "react";
import EditForm from "./components/edit-form";
import { categoryService } from "@/service/category";
import PageHeader from "@/components/layouts/page-header";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCategoryPage({ params }: Props) {
  const { getCategoryServer } = categoryService;
  const categoryName = await getCategoryServer(Number(params.id));

  return (
    <div>
      <PageHeader title="Edit Kategori" />
      <EditForm
        categoryName={categoryName?.data?.name}
        categorySlug={categoryName?.data?.slug}
      />
    </div>
  );
}
