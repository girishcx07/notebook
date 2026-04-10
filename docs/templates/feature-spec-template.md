# Feature Spec Template

Use this template for product work that should be implementation-ready before a
PR is opened. Copy it into an issue comment, a planning doc, or a feature spec
file under `docs/specs/`.

## Feature

`<feature name>`

## Goal

Describe the user or platform problem this solves.

## Scope

- Included:
- Not included:

## Resource Model

- Resource owner:
- Allowed scopes: `ORG | SCHOOL | CLASS | PRIVATE | ...`
- Allowed visibility values:
- Parent resource or inheritance rules:

## Entities And Schema Changes

- Tables added:
- Fields added:
- Indexes or uniqueness rules:
- Relations:
- Data migration needs:

## Access Control

- Who can read?
- Who can create?
- Who can update?
- Who can delete?
- Backend enforcement notes:

## API Design

- Procedures or endpoints:
- Input validators:
- Output shape:
- Pagination, filtering, and sorting:
- Error states:

## Frontend Changes

- Routes or pages in `apps/web`:
- Shared components or packages touched:
- Data fetching and state management:
- Empty, loading, and error states:

## Testing Plan

- Unit tests:
- Integration tests:
- Permission-sensitive scenarios:
- Manual QA:

## Performance And Reliability

- Query strategy:
- Caching plan:
- Lazy loading or streaming needs:
- Logging or observability notes:

## Risks And Follow-Up

- Risks:
- Deferred work:

## Implementation Checklist

- [ ] Schema direction confirmed
- [ ] Access rules confirmed
- [ ] API design confirmed
- [ ] UI surface confirmed
- [ ] Tests listed
- [ ] Non-goals captured
