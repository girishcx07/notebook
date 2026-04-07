import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/_siteLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
