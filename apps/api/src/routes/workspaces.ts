import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db, workspace, workspaceMember, note } from "@notebook/db";
import { getWorkspacesSchema, createWorkspaceSchema } from "@notebook/schemas";
import { zValidator } from "@hono/zod-validator";

const workspacesRoutes = new Hono()
  .get("/", zValidator("query", getWorkspacesSchema), async (c) => {
    const { userId } = c.req.valid("query");

    // Fetch workspaces where user is the creator
    // TODO: expand this to also include workspaces where user is a member
    // or join with workspaceMember if needed.
    // Given schema, workspaceMember links user to workspace.

    const workspaces = await db
      .select({
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        visibility: workspace.visibility,
        followerCount: workspace.followerCount,
        createdAt: workspace.createdAt,
      })
      .from(workspace)
      .leftJoin(workspaceMember, eq(workspace.id, workspaceMember.workspaceId))
      .where(
        eq(workspace.createdBy, userId)
        // OR eq(workspaceMember.userId, userId) -- logic can be expanded later
      );

    return c.json(workspaces);
  })
  .post("/", zValidator("json", createWorkspaceSchema), async (c) => {
    const data = c.req.valid("json");

    try {
      // Create workspace
      const workspaceId = crypto.randomUUID();

      const [newWorkspace] = await db
        .insert(workspace)
        .values({
          id: workspaceId,
          name: data.name,
          description: data.description || null,
          createdBy: data.userId,
        })
        .returning({
          id: workspace.id,
          name: workspace.name,
          description: workspace.description,
          createdAt: workspace.createdAt,
        });

      // If noteIds are provided, move those notes to this workspace
      if (data.noteIds && data.noteIds.length > 0) {
        const { and, inArray } = await import("drizzle-orm");

        await db
          .update(note)
          .set({ workspaceId: workspaceId })
          .where(
            and(
              eq(note.createdBy, data.userId), // Only update user's own notes
              inArray(note.id, data.noteIds) // Only update specified notes
            )
          );
      }

      return c.json(newWorkspace, 201);
    } catch (error: any) {
      console.error("Error creating workspace:", error);
      return c.json({ error: "Failed to create workspace" }, 500);
    }
  });

export default workspacesRoutes;
