import { describe, expect, it } from "vitest";

import { buildEmbedHeaders, resolveApiBaseUrl } from "./index";

describe("resolveApiBaseUrl", () => {
  it("prefers the browser origin for the standard web runtime", () => {
    expect(
      resolveApiBaseUrl({
        browserOrigin: "https://app.example.com/",
        runtime: "browser",
      }),
    ).toBe("https://app.example.com");
  });

  it("prefers an explicit apiUrl when running inside an iframe", () => {
    expect(
      resolveApiBaseUrl({
        apiUrl: "https://api.example.com/",
        browserOrigin: "https://embed.example.com",
        runtime: "iframe",
      }),
    ).toBe("https://api.example.com");
  });

  it("falls back to the deployment url when no local origin is available", () => {
    expect(
      resolveApiBaseUrl({
        runtime: "server",
        vercelEnv: "production",
        vercelProductionUrl: "app.example.com",
      }),
    ).toBe("https://app.example.com");
  });
});

describe("buildEmbedHeaders", () => {
  it("includes embed metadata headers", () => {
    const headers = buildEmbedHeaders({
      embedOrigin: "https://portal.example.com",
      moduleName: "dashboard-card",
      moduleVersion: "1.0.0",
    });

    expect(headers.get("x-embed-mode")).toBe("iframe");
    expect(headers.get("x-embed-module")).toBe("dashboard-card");
    expect(headers.get("x-embed-origin")).toBe("https://portal.example.com");
    expect(headers.get("x-embed-version")).toBe("1.0.0");
  });
});
