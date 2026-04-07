import { detectRuntimeKind, resolveApiBaseUrl } from "@acme/sdk";

import { env } from "@/env";

export function getBaseUrl() {
  return resolveApiBaseUrl({
    runtime: detectRuntimeKind(),
    apiUrl: env.API_URL,
    browserOrigin:
      typeof window !== "undefined" ? window.location.origin : undefined,
    vercelEnv: env.VERCEL_ENV,
    vercelUrl: env.VERCEL_URL,
    vercelProductionUrl: env.VERCEL_PROJECT_PRODUCTION_URL,
    port: 3000,
  });
}
