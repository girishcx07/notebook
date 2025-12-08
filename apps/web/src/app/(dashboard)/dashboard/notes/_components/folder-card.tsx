"use client";

import { motion } from "framer-motion";
import { noteCardVariants } from "@/src/lib/motion";
import { useRouter } from "next/navigation";
import { Folder } from "lucide-react";

interface FolderCardProps {
  id: string;
  name: string;
  description: string | null;
  visibility: "private" | "public";
  followerCount: number;
  createdAt: string;
}

/**
 * Render a clickable card that displays a workspace's metadata.
 *
 * Clicking the card navigates to the corresponding workspace anchor in the dashboard.
 *
 * @param workspace - Workspace metadata used to populate the card (id, name, description, visibility, followerCount, createdAt)
 * @returns A React element representing the folder card
 */
export function FolderCard({ workspace }: { workspace: FolderCardProps }) {
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
        <h3 className="font-semibold group-hover:text-primary transition-colors">
          {workspace.name}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-primary/80 flex-grow">
        {workspace.description || "No description"}
      </p>

      <div className="mt-4 text-xs text-muted-foreground">
        {new Date(workspace.createdAt).toLocaleDateString("en-US")}
      </div>
    </motion.div>
  );
}