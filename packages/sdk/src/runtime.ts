export type RuntimeKind = "browser" | "iframe" | "server";

export function detectRuntimeKind(): RuntimeKind {
  if (typeof window === "undefined") {
    return "server";
  }

  try {
    return window.self === window.top ? "browser" : "iframe";
  } catch {
    return "iframe";
  }
}
