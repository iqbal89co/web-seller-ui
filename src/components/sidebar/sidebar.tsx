"use client";

import React from "react";
import CollapsableItem from "./collapsable-item";
import {
  BoxIcon,
  BrickWallIcon,
  CandlestickChartIcon,
  HandCoinsIcon,
  HistoryIcon,
  UserIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
import { useSidebarContext } from "@/context/layout-context";
import { useSession } from "next-auth/react";

interface SidebarItem {
  name: string;
  icon?: React.ReactNode;
  link?: string;
  sub?: { name: string; link: string }[];
}

export default function Sidebar() {
  let sidebarItems: SidebarItem[] = [
    {
      name: "Profile",
      icon: <UserIcon />,
      link: "/profile",
    },
  ];
  const { data: session } = useSession({
    required: true,
  });
  if (session?.permissions.includes("manage-products")) {
    sidebarItems = [
      {
        name: "Daftar Barang",
        link: "/product",
        icon: <BoxIcon />,
      },
      {
        name: "Master",
        icon: <BrickWallIcon />,
        sub: [
          {
            name: "Kategori",
            link: "/master/category",
          },
          {
            name: "Merk",
            link: "/master/brand",
          },
        ],
      },
      ...sidebarItems,
    ];
  }
  if (session?.permissions.includes("manage-transactions")) {
    sidebarItems = [
      {
        name: "Daftar Transaksi",
        link: "/transaction-history",
        icon: <HistoryIcon />,
      },
      {
        name: "Transaksi Per Nilai",
        link: "/transaction-history/spend-band",
        icon: <CandlestickChartIcon />,
      },
      ...sidebarItems,
    ];
  }
  if (session?.permissions.includes("checkout")) {
    sidebarItems = [
      {
        name: "Transaksi",
        link: "/transaction",
        icon: <HandCoinsIcon />,
      },
      ...sidebarItems,
    ];
  }
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="sticky top-0 z-50 h-screen flex">
      {collapsed ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:invisible"
          onClick={() => setCollapsed()}
        ></div>
      ) : null}
      <div
        className={`fixed flex flex-col -translate-x-full h-full bg-primary-foreground transition z-10 ${
          collapsed
            ? "md:fixed md:-translate-x-full translate-x-0"
            : "md:static md:-translate-x-0 -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="font-bold">Web Seller</h1>
        </div>

        <div className="flex flex-col overflow-y-auto mt-4">
          {sidebarItems.map((item, index) => {
            if (item.sub) {
              return (
                <CollapsableItem
                  key={index}
                  name={item.name}
                  sub={item.sub}
                  icon={item?.icon}
                />
              );
            } else {
              return (
                <SidebarItem
                  key={index}
                  name={item?.name}
                  url={item?.link || "#"}
                  icon={item?.icon}
                  isActive={pathname === item?.link}
                />
              );
            }
          })}
        </div>
      </div>
    </aside>
  );
}
