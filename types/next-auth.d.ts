import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    id: string;
    activeRoleId: number;
    permissions: string[];
  }
}

// If you're using JWT
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    id: string;
    activeRoleId: number;
    permissions: string[];
  }
}
