import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { user } from "./user";
import { relations } from "drizzle-orm";
import { workspace } from "./workspace";

export const note = pgTable(
  "note",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    pinned: boolean("pinned").default(false).notNull(),
    status: text("status", { enum: ["private", "public", "request_access"] })
      .default("private")
      .notNull(),

    workspaceId: text("workspace_id")
      // .notNull() NOTE: workspaceId is nullable for now. User can create separate notes without workspace
      .references(() => workspace.id, { onDelete: "cascade" }),

    createdBy: text("created_by")
      .notNull()
      .references(() => user.id),

    updatedBy: text("updated_by").references(() => user.id),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [index("note_workspace_idx").on(table.workspaceId)]
);

export const tag = pgTable("tag", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  workspaceId: text("workspace_id")
    .notNull()
    .references(() => workspace.id, { onDelete: "cascade" }),
});

export const noteTag = pgTable(
  "note_tag",
  {
    noteId: text("note_id")
      .notNull()
      .references(() => note.id, { onDelete: "cascade" }),

    tagId: text("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (table) => [uniqueIndex("note_tag_unique").on(table.noteId, table.tagId)]
);

export const noteRelations = relations(note, ({ one, many }) => ({
  workspace: one(workspace, {
    fields: [note.workspaceId],
    references: [workspace.id],
  }),
  creator: one(user, {
    fields: [note.createdBy],
    references: [user.id],
  }),
  tags: many(noteTag),
}));

export const noteTagRelations = relations(noteTag, ({ one }) => ({
  note: one(note, {
    fields: [noteTag.noteId],
    references: [note.id],
  }),
  tag: one(tag, {
    fields: [noteTag.tagId],
    references: [tag.id],
  }),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  notes: many(noteTag),
}));

export type Note = typeof note.$inferSelect;
export type NewNote = typeof note.$inferInsert;
