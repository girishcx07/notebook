"use client";

import { useState } from "react";
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
  const { data: notes } = useSuspenseQuery({
    queryKey: keys.notes.recent(userId),
    queryFn: () => getRecentNotes(userId),
  });

  // Normalize items (handle title vs name)
  const normalizedItems: NavItem[] = (notes || []).map((note: any) => ({
    title: note.title || "Untitled",
    url: `/dashboard/notes/${note.id}`,
    items: [],
    lastUpdated: note.updatedAt,
  }));

  // Sort: Recently updated first (mock logic for now as we don't have pinned)
  const sortedItems = [...normalizedItems].sort((a, b) => {
    return (
      new Date(b.lastUpdated!).getTime() - new Date(a.lastUpdated!).getTime()
    );
  });

  if (!sortedItems || sortedItems.length === 0) {
    return <NavFallbackRecentNotes />;
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent Notes</SidebarGroupLabel>
      <SidebarMenu>
        {sortedItems.map((item) => (
          <NavRecentNotesItem key={item.title + item.url} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavRecentNotesSkeleton = () => {
  const lists = Array.from({ length: 5 });
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent Notes</SidebarGroupLabel>
      {lists.map((_, index) => (
        <SidebarMenuSkeleton key={index} />
      ))}
    </SidebarGroup>
  );
};

const NavFallbackRecentNotes = () => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent Notes</SidebarGroupLabel>
      <SidebarMenu>
        <div className="text-muted-foreground px-2 py-2 text-sm">
          No recent notes
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
};
