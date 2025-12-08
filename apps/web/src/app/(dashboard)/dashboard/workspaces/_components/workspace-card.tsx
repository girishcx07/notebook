"use client";

import { motion } from "framer-motion";
import { noteCardVariants } from "@/src/lib/motion";
import { useRouter } from "next/navigation";
import { Folder, Users } from "lucide-react";
import { Badge } from "@notebook/ui/components/badge";

interface WorkspaceCardProps {
  workspace: {
    id: string;
    name: string;
    description: string | null;
    visibility: "private" | "public";
    followerCount: number;
    createdAt: string;
  };
}

/**
 * Renders an interactive workspace card that displays workspace metadata and navigates to the workspace anchor when clicked.
 *
 * @param workspace - Workspace data including `id`, `name`, `description`, `visibility`, `followerCount`, and `createdAt`.
 * @returns A React element representing the workspace card with name, description, creation date, and conditional visibility/follower badges.
 */
export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();

  return (
    <motion.div
      variants={noteCardVariants}
      onClick={() => router.push(`/dashboard/workspaces#${workspace.id}`)}
      className="
        bg-card shadow-sm min-h-[220px]
        border border-dashed rounded-xl p-6 cursor-pointer group transition-colors
        hover:border-primary hover:bg-primary/5 flex flex-col
      "
    >
      <div className="flex items-center gap-2 mb-4">
        <Folder className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
          {workspace.name}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-primary/80 grow">
        {workspace.description || "No description"}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground">
          {new Date(workspace.createdAt).toLocaleDateString("en-US")}
        </div>

        <div className="flex items-center gap-2">
          {workspace.visibility === "public" &&
            workspace.followerCount !== undefined && (
              <Badge variant="secondary" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                {workspace.followerCount}
              </Badge>
            )}
          {workspace.visibility === "public" && (
            <Badge variant="outline" className="text-xs">
              Public
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}