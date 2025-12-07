// This file runs before all tests to set up the test environment
import { config } from "dotenv";
import { resolve } from "path";

// Try to load .env from packages/db (where DATABASE_URL is stored)
const envPath = resolve(__dirname, "../../../packages/db/.env");
config({ path: envPath });

// If DATABASE_URL is still not set, log a warning
if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not found in environment. Tests will fail.");
  console.warn(`   Tried loading from: ${envPath}`);
  console.warn("   Please ensure packages/db/.env exists with DATABASE_URL");
}
