# Resource Access Model

This document defines the shared contract for future product features in this
repository. It is the source of truth for how resources, scope, visibility, and
backend access checks should be modeled across notes, chat, drawings, files,
communities, and any future modules.

## Core Rule

Every product entity that can be created, shared, listed, or accessed should be
treated as a scoped resource.

```ts
type Visibility =
  | "PUBLIC"
  | "AUTHENTICATED"
  | "ORG"
  | "SCHOOL"
  | "CLASS"
  | "PRIVATE";

type ScopedResource = {
  ownerId: string;
  orgId?: string | null;
  schoolId?: string | null;
  classId?: string | null;
  visibility: Visibility;
};
```

This is an architecture contract, not a requirement to duplicate the exact
shape in every table. Concrete schemas may normalize these fields or spread them
across related tables, but the effective access model must map back to this
contract.

## Visibility Levels

- `PUBLIC`: visible to anyone, including unauthenticated users
- `AUTHENTICATED`: visible to any signed-in user
- `ORG`: visible to users in the same organization
- `SCHOOL`: visible to users in the same school
- `CLASS`: visible to users enrolled in the same class
- `PRIVATE`: visible only to the owner or explicitly authorized collaborators

## Universal Access Algorithm

The backend should evaluate access using a shared semantic model equivalent to
the following logic:

```ts
function canAccess(user: AuthUser | null, resource: ScopedResource) {
  if (resource.visibility === "PUBLIC") return true;
  if (!user) return false;

  if (resource.ownerId === user.id) return true;
  if (resource.visibility === "AUTHENTICATED") return true;
  if (resource.visibility === "ORG" && user.orgId === resource.orgId) return true;
  if (resource.visibility === "SCHOOL" && user.schoolId === resource.schoolId)
    return true;
  if (
    resource.visibility === "CLASS" &&
    resource.classId &&
    user.classIds.includes(resource.classId)
  )
    return true;

  return false;
}
```

The exact implementation may vary by service boundary, but behavior must remain
consistent everywhere.

## Backend Enforcement Rules

- Backend permission checks are the source of truth. Frontend gating is a UX
  improvement only.
- Input validators must reject impossible or contradictory combinations, such as
  `visibility: "CLASS"` without a `classId`.
- Routes, procedures, and services must derive authorization from the current
  auth context, not from client-supplied membership claims.
- List endpoints must filter unauthorized rows at the query layer whenever
  possible to avoid overfetching or leaking counts.
- Mutations must validate both access and target scope ownership before writing.
- Audit- or activity-oriented systems should store enough metadata to explain
  why a resource was visible or mutable.

## Modeling Guidelines

- Prefer explicit fields over overloaded JSON blobs for resource ownership and
  scope.
- Keep tenant and scope identifiers consistent across domain packages, routers,
  and validators.
- Model collaborators or role-based overrides separately from the base
  `visibility` field.
- Treat `ownerId` as required unless a resource is truly system-owned.
- Use nullable scope fields when a resource can exist above a narrower scope.
- For derived or nested entities, inherit scope from the parent unless there is
  a strong reason to break inheritance.

## Query and API Guidelines

- Describe future APIs in terms of auth context, validators, scope checks,
  pagination, and sorting behavior.
- Avoid endpoints that allow arbitrary scope elevation from the client.
- Prefer server-side helpers or package-level services for repeated access
  policies so that Hono handlers and tRPC procedures stay thin.
- Cache only post-authorization shapes or cache keys that are safe per scope.

## Resource Design Checklist

Use this checklist when introducing a new product area:

- Who owns the resource?
- Which scopes can contain it?
- Which visibility levels are valid for it?
- Does it inherit scope from a parent resource?
- What backend rule decides read access?
- What backend rule decides write or delete access?
- How are list queries paginated and filtered without leaking private rows?

## Where This Applies

This model should be reused for:

- notes and nested pages
- comments and reactions
- communities, channels, and messages
- classroom entities such as classes and subjects
- files, attachments, and drawing documents

If a future feature cannot fit this model cleanly, that should trigger an
architecture review before implementation starts.
