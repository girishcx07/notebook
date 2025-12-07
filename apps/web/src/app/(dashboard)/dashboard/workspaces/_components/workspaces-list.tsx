"use client";

import { getWorkspaces } from "@/src/api/workspace";
import { Skeleton } from "@notebook/ui/components/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { keys } from "@/src/constants/query-key";
import { motion } from "framer-motion";
import { noteContainerVariants } from "@/src/lib/motion";
import { AddWorkspaceCard } from "./add-workspace-card";
import { WorkspaceCard } from "./workspace-card";
import { useSession } from "@/src/components/session-provider";

export const WorkspacesList = () => {
  return (
    <Suspense fallback={<WorkspacesListSkeleton />}>
      <ErrorBoundary fallback={<p>Error fetching workspaces</p>}>
        <WorkspacesListSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

export function WorkspacesListSuspense() {
  const session = useSession();

  const { data: workspaces } = useSuspenseQuery({
    queryKey: keys.workspaces.all,
    queryFn: () => getWorkspaces(session?.user?.id || ""),
  });

  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground mb-4">No workspaces found</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={noteContainerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-5 md:grid-cols-4 lg:grid-cols-5"
    >
      <AddWorkspaceCard />
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </motion.div>
  );
}

export function WorkspacesListSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-6 border border-dashed rounded-xl">
          <Skeleton className="h-5 w-3/4 mb-3 rounded-md" />
          <Skeleton className="h-4 w-full mb-2 rounded-md" />
          <Skeleton className="h-4 w-5/6 mb-2 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
          <Skeleton className="h-3 w-24 mt-4 rounded-md" />
        </div>
      ))}
    </div>
  );
}
