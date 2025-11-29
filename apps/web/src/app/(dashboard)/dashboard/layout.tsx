import { seo } from "@/src/lib/seo";
import { Metadata, Viewport } from "next";

import { AppSidebar } from "@/src/app/(dashboard)/_components/app-sidebar";
import { SiteHeader } from "@/src/app/(dashboard)/_components/site-header";
import { SidebarInset, SidebarProvider } from "@notebook/ui/components/sidebar";

export const metadata: Metadata = {
  ...seo({
    title: "Dashboard",
    description: "Dashboard | Notebook",
  }),
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
