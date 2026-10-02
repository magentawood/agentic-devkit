# 0004 — Questions to the user

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The skills ask the user for decisions: in the grill, at the gates, in a review, and in a migration.

## Decision

**In one line:** Ask the user one question at a time with `AskUserQuestion`, with the recommended option first.

- Ask one question at a time. Never batch questions. Never ask in plain text.
- Put the recommended option first, and add "(Recommended)" to its label.
- Before you ask, look for the answer in the code and the documents. If the codebase can answer a question, explore it. Ask the user only for a decision.

## Rationale

- One question with a recommended answer comes from the `grilling` skill of Matt Pocock.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| A batch of questions, or questions in plain text | Part B forbids them: "Never batch, never plain text." |

## Consequences

- These steps name `AskUserQuestion`:
  - The grill, and a new decision in the implement stage.
  - The open review findings.
  - The parts question of `setup`, and the contradictions of `migrate`.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §3 step 1 "Grill", and Part B "Grill stage" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Questions to the user".
