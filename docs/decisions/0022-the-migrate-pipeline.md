# 0022 — The migrate pipeline

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

A project with docs that do not obey the architecture needs a safe way to move into it. The Roomsie cleanup (PRs #74–#88) did this by hand, and it gave the lessons.

## Decision

**In one line:** `/doc-management migrate` runs the Roomsie pipeline with stacked PRs, one commit for each file, 0 broken links after each stage, and three stops.

- Stages: inventory, moves and renames, formats, the optional STE rewrite (blind claim checks), compaction (CORE or SUPPORT), records (fact-checked), why to links, and splits, ledgers, and limits.
- Keep all content. Content moves. It is not deleted.
- One commit for each file, one stacked PR for each stage, and rebase-merge.
- 0 broken links after each stage.
- Blind sub-agents get only the files of their task. Parallel sub-agents get disjoint files.
- Compaction moves each SUPPORT claim to `<archivePath>/migrate-support-log.md`. The records stage moves its content into the records, and the why-to-links stage deletes it.
- The records stage removes each statement that has no source.
- Stops for approval:
  1. The plan, after the inventory: the moves, the renames, the divisions, and the word counts.
  2. Each contradiction between docs, one at a time, through the picker. This includes the contradictions that the records stage and the why-to-links stage find.
  3. The stacked PRs, before merge.
- The lessons of each run go into the references of `doc-management`, not into `SKILL.md`. Then the next project gets them. Each lesson gives the project, the date, and the PR.
- A subsequent grill on a project updates the project docs through `doc-architecture`.

## Rationale

- One commit for each file, stacked PRs, and rebase-merge let you revert one file.
- In Roomsie, two fact-check agents found 9 problems in 22 records. The problems were an invented detail, an incorrect owner, stale numbers, and incorrect statuses.
- The tags of the compaction show contradictions between docs. Roomsie found 12 or more.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| None recorded | — |

## Consequences

- A migration takes some PRs and three stops. The user approves each stop.

## Revisit when

- None recorded.

## Sources

- [doc-management PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management.md), "doc-management (user-invoked)", "Feedback loop", and "Lessons the skills must carry" (2026-09-30).
- [doc-management notes](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management-notes.md), "The pipeline we ran" and "Lessons".
- [migrate.md](../../skills/doc-management/references/migrate.md) and [lessons.md](../../skills/doc-management/references/lessons.md).
