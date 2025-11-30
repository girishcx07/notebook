export const keys = {
  notes: {
    all: ["notes"] as const,
    recent: ["notes", "recent"] as const,
    list: () => ["notes", "list"] as const,
    detail: (id: string) => ["notes", "detail", id] as const,
  },

  students: {
    all: ["students"] as const,
    activity: (id: string) => ["students", "activity", id] as const,
  },

  analytics: {
    notes: ["analytics", "notes"] as const,
  },
};
