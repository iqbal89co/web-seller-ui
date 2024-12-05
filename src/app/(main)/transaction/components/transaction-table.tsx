import React, { useEffect, useState } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import AddItemForm from "./add-item-form";
import { TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { numberToRupiah } from "@/helpers/numberToRupiah";
import { TransactionSchema } from "@/entity/transaction-entity";
import { ProductEntity } from "@/entity/product-entity";

type Props = {
  fieldArray: UseFieldArrayReturn<z.infer<typeof TransactionSchema>>;
  products: ProductEntity[];
  form: UseFormReturn<z.infer<typeof TransactionSchema>>;
};

export default function TransactionTable({
  fieldArray,
  products,
  form,
}: Props) {
  const { append, remove, fields } = fieldArray;

  const subtotal = fields.reduce((acc, item) => {
    const selectedProduct: any = products?.find(
      (product) => product.id === Number(item.product_id)
    );
    return acc + item.qty * selectedProduct.selling_price;
  }, 0);

  return (
    <>
      <AddItemForm append={append} products={products} />
      {form.formState.errors.items?.message && (
        <p className="text-destructive">
          {form.formState.errors.items.message}
        </p>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Tipe Harga</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields?.length ? (
            fields?.map((item, i) => {
              const selectedProduct: any = products?.find(
                (product) => product.id === Number(item.product_id)
              );
              return (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">
                    {selectedProduct?.name}
                  </TableCell>
                  <TableCell>
                    {numberToRupiah(selectedProduct?.selling_price)}
                  </TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell className="text-right">
                    {numberToRupiah(
                      Number(item.qty * selectedProduct.selling_price)
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <TrashIcon
                      className="cursor-pointer text-destructive mx-auto"
                      onClick={() => {
                        remove(i);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Belum ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Subtotal
            </TableCell>
            <TableCell className="text-right">
              {numberToRupiah(subtotal)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Total
            </TableCell>
            <TableCell className="text-right">
              {numberToRupiah(subtotal)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
