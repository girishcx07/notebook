# 🚀 Hono RPC Monorepo - Setup Complete!

Your monorepo is now configured with a modern, type-safe RPC architecture using Hono, Drizzle ORM, and PostgreSQL.

## 📦 What's Been Set Up

### New Packages Created

1. **`packages/db`** - Database layer with Drizzle ORM
   - PostgreSQL with Neon serverless driver
   - Posts table schema
   - Migration system
   - Type-safe database client

2. **`packages/types`** - Shared TypeScript types and Zod schemas
   - Runtime validation with Zod
   - Type inference for full type safety
   - Built with tsup (5-10x faster than tsc)

3. **`packages/utils`** - Shared utility functions
   - Date formatting
   - String manipulation
   - Fast builds with tsup

4. **`packages/config`** - Shared configurations
   - Vitest base config for testing
   - tsup base config for builds

### Updated Apps

1. **`apps/server`** - Hono RPC Server
   - ✅ Posts API with create, getById, and getAll endpoints
   - ✅ Zod validation middleware
   - ✅ CORS enabled
   - ✅ RPC client type export for end-to-end type safety
   - ✅ Vitest tests
   - ✅ tsup for faster builds (replaced tsc)

2. **`apps/client`** - Next.js Client
   - ✅ RPC client with full type safety
   - ✅ Example API functions (createPost, getPostById, getAllPosts)

## 🎯 Next Steps

### 1. Set Up Database

You need a PostgreSQL database. Choose one option:

#### Option A: Neon (Recommended - Serverless PostgreSQL)
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings → Database

#### Option C: Local PostgreSQL
```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb notebook
```

### 2. Configure Environment Variables

Create `.env` file in `packages/db/`:

```bash
cd packages/db
cp .env.example .env
```

Edit `.env` and add your DATABASE_URL:
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

### 3. Run Database Migrations

```bash
# Generate migration files
pnpm --filter @notebook/db db:generate

# Run migrations
pnpm --filter @notebook/db db:migrate
```

### 4. Build All Packages

```bash
pnpm build
```

This will build all packages using tsup (much faster than tsc!).

### 5. Start Development

```bash
# Start all apps in dev mode
pnpm dev
```

This starts:
- 🔥 Server on `http://localhost:8787`
- ⚡ Client on `http://localhost:3000`

## 🧪 Testing

Run tests across all packages:

```bash
pnpm test
```

Or test specific packages:

```bash
# Test server
pnpm --filter @notebook/server test

# Watch mode
pnpm --filter @notebook/server test:watch
```

## 📡 API Endpoints

### Create Post
```bash
POST http://localhost:8787/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "Hello, world!"
}
```

### Get Post by ID
```bash
GET http://localhost:8787/posts/1
```

### Get All Posts
```bash
GET http://localhost:8787/posts
```

## 🎨 Using the RPC Client (Type-Safe!)

In your Next.js app (`apps/client`):

```typescript
import { createPost, getPostById, getAllPosts } from '@/lib/api';

// Create a post - fully typed!
const newPost = await createPost('Hello', 'World');

// Get a post - autocomplete works!
const post = await getPostById(1);

// Get all posts
const posts = await getAllPosts();
```

**The magic**: Your client knows the exact shape of your API responses without any code generation! 🪄

## 🔧 Database Management

### Drizzle Studio (Visual Database Editor)

```bash
pnpm --filter @notebook/db db:studio
```

Opens a web UI to view and edit your database.

### Push Schema Changes (Dev Only)

```bash
pnpm --filter @notebook/db db:push
```

Pushes schema changes directly without migrations (useful for rapid prototyping).

## 📊 Project Structure

```
notebook/
├── apps/
│   ├── client/          # Next.js app with RPC client
│   │   └── lib/api.ts   # Type-safe API functions
│   └── server/          # Hono RPC server
│       ├── src/
│       │   ├── routes/  # API routes
│       │   ├── client.ts # RPC type export
│       │   └── index.ts  # Main app
│       └── __tests__/   # Vitest tests
├── packages/
│   ├── db/              # Drizzle ORM + PostgreSQL
│   │   ├── src/schema/  # Database schemas
│   │   └── drizzle.config.ts
│   ├── types/           # Zod schemas + TS types
│   ├── utils/           # Shared utilities
│   └── config/          # Shared configs
└── turbo.json           # Monorepo orchestration
```

## 🚀 Performance Benefits

### tsup vs tsc

- **Build Speed**: 5-10x faster compilation
- **Watch Mode**: Near-instant rebuilds
- **Bundle Size**: Optimized with esbuild
- **DX**: Better error messages

### Vitest vs Jest

- **Speed**: 10x faster test execution
- **ESM**: Native ES modules support
- **TypeScript**: Zero-config TS support
- **DX**: Instant watch mode

## 🔐 Type Safety Flow

```
Server Schema (Drizzle)
    ↓
Zod Validation (Runtime)
    ↓
Hono Routes (Type-safe)
    ↓
RPC Client Type Export
    ↓
Client (Full autocomplete!)
```

## 📚 Adding More Features

### Add a New Table

1. Create schema in `packages/db/src/schema/users.ts`
2. Export from `packages/db/src/schema/index.ts`
3. Generate migration: `pnpm --filter @notebook/db db:generate`
4. Run migration: `pnpm --filter @notebook/db db:migrate`

### Add a New API Route

1. Create route in `apps/server/src/routes/users.ts`
2. Mount in `apps/server/src/index.ts`
3. Client automatically gets types! ✨

### Add Zod Schema

1. Create in `packages/types/src/users.ts`
2. Export from `packages/types/src/index.ts`
3. Build: `pnpm --filter @notebook/types build`

## 🐛 Troubleshooting

### "Cannot find module" errors

Run `pnpm install` at the root to ensure all dependencies are installed.

### Database connection errors

- Check your `DATABASE_URL` in `packages/db/.env`
- Ensure your database is running
- Verify network connectivity

### Build errors

```bash
# Clean and rebuild
rm -rf node_modules dist .next
pnpm install
pnpm build
```

## 🎉 You're All Set!

Your monorepo is ready for development. The RPC pattern gives you:

- ✅ End-to-end type safety
- ✅ No code generation needed
- ✅ Instant autocomplete
- ✅ Runtime validation
- ✅ Fast builds with tsup
- ✅ Modern testing with Vitest

Happy coding! 🚀
