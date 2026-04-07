import type { RuntimeKind } from "./runtime";

export interface ResolveApiBaseUrlOptions {
  apiUrl?: string | null;
  browserOrigin?: string | null;
  port?: number;
  runtime?: RuntimeKind;
  vercelEnv?: string | null;
  vercelProductionUrl?: string | null;
  vercelUrl?: string | null;
}

function stripTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export function resolveApiBaseUrl({
  apiUrl,
  browserOrigin,
  port = 3000,
  runtime = "server",
  vercelEnv,
  vercelProductionUrl,
  vercelUrl,
}: ResolveApiBaseUrlOptions) {
  if (runtime === "browser" && browserOrigin) {
    return stripTrailingSlash(browserOrigin);
  }

  if (runtime === "iframe" && apiUrl) {
    return stripTrailingSlash(apiUrl);
  }

  if (runtime === "iframe" && browserOrigin) {
    return stripTrailingSlash(browserOrigin);
  }

  if (apiUrl) {
    return stripTrailingSlash(apiUrl);
  }

  if (vercelEnv === "production" && vercelProductionUrl) {
    return `https://${vercelProductionUrl}`;
  }

  if (vercelEnv === "preview" && vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return `http://localhost:${port}`;
}
