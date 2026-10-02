---
name: build-feature
description: Take a feature or a ticket from an idea to a merged PR through grill, spec, ticket, implement, and review. Use with "/build-feature T-13" for a ticket that exists, or with "/build-feature <idea>" for a new feature.
disable-model-invocation: true
argument-hint: "[T-nn | feature idea]"
metadata:
  version: 0.1.2
---

# Build feature

## Purpose

Take one unit of work from a decision to a merged PR. Each stage has an exit condition. The user approves each stage change that is in `approvalGates`. The task notes in the repo are the single source of truth for progress. The GitHub issues show the status of each ticket.

## When to use / When NOT to use

Use this skill for these two entry points:

- **Ticket that exists** (for example, `T-13`): a short grill, a short spec in the task note, approval, implement, review, PR. There is no ticket stage.
- **New feature**: the full pipeline. The ticket stage adds the new tasks to the plan source and runs the generator.

Do not use this skill for a change to documents only. For that change, use `ste-writing`.

## Inputs

- The argument: a ticket ID, or a description of the feature.
- The configuration: the plugin defaults (`${CLAUDE_PLUGIN_ROOT}/defaults/devkit.defaults.json`), then the project `devkit.config.json`. Use `approvalGates`, `mergeMode`, `reviewRounds`, `statusLabels`, `repo`, `standardsPath`, `decisionsPath`, `journalPath`, `plan`, and `docArchitecture`.
- The task note (`<plan.tasksPath>/<ID> *.md`) and the files in its `## Read first` section.
- The project `CONTEXT.md`, the project glossary that its routing table gives, the decision records, and all files in `standardsPath`.

## Outputs

- Code on a branch, with tests at the agreed seams.
- A PR that uses [templates/pr-template.md](templates/pr-template.md). It closes the issue with `Closes #N`.
- In the same PR: the ticks, a `## Log` entry in the task note, and a build journal entry (`journalPath`).
- New or changed decision records, and the glossary terms, from the grill.

## Steps

Before each stage, read its reference file. At each stage change, run `${CLAUDE_SKILL_DIR}/scripts/issue-status <N> <status> --note "<one line>"`.

1. **Grill.** Read [references/grill.md](references/grill.md). For a ticket that exists, ask only implementation questions.
2. **Spec.** Read [references/spec.md](references/spec.md). For a ticket, write the short spec into the task note with [templates/task-note-section.md](templates/task-note-section.md). For a new feature, use `${CLAUDE_PLUGIN_ROOT}/skills/doc-architecture/templates/spec.md`. Set `status:spec`.
3. **Ticket** (new feature only). Read [references/tickets.md](references/tickets.md).
4. **Implement.** Read [references/implement.md](references/implement.md), [references/lean-code.md](references/lean-code.md), [references/code-comments.md](references/code-comments.md), and the applicable files in `standardsPath`. Set `status:in-progress`.
5. **Review.** Read [references/review.md](references/review.md). Do the review before you open the PR. Use three blind sub-agents and a maximum of `reviewRounds` rounds.
6. **PR.** Tick the done items with `${CLAUDE_SKILL_DIR}/scripts/tick`. Add the `## Log` entry and the journal entry. Show the PR draft to the user, then open the PR. Set `status:in-review`.
7. **Merge.** Obey `mergeMode`. For `ask`, give the user three options: the user merges, you merge after approval, or auto-merge on a clean review. Use rebase-merge. After the merge, set `status:done`.

For each stage in `approvalGates` (default: `spec` and `pr`), stop and get the approval of the user before the next stage.

Docs duties, at each stage. The `doc-architecture` skill guards each Markdown change. Its tools are in `tools/` of the project, or in `${CLAUDE_PLUGIN_ROOT}/skills/doc-architecture/scripts/` if the project has no copy.

- Put the reasoning for a decision only in its decision record. Give each new record an "In one line:" summary, then run `build-decision-ledger`.
- Keep `CONTEXT.md` an index. When a new area occurs, add a line to its routing table.
- Update or remove the text that a new decision replaces. Do not append.
- Run `doc-budget` on each document that you change.
- Put the spec of a new feature in `docArchitecture.specPath`. After the merge, move it to `docArchitecture.archivePath`.

## Exit conditions

- The grill has no open decision.
- The user approved each gate in `approvalGates`.
- The review has no open finding. Each rejected finding has a reason in the PR.
- The PR is open. If `mergeMode` allows it, the PR is in the default branch. The issue label agrees with the stage.

## Conventions

Obey [CONVENTIONS.md](../../CONVENTIONS.md). The terms are in [docs/glossary.md](../../docs/glossary.md).

## Example

`/build-feature T-13`

1. The grill asks four questions, one at a time. The code and the Read-first files answer three other questions.
2. The short spec goes into the T-13 task note. The user approves it.
3. Red-green-refactor at the seam of the reply writer. The issue gets `status:in-progress`.
4. Round 1 of the review gives two Lean findings and one Spec finding. You fix them. Round 2 is clean.
5. Three of four items get a tick with ` · [#91](https://github.com/magentawood/roomsie/pull/91)`. The Progress section of the PR says: "Off-topic replies: not done. Blocked by T-34."
