import React from "react";
import PageHeader from "@/components/layouts/page-header";
import BrandList from "./brand-list";

export default async function MasterCategoryPage() {
  return (
    <div>
      <PageHeader title="Merk" />
      <BrandList />
    </div>
  );
}
