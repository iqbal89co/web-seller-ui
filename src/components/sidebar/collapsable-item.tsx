import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  name: string;
  sub: { name: string; link: string }[];
  icon: React.ReactNode;
};

export default function CollapsableItem({ name, sub, icon }: Props) {
  const pathname = usePathname();

  const isPathMaster = sub.some((item) => pathname === item.link);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={name} className="border-none">
        <AccordionTrigger
          className={`flex items-center text-left w-full px-4 py-3 cursor-pointer text-foreground hover:bg-accent/50 hover:no-underline ${
            isPathMaster ? "bg-accent text-primary" : ""
          }`}
        >
          <span className="flex justify-center gap-2">
            {icon && icon}
            {name}
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col">
          {sub.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                href={item.link}
                key={`${name}-${index}`}
                className={`w-full px-8 pl-12 py-2 text-foreground hover:bg-accent/50 ${
                  isActive ? "bg-accent text-primary" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
