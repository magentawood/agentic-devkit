# Changelog

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
