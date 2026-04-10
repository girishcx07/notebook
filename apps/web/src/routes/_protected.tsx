import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { ProtectedShell } from "@/components/protected-shell";
import { getSession } from "@/lib/auth.functions";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();

    if (!session) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    return { user: session.user };
  },
  component: ProtectedRouteLayout,
});

function ProtectedRouteLayout() {
  const { user } = Route.useRouteContext();

  return (
    <ProtectedShell user={user}>
      <Outlet />
    </ProtectedShell>
  );
}
