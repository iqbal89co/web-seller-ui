import React from "react";
import CollapsableItem from "./collapsable-item";
import { BoxIcon, BrickWallIcon, HistoryIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";
import { useSidebarContext } from "@/context/layout-context";

const sidebarItems = [
  {
    name: "Transaksi",
    link: "/transaction",
    icon: <HistoryIcon />,
  },
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
    ],
  },
];

export default function Sidebar() {
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
          <h1 className="font-bold">UD. Pursida</h1>
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
                  url={item?.link}
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
