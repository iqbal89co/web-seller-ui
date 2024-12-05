import { z } from "zod";

export const TransactionSchema = z.object({
  items: z
    .array(
      z.object({
        product_id: z.string(),
        qty: z.number(),
      })
    )
    .min(1, "Minimal input 1 barang"),
});

export const TransactionItemSchema = z.object({
  product_id: z.string().min(1, "Barang harus diisi"),
  qty: z
    .number({
      required_error: "Jumlah harus diisi",
    })
    .min(0.1, "Jumlah harus lebih dari 0"),
});

export interface TransactionItemEntity {
  product_id: string;
  qty: number;
}

export interface TransactionEntity {
  items: TransactionItemEntity[];
  transaction_date?: Date;
}
