"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { CategorySchema } from "@/entity/category-entity";
import { categoryService } from "@/service/category";
import { toast } from "@/hooks/use-toast";

type Props = {
  categoryName: string;
  categorySlug: string;
};

export default function EditForm({ categoryName, categorySlug }: Props) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      slug: categorySlug,
      name: categoryName,
    },
  });

  const { editCategory } = categoryService;

  async function onSubmit(data: z.infer<typeof CategorySchema>) {
    const res = await editCategory(Number(id), {
      ...data,
    });
    if (res) {
      toast({
        title: "Kategori berhasil diubah",
        description: res.error || "Invalid credentials",
        variant: "default",
      });
      form.reset();
      router.push("/master/category");
    } else {
      toast({
        title: "Gagal menambahkan kategori",
        description: res.error || "Invalid credentials",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kategori</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} />
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
