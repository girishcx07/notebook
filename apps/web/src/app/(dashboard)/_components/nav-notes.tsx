"use client";

import * as React from "react";
import {
  IconDots,
  IconFolder,
  IconPin,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react";
import { ChevronRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@notebook/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@notebook/ui/components/sidebar";

type NavItem = {
  title: string;
  url: string;
  icon?: Icon;
  pinned?: boolean;
  lastUpdated?: string;
  items?: {
    title: string;
    url: string;
  }[];
};

function NavNotesItem({ item }: { item: NavItem }) {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.items && item.items.length > 0;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title}>
        <a href={item.url}>
          {item.icon ? <item.icon /> : <IconFolder />}
          <span>{item.title}</span>
          {item.pinned && (
            <IconPin className="ml-auto size-3.5 text-muted-foreground" />
          )}
        </a>
      </SidebarMenuButton>

      {hasChildren && (
        <>
          <SidebarMenuAction
            className={`left-2 bg-sidebar-accent text-sidebar-accent-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRight />
            <span className="sr-only">Toggle</span>
          </SidebarMenuAction>

          {isOpen && (
            <SidebarMenuSub>
              {item.items!.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <a href={subItem.url}>
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <IconDots />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuItem>
            <IconFolder className="text-muted-foreground" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconShare3 className="text-muted-foreground" />
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <IconTrash className="text-muted-foreground" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

export function NavNotes({
  items,
}: {
  items: {
    title?: string;
    name?: string;
    url: string;
    icon?: Icon;
    pinned?: boolean;
    lastUpdated?: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  // Normalize items (handle title vs name)
  const normalizedItems: NavItem[] = items.map((item) => ({
    ...item,
    title: item.title || item.name || "Untitled",
    items: item.items || [],
  }));

  // Sort: Pinned first
  const sortedItems = [...normalizedItems].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent Notes</SidebarGroupLabel>
      <SidebarMenu>
        {sortedItems.length === 0 ? (
          <div className="text-muted-foreground px-2 py-2 text-sm">
            No recent notes
          </div>
        ) : (
          sortedItems.map((item) => (
            <NavNotesItem key={item.title} item={item} />
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
