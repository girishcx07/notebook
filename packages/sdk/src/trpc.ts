import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
} from "@trpc/client";
import SuperJSON from "superjson";

import type { AppRouter } from "@acme/api";

type DynamicHeaders = HeadersInit | (() => HeadersInit);

export interface CreateApiClientOptions {
  headers?: DynamicHeaders;
  logger?: boolean | Parameters<typeof loggerLink>[0];
  source: string;
  url: string;
}

export interface CreateEmbeddableApiClientOptions extends Omit<
  CreateApiClientOptions,
  "source"
> {
  embedOrigin?: string | null;
  moduleName: string;
  moduleVersion?: string;
  source?: string;
}

function mergeHeaders(...sources: (HeadersInit | undefined)[]) {
  const merged = new Headers();

  for (const source of sources) {
    if (!source) {
      continue;
    }

    new Headers(source).forEach((value, key) => {
      merged.set(key, value);
    });
  }

  return merged;
}

function resolveHeaders(headers?: DynamicHeaders) {
  return typeof headers === "function" ? headers() : headers;
}

function headersToObject(headers: Headers) {
  const values: Record<string, string> = {};

  headers.forEach((value, key) => {
    values[key] = value;
  });

  return values;
}

export function buildEmbedHeaders(options: {
  embedOrigin?: string | null;
  moduleName: string;
  moduleVersion?: string;
}) {
  return mergeHeaders({
    "x-embed-mode": "iframe",
    "x-embed-module": options.moduleName,
    ...(options.embedOrigin
      ? { "x-embed-origin": options.embedOrigin }
      : undefined),
    ...(options.moduleVersion
      ? { "x-embed-version": options.moduleVersion }
      : undefined),
  });
}

export function createApiClient({
  headers,
  logger = false,
  source,
  url,
}: CreateApiClientOptions) {
  return createTRPCClient<AppRouter>({
    links: [
      ...(logger
        ? [loggerLink(typeof logger === "boolean" ? {} : logger)]
        : []),
      httpBatchStreamLink({
        transformer: SuperJSON,
        url,
        headers(_opts) {
          const requestHeaders = mergeHeaders(resolveHeaders(headers));
          requestHeaders.set("x-trpc-source", source);
          return headersToObject(requestHeaders);
        },
      }),
    ],
  });
}

export function createEmbeddableApiClient({
  embedOrigin,
  headers,
  logger,
  moduleName,
  moduleVersion,
  source = "embed-sdk",
  url,
}: CreateEmbeddableApiClientOptions) {
  return createApiClient({
    headers: () =>
      mergeHeaders(
        resolveHeaders(headers),
        buildEmbedHeaders({
          embedOrigin,
          moduleName,
          moduleVersion,
        }),
      ),
    logger,
    source,
    url,
  });
}
