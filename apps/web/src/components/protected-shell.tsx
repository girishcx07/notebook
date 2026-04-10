import type { User } from "better-auth";
import type { ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BookOpenText,
  Brain,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Button, buttonVariants } from "@repo/ui/components/button";
import { ThemeToggle } from "@repo/ui/components/theme";
import { cn } from "@repo/ui/lib/utils";

import { authClient } from "@/auth/client";
import {
  DashboardMetricCard,
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";

const navigationItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    to: "/dashboard" as const,
  },
  {
    icon: BookOpenText,
    label: "Notes",
    search: { page: 1, status: "active" as const },
    to: "/notes" as const,
  },
];

export function ProtectedShell({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="grainy-light relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-100/80 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="bg-primary/16 pointer-events-none absolute -top-24 left-0 h-64 w-64 blur-[96px]" />
      <div className="pointer-events-none absolute top-24 right-[-48px] h-72 w-72 bg-blue-500/16 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full border border-blue-200/50 dark:border-blue-900/40" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <DashboardSurface className="sticky top-4 z-30 p-4 sm:p-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/75 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <Brain className="text-primary h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Smart Notebook
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Calm, clear workspace for students and teachers
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.to);

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      search={item.search}
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          variant: isActive ? "default" : "outline",
                        }),
                        "min-w-[130px] justify-center rounded-full",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ThemeToggle />

                <div className="hidden items-center gap-3 rounded-full border border-white/70 bg-white/70 px-3 py-2 shadow-sm sm:flex dark:border-white/10 dark:bg-white/5">
                  <div className="bg-primary/12 text-primary flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold">
                    {getInitials(user.name || user.email)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {user.name || "Learner"}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={async () => {
                    const { data } = await authClient.signOut();
                    if (data?.success) {
                      await navigate({ to: "/login" });
                    }
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
              <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                <DashboardPill className="mb-4">
                  Protected Workspace
                </DashboardPill>
                <h1 className="max-w-3xl text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                  Welcome back, {user.name || "learner"}.
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                  Build class structure, keep notes organized, and move through
                  your dashboard with the same light visual language as the
                  homepage and auth experience.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "default",
                    })}
                  >
                    Open overview
                  </Link>
                  <Link
                    to="/notes"
                    search={{ page: 1, status: "active" }}
                    className={buttonVariants({
                      size: "sm",
                      variant: "outline",
                    })}
                  >
                    Open notes
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <DashboardMetricCard
                  accent="blue"
                  description="Students, teachers, and anyone new to the app can orient quickly."
                  icon={Sparkles}
                  label="Experience"
                  value="Accessible"
                />
                <DashboardMetricCard
                  accent="emerald"
                  description="Notes are private first, then ready for broader visibility when needed."
                  icon={BookOpenText}
                  label="Structure"
                  value="Safe by default"
                />
              </div>
            </div>
          </div>
        </DashboardSurface>

        <div className="flex-1 py-6 sm:py-8">{children}</div>
      </div>
    </div>
  );
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
