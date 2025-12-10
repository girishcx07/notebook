import { Hono } from "hono";
import { cors } from "hono/cors";
import postsRoutes from "./routes/posts";
import notesRoutes from "./routes/notes";
import workspacesRoutes from "./routes/workspaces";
import noteCollaborationRoutes from "./routes/note-collaboration";
import workspaceCollaborationRoutes from "./routes/workspace-collaboration";

const app = new Hono()
  .use("/*", cors())
  .route("/posts", postsRoutes)
  .route("/note", notesRoutes)
  .route("/workspace", workspacesRoutes)
  .route("/note", noteCollaborationRoutes)
  .route("/workspace", workspaceCollaborationRoutes)
  .get("/", (c) => {
    return c.json({ message: "Hono RPC Server", status: "ok" });
  });

export default app;

export type AppType = typeof app;
