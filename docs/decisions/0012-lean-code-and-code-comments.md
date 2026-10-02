# 0012 — Lean code and code comments

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

`/build-feature` carries the lean-code and code-comments rules. They run inside the pipeline: in the implement stage and in the Lean review.

## Decision

**In one line:** The implement stage stops at the first lean-code rung that works, and the default for a code comment is no comment.

**Lean code** (`references/lean-code.md`, from the Ponytail ladder):

- First read the code that the change touches, and trace the real flow. Be lazy about the solution. Never be lazy when you read the code.
- The ladder, in order:
  1. Is it necessary? If not, do not write it (YAGNI).
  2. Does the codebase have it?
  3. Does the standard library do it?
  4. Does the platform do it natively?
  5. Does an installed dependency do it?
  6. Can it be one line?
  7. Only then, write the minimum code that works.
- Never cut validation at a trust boundary, error handling that prevents data loss, security, or accessibility.
- Never add a dependency, an abstraction, a wrapper, a configuration option, or a hook "for the future" without an explicit reason in the ticket.
- Record the rung in the "Changes" section of the PR when it is not obvious.

**Code comments** (`references/code-comments.md`):

- The default is no comment. First try a better name, a smaller function, or a type.
- Write a comment only for a non-obvious WHY, a workaround (with the link), or public API docs that the language convention requires.
- Each comment: one line where possible, at most about 15 words, in the present tense, with no filler words.
- Never write a comment that restates the code, code in a comment, a change history, or a TODO without a ticket ID.
- Code comments are part of the code. The reviewers see them only in the diff.

## Rationale

- The ladder comes from Ponytail.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| None recorded | — |

## Consequences

- The Lean reviewer uses these two files as its rulebook ([ADR-0009](0009-blind-review-before-the-pr.md)).
- These two files are complete. They are not drafts.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §4 "Lean code" and §5 "Code comments", and Part B "Review" (2026-09-30).
- [PR #4](https://github.com/magentawood/agentic-devkit/pull/4): `lean-code.md` and `code-comments.md` are complete.
- [NOTICE.md](../../NOTICE.md): the Ponytail credit.
