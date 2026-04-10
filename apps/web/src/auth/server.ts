import { reactStartCookies } from "better-auth/react-start";

import { initAuth } from "@repo/auth";

import { env } from "@/env.server";
import { getBaseUrl } from "@/lib/url";

export const auth = initAuth({
  baseUrl: getBaseUrl({
    apiUrl: env.API_URL,
    runtime: "server",
    vercelEnv: env.VERCEL_ENV,
    vercelUrl: env.VERCEL_URL,
    vercelProductionUrl: env.VERCEL_PROJECT_PRODUCTION_URL,
  }),
  productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? "turbo.t3.gg"}`,
  secret: env.AUTH_SECRET,

  extraPlugins: [reactStartCookies()],
});
