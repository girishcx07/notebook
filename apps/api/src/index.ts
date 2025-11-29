import { Hono } from "hono";
import { cors } from "hono/cors";
import postsRoutes from "./routes/posts";
import notesRoutes from "./routes/notes";

const app = new Hono()
  .use("/*", cors())
  .route("/posts", postsRoutes)
  .route("/notes", notesRoutes)
  .get("/", (c) => {
    return c.json({ message: "Hono RPC Server", status: "ok" });
  });

export default app;

export type AppType = typeof app;
