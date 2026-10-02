# 0009 — Blind review before the PR

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The review stage checks the diff of a ticket against the project standards, the spec, and the lean-code rules.

## Decision

**In one line:** Three blind sub-agents review the diff before the PR opens, for at most two rounds, and the user decides each open finding.

- The review runs **before** the PR opens.
- Three sub-agents, one for each axis:
  - **Standards:** does the diff obey each file in the project standards path?
  - **Spec:** does it do what the ticket and the spec say?
  - **Lean:** with `lean-code.md` and `code-comments.md`, a delete-list of code that is more than necessary, boilerplate, and comments that are not necessary.
- Each reviewer gets only the diff, read access to the repo, the requirements (task note, spec, Read-first docs), and its rulebook. It does not get the log of the implementer, the PR draft, or the reasoning.
- Sub-agents do not inherit context, so give each one each file path.
- Code comments are part of the code.
- The Standards reviewer skips the rules that a tool enforces (`[tool]`) and the OPEN rules. Each reviewer writes at most 400 words. Each of the three reports has its own heading. Do not merge them.
- A mistake that no standards rule covers becomes a rule candidate ([ADR-0013](0013-project-coding-standards.md)).
- **Findings loop:** the implementer fixes each finding or records why it rejects it. Fresh reviewers run again. They do not get the findings of the previous review. A maximum of 2 rounds (`reviewRounds`). Then each item that stays open goes to the user through the picker. The rejected findings and their reasons go in the PR notes.

## Rationale

- The review design comes from `code-review` of Matt Pocock and `ponytail-review` of Ponytail.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| None recorded | — |

## Consequences

- The PR opens with no open finding. Each rejected finding has a reason in the PR.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §3 step 5 "Review", and Part B "Review" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Sub-agents".
- [review.md](../../skills/build-feature/references/review.md).
