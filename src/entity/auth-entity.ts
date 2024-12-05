import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .min(1, "required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "required"),
});

export type LoginEntity = z.infer<typeof LoginSchema>;

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Role {
  id: number;
  slug: string;
  name: string;
  created_at: string;
  updated_at: string;
  permissions?: Permission[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  photo: string;
  active_role_id: number;
  active_role: Role;
  roles: Role[];
}

export const RegisterSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, "required"),
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .min(1, "required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "required"),
});

export type RegisterEntity = z.infer<typeof RegisterSchema>;

export interface RegisterResponse {
  user: User;
  token: string;
}
