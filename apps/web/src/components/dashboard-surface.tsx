import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@acme/ui/lib/utils";

const accentClasses = {
  amber:
    "from-amber-100/90 via-white to-orange-100/70 dark:from-amber-500/15 dark:via-slate-950 dark:to-orange-500/10",
  blue: "from-blue-100/90 via-white to-sky-100/75 dark:from-blue-500/15 dark:via-slate-950 dark:to-sky-500/10",
  emerald:
    "from-emerald-100/90 via-white to-teal-100/75 dark:from-emerald-500/15 dark:via-slate-950 dark:to-teal-500/10",
  primary:
    "from-primary/15 via-white to-blue-100/75 dark:from-primary/20 dark:via-slate-950 dark:to-blue-500/10",
  slate:
    "from-slate-100/90 via-white to-slate-50 dark:from-slate-800/80 dark:via-slate-950 dark:to-slate-900",
} as const;

type Accent = keyof typeof accentClasses;

export function DashboardSurface({
  accent = "primary",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  accent?: Accent;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br",
          accentClasses[accent],
        )}
      />
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-white/70 blur-3xl dark:bg-white/10" />
      <div className="bg-primary/10 pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full blur-3xl" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function DashboardPill({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-700 uppercase shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200",
        className,
      )}
      {...props}
    />
  );
}

export function DashboardMetricCard(props: {
  accent?: Accent;
  description: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  const Icon = props.icon;

  return (
    <DashboardSurface accent={props.accent} className="h-full p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
            {props.label}
          </p>
          <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {props.value}
          </p>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            {props.description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5">
          <Icon className="text-primary h-5 w-5" />
        </div>
      </div>
    </DashboardSurface>
  );
}
