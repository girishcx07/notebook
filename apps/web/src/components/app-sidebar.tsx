"use client";

import {
  BarChart3Icon,
  BookOpenIcon,
  BriefcaseIcon,
  CreditCardIcon,
  HelpCircleIcon,
  KeyRoundIcon,
  LayoutGridIcon,
  PlugIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar";
import { cn } from "@repo/ui/lib/utils";

import { LatestChange } from "@/components/latest-change";
import { LogoIcon } from "@/components/logo";

export interface SidebarNavItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface SidebarSection {
  label: string;
  items: SidebarNavItem[];
}

const navSections: SidebarSection[] = [
  {
    label: "Product",
    items: [
      {
        title: "Dashboard",
        url: "#",
        icon: <LayoutGridIcon />,
        isActive: true,
      },
      {
        title: "Analytics",
        url: "#",
        icon: <BarChart3Icon />,
      },
      {
        title: "Projects",
        url: "#",
        icon: <BriefcaseIcon />,
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        title: "Team",
        url: "#",
        icon: <UsersIcon />,
      },
      {
        title: "Integrations",
        url: "#",
        icon: <PlugIcon />,
      },
      {
        title: "API Keys",
        url: "#",
        icon: <KeyRoundIcon />,
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        title: "Settings",
        url: "#",
        icon: <SettingsIcon />,
      },
      {
        title: "Billing",
        url: "#",
        icon: <CreditCardIcon />,
      },
    ],
  },
];

const footerNavLinks: SidebarNavItem[] = [
  {
    title: "Help Center",
    url: "#",
    icon: <HelpCircleIcon />,
  },
  {
    title: "Documentation",
    url: "#",
    icon: <BookOpenIcon />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      className={cn(
        "*:data-[slot=sidebar-inner]:bg-background",
        "*:data-[slot=sidebar-inner]:dark:bg-[radial-gradient(60%_18%_at_10%_0%,--theme(--color-foreground/.08),transparent)]",
        "**:data-[slot=sidebar-menu-button]:[&>span]:text-foreground/75",
      )}
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="h-14 justify-center border-b px-2">
        <SidebarMenuButton render={<a href="#link" />}>
          <LogoIcon />
          <span className="text-foreground! font-medium">Efferd</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:pointer-events-none">
              {section.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    tooltip={item.title}
                    render={<a href={item.url} />}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0 p-0">
        <LatestChange />
        <SidebarMenu className="border-t p-2">
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="text-muted-foreground"
                isActive={item.isActive ?? false}
                size="sm"
                render={<a href={item.url} />}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="px-4 pt-4 pb-2 transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0">
          <p className="text-muted-foreground text-[9px] text-nowrap">
            © {new Date().getFullYear()} Efferd LLC
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
