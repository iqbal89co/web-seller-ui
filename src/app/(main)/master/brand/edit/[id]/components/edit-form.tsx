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
import { toast } from "@/hooks/use-toast";
import { BrandSchema } from "@/entity/brand-entity";
import { brandService } from "@/service/brand";

type Props = {
  brandName: string;
  brandSlug: string;
};

export default function EditForm({ brandName, brandSlug }: Props) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const form = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      slug: brandSlug,
      name: brandName,
    },
  });

  const { editBrand } = brandService;

  async function onSubmit(data: z.infer<typeof BrandSchema>) {
    const res = await editBrand(Number(id), {
      ...data,
    });
    if (res) {
      toast({
        title: "Merk berhasil diubah",
        description: res.error || "Invalid credentials",
        variant: "default",
      });
      form.reset();
      router.push("/master/brand");
    } else {
      toast({
        title: "Gagal menambahkan merk",
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
              <FormLabel>Nama Merk</FormLabel>
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
