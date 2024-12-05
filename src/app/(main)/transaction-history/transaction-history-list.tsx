"use client";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, EditIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { TransactionHistoryEntity } from "@/entity/transaction-history-entity";
import { transactionService } from "@/service/transaction";

type Props = {};

const getTotal = (items: any) => {
  return items.reduce((acc: number, item: any) => {
    return acc + item.qty * item.product.selling_price;
  }, 0);
};

export default function TransactionHistoryList({}: Props) {
  const [transactions, setTransactions] = useState<TransactionHistoryEntity[]>(
    []
  );
  const { getAllTransactions, deleteTransaction, exportExcelTransactions } =
    transactionService;

  const fetchTransactions = async () => {
    const data = await getAllTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns: ColumnDef<TransactionHistoryEntity>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nomor Transaksi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "transaction_number",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tanggal Transaksi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "transaction_date",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "customer.name",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Harga
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "transaction_items",
      cell: ({ row }) => getTotal(row.original.transaction_items),
    },
    {
      header: "Action",
      accessorKey: "",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* <Link href={`./product/edit/${row?.original?.id}`}>
            <EditIcon size={18} className="text-yellow-500" />
          </Link> */}

          <AlertDialog>
            <AlertDialogTrigger>
              <TrashIcon
                size={18}
                className="text-destructive cursor-pointer"
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus item</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah kamu yakin ingin menghapus item ini?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    const res = await deleteTransaction(row?.original?.id!);
                    if (res) {
                      toast({
                        title: "Berhasil",
                        description: "Item berhasil dihapus",
                        variant: "default",
                      });
                      fetchTransactions();
                    }
                  }}
                >
                  Ya
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
      exportService={exportExcelTransactions}
    />
  );
}
