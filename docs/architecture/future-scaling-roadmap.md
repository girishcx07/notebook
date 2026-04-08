# Future Scaling Roadmap

This document captures the infrastructure and architecture work that is not
required for the current delivery target, but is expected in the next scaling
phase. It exists so we can keep the current base project lean while still
documenting future requirements clearly.

## Why This Exists

The repository has already been modernized around a scalable monorepo shape:

- `apps/` for deployable surfaces
- `packages/` for shared domain and platform code
- `configs/` for shared tooling
- Turbo and pnpm workspace orchestration
- centralized SDK and observability primitives
- CI, hooks, formatting, linting, and test scaffolding

That gives us a strong base. It does not mean the queue, cache, and worker
stack is already implemented. Those are intentional next-phase requirements.

## Current Base Strength

The current foundation is strong enough for the next round of work because it
already supports:

- adding new deployable apps without restructuring the repo
- extracting shared infrastructure code into packages instead of duplicating it
- keeping environment, CI, linting, and type safety consistent across services
- introducing cross-cutting concerns like logging, SDKs, and validation in one place

## Explicitly Deferred For The Next Phase

These are not blockers for the current milestone, but they should be treated as
planned future requirements:

- Redis-based caching and shared ephemeral state
- RabbitMQ-based background processing and event-driven workflows
- dedicated worker processes separated from the API runtime
- delivery guarantees, retries, dead-letter queues, and idempotency
- metrics, tracing, and richer production observability
- infrastructure health checks for message broker and cache dependencies

## Recommended Future Additions

### New Apps

- `apps/worker`
  Purpose: run background consumers, scheduled jobs, and async workflows.

### New Packages

- `packages/cache`
  Purpose: Redis client setup, cache keys, cache invalidation helpers, rate limiting primitives.

- `packages/messaging`
  Purpose: RabbitMQ connection management, publishers, consumers, retry helpers, dead-letter policies.

- `packages/events` or `packages/workflows`
  Purpose: domain event contracts, event serialization, and orchestration logic.

## Future Requirements Checklist

- [ ] Create `apps/worker` for non-HTTP background jobs
- [ ] Create `packages/cache` for Redis connection and caching abstractions
- [ ] Create `packages/messaging` for RabbitMQ producers and consumers
- [ ] Introduce an outbox/event publishing pattern for DB-to-queue reliability
- [ ] Define retry, backoff, and dead-letter queue conventions
- [ ] Define idempotency rules for async handlers and consumers
- [ ] Add health/readiness probes for DB, Redis, and RabbitMQ
- [ ] Add metrics/tracing beyond structured logs
- [ ] Add deployment/runtime configuration for worker scaling
- [ ] Add load and failure-mode validation before production rollout

## Delivery Phases

### Phase 1: Scale-Ready Infrastructure Packages

Goal: add shared Redis and RabbitMQ packages without changing product flows yet.

Expected output:

- cache package
- messaging package
- typed environment variables for new infrastructure
- local docker/dev setup updates

### Phase 2: Background Worker Runtime

Goal: move async or heavy work out of the API request path.

Expected output:

- worker app
- queue consumers
- producer integration from API/domain layer
- retry and failure handling

### Phase 3: Reliability And Operability

Goal: make the platform production-safe at higher load.

Expected output:

- health checks
- metrics
- tracing
- alerting and dashboards
- load-test and failure-test coverage

## Architecture Guidelines For That Future Work

- Keep queue and cache clients out of app-level UI code.
- Put infra clients in packages, not directly inside route handlers.
- Prefer domain events or service abstractions over ad hoc queue publishing.
- Keep background processing in `apps/worker`, not in `apps/server`.
- Treat Redis as a shared infrastructure dependency with explicit ownership.
- Treat RabbitMQ contracts as versioned integration boundaries.

## Revisit Triggers

We should reopen this roadmap when any of the following becomes true:

- API requests start doing slow or retry-prone side effects
- we need cross-instance caching or distributed invalidation
- email, notifications, imports, exports, or AI jobs need async execution
- dashboard traffic or background job volume outgrows the API process
- production reliability requires stronger operational visibility

## Decision Summary

For now:

- the project base is strong enough
- current delivery can continue without queue/cache implementation
- future scale work is documented and intentionally deferred, not forgotten

This document should be used as the baseline requirement list for the future
RabbitMQ/Redis scaling phase.
