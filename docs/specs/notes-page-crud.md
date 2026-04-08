# Notes/Page CRUD Feature Spec

This document is the canonical example for how future product work should be
specified in this repository. It applies the shared resource and visibility
model to a concrete feature without assuming framework patterns that do not
exist in this monorepo.

Related references:

- `docs/architecture/resource-access-model.md`
- `docs/architecture/feature-delivery-workflow.md`
- `docs/templates/feature-spec-template.md`

## Goal

Introduce a basic notes and pages domain that gives signed-in users a place to
create, read, update, list, archive, and delete documents. The initial slice
should establish the core resource contract and access rules that later support
nested pages, comments, sharing, collaboration, and richer editor behavior.

## Scope

Included:

- note or page creation
- note listing for the current user or authorized scope
- read, update, soft-delete, and archive behavior
- title and content storage suitable for a simple document MVP
- visibility-aware query behavior

Not included:

- real-time collaboration
- Notion-like block editor internals
- version history
- comments, reactions, or sharing links
- file attachments or rich embeds

## Resource Model

Each note is a scoped resource:

```ts
type NoteResource = {
  id: string;
  ownerId: string;
  orgId?: string | null;
  schoolId?: string | null;
  classId?: string | null;
  visibility: Visibility;
  title: string;
  content: string;
  isArchived: boolean;
  deletedAt?: Date | null;
};
```

Rules:

- `ownerId` is always required
- `visibility` defaults to `PRIVATE`
- `ORG`, `SCHOOL`, and `CLASS` require the matching scope identifier
- soft-deleted notes should not appear in normal list queries
- archive is a user-facing state, not a deletion mechanism

## Schema Direction

Drizzle intent in `packages/db`:

- add a `notes` table
- include identity, ownership, scope, visibility, timestamps, archive state, and
  soft-delete state
- start with `title` and `content` columns for a simple editor-backed document
- index common list filters such as `ownerId`, `orgId`, `schoolId`, `classId`,
  `visibility`, and `deletedAt`

Suggested fields:

- `id`
- `ownerId`
- `orgId`
- `schoolId`
- `classId`
- `visibility`
- `title`
- `content`
- `isArchived`
- `createdAt`
- `updatedAt`
- `deletedAt`

Future-compatible additions can include `parentNoteId`, collaborator tables, and
version-history tables, but they are intentionally out of scope for the first
CRUD slice.

## API Design

### tRPC Procedures In `packages/api`

- `notes.create`
- `notes.list`
- `notes.byId`
- `notes.update`
- `notes.archive`
- `notes.restore`
- `notes.delete`

Each procedure should validate scope and visibility combinations through shared
validators before touching the database.

### Hono Surface In `apps/server`

The Hono server remains the host runtime for the API. No separate REST surface
is required unless the platform later needs external integrations. The Hono
layer should mount the tRPC handlers and keep HTTP concerns separate from note
authorization rules.

### Query Behavior

- `list` should support pagination from day one
- default lists should exclude `deletedAt IS NOT NULL`
- archived items should be filterable explicitly instead of mixed into the main
  active list by default
- read and list behavior must filter by backend authorization, not frontend tabs

## Access Control

Read access:

- anyone for `PUBLIC`
- authenticated users for `AUTHENTICATED`
- matching org, school, or class members for scoped visibility
- the owner always has access

Write access:

- create requires an authenticated user
- update, archive, restore, and delete default to the owner
- collaborator or role-based exceptions can be added later, but they are not in
  the initial contract

Validation rules:

- reject `CLASS` notes without a `classId`
- reject `SCHOOL` notes without a `schoolId`
- reject `ORG` notes without an `orgId`
- reject contradictory scope input, such as a class note that references a
  foreign org not present in the current auth context

## Frontend Surface In `apps/web`

Initial UI direction:

- `/notes` for the current user's note list
- `/notes/$noteId` for note detail or editor view
- create action from the list page
- archive and delete actions in the detail view or overflow menu

Data-flow expectations:

- use the typed API layer already present in the repo
- keep forms and mutation state close to route-level UI
- separate active, archived, and deleted behavior clearly in the UX
- do not expose scope or visibility options the backend will reject for the
  current user

Shared components can live in `packages/ui` if the note shell becomes reusable.

## Testing Plan

Unit tests:

- validator coverage for valid and invalid visibility/scope combinations
- access helper coverage for owner, public, authenticated, and scoped reads

Integration tests:

- create and fetch a private note as the owner
- reject reads to a private note for a different user
- allow reads to a public note without auth
- allow or reject scoped notes based on org, school, or class membership
- archive and restore behavior
- soft-delete exclusion from normal list results

Manual QA:

- create a note from the web app
- edit title and content
- switch visibility where allowed
- confirm archived notes move out of the default list
- confirm deleted notes are no longer visible in normal lists

## Performance And Reliability

- paginate list queries immediately instead of adding it later
- avoid N+1 membership lookups by resolving authorization in query-friendly
  helpers where possible
- log permission-sensitive failures with enough context for debugging, without
  leaking note content
- keep the first version simple: no caching layer is required yet

## Risks

- access rules can become inconsistent if duplicated across routers and route
  handlers instead of centralized helpers
- future nested-page work can be harder if scope inheritance is not defined
  clearly from the start
- list performance can degrade if soft-delete and archive filters are not
  indexed appropriately

## Acceptance Criteria

- notes exist as a first-class scoped resource
- private and scoped authorization behavior is enforced on the backend
- list, read, update, archive, restore, and delete flows are defined clearly
- the feature can later expand into nested pages and richer editing without
  replacing the core access model
