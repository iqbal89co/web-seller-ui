import Link from "next/link";
import React from "react";

type Props = {
  isActive: boolean;
  url: string;
  icon: React.ReactNode;
  name: string;
};

export default function SidebarItem({ isActive, url, icon, name }: Props) {
  return (
    <Link
      href={url}
      className={`px-4 py-3 text-foreground hover:bg-accent/50 cursor-pointer flex items-center gap-2 ${
        isActive ? "bg-accent text-primary" : ""
      }`}
    >
      {icon && icon}
      {name}
    </Link>
  );
}
