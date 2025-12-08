"use client";

import { noteCardVariants } from "@/src/lib/motion";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Renders a clickable card that navigates to the new workspace creation page.
 *
 * The card displays a plus icon and the label "Add Workspace" and triggers
 * navigation to `/dashboard/workspaces/new` when clicked.
 *
 * @returns The JSX element for the "Add Workspace" card that navigates to the new workspace route when activated.
 */
export function AddWorkspaceCard() {
  const router = useRouter();

  return (
    <motion.div
      variants={noteCardVariants}
      onClick={() => router.push("/dashboard/workspaces/new")}
      className="
        bg-card shadow-sm min-h-[220px]
        cursor-pointer border border-dashed rounded-xl p-6 flex items-center justify-center 
        text-muted-foreground hover:text-primary 
        hover:border-primary hover:bg-primary/5 transition-colors
      "
    >
      <Plus className="mr-2 h-5 w-5" />
      Add Workspace
    </motion.div>
  );
}