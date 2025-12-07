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

type NavItem = {
  title: string;
  url: string;
  icon?: Icon;
  pinned?: boolean;
  lastUpdated?: string;
  type: "note" | "workspace";
  items?: {
    title: string;
    url: string;
  }[];
};

function NavRecentNotesItem({ item }: { item: NavItem }) {
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
                    <Link href={subItem.url}>
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

export function NavRecentNotesSuspense({ userId }: { userId: string }) {
  const { data: items } = useSuspenseQuery({
    queryKey: keys.notes.recent(userId),
    queryFn: () => getRecentNotes(userId),
  });

  // Map items with type-aware URLs and icons
  const normalizedItems: NavItem[] = (items || []).map((item) => ({
    title: item.type === "note" ? item.title || "Untitled" : item.name,
    url:
      item.type === "note"
        ? `/dashboard/notes/${item.id}`
        : `/dashboard/workspaces/${item.id}`,
    items: [],
    lastUpdated: item.updatedAt,
    icon: item.type === "workspace" ? IconFolder : IconNote,
    pinned: item.pinned,
    type: item.type,
  }));

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
