/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next-nprogress-bar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterEntity, RegisterSchema } from "@/entity/auth-entity";
import { signIn } from "next-auth/react";
import { authService } from "@/service/auth";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<RegisterEntity>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterEntity) => {
    try {
      const response = await authService.register(data);

      if (response.user) {
        // Attempt to sign in after successful registration
        const signInResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/",
          redirect: false,
        });

        if (signInResult?.ok) {
          router.push("/");
          router.refresh();
        } else {
          // Fallback redirect if sign-in fails
          router.push("/login");
        }
      } else {
        // Handle registration error from the API
        form.setError("root", {
          type: "manual",
          message: "Registration failed",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      form.setError("root", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""} // Ensure a defined value
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""} // Ensure a defined value
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      value={field.value || ""} // Ensure a defined value
                      type={showPassword ? "text" : "password"}
                    />
                    <span className="absolute right-2 top-2">
                      {showPassword ? (
                        <EyeOffIcon
                          className="cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <EyeIcon
                          className="cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* klik disini untuk login */}
          <div className="text-left text-xs">
            Sudah punya akun?{" "}
            <a href="/login" className="text-primary">
              Login
            </a>
          </div>
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}
        </div>
        <Button
          className="w-full mt-4"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
