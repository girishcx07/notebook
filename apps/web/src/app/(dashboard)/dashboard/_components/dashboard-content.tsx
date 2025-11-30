import * as React from "react";

import { cn } from "@notebook/ui/lib/utils";

interface DashboardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function DashboardContent({
  className,
  children,
}: DashboardContentProps) {
  return (
    <div
      className={cn(
        "@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
