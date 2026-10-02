# Spec: build-feature

**Status:** approved (2026-09-30) · **Grill:** 2026-09-30 · **Plan:** none. This repo has no plan system. This spec holds the open work of `/build-feature`.

## Goal

`/build-feature` takes one feature or one ticket from an idea to a merged PR, through grill, spec, ticket, implement, and review. Version 0.1.x is a skeleton: the stage references and the templates are drafts. The open work is the POC on one real Roomsie ticket, and then the last version of the stage references.

## User stories

1. As the user, I want `/build-feature T-13` on a ticket that exists, so that a short grill and a short spec take it to a PR.
2. As the user, I want to start `/build-feature <idea>` on a new feature, so that the full pipeline makes the spec, the tickets, and the PRs.
3. As the user, I want to approve the spec and the PR draft, so that nothing merges without my decision.

## Decisions

- The pipeline and its two entry points. Why: [ADR-0005](../decisions/0005-build-feature-pipeline-and-entry-points.md)
- POC first. The stage references stay drafts until the POC. Why: [ADR-0006](../decisions/0006-poc-first-stage-references-are-drafts.md)
- The default gates are `spec` and `pr`, `mergeMode` is `ask`, and merges use rebase-merge. Why: [ADR-0007](../decisions/0007-approval-gates-and-merge-mode.md)
- Progress lives in the plan of the project. Ticks go in the PR. Each PR gets a log entry and a journal entry. Why: [ADR-0008](../decisions/0008-progress-in-the-project-plan.md)
- Three blind reviewers before the PR, at most two rounds. Why: [ADR-0009](../decisions/0009-blind-review-before-the-pr.md)
- One `status:*` label on each issue. Why: [ADR-0010](../decisions/0010-issue-status-labels.md)
- The PR format. Why: [ADR-0011](../decisions/0011-pr-format.md)
- The lean-code ladder and the code-comments rules. Why: [ADR-0012](../decisions/0012-lean-code-and-code-comments.md)
- The code standards are in the project. Why: [ADR-0013](../decisions/0013-project-coding-standards.md)
- Questions one at a time with `AskUserQuestion`. Why: [ADR-0004](../decisions/0004-questions-to-the-user.md)
- The docs duties obey `doc-architecture`. Why: [ADR-0018](../decisions/0018-size-limits-and-the-context-budget.md)
- A new feature gets its spec from the one spec template. Why: [ADR-0021](../decisions/0021-one-spec-template.md)
- At the spec gate and at the PR gate, print the complete text word for word, then ask for approval. Why: [ADR-0023](../decisions/0023-print-the-complete-text-at-a-gate.md)

## Rules

- Run the pipeline by hand on one real Roomsie story before you finalize a stage reference.
- Record what worked, which prompts you used, and where the work went off track.
- The POC runs with the `doc-architecture` guard active.
- Re-clone `mattpocock/skills` and `DietrichGebert/ponytail` when you build the stage references. Adapt them. Do not copy them blindly.
- `lean-code.md` and `code-comments.md` are complete. Change them only for a finding of the POC.
- `/build-feature` never calls `/doc-management`.

## Modules and seams

| Module | Interface changes? | Seam for the tests |
|---|---|---|
| Stage references (`grill`, `spec`, `tickets`, `implement`, `review`) | no | none: the POC is a manual run |
| Templates (`task-note-section`, `pr-template`) | no | none: the POC is a manual run |
| `issue-status` and `tick` | no | their `--dry-run` output |

**Model test:** none. The POC is a manual run on one Roomsie ticket.

## Acceptance criteria

- [ ] The POC on one Roomsie ticket is complete, from the grill to a merged PR, with the guard active.
- [ ] A journal entry records what worked, the prompts, and where the work went off track.
- [ ] Each stage reference and template loses its "Draft" mark, with the changes from the POC.
- [ ] [ADR-0006](../decisions/0006-poc-first-stage-references-are-drafts.md) has the status Accepted, or a new record replaces it.
- [ ] The `build-feature` version and the plugin version increase, with a `CHANGELOG.md` entry.

## Out of scope

- The code standards of Roomsie. They are in the Roomsie repo ([ADR-0013](../decisions/0013-project-coding-standards.md)).
- A Kotlin or analytics standards file in Roomsie.

## Tickets

None. This repo has no plan system.
