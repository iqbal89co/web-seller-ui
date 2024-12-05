import { z } from "zod";
import { CategoryEntity } from "./category-entity";
import { BrandEntity } from "./brand-entity";

export const ProductSchema = z.object({
  code: z.string().min(1, "Kode produk harus diisi"),
  name: z.string().min(1, "Nama produk harus diisi"),
  unit: z.string().min(1, "Satuan produk harus diisi"),
  barcode: z.string().min(1, "Barcode produk harus diisi"),
  category_id: z.number({
    invalid_type_error: "Kategori harus diisi",
    required_error: "Kategori harus diisi",
  }),
  brand_id: z.number({
    invalid_type_error: "Merek harus diisi",
    required_error: "Merek harus diisi",
  }),
  selling_price: z.number({
    invalid_type_error: "Harga jual harus diisi",
    required_error: "Harga jual harus diisi",
  }),
});

export interface ProductEntity {
  id?: number;
  code: string;
  name: string;
  unit: string;
  barcode: string;
  category_id: number;
  brand_id: number;
  selling_price: number;
  created_at?: Date;
  updated_at?: Date;
  category?: CategoryEntity;
  brand?: BrandEntity;
}
