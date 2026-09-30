# Changelog

## 0.2.1 (2026-09-30)

- `ste-writing` rewrite procedure: keep absolute and certainty words, keep words with no approved equivalent, set no target length, and compare with the file before the rewrite before you fix an `added` or `weakened` item. These rules come from the first three Roomsie rewrite batches.

## 0.2.0 (2026-09-30)

- Add the `ste-writing` skill. It writes and rewrites Markdown in ASD-STE100 Simplified Technical English.
- Add `ste-lint`. It reports sentence length, paragraph length, passive voice, -ing forms, semicolons, contractions, spelling, and words that are not approved.
- Add `ste-verify`. It makes sure that a rewrite keeps all links, anchors, headings, code, identifiers, and numbers, and that all links resolve.
- Add `CONVENTIONS.md`, `CONTEXT.md`, `NOTICE.md`, and `devkit.config.json`.

## 0.1.0 (2026-09-19)

- Add the `blog` skill.
