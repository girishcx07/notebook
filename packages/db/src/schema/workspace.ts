import { user } from "./user";
import { note } from "./note";

import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const workspace = pgTable("workspace", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  visibility: text("visibility", { enum: ["public", "private"] })
    .default("private")
    .notNull(),
  archived: boolean("archived").default(false).notNull(),
  archivedAt: timestamp("archived_at"),
  followerCount: integer("follower_count").default(0).notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workspaceRelations = relations(workspace, ({ many, one }) => ({
  members: many(workspaceMember),
  followers: many(workspaceFollower),
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
    status: text("status", {
      enum: ["active", "invited", "declined", "archived"],
    })
      .default("active")
      .notNull(),
    invitedBy: text("invited_by").references(() => user.id),
    invitedAt: timestamp("invited_at"),
    respondedAt: timestamp("responded_at"),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    index("member_user_idx").on(table.userId),
    index("member_workspace_idx").on(table.workspaceId),
    uniqueIndex("member_unique").on(table.userId, table.workspaceId),
  ]
);

export const workspaceFollower = pgTable(
  "workspace_follower",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    workspaceId: text("workspace_id")
      .notNull()
      .references(() => workspace.id, { onDelete: "cascade" }),
    followedAt: timestamp("followed_at").defaultNow().notNull(),
  },
  (table) => [
    index("follower_user_idx").on(table.userId),
    index("follower_workspace_idx").on(table.workspaceId),
    uniqueIndex("follower_unique").on(table.userId, table.workspaceId),
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
    inviter: one(user, {
      fields: [workspaceMember.invitedBy],
      references: [user.id],
    }),
  })
);

export const workspaceFollowerRelations = relations(
  workspaceFollower,
  ({ one }) => ({
    user: one(user, {
      fields: [workspaceFollower.userId],
      references: [user.id],
    }),
    workspace: one(workspace, {
      fields: [workspaceFollower.workspaceId],
      references: [workspace.id],
    }),
  })
);
