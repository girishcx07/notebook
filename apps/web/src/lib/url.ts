import { detectRuntimeKind, resolveApiBaseUrl } from "@acme/sdk";

import { env } from "@/env";

interface GetBaseUrlOptions {
  apiUrl?: string | null;
  runtime?: "browser" | "iframe" | "server";
  vercelEnv?: string | null;
  vercelProductionUrl?: string | null;
  vercelUrl?: string | null;
}

export function getBaseUrl(options: GetBaseUrlOptions = {}) {
  return resolveApiBaseUrl({
    runtime: options.runtime ?? detectRuntimeKind(),
    apiUrl: options.apiUrl ?? env.VITE_API_URL,
    browserOrigin:
      typeof window !== "undefined" ? window.location.origin : undefined,
    vercelEnv: options.vercelEnv,
    vercelUrl: options.vercelUrl,
    vercelProductionUrl: options.vercelProductionUrl,
    port: 3000,
  });
}
