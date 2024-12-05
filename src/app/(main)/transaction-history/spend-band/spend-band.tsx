"use client";

import { Button } from "@/components/ui/button";
import { transactionService } from "@/service/transaction";
import { useEffect, useState } from "react";

const SpendBand = () => {
  const query = `
    SELECT
        CASE 
            WHEN (ti.qty * p.selling_price) BETWEEN 0 AND 100000 THEN '0 - 100,000'
            WHEN (ti.qty * p.selling_price) BETWEEN 100001 AND 300000 THEN '100,001 - 300,000'
            WHEN (ti.qty * p.selling_price) BETWEEN 300001 AND 600000 THEN '300,001 - 600,000'
            WHEN (ti.qty * p.selling_price) BETWEEN 600001 AND 1000000 THEN '600,001 - 1,000,000' 
            ELSE '> 1,000,000'
        END AS "Spend Band",
        COUNT(*) AS "Total Transactions"
    FROM transactions t
    JOIN transaction_items ti ON t.id = ti.transaction_id  
    JOIN products p ON ti.product_id = p.id
    GROUP BY
        CASE
            WHEN (ti.qty * p.selling_price) BETWEEN 0 AND 100000 THEN '0 - 100,000'
            WHEN (ti.qty * p.selling_price) BETWEEN 100001 AND 300000 THEN '100,001 - 300,000'
            WHEN (ti.qty * p.selling_price) BETWEEN 300001 AND 600000 THEN '300,001 - 600,000'
            WHEN (ti.qty * p.selling_price) BETWEEN 600001 AND 1000000 THEN '600,001 - 1,000,000'
            ELSE '> 1,000,000'
    END;
  `;
  const [transactions, setTransactions] = useState<
    {
      "Spend Band": string;
      "Total Transactions": number;
    }[]
  >([]);
  const { getSpendBandTransactions } = transactionService;
  const fetchSpendBandTransactions = async () => {
    const data = await getSpendBandTransactions();
    setTransactions(data);
  };
  useEffect(() => {
    fetchSpendBandTransactions();
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(query.trim());
    alert("Query copied to clipboard!");
  };
  return (
    <div className="p-6 space-y-6">
      {/* Copyable Query Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">SQL Query</h1>
        <div className="bg-gray-100 p-4 rounded-md border border-gray-300 relative">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {query.trim()}
          </pre>
          <Button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-sm"
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Data Table</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Spend Band</th>
                <th className="border border-gray-300 px-4 py-2">
                  Total Transactions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {row["Spend Band"]}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row["Total Transactions"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpendBand;
