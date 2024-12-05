"use client";
import React, { useCallback, useEffect, useRef } from "react";
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
import { toast } from "@/hooks/use-toast";
import { BrandSchema } from "@/entity/brand-entity";
import { brandService } from "@/service/brand";

export default function AddForm() {
  const router = useRouter();
  const manualSlugEdit = useRef(false);

  const form = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
    defaultValues: {
      slug: "",
      name: "",
    },
  });

  const { addBrand } = brandService;

  async function onSubmit(data: z.infer<typeof BrandSchema>) {
    const res = await addBrand({
      ...data,
    });
    if (res) {
      toast({
        title: "Berhasil menambahkan merk",
        description: "Merk berhasil ditambahkan",
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

  const generateSlug = useCallback((name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }, []);

  const { watch, setValue } = form;
  const name = watch("name");

  useEffect(() => {
    if (name && !manualSlugEdit.current) {
      const slugValue = generateSlug(name);
      setValue("slug", slugValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [name, generateSlug, setValue]);

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
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    // Reset manual edit flag when name changes
                    manualSlugEdit.current = false;
                  }}
                />
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
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    // Set flag to prevent automatic slug generation
                    manualSlugEdit.current = true;
                  }}
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
