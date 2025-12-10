export const keys = {
  notes: {
    all: ["notes"] as const,
    recent: (id: string) => ["recentNotes", id] as const,
    byId: (id: string) => ["notes", id] as const,
  },
  workspaces: {
    all: ["workspaces"] as const,
  },

  posts: {
    all: ["posts"] as const,
    create: ["posts", "create"] as const,
    deleteById: (id: string) => ["posts", "deleteById", id] as const,
    updateById: (id: string) => ["posts", "updateById", id] as const,
  },

  students: {
    all: ["students"] as const,
    activity: (id: string) => ["students", "activity", id] as const,
  },

  analytics: {
    notes: ["analytics", "notes"] as const,
  },
};
