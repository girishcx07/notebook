import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Lazy database initialization to work with Cloudflare Workers
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb(databaseUrl?: string) {
  if (!dbInstance) {
    const url = databaseUrl || process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is required');
    }
    const sql = neon(url);
    dbInstance = drizzle(sql, { schema });
  }
  return dbInstance;
}

// For backwards compatibility
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});

export { schema };
export * from './schema';
