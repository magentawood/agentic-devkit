# Changelog

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
