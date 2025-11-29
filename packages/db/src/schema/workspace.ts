import { user } from "./user";
import { note } from "./note";

import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const workspace = pgTable("workspace", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workspaceRelations = relations(workspace, ({ many, one }) => ({
  members: many(workspaceMember),
  notes: many(note),
  creator: one(user, {
    fields: [workspace.createdBy],
    references: [user.id],
  }),
}));

export const workspaceMember = pgTable(
  "workspace_member",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    role: text("role").default("member"), // admin / member / viewer
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    index("member_user_idx").on(table.userId),
    index("member_workspace_idx").on(table.workspaceId),
    uniqueIndex("member_unique").on(table.userId, table.workspaceId),
  ]
);

export const workspaceMemberRelations = relations(
  workspaceMember,
  ({ one }) => ({
    user: one(user, {
      fields: [workspaceMember.userId],
      references: [user.id],
    }),
    workspace: one(workspace, {
      fields: [workspaceMember.workspaceId],
      references: [workspace.id],
    }),
  })
);
