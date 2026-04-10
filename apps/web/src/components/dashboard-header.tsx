import type { ReactNode } from "react";
import { motion } from "framer-motion";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";

export function DashboardHeader(props?: {
  actions?: ReactNode;
  children?: ReactNode;
  description?: string;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <DashboardSurface accent="primary" className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <DashboardPill>{props?.eyebrow ?? "Workspace View"}</DashboardPill>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                {props?.title ?? "Dashboard"}
              </h1>
              {props?.description ? (
                <p className="text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                  {props.description}
                </p>
              ) : null}
            </div>
          </div>

          {props?.actions ? (
            <div className="flex flex-wrap items-center gap-3">
              {props.actions}
            </div>
          ) : null}
        </div>

        {props?.children ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {props.children}
          </div>
        ) : null}
      </DashboardSurface>
    </motion.div>
  );
}
