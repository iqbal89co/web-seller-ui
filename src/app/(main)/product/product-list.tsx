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
import { formatBoolean, formatCurrency } from "@/helpers/utils";
import { ProductEntity } from "@/entity/product-entity";
import { productService } from "@/service/product";
import { toast } from "@/hooks/use-toast";

type Props = {};

export default function ProductList({}: Props) {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const { getAllProducts, deleteProduct, exportExcelProducts } = productService;

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: ColumnDef<ProductEntity>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kode Barang
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "code",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama Barang
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "name",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kategori
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "category.name",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Merk
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "brand.name",
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Harga Jual
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "selling_price",
      cell: ({ row }) => formatCurrency(row.original.selling_price),
    },
    {
      header: "Action",
      accessorKey: "",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link href={`./product/edit/${row?.original?.id}`}>
            <EditIcon size={18} className="text-yellow-500" />
          </Link>

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
                    const res = await deleteProduct(row?.original?.id!);
                    if (res) {
                      toast({
                        title: "Berhasil",
                        description: "Item berhasil dihapus",
                        variant: "default",
                      });
                      fetchProducts();
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
      data={products}
      addLink="./product/add"
      exportService={exportExcelProducts}
    />
  );
}
