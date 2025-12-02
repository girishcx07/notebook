import { rpcClient } from "@/src/lib/api";

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
