import * as React from "react";

import { cn } from "@notebook/ui/lib/utils";
import { SiteHeader } from "../app/(dashboard)/dashboard/_components/site-header";

interface DashboardContentProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export function DashboardContent({
  className,
  children,
  title,
}: DashboardContentProps) {
  return (
    <>
      {title && <SiteHeader title={title} />}
      <div
        className={cn(
          "@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
