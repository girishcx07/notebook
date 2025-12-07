"use client";

import * as React from "react";
import { IconHistory, IconSearch, type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@notebook/ui/components/sidebar";
import { SearchDialog } from "./search-dialog";
import { useRouter } from "next/navigation";

type Item = {
  title: string;
  url: string;
  icon: Icon;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
};

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const ITEMS: Item[] = [
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
      rightIcon: (
        <p className="text-muted-foreground text-sm">
          Press{" "}
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      ),
      onClick: () => setOpen(true),
    },
    {
      title: "History",
      url: "#",
      icon: IconHistory,
      onClick: () => router.push("/dashboard/history"),
    },
  ];

  return (
    <>
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {ITEMS.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <div
                    onClick={item.onClick}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </div>
                    {item.rightIcon}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
