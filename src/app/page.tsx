/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Layout } from "@/components/layouts/layout";
import { productService } from "@/service/product";
import { transactionService } from "@/service/transaction";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [products, setProducts] = useState<number>(0);
  const [transactions, setTransactions] = useState<number>(0);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const { getAllProducts } = productService;
  const { getAllTransactions } = transactionService;

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data.length);
  };

  const fetchTransactions = async () => {
    const data = await getAllTransactions();
    setTransactions(data.length);
  };

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  return (
    <Layout>
      <div className="flex gap-4">
        <div className="rounded-lg shadow p-4">
          <h1 className="text-xl font-bold">Total Products</h1>
          <p className="text-3xl font-bold">{products}</p>
        </div>
        <div className="rounded-lg shadow p-4">
          <h1 className="text-xl font-bold">Total Transactions</h1>
          <p className="text-3xl font-bold">{transactions}</p>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
