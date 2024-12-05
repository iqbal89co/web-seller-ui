"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { CategoryEntity } from "@/entity/category-entity";
import { categoryService } from "@/service/category";
import { productService } from "@/service/product";
import { ProductSchema } from "@/entity/product-entity";
import { brandService } from "@/service/brand";
import { toast } from "@/hooks/use-toast";

type Props = {
  code: string;
  name: string;
  unit: string;
  barcode: string;
  category_id: number | undefined;
  brand_id: number | undefined;
  selling_price: number;
};

export default function EditForm({
  code,
  name,
  unit,
  barcode,
  category_id,
  brand_id,
  selling_price,
}: Props) {
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [brands, setBrands] = useState<CategoryEntity[]>([]);
  const { getAllCategories } = categoryService;
  const id = params.id as string;

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      code,
      name,
      unit,
      barcode,
      category_id,
      brand_id,
      selling_price,
    },
  });

  const { editProduct } = productService;
  const { getAllBrands } = brandService;

  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    const res = await editProduct(Number(id), {
      ...data,
    });
    console.log(res);
    if (res) {
      toast({
        title: "Sukses",
        description: "Barang berhasil diubah",
        variant: "default",
      });
      form.reset();
      router.push("/product");
    } else {
      toast({
        title: "Error",
        description: "Barang gagal diubah",
        variant: "destructive",
      });
    }
  }
  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };
  const fetchBrands = async () => {
    const data = await getAllBrands();
    setBrands(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Produk</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value!)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Pilih Kategori --" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id!)}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Merk</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value!)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-- Pilih Merk --" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands?.map((brand) => (
                      <SelectItem key={brand.id} value={String(brand.id!)}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="selling_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga Jual</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Simpan</Button>
      </form>
    </Form>
  );
}
