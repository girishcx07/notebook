import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/_siteLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SiteHeader />
      <main>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
