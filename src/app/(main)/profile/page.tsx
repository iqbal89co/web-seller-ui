import React from "react";
import PageHeader from "@/components/layouts/page-header";
import ProfileDetail from "./components/profile-detail";
import { Toaster } from "@/components/ui/toaster";

export default async function MasterCategoryPage() {
  return (
    <div>
      <PageHeader title="Informasi Akun" />
      <ProfileDetail />
      <Toaster />
    </div>
  );
}
