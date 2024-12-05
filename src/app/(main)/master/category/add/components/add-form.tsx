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
import { categoryService } from "@/service/category";
import { CategorySchema } from "@/entity/category-entity";
import { toast } from "@/hooks/use-toast";

export default function AddForm() {
  const router = useRouter();
  const manualSlugEdit = useRef(false);

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      slug: "",
      name: "",
    },
  });

  const { addCategory } = categoryService;

  async function onSubmit(data: z.infer<typeof CategorySchema>) {
    const res = await addCategory({
      ...data,
    });
    if (res) {
      toast({
        title: "Berhasil menambahkan kategori",
        description: "Kategori berhasil ditambahkan",
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
              <FormLabel>Nama Kategori</FormLabel>
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
