# Feature Delivery Workflow

This repository uses a documentation-first workflow for product features that
need architecture clarity, scoped access rules, or multi-surface coordination.
The goal is to move from idea to implementation PR without losing decisions or
re-litigating access control, API boundaries, or testing requirements.

## Workflow

1. Capture the requirement in a GitHub issue.
2. For substantial product or system work, use the `Feature RFC` issue template.
3. Convert the approved requirement into a feature spec using
   `docs/templates/feature-spec-template.md`.
4. Open the implementation PR using the repo PR template.
5. Validate behavior with tests, manual QA, and access-control review.
6. Capture follow-up work explicitly instead of leaving it in review comments or
   chat threads.

## When To Use What

### GitHub Discussions

Use Discussions for:

- open-ended ideation
- early discovery when the problem is not yet shaped
- community or stakeholder feedback before a concrete requirement exists

Discussions are optional and not the canonical source of truth for
implementation.

### GitHub Issues

Use Issues for:

- confirmed requirements
- bugs, enhancements, and scoped product work
- architecture-level feature requests that need a decision record
- backlog items that should survive handoffs

For significant product or platform work, prefer the `Feature RFC` issue
template over a free-form issue.

### Pull Requests

Use PRs for:

- implementation against an approved issue or spec
- documentation updates tied to feature delivery
- scoped technical changes that are ready for code review

PRs should describe the solution and validation, not serve as the first place
where requirements are discovered.

## Required Sections For Future Features

Every serious feature should have decisions captured for:

- goal and user problem
- in-scope and out-of-scope behavior
- schema or entity changes
- access control and visibility rules
- API and validation boundaries
- frontend surfaces and state/data flow
- test coverage and manual QA expectations
- performance, pagination, caching, or loading strategy
- rollout, migration, or follow-up work when needed

## Definition Of Ready

A feature is ready for implementation when:

- the problem and target user are clear
- access control rules are explicit
- schema direction is clear enough to avoid rework
- API boundaries are named or described
- frontend surface area is identified
- known risks and non-goals are documented
- the feature can be reviewed without guessing product intent

## Definition Of Done

A feature is done when:

- backend behavior is implemented and permission-checked
- frontend behavior matches the agreed scope
- tests cover the intended happy path and key edge cases
- manual QA verifies the user-facing flow
- docs, templates, or env references are updated if they changed
- follow-up work is tracked explicitly if anything is deferred

## PR Expectations

Implementation PRs should:

- reference the requirement issue or spec
- explain the behavior change clearly
- call out access-control decisions
- describe schema, API, and UI deltas succinctly
- list the validation performed
- avoid mixing unrelated work into the same review

## Review Focus

Code review should primarily verify:

- correctness of access control
- consistency with the shared resource model
- API and validator safety
- data loading and pagination behavior
- migration or compatibility risks
- test coverage for permission-sensitive paths

## Handoff Rule

If a feature needs to be resumed later, the latest issue, feature spec, and PR
description should be enough for another engineer to continue without asking for
missing product context. That is the standard this workflow is meant to enforce.
