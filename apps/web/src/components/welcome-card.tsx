import type { User } from "better-auth";
import { GraduationCap, Sparkles } from "lucide-react";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";

export const WelcomeCard = ({ user }: { user: User }) => {
  return (
    <DashboardSurface accent="emerald" className="p-6">
      <div className="space-y-4">
        <DashboardPill>
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          Today&apos;s workspace
        </DashboardPill>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 bg-white/80 shadow-sm dark:border-white/10 dark:bg-white/5">
            <GraduationCap className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Welcome back, {user.name}
            </h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              Your dashboard now puts the most important actions in clearer
              focus, so it feels easier to scan and easier to teach from.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            Keep using notes as your main structure while the protected routes
            grow around the same widget system.
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            The updated grid stays approachable for new students and clear
            enough for teachers guiding others through the workflow.
          </div>
        </div>
      </div>
    </DashboardSurface>
  );
};
