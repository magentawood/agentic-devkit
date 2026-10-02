# 0010 — GitHub issues show the status of each ticket

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

Each ticket has one GitHub issue. The task notes are the source of truth for progress, and the GitHub issues mirror the status of each ticket.

## Decision

**In one line:** `/build-feature` sets one `status:*` label and adds a comment at each stage change, and the PR closes the issue.

- One issue for each ticket, made at the ticket stage. The issue sync script of the project (`plan.syncIssues`) makes the issues. `issue-status` uses the `gh` CLI.
- Status labels, in order: `status:spec`, `status:in-progress`, `status:in-review`, `status:done`. An issue has one status label at a time.
- At each stage change, `/build-feature` sets the label and adds a comment:
  - `status:spec` at the spec stage, and on each new issue.
  - `status:in-progress` at the implement stage.
  - `status:in-review` when the PR opens.
  - `status:done` after the merge.
- The PR links the issue and closes it with `Closes #N`.
- The issue body mirrors the checkboxes of the task note. The task note stays the source of truth.
- `tools/sync-issues.py` in Roomsie must keep the `status:*` labels. Before this decision, it replaced the full set of labels.

## Rationale

- None recorded.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| None recorded | — |

## Consequences

- `issue-status` sets one `status:*` label, removes the other `status:*` labels, and adds the comment.
- `sync-issues.py` in Roomsie keeps the `status:*` labels (magentawood/roomsie#90).

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §10 "GitHub issue sync", and Part B "Progress and issues" (status labels) (2026-09-30).
- [PR #4](https://github.com/magentawood/agentic-devkit/pull/4): `issue-status`. [SKILL.md](../../skills/build-feature/SKILL.md) and [tickets.md](../../skills/build-feature/references/tickets.md): the label of each stage.
