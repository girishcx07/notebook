import { rpcClient } from "@/src/lib/api";
import { authClient } from "@/src/lib/auth-client";

export async function getWorkspaces() {
  const { data: session } = await authClient.getSession();

  if (!session?.user) {
    throw new Error("User not found");
  }

  const res = await rpcClient.workspace.$get({
    query: {
      userId: session.user.id,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workspaces");
  }

  return await res.json();
}
