import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { createTRPCContext } from "@trpc/tanstack-react-query";

import type * as Api from "@repo/api";
import { createApiClient } from "@repo/sdk";

import { env } from "@/env";
import { env as serverEnv } from "@/env.server";
import { getBaseUrl } from "@/lib/url";

export const makeTRPCClient = createIsomorphicFn()
  .server(() => {
    return createApiClient({
      url:
        getBaseUrl({
          apiUrl: serverEnv.API_URL,
          runtime: "server",
          vercelEnv: serverEnv.VERCEL_ENV,
          vercelUrl: serverEnv.VERCEL_URL,
          vercelProductionUrl: serverEnv.VERCEL_PROJECT_PRODUCTION_URL,
        }) + "/api/trpc",
      source: "tanstack-start-server",
      headers: () => getRequestHeaders() as HeadersInit,
    });
  })
  .client(() => {
    return createApiClient({
      url: getBaseUrl() + "/api/trpc",
      source: "tanstack-start-client",
      logger: {
        enabled: (op) =>
          env.NODE_ENV === "development" ||
          (op.direction === "down" && op.result instanceof Error),
      },
    });
  });

export const { useTRPC, TRPCProvider } = createTRPCContext<Api.AppRouter>();
