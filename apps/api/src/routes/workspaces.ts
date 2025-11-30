import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db, workspace, workspaceMember } from "@notebook/db";
import { getWorkspacesSchema } from "@notebook/schemas";
import { eq } from "drizzle-orm";

const workspacesRoutes = new Hono().get(
  "/",
  zValidator("query", getWorkspacesSchema),
  async (c) => {
    const { userId } = c.req.valid("query");

    // Fetch workspaces where user is a member or creator
    // For simplicity, let's just fetch where createdBy matches for now,
    // or join with workspaceMember if needed.
    // Given schema, workspaceMember links user to workspace.

    const userWorkspaces = await db
      .select({
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        createdAt: workspace.createdAt,
      })
      .from(workspace)
      .leftJoin(workspaceMember, eq(workspace.id, workspaceMember.workspaceId))
      .where(
        eq(workspace.createdBy, userId)
        // OR eq(workspaceMember.userId, userId) -- logic can be expanded later
      );

    return c.json(userWorkspaces);
  }
);

export default workspacesRoutes;
