"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import TransactionTable from "./transaction-table";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { format, sub } from "date-fns";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { TransactionSchema } from "@/entity/transaction-entity";
import { transactionService } from "@/service/transaction";
import { ProductEntity } from "@/entity/product-entity";
import { toast } from "@/hooks/use-toast";

type Props = {
  products: ProductEntity[];
};

export default function CashierForm({ products }: Props) {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => componentRef.current });
  const router = useRouter();
  const session: any = useSession();
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { addTransaction } = transactionService;

  async function onSubmit(data: z.infer<typeof TransactionSchema>) {
    try {
      const res = await addTransaction({
        items: data.items.map((item) => ({
          product_id: item.product_id,
          qty: item.qty,
        })),
      });

      if (res?.id) {
        form.setValue("items", []);
        toast({
          title: "Transaksi berhasil",
          description: "Transaksi berhasil disimpan",
          variant: "default",
        });
        router.push("/transaction");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Transaksi gagal",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    setCreatedAt(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="flex justify-between gap-4"></div>
        </form>
      </Form>
      <div className="space-y-4 my-4">
        <TransactionTable
          fieldArray={fieldArray}
          products={products}
          form={form}
        />
        <div className="flex justify-end">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form?.formState?.isSubmitting}
          >
            Submit Transaksi
          </Button>
        </div>
      </div>
    </div>
  );
}
