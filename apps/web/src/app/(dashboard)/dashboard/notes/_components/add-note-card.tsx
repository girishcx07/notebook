"use client";

import { motion } from "framer-motion";
import { noteCardVariants } from "@/src/lib/motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddNoteCard() {
  const router = useRouter();

  return (
    <motion.div
      variants={noteCardVariants}
      onClick={() => router.push("/dashboard/notes/new")}
      className="
      bg-card shadow-sm min-h-[220px]
        cursor-pointer border border-dashed rounded-xl p-6 flex items-center justify-center 
        text-muted-foreground hover:text-primary 
        hover:border-primary hover:bg-primary/5 transition-colors
      "
    >
      <Plus className="mr-2 h-5 w-5" />
      Add Note
    </motion.div>
  );
}
