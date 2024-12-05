import React from "react";
import CategoryList from "./category-list";
import PageHeader from "@/components/layouts/page-header";

export default async function MasterCategoryPage() {
  return (
    <div>
      <PageHeader title="Kategori" />
      <CategoryList />
    </div>
  );
}
