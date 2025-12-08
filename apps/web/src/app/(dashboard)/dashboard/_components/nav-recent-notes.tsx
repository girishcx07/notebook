"use client";

import { useState } from "react";
import {
  IconDots,
  IconFolder,
  IconNote,
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
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@notebook/ui/components/sidebar";
import { getRecentNotes } from "@/src/api/note";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { keys } from "@/src/constants/query-key";
import { useSession } from "@/src/components/session-provider";
import Link from "next/link";
import type { Route } from "next";

type NavItem<T extends string = string> = {
  title: string;
  url: T;
  icon?: Icon;
  pinned?: boolean;
  lastUpdated?: string;
  type: "note" | "workspace";
  items?: {
    title: string;
    url: T;
  }[];
};

/**
 * Render a sidebar menu entry for a recent note or workspace, including an optional collapsible sub-list and an actions dropdown.
 *
 * @param item - The navigation item to render (title, url, icon, pinned flag, type, and optional child items).
 * @returns A sidebar menu item element that displays the item's icon and title, an optional expandable list of sub-items, and a dropdown with actions (view, share, pin, move to trash).
 */
function NavRecentNotesItem({ item }: { item: NavItem<Route> }) {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  const handleView = () => {};

  const handleShare = () => {};

  const handlePin = () => {};

  const handleMoveToTrash = () => {};

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title}>
        <Link href={item.url}>
          {item.icon ? <item.icon /> : <IconFolder />}
          <span>{item.title}</span>
          {item.pinned && (
            <IconPin className="ml-auto size-3.5 text-muted-foreground" />
          )}
        </Link>
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
                    <Link href={subItem.url as any}>
                      <span>{subItem.title}</span>
                    </Link>
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
          <DropdownMenuItem onClick={handleView}>
            <IconFolder className="text-muted-foreground" />
            <span>View</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare}>
            <IconShare3 className="text-muted-foreground" />
            <span>Share</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handlePin}>
            <IconPin className="text-muted-foreground" />
            <span>Pin</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMoveToTrash} variant="destructive">
            <IconTrash className="text-muted-foreground" />
            <span>Move to Trash</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

export const NavRecentNotes = () => {
  const session = useSession();

  return (
    <Suspense fallback={<NavRecentNotesSkeleton />}>
      <ErrorBoundary fallback={<NavFallbackRecentNotes />}>
        <NavRecentNotesSuspense userId={session?.user?.id ?? ""} />
      </ErrorBoundary>
    </Suspense>
  );
};

/**
 * Renders the user's recent notes and workspaces as a "Quick Access" sidebar group.
 *
 * @param userId - The ID of the user whose recent items should be fetched and displayed.
 * @returns A SidebarGroup containing recent note and workspace items, or a fallback component when no recent items exist.
 */
export function NavRecentNotesSuspense({ userId }: { userId: string }) {
  const { data: items } = useSuspenseQuery({
    queryKey: keys.notes.recent(userId),
    queryFn: () => getRecentNotes(userId),
  });

  // Map items with type-aware URLs and icons
  const normalizedItems: NavItem<Route>[] = (items || []).map((item) => {
    let url: Route;

    if (item.type === "note") {
      url = `/dashboard/notes?${item.id}`;
    } else {
      url = `/dashboard/workspaces?${item.id}`;
    }
    return {
      title: item.type === "note" ? item.title || "Untitled" : item.name,
      url,
      items: [],
      lastUpdated: item.updatedAt,
      icon: item.type === "workspace" ? IconFolder : IconNote,
      pinned: item.pinned,
      type: item.type,
    };
  });

  if (!normalizedItems || normalizedItems.length === 0) {
    return <NavFallbackRecentNotes />;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
      <SidebarMenu>
        {normalizedItems.map((item, idx) => (
          <NavRecentNotesItem key={idx} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavRecentNotesSkeleton = () => {
  const lists = Array.from({ length: 5 });
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
      {lists.map((_, index) => (
        <SidebarMenuSkeleton key={index} />
      ))}
    </SidebarGroup>
  );
};

const NavFallbackRecentNotes = () => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
      <SidebarMenu>
        <div className="text-muted-foreground px-2 py-2 text-sm">
          Nothing in Quick Access yet
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
};