# 0026 — Rebuild the plan in the PR, and check that the plan is current

**Status:** Accepted · **Date:** 2026-10-03 · **Deciders:** Yash Mangal

## Context

`/build-feature` ticks the done items with `tick` at the PR stage ([ADR-0008](0008-progress-in-the-project-plan.md)). `tick` edits the task note directly, but it does not run the plan generator (`plan.build`). Thus the files that the generator makes from the task notes go stale. In Roomsie, the progress note gives counts, status marks, and the design-free waves. After a PR with ticks, these values do not agree with the task notes. No check finds the problem.

## Decision

**In one line:** `/build-feature` runs `plan.build` after the ticks in the PR, and the hook fails when `<plan.build> --check` fails.

- At the PR stage, after `tick`, run `plan.build` if the project config has it. Commit the generated plan files together with the ticks, in the same PR.
- A `plan.build` command must accept `--check`. With `--check`, it writes no file. It exits 1 when a generated plan file is stale, and 0 when all files are current.
- The `pre-commit` template reads `plan.build` from `devkit.config.json`. It runs `<plan.build> --check`, and fails on a non-zero exit. CI runs the same hook.
- If the config has no `plan.build`, or `plan` is `null`, the hook skips the check with no message.
- `pre-commit` 0.2.0 and `docs-check.yml` 0.1.1. Each project runs `/doc-management check --sync`.

## Rationale

- The progress note is a generated file. A generated file must agree with its source, as the ledgers and the HTML pages do ([ADR-0017](0017-the-docs-architecture.md)).
- The design-free waves in Roomsie come from the status of each task. A stale status gives the team an incorrect order of work.
- The ticks and the generated files go in one PR. Thus "merge means ticked" stays correct for the progress note too.
- The project owns its generator. The plugin cannot know which files it writes. A `--check` contract lets each generator test its own files.
- The hook parses `devkit.config.json` for the tool copies. One more block in the hook is smaller than a new tool copy.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| `tick` runs `plan.build` | `tick` changes one line and can do a dry run. A full rebuild in `tick` is a second job, and it runs one time for each item. |
| Rebuild the plan after the merge | It needs a step after the merge. [ADR-0008](0008-progress-in-the-project-plan.md) has no step after the merge. |
| Only the PR stage rebuilds, with no check | A person who edits the plan by hand can forget the rebuild. Nothing finds the stale file. |
| A plugin tool that compares the generated files | The plugin does not know the output files of each project generator. |

## Consequences

- A PR of `/build-feature` has the regenerated plan files next to the ticks.
- A project with `plan.build` must give its generator a `--check` flag before it syncs `pre-commit` 0.2.0. Roomsie has it.
- A project with no `plan.build` sees no change.
- CI runs the generator, so the generator must run on the CI image with the Python of `docs-check.yml`.

## Revisit when

- A project has a plan generator that cannot give a `--check` flag.
- The plan generator becomes too slow for a commit hook.

## Sources

- User request, 2026-10-03: the Roomsie progress note went stale after the ticks of `/build-feature`.
- [ADR-0008](0008-progress-in-the-project-plan.md): ticks in the PR, and no step after the merge.
