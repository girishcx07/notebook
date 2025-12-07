import {
  boolean,
  index,
  integer,
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

    followerCount: integer("follower_count").default(0).notNull(),
    viewerCount: integer("viewer_count").default(0).notNull(),
    archived: boolean("archived").default(false).notNull(),
    archivedAt: timestamp("archived_at"),

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

export const noteFollower = pgTable(
  "note_follower",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    noteId: text("note_id")
      .notNull()
      .references(() => note.id, { onDelete: "cascade" }),
    followedAt: timestamp("followed_at").defaultNow().notNull(),
  },
  (table) => [
    index("note_follower_user_idx").on(table.userId),
    index("note_follower_note_idx").on(table.noteId),
    uniqueIndex("note_follower_unique").on(table.userId, table.noteId),
  ]
);

export const noteViewer = pgTable(
  "note_viewer",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    noteId: text("note_id")
      .notNull()
      .references(() => note.id, { onDelete: "cascade" }),
    lastViewedAt: timestamp("last_viewed_at").defaultNow().notNull(),
    viewCount: integer("view_count").default(1).notNull(),
  },
  (table) => [
    index("note_viewer_user_idx").on(table.userId),
    index("note_viewer_note_idx").on(table.noteId),
    uniqueIndex("note_viewer_unique").on(table.userId, table.noteId),
  ]
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
  followers: many(noteFollower),
  viewers: many(noteViewer),
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
  workspace: many(workspace),
}));

export const noteFollowerRelations = relations(noteFollower, ({ one }) => ({
  user: one(user, {
    fields: [noteFollower.userId],
    references: [user.id],
  }),
  note: one(note, {
    fields: [noteFollower.noteId],
    references: [note.id],
  }),
}));

export const noteViewerRelations = relations(noteViewer, ({ one }) => ({
  user: one(user, {
    fields: [noteViewer.userId],
    references: [user.id],
  }),
  note: one(note, {
    fields: [noteViewer.noteId],
    references: [note.id],
  }),
}));

export type Note = typeof note.$inferSelect;
export type NewNote = typeof note.$inferInsert;
