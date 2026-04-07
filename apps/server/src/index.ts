import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as requestLogger } from "hono/logger";

import { appRouter, createTRPCContext } from "@acme/api";
import { initAuth } from "@acme/auth";
import { getLogger } from "@acme/observability";

import { env } from "./env";

const appLogger = getLogger({ service: "api-server" });

const auth = initAuth({
  baseUrl: env.PUBLIC_SERVER_URL,
  productionUrl: env.PUBLIC_WEB_URL, // In production setup, web URL works as production URL for proxy
  secret: env.AUTH_SECRET,
});

const app = new Hono<{
  Variables: {
    user: ReturnType<typeof initAuth>["$Infer"]["Session"]["user"] | null;
    session: ReturnType<typeof initAuth>["$Infer"]["Session"]["session"] | null;
  };
}>();

app.get("/healthcheck", (c) => {
  return c.text("OK");
});

app.use(requestLogger());

const trustedOrigins = Array.from(
  new Set([
    env.PUBLIC_WEB_URL,
    ...(env.ALLOWED_EMBED_ORIGINS?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? []),
  ]),
).map((url) => new URL(url).origin);

app.use(
  "/api/*",
  cors({
    origin(origin) {
      if (!origin) {
        return env.PUBLIC_WEB_URL;
      }

      if (trustedOrigins.includes(origin)) {
        return origin;
      }

      appLogger.warn({ origin }, "Blocked cross-origin API request");
      return undefined;
    },
    credentials: true,
    allowHeaders: [
      "Authorization",
      "Content-Type",
      "x-embed-mode",
      "x-embed-module",
      "x-embed-origin",
      "x-embed-version",
      "x-trpc-source",
    ],
  }),
);

// Better Auth handler
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

// tRPC handler
app.use("/api/trpc/*", async (c) => {
  const res = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext: () =>
      createTRPCContext({ headers: new Headers(c.req.raw.headers), auth }),
  });
  return res;
});

export default app;
