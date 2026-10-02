# 0008 — Progress lives in the project plan: ticks and logs

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The first spec asked for a new Obsidian progress log, with `Progress/_index.md` and one note for each feature. Roomsie already had a plan system in its repo, which is also the Obsidian vault.

## Decision

**In one line:** `/build-feature` uses the plan of the project, ticks items in the PR, and logs each PR in the task note and journal.

- Do not build `Progress/_index.md` or `Progress/<feature>.md`.
- In Roomsie, tasks are notes in `docs/plan/tasks/`, with a `## Done when` checklist and a `^done` block ID. `docs/plan/Progress.md` rolls them up. `tools/build-obsidian-plan.py` generates them from `docs/team-plan.json`. That file is the only place where you edit the plan.
- Ticks survive the generator by exact text match.
- The project configuration gives the vault layout, so other projects can be different.
- Tick only the items that you completed. New items get the date and the source PR. Never delete an item. A dropped item is `- [-]`, with a reason.
- **Ticks:** commit them inside the PR. Each ticked line gets ` · [#N](link)`. Merge means ticked. A PR that closes unmerged ticks nothing. There is no step after the merge.
- **Log:** two entries for each PR.
  - A short entry in the `## Log` section of the task note. It gives the date, the PR link, what changed, why, and the items that it ticked or added. The generator must keep this section.
  - A longer narrative in the build journal, `docs/journal/YYYY-MM.md`, one file for each month, append only.

## Rationale

- Part A §9: "Don't create a separate logging system." Roomsie already had a plan system.
- The vault is in the repo, so a tick can go in the PR diff.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| A new Obsidian log: `Progress/_index.md` and `Progress/<feature>.md` | The grill reused the plan system that exists. |
| Tick after the merge | The vault is in the repo, so the tick goes in the PR. Merge means ticked. |

## Consequences

- `tick` ticks one item by its exact text and adds the PR link.
- `build-obsidian-plan.py` in Roomsie keeps the `## Log` and `## Spec` sections (magentawood/roomsie#90).

## Revisit when

- A project keeps its vault outside the repo.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A "Goal", §9 "Obsidian progress log", and §12 "Tick on merge" and "Vault access", and Part B "Progress and issues" (2026-09-30).
- [PR #4](https://github.com/magentawood/agentic-devkit/pull/4): `tick`, and the open Roomsie changes to `build-obsidian-plan.py`.
- Superseded: Part A §9 asks for `Progress/_index.md` and `Progress/<feature>.md`. Part B reuses the plan system. `team-plan.json` is the only place where you edit the plan.
- Superseded: Part A §12 "Tick on merge" ticks the items only after the merge, and runs vault updates after the merge. Part B commits the ticks in the PR. For a PR that closes unmerged, Part B keeps "nothing ticked" and does not give the log entry of §12.
- Superseded: Part A §3 step 4 says "Update the Obsidian log as you go". Part B writes the log entries at the PR stage.
