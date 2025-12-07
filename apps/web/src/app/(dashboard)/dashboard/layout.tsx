import { seo } from "@/src/lib/seo";
import { Metadata, Viewport } from "next";

import { AppSidebar } from "@/src/app/(dashboard)/dashboard/_components/app-sidebar";
import { SiteHeader } from "@/src/app/(dashboard)/dashboard/_components/site-header";
import { SidebarInset, SidebarProvider } from "@notebook/ui/components/sidebar";
import SessionProvider from "@/src/components/session-provider";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export const metadata: Metadata = {
  ...seo({
    title: "Dashboard",
    description: "Dashboard | Notebook",
  }),
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <SessionProvider initialSession={session}>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
