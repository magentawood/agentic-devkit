---
name: doc-architecture
description: Guard the docs architecture of a project, so that the docs stay small and easy to read. It tells where a fact lives, the size limit of a file, and the checks that must pass. Use on any Markdown create or edit, on each new decision, and on each new doc, in the plugin repo and in each project. It loads together with ste-writing.
metadata:
  version: 0.1.1
---

# Doc architecture

## Purpose

Keep the agent context free for work on code, and keep the docs easy to read. `ste-writing` owns the language of a sentence. This skill owns where a fact lives and the size of a file.

## When to use / When NOT to use

Use this skill on each change to a Markdown file, each new decision, and each new doc.

Do not use it to set up or migrate a project. The user starts those runs with `/doc-management`.

## Inputs

- The change.
- The project `devkit.config.json`: `docArchitecture`, `docBudget`, `decisionsPath`, `journalPath`. A part that `docArchitecture.parts` turns off does not apply.
- The project index (`docArchitecture.indexFile`, default `CONTEXT.md`).

## Outputs

The same change, with each architecture fix in its diff.

## Steps

1. Obey these rules. For the full architecture, read [references/architecture.md](references/architecture.md) when you add a doc, a record, a spec, or a routing row.
   - One fact, one home. Other docs link to it. They do not copy it.
   - Reasoning lives only in a decision record. A working doc gives the rule and a link: `Why: [PD7a](…)`.
   - Update or remove the text that a new decision replaces. Do not append.
   - When two sources conflict, the most recent record wins. The record marks the older statement "Superseded:".
   - The index holds no reasoning and no glossary. It stays at or below its token limit.
   - Edit the source of a generated file, never the output.
   - Docs link to the plan. They never copy task lists.
   - The index never links the journal or the archive.
2. On each change that breaks a rule, **fix it in the same change**:
   - Move the reasoning into its decision record. Replace each copied fact with a link.
   - Divide a file that goes above its limit.
   - For each new decision, add a record with its `**In one line:**` summary. Then run the ledger generator.
   - When a new area appears, add a row to the routing table of the index.
3. Run the checks. Use the project copy (`python3 tools/<name>.py`) if it exists. Otherwise use the master copy (`${CLAUDE_SKILL_DIR}/scripts/<name>`):
   - `doc-budget <file>` for each changed file.
   - `doc-links .`
   - `build-decision-ledger --check`
   - `render-docs --check`
   - With the `hook` part on and husky in the project: `.husky/pre-commit` has the line `sh .githooks/pre-commit`. If not, tell the user to run `/doc-management check --sync`. Never change `core.hooksPath` in a husky project.
   - With the `hook` part on and no husky: `git config core.hooksPath` gives `.githooks`, and the root `package.json` (if there is one) has `git config core.hooksPath .githooks` in `scripts.prepare`. If not, run `git config core.hooksPath .githooks`, and tell the user to run `/doc-management check --sync`.

## Exit conditions

- Each check passes. The project hook runs the same checks and blocks a commit that fails.
- The diff shows each fix.

## Conventions

Obey [CONVENTIONS.md](../../CONVENTIONS.md). The terms are in [docs/glossary.md](../../docs/glossary.md).

## Example

A PR adds a rate limit to `docs/limits.md`, with three paragraphs of reasons.

1. The reasons go into a new record, `docs/decisions/pd-14-rate-limit.md`, with an "In one line" summary.
2. `docs/limits.md` keeps the rule and `Why: [PD14](decisions/pd-14-rate-limit.md)`.
3. `build-decision-ledger` updates the ledgers. All checks pass.
