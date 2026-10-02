# 0006 — POC first: the stage references of build-feature are drafts

**Status:** Accepted · **Date:** 2026-09-30, accepted 2026-10-03 · **Deciders:** Yash Mangal

## Context

The stage references of `/build-feature` (`grill.md`, `spec.md`, `tickets.md`, `implement.md`, `review.md`) and its templates (`task-note-section.md`, `pr-template.md`) tell an agent how to do each stage.

## Decision

**In one line:** The stage references and the templates of `/build-feature` stay drafts until a POC on one real Roomsie ticket.

- Run the pipeline by hand on one real story first.
- Record what worked, which prompts we used, and where the work went off track.
- Only then finalize the stage reference files. Do not design the skill in the abstract.
- Until then, each draft file has the mark "Draft. Finalize after the POC."
- `lean-code.md` and `code-comments.md` are complete. They are not drafts.
- The POC runs with the `doc-architecture` guard active.

The user approved the "POC first" rule on 2026-09-30.

**2026-10-03, the POC is complete.** `/build-feature` ran on Roomsie T-02, from the grill to the merged [Roomsie PR #94](https://github.com/magentawood/roomsie/pull/94), with the guard active. The lessons went into the stage references and the templates, which are no longer drafts. One part is not proven: T-02 was a ticket that exists, so the POC did not use the ticket stage. `tickets.md` keeps its "Draft" mark until the first run on a new feature.

## Rationale

- The spec says: "Don't design the skill in the abstract."

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Finalize the stage references before the POC | The spec forbids a design in the abstract. |

## Consequences

- Version 0.1.x of `/build-feature` is a skeleton. Version 0.2.0 has the stage references from the POC.
- The ticket stage stays a draft until a run on a new feature.

## Revisit when

- The first `/build-feature` run on a new feature is complete. Then finalize `tickets.md`.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §1 "POC first, then extract", "First task" step 4, and "Next steps" step 3 (2026-09-30).
- [doc-management PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management.md), "Order of work" step 4 (the POC with the guard active).
- [PR #4](https://github.com/magentawood/agentic-devkit/pull/4): the skeleton, with the stage references as drafts.
- [Roomsie PR #94](https://github.com/magentawood/roomsie/pull/94): the POC on T-02, merged 2026-10-03.
