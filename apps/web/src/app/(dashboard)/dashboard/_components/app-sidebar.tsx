"use client";

import * as React from "react";

import { BrainIcon } from "lucide-react";

import { NavMain } from "@/src/app/(dashboard)/dashboard/_components/nav-main";
import { NavSecondary } from "@/src/app/(dashboard)/dashboard/_components/nav-secondary";
import { NavUser } from "@/src/app/(dashboard)/dashboard/_components/nav-user";
import { NAV_DATA } from "@/src/constants/sidebar";
import { NavRecentNotes } from "./nav-recent-notes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@notebook/ui/components/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <BrainIcon className="!size-5" />
                <span className="text-base font-semibold">Notebook</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_DATA.navMain} />
        <NavRecentNotes />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
