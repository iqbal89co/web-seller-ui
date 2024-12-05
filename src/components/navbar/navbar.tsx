"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useSidebarContext } from "@/context/layout-context";

type Props = {
  children: React.ReactNode;
};

export default function Navbar({ children }: Props) {
  const { setCollapsed } = useSidebarContext();
  // const { setTheme, theme } = useTheme();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login", redirect: true });
  };

  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <nav className="w-full bg-secondary p-2 flex justify-between items-center">
        <Button variant={"ghost"} onClick={setCollapsed}>
          <MenuIcon className="text-primary" />
        </Button>

        <div className="flex items-center gap-2">
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          >
            <Sun className="text-primary h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="text-primary absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button> */}
          <div className="mr-2">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src={session?.user?.image as string} />
                    <AvatarFallback className="bg-primary-foreground">
                      {session.user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                    <span className="ml-2">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/login"} className="flex gap-1">
                <LogInIcon />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="p-8">{children}</main>
    </div>
  );
}
