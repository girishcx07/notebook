import type { ReactNode } from "react";
import { Brain, CheckCircle2, Sparkles } from "lucide-react";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";

const highlights = [
  "Clean, minimal screens that stay easy to scan on desktop and mobile.",
  "A welcoming flow for students, teachers, and first-time visitors.",
  "Dashboard-ready structure so registration leads naturally into the workspace.",
];

export function AuthShell({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <div className="grainy-light relative flex flex-1 items-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-100/80 px-4 py-10 sm:px-6 lg:px-8 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="bg-primary/20 pointer-events-none absolute -top-24 left-0 h-80 w-80 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-60px] bottom-0 h-80 w-80 bg-blue-500/20 blur-[150px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
        <DashboardSurface accent="blue" className="hidden p-8 lg:block">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5">
                <Brain className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Smart Notebook
                </p>
                <p className="text-muted-foreground text-sm">
                  Structured learning, calmer workflow
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <DashboardPill>
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Minimal by design
              </DashboardPill>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </div>

            <div className="grid gap-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <CheckCircle2 className="text-primary mt-0.5 h-5 w-5" />
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DashboardSurface>

        {children}
      </div>
    </div>
  );
}
