---
name: doc-management
description: Set up, migrate, or check the docs architecture of a project. Use with "/doc-management setup", "/doc-management migrate", or "/doc-management check [--sync]".
disable-model-invocation: true
argument-hint: "setup | migrate | check [--sync]"
metadata:
  version: 0.1.0
---

# Doc management

## Purpose

Do the large docs runs that the user starts. `setup` gives a new project the docs architecture. `migrate` moves the docs of a project into the architecture. `check` gives the full report. The rules of the architecture are in the `doc-architecture` skill. This skill applies them to the full project.

## When to use / When NOT to use

Use this skill when the user types `/doc-management` with a mode:

- **`setup`:** a new project, or a project with no docs.
- **`migrate`:** a project with docs that do not obey the architecture.
- **`check`:** a report on a project that uses the architecture. `check --sync` also refreshes the tool copies.

Do not use it for one doc change. The `doc-architecture` skill guards each change.

## Inputs

- The mode.
- The plugin defaults (`${CLAUDE_PLUGIN_ROOT}/defaults/devkit.defaults.json`), then the project `devkit.config.json`: `docArchitecture`, `docBudget`, `decisionsPath`, `journalPath`, and `plan`.
- The rules: [../doc-architecture/references/architecture.md](../doc-architecture/references/architecture.md).
- The lessons from the Roomsie migration: [references/lessons.md](references/lessons.md).

## Outputs

- **`setup`:** one PR with the index, the record templates, the folders, the config, the tool copies, the hook, and CI. `package.json` and `.claude/settings.json` turn on the hook.
- **`migrate`:** stacked PRs, one commit for each file. The user approves them before merge.
- **`check`:** a report in the terminal. With `--sync`, a PR that refreshes the tool copies.

## Steps

1. Read the reference file for the mode. Do all its steps.
   - `setup`: [references/setup.md](references/setup.md)
   - `migrate`: [references/migrate.md](references/migrate.md) and [references/lessons.md](references/lessons.md)
   - `check`: [references/check.md](references/check.md)
2. `setup`, `migrate`, and `check --sync` copy the tools with `${CLAUDE_SKILL_DIR}/scripts/sync-tools`. `check` only compares the copies, with `sync-tools --check`.
3. Use the templates in `${CLAUDE_SKILL_DIR}/templates/` for new files. The spec template is `${CLAUDE_PLUGIN_ROOT}/skills/doc-architecture/templates/spec.md`.
4. Ask each question with `AskUserQuestion`, one question at a time.
5. When a run teaches a new lesson about the architecture, add it to [references/lessons.md](references/lessons.md) in a plugin PR.

## Exit conditions

- The cheap checks pass in the project: `doc-budget`, `doc-links`, `build-decision-ledger --check`, `render-docs --check`, and `sync-tools --check`.
- **`migrate`:** the user approved the plan, each contradiction, and the PRs.
- The PR is open. You do not merge it without the approval of the user.

## Conventions

Obey [CONVENTIONS.md](../../CONVENTIONS.md). The terms are in [docs/glossary.md](../../docs/glossary.md). This skill uses the `doc-architecture` and `ste-writing` skills. It does not use a different user-invoked skill.

## Example

`/doc-management setup` in a new repo:

1. You ask one question: "Which parts do you want off?" The user keeps all parts on.
2. `sync-tools --recommend-plugin` copies the tools, the hook, and CI. It records the plugin version, and it turns on the hook for each clone.
3. You make `CONTEXT.md`, `docs/decisions/README.md`, and the folders from the templates.
4. All checks pass. You open the PR.
