"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { noteCardVariants } from "@/src/lib/motion";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createNote } from "@/src/api/note";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@notebook/ui/components/dialog";
import { Button } from "@notebook/ui/components/button";
import { Input } from "@notebook/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@notebook/ui/components/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@notebook/ui/components/form";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/src/constants/query-key";
import { createNoteFormSchema } from "@notebook/schemas";
import { useSession } from "@/src/components/session-provider";

export function AddNoteCard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const session = useSession();

  const form = useForm<z.infer<typeof createNoteFormSchema>>({
    resolver: zodResolver(createNoteFormSchema),
    defaultValues: {
      title: "",
      status: "private" as const,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof createNoteFormSchema>) {
    try {
      const newNote = await createNote({
        title: values.title,
        content: "", // Start with empty content
        status: values.status,
      });

      toast.success("Note created successfully");
      setIsOpen(false);
      form.reset();

      // Invalidate queries to refresh the list
      queryClient.invalidateQueries({ queryKey: keys.notes.all });
      queryClient.invalidateQueries({
        queryKey: keys.notes.recent(session?.user.id!),
      });

      // Navigate to the new note
      router.push(`/dashboard/library/${newNote.id}`);
    } catch (error) {
      toast.error("Failed to create note");
      console.error(error);
    }
  }

  return (
    <>
      <motion.div
        variants={noteCardVariants}
        onClick={() => setIsOpen(true)}
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Add a title and set the visibility status for your new note.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Note title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="request_access">
                          Request Access
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Note
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
