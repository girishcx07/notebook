import type { AppType } from "@notebook/api";
import { hc } from "hono/client";

// Initialize the RPC client with type safety
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
// Type assertion needed due to Hono's RPC client type inference limitations in Next.js
export const rpcClient = hc<AppType>(BASE_URL);
