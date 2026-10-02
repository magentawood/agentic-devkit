# 0018 — Size limits and the context budget

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

Docs share the context window of the agent with the code. A project gets more files and larger files, so the docs need limits that a script checks.

## Decision

**In one line:** `doc-budget` keeps the index at most 1,500 tokens and other docs at most 1,200 words, and an override can only shrink.

| Files | Limit |
|---|---|
| The index (`CONTEXT.md`) | 1,500 tokens |
| Records, specs, and all other Markdown | 1,200 words |
| Research | 1,500 words |
| Journal and archive | no limit (excluded) |

- The plugin defaults (`defaults/devkit.defaults.json`) have the Roomsie numbers. A project `docBudget` changes them.
- The first rule that matches a file applies. A project `docBudget.rules` list replaces the full default list. If a project changes `indexFile`, copy the full default list and change only the glob of the index rule.
- An entry in `docBudget.overrides` is a ceiling for one file that is above its rule. It can only shrink. A reviewer sees it in the PR.
- When a file is above its limit, do one of these:
  - Divide it by topic.
  - Move the reasoning into its record.
  - Remove replaced text.
- `/build-feature` obeys the same budget:
  - It keeps `CONTEXT.md` an index, and updates its routing table.
  - It puts reasoning only in records.
  - It runs `doc-budget`.
  - It updates or removes replaced text.
  - It adds a record with an "In one line:" summary for each new grill decision.
- The standards files of a project also stay at or below 1,200 words each.

## Rationale

- The docs must not grow without limit ([ADR-0017](0017-the-docs-architecture.md)).
- An override is for a file that is already above its rule. As a ceiling, it stops the growth of that file.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| None recorded | — |

## Consequences

- The hook and CI fail on a file above its limit, and on an override that grew.

## Revisit when

- None recorded.

## Sources

- [doc-management PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management.md), "The architecture", "Limits" (2026-09-30).
- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part B "Context budget" (2026-09-30).
- [doc-management notes](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management-notes.md), "The goals" and "Size limits enforced".
- [PR #3](https://github.com/magentawood/agentic-devkit/pull/3): `doc-budget` and the context budget rules.
- [architecture.md](../../skills/doc-architecture/references/architecture.md), "Limits".
- Superseded: PR #3 and the doc-management notes put the default limits in `devkit.config.json`. The decision of 2026-10-01 ([PR #6](https://github.com/magentawood/agentic-devkit/pull/6), comment item 1) moves them to `defaults/devkit.defaults.json` ([ADR-0003](0003-three-configuration-levels.md)).
