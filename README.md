# TanStack Start Monorepo

Production-oriented workspace for a notebook platform built with TanStack Start, Hono, tRPC, Better Auth, Drizzle, and PostgreSQL. The repository is organized as a scalable pnpm/Turborepo monorepo with shared configs, a reusable SDK in `packages/sdk`, and the dashboard kept in `apps/web`.

## Stack

- Frontend: TanStack Start, React 19, Tailwind CSS v4
- API: Hono, tRPC, Better Auth
- Data: Drizzle ORM, PostgreSQL
- Tooling: pnpm workspaces, Turborepo, ESLint, Prettier, Husky, lint-staged
- Testing: Vitest for unit coverage, Playwright scaffolding for web smoke tests
- Observability: Pino-based logger with Sentry placeholder hooks

## Workspace Layout

```text
.
├── apps/
│   ├── server/        # Hono API server
│   └── web/           # TanStack Start app and dashboard
├── packages/
│   ├── api/           # Shared tRPC routers
│   ├── auth/          # Better Auth setup
│   ├── db/            # Database client and schema
│   ├── mailer/        # Transactional email helpers
│   ├── observability/ # Logging and error tracking placeholder
│   ├── sdk/           # Reusable SDK and iframe-safe API client
│   ├── ui/            # Shared UI primitives
│   └── validators/    # Shared Zod schemas
├── configs/
│   ├── eslint/
│   ├── github/
│   ├── prettier/
│   ├── tailwind/
│   └── typescript/
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── workflows/
    └── pull_request_template.md
```

## Local Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create local env vars:

   ```bash
   cp .env.example .env
   ```

3. Start the supporting services you need, then run:

   ```bash
   pnpm dev
   ```

The main application shell and dashboard live in `apps/web`, and the API server runs from `apps/server`.

## Core Commands

- `pnpm dev`: Start workspace development tasks
- `pnpm build`: Build all packages and apps through Turbo
- `pnpm lint`: Run ESLint across the workspace
- `pnpm typecheck`: Run TypeScript checks
- `pnpm test`: Run unit tests
- `pnpm test:e2e`: Run Playwright smoke tests against a running deployment
- `pnpm format`: Check formatting
- `pnpm format:fix`: Apply formatting fixes
- `pnpm check`: Run the full local quality gate

## Future Scaling Notes

For the planned scale phase around Redis, RabbitMQ, workers, and stronger
platform reliability, see
[`docs/architecture/future-scaling-roadmap.md`](./docs/architecture/future-scaling-roadmap.md).
That document captures what is already strong in the current base and what is
intentionally deferred for the next infrastructure phase.

## Embeddable SDK

`packages/sdk` exposes:

- shared tRPC client creation for browser and server usage
- iframe-safe base URL resolution for embeddable modules
- helper headers for embed-aware requests

For third-party embeds, set `ALLOWED_EMBED_ORIGINS` in `.env` to the approved host origins.

## CI and Git Standards

- GitHub Actions are split into `lint.yml`, `build.yml`, and `test.yml`
- Husky runs lint-staged before commits and commitlint on commit messages
- PR and issue templates are provided in `.github`

# API server
docker build -f apps/server/Dockerfile -t acme-api .
```

---

## 🔐 Environment Variables

| Variable       | Description                               | Example                                              |
| -------------- | ----------------------------------------- | ---------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string              | `postgresql://postgres:password@localhost:5433/acme` |
| `AUTH_SECRET`  | Secret key for Better Auth (min 32 chars) | `openssl rand -base64 32`                            |
| `PORT`         | Server port override (optional)           | `3001`                                               |

---

## 📐 Architecture Overview

```
Browser
  │
  ▼
Nginx :3000 (Docker only)
  ├─ /api/* ──────────► Hono Server :3001
  │                          │
  │                     tRPC Router
  │                          │
  └─ /*  ────────────► TanStack Start :3000
                            │
                       SSR + tRPC Client
                            │
                            ▼
                     PostgreSQL :5433
                    (via Drizzle ORM)
```

In **local development** (no Docker):

- **http://localhost:3000** → TanStack Start (Vite dev server)
- **http://localhost:3001** → Hono API (tsx watch)
- **http://localhost:5433** → PostgreSQL (Docker container)

---

## 📝 License

MIT
