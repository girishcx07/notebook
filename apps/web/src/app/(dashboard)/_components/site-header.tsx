"use client";

import { Button } from "@notebook/ui/components/button";
import { Separator } from "@notebook/ui/components/separator";
import { SidebarTrigger } from "@notebook/ui/components/sidebar";
import ThemeToggle from "@/src/components/theme-toggle";
import { usePathname } from "next/navigation";
import { NAV_DATA } from "@/src/constants/sidebar";

export function SiteHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    // Check navMain
    const mainItem = NAV_DATA.navMain.find((item) => item.url === pathname);
    if (mainItem) return mainItem.title;

    // Check navSecondary
    const secondaryItem = NAV_DATA.navSecondary.find(
      (item) => item.url === pathname
    );
    if (secondaryItem) return secondaryItem.title;

    // Check navClouds (nested)
    for (const group of NAV_DATA.navClouds) {
      if (group.url === pathname) return group.title;
      const item = group.items.find((item) => item.url === pathname);
      if (item) return item.title;
    }

    return "Dashboard";
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{getTitle()}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
