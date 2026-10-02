# 0016 — Two docs skills: doc-architecture guards, doc-management runs

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The Roomsie docs cleanup (PRs #74–#88) gave a docs architecture. Each project needs it from the first day, and it must not drift as the project grows. Some work is a check on each edit. Other work is a large run on a full project.

## Decision

**In one line:** The model-invoked `doc-architecture` skill guards each Markdown change, and the user-invoked `/doc-management` skill does the large runs: `setup`, `migrate`, and `check`.

- `doc-architecture` loads on each Markdown edit, in the plugin repo and in each project. On each change that breaks the architecture, it fixes the break **in the same change**:
  - It moves the reasoning into its record, and replaces copied facts with links.
  - It divides a file that goes above its limit.
  - It adds a record, with its "In one line", for each new decision, then runs the ledger generator.
  - It adds a routing row when a new area appears.
- The hook blocks a commit that fails a check. Each fix shows in the diff.
- `/doc-management setup` gives a new project the architecture. `migrate` moves the docs of a project into it. `check` gives the full report, and `check --sync` refreshes the tool copies.
- `ste-writing` owns the language: how you write a sentence (`ste-lint`, `ste-verify diff`). `doc-architecture` owns the structure: where a fact lives and the size of a file. Both skills load on a Markdown edit.
- `doc-budget` and the link check move from `ste-writing` to `doc-architecture`. The link check is `doc-links`.
- Before the skill existed, the same rules were in the "Context budget" section of `CONVENTIONS.md`. Now `CONVENTIONS.md` links to the skill, and it keeps a short summary of the rules.

## Rationale

- The architecture must not drift as the project grows.
- `setup`, `migrate`, and `check` are large runs. The user starts them ([ADR-0002](0002-skill-types-and-the-call-rule.md)).

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| The names `/docs-cleanup` and `/context-budget` | The PRD grill chose `doc-management`. The sources give no reason. |

## Consequences

- `/build-feature` obeys the `doc-architecture` rules through the usual Markdown edits. It never calls `/doc-management`.
- `ste-verify` keeps only `diff`.

## Revisit when

- None recorded.

## Sources

- [doc-management PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management.md), "Goal", "Two skills", "doc-architecture (guard)", "doc-management (user-invoked)", and "Relations" (2026-09-30).
- [doc-management notes](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management-notes.md), "Open questions for the PRD grill".
- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6): the two skills, and "Review", "Rejected" (`CONVENTIONS.md` keeps a summary).
