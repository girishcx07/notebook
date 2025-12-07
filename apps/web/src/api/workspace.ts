import { rpcClient } from "@/src/lib/api";
import { CreateWorkspaceForm } from "@notebook/schemas";
import { authClient } from "@/src/lib/auth-client";

/**
 * Create a new workspace
 */
export async function createWorkspace(
  payload: CreateWorkspaceForm
): Promise<{ id: string; name: string }> {
  const { data: session } = await authClient.getSession();

  if (!session?.user) {
    throw new Error("User not found");
  }

  const res = await rpcClient.workspace.$post({
    json: {
      name: payload.name,
      description: payload.description,
      userId: session.user.id,
      noteIds: payload.noteIds,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create workspace");
  }

  return await res.json();
}

/**
 * Get workspaces for a user
 */
export async function getWorkspaces(userId: string) {
  const res = await rpcClient.workspace.$get({
    query: {
      userId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workspaces");
  }

  return await res.json();
}
