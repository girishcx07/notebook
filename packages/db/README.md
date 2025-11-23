# @notebook/db

Database package with Drizzle ORM and PostgreSQL.

## Setup

1. **Create a PostgreSQL database** (using Neon, Supabase, Railway, or local PostgreSQL)

2. **Copy environment variables**:
   ```bash
   cp .env.example .env
   ```

3. **Add your DATABASE_URL** to `.env`:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

4. **Generate migrations**:
   ```bash
   pnpm db:generate
   ```

5. **Run migrations**:
   ```bash
   pnpm db:migrate
   ```

## Scripts

- `pnpm db:generate` - Generate migration files from schema
- `pnpm db:migrate` - Run migrations
- `pnpm db:push` - Push schema changes directly (dev only)
- `pnpm db:studio` - Open Drizzle Studio to view/edit data

## Usage

```typescript
import { db, posts } from '@notebook/db';

// Insert a post
const [newPost] = await db.insert(posts).values({
  title: 'Hello',
  content: 'World'
}).returning();

// Query posts
const allPosts = await db.select().from(posts);
```

## Schema

See `src/schema/` for all table definitions.
