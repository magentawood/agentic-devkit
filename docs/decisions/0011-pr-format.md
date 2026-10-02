# 0011 — The PR format

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

Each ticket ends in one PR. The spec asked for one standard format for each PR.

## Decision

**In one line:** Each PR uses `pr-template.md` in STE, and its Progress section gives the blocker of each item that is not done.

- Title: `[<TICKET-ID>] <short imperative summary>`.
- Summary: one paragraph with no bullets. It tells what the PR does and why.
- Linked issue: the GitHub issue and the task note.
- Changes: the key changes, and the lean-code rung when it is not obvious.
- Progress: the items that this PR ticks, the items that are not done, and the items that it adds. For each item that is not done, give the task that blocks it, for example "migrations not done — blocked on T-02".
- Progress also has a **Rules:** line: each rule candidate that this PR recorded or made a rule.
- Testing: how you verified the change.
- Review: the rounds, the open findings, and each rejected finding with its reason.
- Follow-ups / notes: each follow-up, with a ticket ID.
- Write the full PR description in STE.
- Use the terms of the code host in all templates. For GitHub, write "pull request" or "PR".

## Rationale

- The code host of Roomsie is GitHub. Thus the templates use its terms.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| `templates/mr-template.md` with the term "MR" | The code host is GitHub, so the template uses "PR". |

## Consequences

- The template is a draft until the POC ([ADR-0006](0006-poc-first-stage-references-are-drafts.md)).

## Revisit when

- The POC on the first Roomsie ticket is complete.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §8 "MR format" and §12 "Code host", and Part B "PR format additions" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Writing".
- Superseded: Part A §8 names the template `templates/mr-template.md` and uses "MR". Part A §12 "Code host" gives the GitHub terms, so the template is `templates/pr-template.md`.
- Superseded: Part A §8 links "the Obsidian feature note". Part B replaces it with the task note.
