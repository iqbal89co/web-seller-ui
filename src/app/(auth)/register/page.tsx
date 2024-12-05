import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import RegisterForm from "./components/register-form";

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
