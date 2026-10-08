# Changelog

## 0.7.0 (2026-10-08)

- New model-invoked skill `next-task` 0.1.0 ([ADR-0028](docs/decisions/0028-claim-at-the-start-and-the-next-task-skill.md)). It lists the free tasks of `plan.source` by role, and the claimed tasks. A free task has complete dependencies, no assignee, and no open status label.
- `build-feature` 0.3.0: before the first grill question, it claims the issue with `issue-status <N> spec --claim`. It stops when a different person has the issue.
- `issue-status`: the new `--claim` flag assigns the issue to the gh user. It exits 2 when a different person is an assignee.
- "Questions to the user" ([ADR-0027](docs/decisions/0027-the-shape-of-a-question.md)): the context goes inside the question text. It tells what the concept is, the current state, and an example of the result of each option. ADR-0024 loses its rejected alternative "A long explanation above each question".

## 0.6.2 (2026-10-03)

- `build-feature` 0.2.1 ([ADR-0026](docs/decisions/0026-rebuild-the-plan-in-the-pr.md)): at the PR stage, after the ticks, the log, and the journal entry, run `plan.build`. Commit the generated plan files together with the ticks, in the same PR.
- `pre-commit` 0.2.0: if the project config has `plan.build`, the hook runs `<plan.build> --check` and fails on a non-zero exit. If not, it skips the check. `docs-check.yml` 0.1.1 names the new check. CI runs the same hook.
- A `plan.build` command must accept `--check`. With `--check`, it writes no file. It exits 1 when a generated plan file is stale, and 0 when all files are current. Give the generator this flag before you sync.
- `doc-architecture` 0.2.2 and `doc-management` 0.2.1 tell the new rules. Run `/doc-management check --sync` in each project.

## 0.6.1 (2026-10-03)

- `build-decision-ledger` 0.3.0 ([ADR-0025](docs/decisions/0025-learn-pages.md)): the full Learn index goes to `learnIndex` (default `<learnPath>/README.md`). The tech ledger gets a teaser with a link and the 5 newest titles (`learnTeaser`). The teaser replaces a 0.2.0 Learn block in its file. Remove a 0.2.0 Learn block in a different file by hand.
- `doc-architecture` 0.2.1 and the `doc-management` references tell the new rules. Run `/doc-management check --sync` in each project.

## 0.6.0 (2026-10-03)

- `build-feature` 0.2.0: the stage references and the templates come from the Roomsie T-02 POC, and lose the "Draft" mark. `tickets.md` stays a draft: the POC did not use the ticket stage. [ADR-0006](docs/decisions/0006-poc-first-stage-references-are-drafts.md) has the status Accepted.
  - Grill: check the Read-first files and the done items against the current docs. Ask the user about a stale product decision.
  - Spec: a scaffold ticket can name its packages. Apply the before → after text of a done item to the task note before the plan generator runs.
  - Implement: an environment preflight, staged files by path, and tool-written agent files off.
  - Review: all reviewers get the spec decisions and the out-of-scope list. One more round on a change after the last round.
  - New `references/pr.md`: the learn pages, the predicted PR number, and the PR gate.
- Each question ends with "Explain this question" (`CONVENTIONS.md`, [ADR-0024](docs/decisions/0024-explain-this-question.md)).
- Learn pages ([ADR-0025](docs/decisions/0025-learn-pages.md)): `doc-architecture` 0.2.0 adds the doc type and `templates/learn.md`. `build-decision-ledger` 0.2.0 writes the Learn index. `render-docs` 0.2.0 accepts a glob in `renderPages`. `doc-management` 0.2.0 sets up `docs/learn/`. The defaults add `learnPath`, `learnIndex`, and `parts.learn`. Run `/doc-management check --sync` in each project.

## 0.5.2 (2026-10-02)

- `build-feature` 0.1.3: at the spec gate, print the complete text of the spec, then ask for approval. At the PR gate, print the complete text of the PR draft. Do not give a summary. Why: [ADR-0023](docs/decisions/0023-print-the-complete-text-at-a-gate.md).

## 0.5.1 (2026-10-02)

- The plugin repo uses its own docs architecture. `/doc-management migrate` ran by hand on this repo, in three stacked PRs (#7–#9):
  - `CONTEXT.md` is an index, and `CLAUDE.md` imports it. The glossary moved to `docs/glossary.md`.
  - 22 ADRs in `docs/decisions/` hold the decisions of the PRDs and of PR #6. `docs/tech-ledger.md` lists them.
  - `CONVENTIONS.md` keeps the rules, with a `Why:` link for each section.
  - `docs/specs/build-feature.md` holds the open work of `build-feature`. The PRDs are in `docs/archive/`.
  - `.githooks/pre-commit` and CI run the docs checks with the master tools. A `SessionStart` hook turns on the hook.
- The index holds no glossary. `ste-writing` 0.3.1, `build-feature` 0.1.2, and `doc-architecture` 0.1.1 send the agent to the project glossary that the routing table gives. The `CONTEXT.md` template has a routing row for it.
- `doc-management` 0.1.1: `migrate` moves a glossary out of the index with `git mv` first. `setup` writes `"plan": null` for a project with no plan system. `lessons.md` has the lessons of this run.
- `build-decision-ledger` and `render-docs` 0.1.1: the `--check` message gives the path of the script that runs. Run `/doc-management check --sync` in each project.
- `blog`: the folder `reference/` becomes `references/`, as `CONVENTIONS.md` tells.

Older versions (0.1.0 to 0.5.0) are in [docs/archive/changelog-0.1-0.5.md](docs/archive/changelog-0.1-0.5.md).
