---
name: ste-writing
description: Write and rewrite Markdown in ASD-STE100 Simplified Technical English (STE). Use when you create or edit any .md file (spec, ticket, task note, standards file, README, CONVENTIONS, SKILL.md body, PR description), or when the user asks to rewrite, compact, or clean up docs into STE.
metadata:
  version: 0.2.0
---

# STE writing

## Purpose

Make all Markdown files easy to read for all readers, human and agent. STE gives one word one meaning, short sentences, and clear steps.

## When to use / When NOT to use

Use this skill when you write new Markdown, or when you change Markdown text.

Use the rewrite procedure when the user asks to rewrite or compact a document that exists into STE.

Do not apply STE to these parts of a file:

- Code blocks and inline code
- Quoted text
- Frontmatter keys
- File paths, URLs, and identifiers (for example, `T-06`, `ADR-0012`)

## Inputs

- The file to write or rewrite.
- The project glossary, `CONTEXT.md`. Use its technical names with no change.
- The project `devkit.config.json`, key `ste`. It gives the spelling directive (`british` or `american`) and the approved technical names (`allowWords`).

## Outputs

- A Markdown file in STE.
- For a rewrite: a verification report for the PR. The report has the lint result, the `ste-verify` result, and the claim check.

## Steps

### Write new text

1. Read [references/ste-rules.md](references/ste-rules.md).
2. Write the text.
3. Run `${CLAUDE_SKILL_DIR}/scripts/ste-lint <file>`.
4. Run `${CLAUDE_PLUGIN_ROOT}/skills/doc-architecture/scripts/doc-budget <file>`. If the file is above its limit, obey the context budget rules in CONVENTIONS.md.
5. Fix each finding. If a finding is not correct, keep the text and give the reason in one line.

### Rewrite existing text

1. Read [references/rewrite.md](references/rewrite.md) and do all its steps.

## Exit conditions

- `ste-lint` shows no finding without a reason.
- `doc-budget` passes.
- For a rewrite: `ste-verify diff` shows PASS, `ste-verify links` shows 0 broken links, and the claim check shows no missing claim.

## Conventions

Obey [CONVENTIONS.md](../../CONVENTIONS.md). Before/after examples are in [references/examples.md](references/examples.md).

## Example

Before:

> The architecture should not change every time we add a feature or swap a vendor.

After:

> A new feature or a new vendor must not change the architecture.
