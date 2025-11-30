export const keys = {
  notes: {
    all: ["notes"] as const,
    recent: (id: string) => ["recentNotes", id] as const,
    byId: (id: string) => ["notes", id] as const,
  },
  workspaces: {
    all: ["workspaces"] as const,
  },

  students: {
    all: ["students"] as const,
    activity: (id: string) => ["students", "activity", id] as const,
  },

  analytics: {
    notes: ["analytics", "notes"] as const,
  },
};
