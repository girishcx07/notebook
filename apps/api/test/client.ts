import { AppType } from "../src";
import { hc } from "hono/client";
import app from "../src";

export const client = hc<AppType>("http://localhost:8787", {
  fetch: app.request.bind(app),
});
