import { Suspense } from "react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import type { RouterOutputs } from "@repo/api";
import { Button } from "@repo/ui/components/button";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";
import { useTRPC } from "@/lib/trpc";

export function PostSection() {
  return (
    <DashboardSurface accent="blue" className="p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <DashboardPill>Activity feed</DashboardPill>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Posts
            </h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              Keep updates visible inside the dashboard without crowding the
              rest of the workspace.
            </p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        }
      >
        <PostList />
      </Suspense>
    </DashboardSurface>
  );
}

function PostList() {
  const trpc = useTRPC();
  const { data: posts } = useSuspenseQuery(trpc.post.all.queryOptions());

  if (posts.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-white/70 bg-white/70 p-12 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-muted-foreground text-lg font-medium">
          No posts yet
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          Create your first post above
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}

function PostCard(props: { post: RouterOutputs["post"]["all"][number] }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const deletePost = useMutation(
    trpc.post.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.post.pathFilter());
      },
    }),
  );

  return (
    <div className="group flex items-start justify-between rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <div>
        <h3 className="font-semibold">{props.post.title}</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {props.post.content}
        </p>
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="opacity-0 transition group-hover:opacity-100"
        onClick={() => deletePost.mutate(props.post.id)}
      >
        Delete
      </Button>
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-[24px] border border-white/70 bg-white/75 p-6 dark:border-white/10 dark:bg-white/5">
      <div className="bg-muted h-5 w-1/3 animate-pulse rounded" />
      <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
    </div>
  );
}
