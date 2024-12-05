import { User } from "./auth-entity";

interface TransactionHistoryItemEntity {
  id: number;
  cashier_transaction_id: number;
  barang_id: number;
  transaction_type: string;
  price_per_barang: number;
  qty: number;
  created_at: string;
  updated_at: string;
}

export interface TransactionHistoryEntity {
  id: number;
  transaction_number: string;
  transaction_date: Date;
  customer_id: number;
  customer: User;
  transaction_items: TransactionHistoryItemEntity[];
}
