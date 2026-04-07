import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().default(3001),
    HOST: z.string().default("0.0.0.0"),
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    PUBLIC_WEB_URL: z.string().url().default("http://localhost:3000"),
    PUBLIC_SERVER_URL: z.string().url().default("http://localhost:3001"),
    ALLOWED_EMBED_ORIGINS: z.string().optional(),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),
    SENTRY_DSN: z.string().url().optional(),
    SENTRY_ENVIRONMENT: z.string().default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
