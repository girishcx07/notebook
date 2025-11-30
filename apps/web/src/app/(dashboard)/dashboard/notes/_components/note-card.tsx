"use client";

import { motion } from "framer-motion";
import { noteCardVariants } from "@/src/lib/motion";
import { useRouter } from "next/navigation";

export function NoteCard({ note }: { note: any }) {
  const router = useRouter();

  return (
    <motion.div
      variants={noteCardVariants}
      onClick={() => router.push(`/dashboard/notes/${note.id}`)}
      className="
      bg-card shadow-sm min-h-[220px]
        border border-dashed rounded-xl p-6 cursor-pointer group transition-all
        hover:border-primary hover:bg-primary/5
      "
    >
      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
        {note.title}
      </h3>

      <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-primary/80">
        {note.content}
      </p>

      <div className="mt-4 text-xs text-muted-foreground">
        {new Date(note.updatedAt).toLocaleDateString("en-US")}
      </div>
    </motion.div>
  );
}
