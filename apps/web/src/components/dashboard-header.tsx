import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

import { Button, buttonVariants } from "@acme/ui/components/button";
import { cn } from "@acme/ui/lib/utils";

import { authClient } from "@/auth/client";

export function DashboardHeader(props?: {
  description?: string;
  title?: string;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {props?.title ?? "Dashboard"}
          </h1>
          {props?.description ? (
            <p className="text-muted-foreground mt-1 text-sm">
              {props.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/dashboard"
            className={cn(
              buttonVariants({
                variant: pathname.startsWith("/dashboard")
                  ? "default"
                  : "outline",
                size: "sm",
              }),
            )}
          >
            Dashboard
          </Link>
          <Link
            to="/notes"
            search={{ page: 1, status: "active" }}
            className={cn(
              buttonVariants({
                variant: pathname.startsWith("/notes") ? "default" : "outline",
                size: "sm",
              }),
            )}
          >
            Notes
          </Link>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={async () => {
          const { data } = await authClient.signOut();
          if (data?.success) {
            await navigate({ to: "/login" });
          }
        }}
      >
        Logout
      </Button>
    </div>
  );
}
