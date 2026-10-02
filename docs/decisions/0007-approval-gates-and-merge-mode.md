# 0007 — Approval gates, merge mode, and rebase-merge

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The user must approve some stage changes of `/build-feature`. At the end, a PR merges. The first spec asked for approval at each stage change.

## Decision

**In one line:** The default approval gates are after the spec and before the PR, `mergeMode` defaults to `ask`, and repo merges use rebase-merge.

- `approvalGates` in the configuration gives the gates. The default is `spec` and `pr` (the PR draft). A project can configure other gates.
- `mergeMode` defaults to `ask`. At the end, the skill offers three options. The user merges, the agent merges after approval, or auto-merge on a clean review.
- Repo merges use rebase-merge.
- Do not push to the default branch. Send each change as a PR.

## Rationale

- Rebase-merge keeps a revert for each commit.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Approval at each stage change | The grill set two default gates. Other gates are configurable. |

## Consequences

- With rebase-merge, the commit hashes change at merge. Do not write a branch hash into a doc ([lessons.md](../../skills/doc-management/references/lessons.md)).

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §3 (the last two lines), and Part B "Gates and merge" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Git".
- Superseded: Part A §3 says "Stage transitions need my approval". Part B sets the default gates to `spec` and `pr`.
