import app from "./index.js";

// Export the app type for RPC client
export type AppType = typeof app;

// Re-export app for Cloudflare Workers
export default app;
