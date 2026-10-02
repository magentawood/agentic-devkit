# Changelog

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

## 0.5.0 (2026-09-30)

- Add the `doc-architecture` skill (0.1.0). It loads on each Markdown edit and guards the docs architecture. The architecture has an index, decision records, rules with `Why:` links, generated ledgers, specs, history, HTML, and size limits. On each change that breaks the architecture, it fixes the break in the same change.
- Add the `doc-management` skill (0.1.0). `/doc-management setup` gives a project the architecture. `migrate` runs the Roomsie pipeline with stacked PRs and three approval stops. `check` gives the full report, and `check --sync` refreshes the tool copies. Its references carry the lessons of the Roomsie cleanup.
- Move `doc-budget` from `ste-writing` to `doc-architecture`. Move the `links` subcommand of `ste-verify` to the new `doc-links` script. `ste-verify` keeps only `diff`.
- Add `build-decision-ledger` and `render-docs`, from Roomsie. They read their paths from `devkit.config.json`.
- Add the hook template and the CI template. They run the cheap checks: limits, links, ledger drift, render drift, and tool copies.
- Add `sync-tools`. It copies the master tools into a project and records the plugin version. `--check` reports each copy that is older than the master or not the same.
- `sync-tools` turns on the hook automatically, because git never runs the hooks of a clone by itself. It merges `git config core.hooksPath .githooks` into the `prepare` script of a root `package.json` and into a `SessionStart` hook in `.claude/settings.json`. `--recommend-plugin` adds this plugin to `extraKnownMarketplaces` and `enabledPlugins`. `--check` and `doc-architecture` report a hook that is not on.
- Move the generic defaults from the root `devkit.config.json` to `defaults/devkit.defaults.json`. All scripts read this file first. The root `devkit.config.json` keeps only the values of the plugin repo. The defaults add `docArchitecture` (all parts on), a 1,200-word limit for specs, and exclude the journal from the limits.
- One spec template, `doc-architecture/templates/spec.md`. It merges the two spec templates of `build-feature` and `doc-management`, and it replaces them.
- `ste-writing` 0.3.0: it keeps only the language. `build-feature` 0.1.1: the docs duties point at `doc-architecture`, and a new spec goes to `specPath`.
- `CONVENTIONS.md`: the "Context budget" section keeps a summary and links `doc-architecture`.

## 0.4.0 (2026-09-30)

- Add the `build-feature` skill (0.1.0, skeleton). It takes a ticket that exists, or a new feature, through grill, spec, ticket, implement, and review to a PR. The stage references and the templates are drafts. The POC on the first ticket finalizes them. `lean-code.md` and `code-comments.md` are complete.
- Add `issue-status`. It sets one `status:*` label on an issue and removes the other `status:*` labels. It also adds a comment about the stage change.
- Add `tick`. It ticks one checkbox in a task note and adds a link to the PR. It finds the checkbox by its text.
- `devkit.config.json`: add the default values for `vaultPath`, `standardsPath`, `decisionsPath`, `journalPath`, and `plan`.
- `CONTEXT.md`: add the terms of the pipeline.

## 0.3.0 (2026-09-30)

- Add `doc-budget`. It checks each Markdown file against the size limits in `devkit.config.json` and fails when a file is above its limit. It can check all files, the files changed since a git ref, or the staged files. A per-file override sets a ceiling, so a file that is above its limit can get smaller but not bigger.
- Add the context budget rules to `CONVENTIONS.md`. The always-loaded file is an index with a routing table. Reasoning is only in decision records. Each fact has one home.
- `ste-writing` runs `doc-budget` after `ste-lint`.

## 0.2.1 (2026-09-30)

- `ste-writing` rewrite procedure: keep absolute and certainty words, keep words with no approved equivalent, set no target length, and compare with the file before the rewrite before you fix an `added` or `weakened` item. These rules come from the first three Roomsie rewrite batches.
- `ste-lint` now checks table cells and the text in blockquotes and callouts. Before, it skipped all lines that start with `|` or `>`.

## 0.2.0 (2026-09-30)

- Add the `ste-writing` skill. It writes and rewrites Markdown in ASD-STE100 Simplified Technical English.
- Add `ste-lint`. It reports sentence length, paragraph length, passive voice, -ing forms, semicolons, contractions, spelling, and words that are not approved.
- Add `ste-verify`. It makes sure that a rewrite keeps all links, anchors, headings, code, identifiers, and numbers, and that all links resolve.
- Add `CONVENTIONS.md`, `CONTEXT.md`, `NOTICE.md`, and `devkit.config.json`.

## 0.1.0 (2026-09-19)

- Add the `blog` skill.
