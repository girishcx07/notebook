export * from "./posts";
export * from "./user";
export * from "./note";
export * from "./workspace";

// Export individual tables for type inference
export { note, tag, noteTag, noteFollower, noteViewer } from "./note";

export { workspace, workspaceMember, workspaceFollower } from "./workspace";
