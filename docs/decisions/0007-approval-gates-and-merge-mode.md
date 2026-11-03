# 0007 — Approval gates and merge mode

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The user must approve some stage changes of `/build-feature`. At the end, a PR merges. The first spec asked for approval at each stage change.

## Decision

**In one line:** The default approval gates are after the spec and before the PR, and `mergeMode` defaults to `ask`.

- `approvalGates` in the configuration gives the gates. The default is `spec` and `pr` (the PR draft). A project can configure other gates.
- `mergeMode` defaults to `ask`. At the end, the skill offers three options. The user merges, the agent merges after approval, or auto-merge on a clean review.
- Do not push to the default branch. Send each change as a PR.

## Rationale

- The grill set two default gates. A project can configure other gates.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Approval at each stage change | The grill set two default gates. Other gates are configurable. |

## Consequences

- None recorded.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §3 (the last two lines), and Part B "Gates and merge" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Git".
- Superseded: Part A §3 says "Stage transitions need my approval". Part B sets the default gates to `spec` and `pr`.

Superseded (2026-11-03): "Repo merges use rebase-merge". Each PR merges with squash and merge ([ADR-0033](0033-squash-and-merge.md)).
