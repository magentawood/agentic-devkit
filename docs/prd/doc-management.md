# PRD: doc-architecture and doc-management

**Status:** approved in the grill (2026-09-30) · **Owner:** Yash · **Input:** [doc-management-notes.md](doc-management-notes.md) (what we did to Roomsie, the lessons, the numbers)

## Goal

Every project uses the same docs architecture from the first day, and the architecture does not drift as the project grows. The architecture comes from the Roomsie cleanup (PRs #74–#88). It has two aims, in this order:

1. Keep the agent context window free for programming work. The docs must not grow without limit.
2. Make the docs easy to read, so that agents and humans are not confused.

## Two skills

| Skill | Type | Job |
|---|---|---|
| `doc-architecture` | model-invoked | Loads on every Markdown edit, in the plugin repo and in each project. It guards every change. |
| `doc-management` | user-invoked | `/doc-management setup`, `migrate` or `check`. These are large runs that you start. |

`ste-writing` owns the language: how a sentence is written (`ste-lint`, `ste-verify diff`). `doc-architecture` owns the structure: where a fact lives and how big a file is. On a Markdown edit, both skills load. Move `doc-budget` and `ste-verify links` from `ste-writing` to `doc-architecture`.

## The architecture (all parts on by default)

A project turns a part off in its own `devkit.config.json`. The skills do not decide that for the project.

- **Index:** `CONTEXT.md`, which `CLAUDE.md` imports, at most 1,500 tokens. It holds what the project is, the generated list of decisions that are not settled, a routing table ("when your task touches X, read Y first"), where things live, and the conventions.
- **Decision records:** the only home of reasoning.
  - Architecture records are `docs/decisions/NNNN-slug.md`, cited as `ADR-0006`.
  - Product records are `docs/decisions/pd-NN[a]-slug.md`, cited as `PD7a`.
  - Both use one format: Context, Decision (with `**In one line:**`), Rationale, Alternatives rejected, Consequences, Revisit when, Sources.
- **Working docs:** rules only, with `Why: [PD7a](…)` links.
- **Ledgers:** generated from the records, with `--check` for drift.
- **Specs:** `docs/specs/<feature>.md` (config key `specPath`). A spec holds rules and acceptance criteria and links the records. When the feature is done, the spec moves to `docs/archive/`.
- **Plan:** in one place, set by config. The docs link to it and never copy task lists.
- **History:** `docs/journal/YYYY-MM.md` (append only) and `docs/archive/`. The limits do not apply to them, and the index never links them.
- **HTML:** generated from Markdown, with `--check`.
- **Limits:** the plugin defaults are the Roomsie numbers. The index is 1,500 tokens. Working docs, records and specs are 1,200 words. Research is 1,500 words. The journal and archive are excluded. An override is a ceiling for one file, and it can only shrink.
- **Rules:** one fact, one home. Update or remove replaced text. Do not append. When two sources conflict, the most recent record wins, and the record marks the older statement "Superseded:".

## doc-architecture (guard)

On each change that breaks the architecture, **fix it in the same change**:

- Move reasoning into its record, and replace copied facts with links.
- Divide a file that goes above its limit.
- Add a record, with its "In one line", for each new decision. Then run the ledger generator.
- Add a routing row when a new area appears.

The hook blocks the commit if a check fails. You see each fix in the diff.

## doc-management (user-invoked)

- **`setup`:** scaffolds the architecture in a new project. It creates the index, the record templates, the folders, the `docBudget` config, the hook, CI and the tools.
- **`migrate`:** runs the Roomsie pipeline on a project that has docs. The stages are:
  inventory → moves and renames → formats → the optional STE rewrite (blind claim checks) → compaction (CORE or SUPPORT) → records (fact-checked) → why-to-links → splits, ledgers and limits.

  It uses stacked PRs, one commit for each file, and rebase-merge. It stops for your approval at three points:
  1. The plan, after the inventory: moves, renames, splits and word counts.
  2. Each contradiction between docs, one at a time through the picker.
  3. The stacked PRs, before merge.
- **`check`:** the full report, which includes contradictions and duplicated facts found by an agent. The hook and CI run only the cheap script checks. These are limits, links, ledger drift, render drift and tool-copy versions. Nothing runs on a schedule.

## Tools: master copy plus project copies

The plugin holds the master copy of each tool: `doc-budget`, the link check, the ledger generator, the renderer, the hook and the CI step. `setup` copies them into the project (`tools/`, `.githooks/`) and records the plugin version, so CI and developers without the plugin can run them. `check` reports a copy that is older than the master. `check --sync` refreshes it.

## Relations

- `/build-feature` calls `doc-architecture` rules through the usual Markdown edits. It never calls `/doc-management`, because a user-invoked skill does not call another user-invoked skill.
- Before this skill exists, the same rules live in the "Context budget" section of `CONVENTIONS.md`. After it exists, `CONVENTIONS.md` links to the skill.

## Order of work

1. Merge Roomsie #76→#88 and the standards PRs, then run `sync-issues.py --apply`. Merge plugin #2→#4 and `docs/prds`.
2. Build `doc-architecture` and `/doc-management`, and move `doc-budget` and the link check out of `ste-writing`.
3. Dogfood: run `/doc-management migrate` on the plugin repo. The PRD decisions become ADRs, and `CONVENTIONS.md` keeps only rules with `Why:` links. The hook and CI run on the plugin.
4. Then run the `/build-feature` POC on a Roomsie ticket, with the guard active.

## Lessons the skills must carry

These are in [doc-management-notes.md](doc-management-notes.md#lessons-put-these-in-the-skill). Put them in `doc-management`'s references, not in `SKILL.md`.
