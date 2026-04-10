import { createEnv } from "@t3-oss/env-core";
import { vercel } from "@t3-oss/env-core/presets-zod";
import { z } from "zod/v4";

import { authEnv } from "@repo/auth/env";
import { mailerEnv } from "@repo/mailer/env";

export const env = createEnv({
  extends: [authEnv(), mailerEnv(), vercel()],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  server: {
    API_URL: z.string().url().default("http://localhost:3000"),
  },
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
