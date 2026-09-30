# Changelog

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
