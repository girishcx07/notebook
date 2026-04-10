# TODO: Notes/Page CRUD Foundation

Status: Draft RFC
Recommended branch: `codex/todo-notes-page-crud`
Priority: High

## Goal

Introduce the first real scoped resource in the product: notes/pages with basic
CRUD, visibility, archive, and soft-delete behavior. This is the best first
implementation target because it turns the shared resource and access model into
working product behavior that later features can reuse.

## Why This Is The First TODO

- it validates the new `ownerId + scope + visibility` contract in real code
- it creates the first reusable access-control patterns for future modules
- it establishes the end-to-end path across `packages/db`, `packages/api`,
  `apps/server`, and `apps/web`
- it is a cleaner foundation for nested pages, comments, sharing, and editor
  expansion later

## Scope

Included:

- note creation
- note listing with pagination
- note read, update, archive, restore, and soft delete
- backend visibility enforcement
- web routes for list and detail flows

Not included:

- nested pages
- comments and reactions
- realtime collaboration
- block-level editor system
- version history

## Resource Model

- owner: required `ownerId`
- optional scope: `orgId`, `schoolId`, `classId`
- visibility: `PUBLIC | AUTHENTICATED | ORG | SCHOOL | CLASS | PRIVATE`
- archive state: user-facing organizational state
- delete state: soft delete via `deletedAt`

## Planned Backend Surface

### Database

- add a `notes` table in `packages/db`
- index for owner/scope/visibility/list filtering
- keep schema simple enough for future nesting and sharing extensions

### API

- add `notes.create`
- add `notes.list`
- add `notes.byId`
- add `notes.update`
- add `notes.archive`
- add `notes.restore`
- add `notes.delete`

### Access Rules

- owner always has full access
- `PUBLIC` readable by anyone
- `AUTHENTICATED` readable by any signed-in user
- `ORG`, `SCHOOL`, and `CLASS` require matching membership
- write actions default to owner-only for v1

## Planned Frontend Surface

- `/notes`
- `/notes/$noteId`
- create, archive, restore, and delete actions
- typed data access through the existing repo API layer

## Testing Expectations

- validator tests for scope and visibility combinations
- integration coverage for private/public/scoped reads
- archive and restore flows
- soft-delete exclusion from default lists
- manual QA for list/detail and visibility-sensitive behavior

## References

- `docs/architecture/resource-access-model.md`
- `docs/architecture/feature-delivery-workflow.md`
- `docs/specs/notes-page-crud.md`
- `docs/templates/feature-spec-template.md`

## Issue Draft

Use this as the starting issue title:

`RFC: Notes/Page CRUD foundation`

Use this as the short issue summary:

`Implement the first scoped product resource using the shared visibility model so the platform has a real foundation for notes, sharing, and future collaboration features.`
