/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Layout } from "@/components/layouts/layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <Layout>
      <h1>Member Client Session</h1>
      {/* <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p> */}
    </Layout>
  );
};

export default DashboardPage;
