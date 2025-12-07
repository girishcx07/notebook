"use client";

import { IconCirclePlusFilled, IconBell, type Icon } from "@tabler/icons-react";

import { Button } from "@notebook/ui/components/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@notebook/ui/components/sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateModal from "./create-modal";
import { type LucideIcon } from "lucide-react";
import type { Route } from "next";

interface NavMenuItem<T extends string = string> {
  title: string;
  url: T;
  icon?: Icon | LucideIcon;
}

export function NavMain({ items }: { items: NavMenuItem<Route>[] }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                onClick={() => setOpen(true)}
              >
                <IconCirclePlusFilled />
                <span>Create</span>
              </SidebarMenuButton>
              <Button
                size="icon"
                className="size-8 group-data-[collapsible=icon]:opacity-0"
                variant="outline"
              >
                <IconBell />
                <span className="sr-only">Notebook</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem
                key={item.title}
                onClick={() => {
                  router.push(item.url);
                }}
              >
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <CreateModal open={open} onOpenChange={setOpen} />
    </>
  );
}
