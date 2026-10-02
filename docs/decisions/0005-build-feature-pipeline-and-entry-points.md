# 0005 — The build-feature pipeline and its two entry points

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

`/build-feature` takes one unit of work from an idea to a merged PR. Some work starts as a ticket that exists in the plan. Other work starts as a new feature.

## Decision

**In one line:** `/build-feature` runs grill, spec, ticket, implement, review, and PR, and a ticket that exists skips the ticket stage.

- The stages, in order: grill, spec, ticket, implement, review, PR. Each stage has an explicit exit condition. Each stage from the grill to the review has one reference file in `skills/build-feature/references/`.
- **Ticket that exists** (for example `T-13`): a short grill with implementation questions only, answered from the code and the Read-first docs where possible. Then a short spec in the task note, approval, implement, review, and PR. There is no ticket stage.
- **New feature:** the full pipeline. The ticket stage adds the new tasks to the plan source and runs the generator.
- **Grill:** ask until each branch of the decision tree has a decision. Update the project glossary and the decision records inline. Exit when no branch is open.
- **Spec:** do not interview. Use only the grill decisions. Confirm the modules that change and the seams for the tests. Write the spec in STE. Exit when the user approves the spec.
- **Ticket:** tracer-bullet vertical slices, one ticket for each PR, with the blockers of each ticket. Each acceptance criterion becomes one checkbox in the task note, and each ticket gets one GitHub issue.
- **Implement:** read the lean-code and code-comments rules and the project standards first. One ticket at a time, on its own branch, with red-green-refactor at the agreed seams.
- The skill name stays `/build-feature`.
- The skill adapts the skills of Matt Pocock and Ponytail. It does not copy them blindly. `NOTICE.md` credits them with their MIT license text.

## Rationale

- A ticket that exists already has its product decisions in its task note and its Read-first docs. Thus the grill asks only about the implementation.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| None recorded | — |

## Consequences

- A ticket that exists gets no spec file of its own. Its spec is a `## Spec` section in the task note, so the plan generator must keep that section.
- The review stage and the PR stage have their own records: [ADR-0009](0009-blind-review-before-the-pr.md) and [ADR-0011](0011-pr-format.md).

## Revisit when

- The POC shows that a stage is not necessary, or that a stage is missing ([ADR-0006](0006-poc-first-stage-references-are-drafts.md)).
- The user decides where the glossary of a project lives. Part A §3 names `CONTEXT.md` the shared glossary, but [ADR-0017](0017-the-docs-architecture.md) makes `CONTEXT.md` an index with no glossary.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), "Goal", §0 "Reference sources", and §3 "build-feature pipeline" of Part A, and Part B "Progress and issues" (entry points) and "Naming and format" (2026-09-30).
- [PR #4](https://github.com/magentawood/agentic-devkit/pull/4): the skeleton of the skill.
- Superseded: Part A "Goal" takes each feature through grill, spec, ticket, implement, and review. Part B gives a ticket that exists a short path with no ticket stage.
