import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

export const noteVisibilityEnum = pgEnum("note_visibility", [
  "PUBLIC",
  "AUTHENTICATED",
  "ORG",
  "SCHOOL",
  "CLASS",
  "PRIVATE",
]);

export const Note = pgTable(
  "note",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    orgId: text("org_id"),
    schoolId: text("school_id"),
    classId: text("class_id"),
    visibility: noteVisibilityEnum("visibility").notNull().default("PRIVATE"),
    title: varchar("title", { length: 120 }).notNull(),
    content: text("content").notNull(),
    isArchived: boolean("is_archived").notNull().default(false),
    createdAt: timestamp("created_at", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      withTimezone: true,
    })
      .defaultNow()
      .notNull()
      .$onUpdateFn(() => sql`now()`),
    deletedAt: timestamp("deleted_at", {
      mode: "date",
      withTimezone: true,
    }),
  },
  (table) => [
    index("note_owner_id_idx").on(table.ownerId),
    index("note_visibility_idx").on(table.visibility),
    index("note_archived_idx").on(table.isArchived),
    index("note_deleted_at_idx").on(table.deletedAt),
    index("note_scope_idx").on(table.orgId, table.schoolId, table.classId),
  ],
);

export const noteRelations = relations(Note, ({ one }) => ({
  owner: one(user, {
    fields: [Note.ownerId],
    references: [user.id],
  }),
}));
