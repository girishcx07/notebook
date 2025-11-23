import { Hono } from "hono";
import { cors } from "hono/cors";
import postsRoutes from "./routes/posts.js";

const app = new Hono();

// Enable CORS for client requests
app.use("/*", cors());

// Mount routes
app.route("/posts", postsRoutes);

// Health check
app.get("/", (c) => {
  return c.json({ message: "Hono RPC Server", status: "ok" });
});

export default app;
