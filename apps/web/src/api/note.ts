import { CreateNote } from "@notebook/schemas";
import { authClient } from "@/src/lib/auth-client";
import { rpcClient } from "@/src/lib/api";

/**
 * Create a new note
 */
export async function createNote(payload: Omit<CreateNote, "userId">) {
  const { data: session } = await authClient.getSession();

  if (!session?.user) {
    throw new Error("User not found");
  }

  const res = await rpcClient.note.$post({
    json: {
      content: payload.content,
      title: payload.title,
      userId: session.user.id,
      workspaceId: payload.workspaceId,
      status: payload.status,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  return await res.json();
}

/**
 * Get a note by ID
 */
export async function getNoteById(id: number) {
  const res = await rpcClient.note[":id"].$get({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch note");
  }

  return await res.json();
}

/**
 * Get all notes
 */
export async function getAllNotes() {
  const res = await rpcClient.note.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await res.json();
}

/**
 * Get recent notes
 */
export async function getRecentNotes(userId: string) {
  const res = await rpcClient.note.recent.$get({
    query: {
      limit: "5",
      userId,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await res.json();
}

/**
 * Update a note
 */
export async function updateNote(
  id: number,
  data: { title?: string; content?: string }
) {
  const res = await rpcClient.note[":id"].$patch({
    param: { id: id.toString() },
    json: data,
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Note not found");
    }
    throw new Error("Failed to update note");
  }

  return await res.json();
}

/**
 * Delete a note
 */
export async function deleteNote(id: number) {
  const res = await rpcClient.note[":id"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Note not found");
    }
    throw new Error("Failed to delete note");
  }

  return await res.json();
}
