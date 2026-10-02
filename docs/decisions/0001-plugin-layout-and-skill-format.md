# 0001 — Plugin layout and skill format

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

All skills of the plugin, and each skill in the future, need one layout and one format. The first spec gave a layout and a frontmatter. The grill of 2026-09-30 checked these against the facts of Claude Code, and it changed some of them.

## Decision

**In one line:** Each skill is `skills/<name>/SKILL.md` with `metadata.version`, eight body sections in a fixed order, and no `commands/` folder.

- `plugin.json` is only in `.claude-plugin/`. All component folders are at the plugin root.
- Use kebab-case for all file and folder names.
- A skill is `skills/<name>/SKILL.md`. Details go in `references/`, templates in `templates/`, and scripts in `scripts/`.
- There is no `commands/` folder. Claude Code shows each skill as a slash command.
- Frontmatter: `name` (kebab-case), `description` (what the skill does, then when to use it, with trigger phrases), and `metadata.version`. SKILL.md has no top-level `version` field.
- A user-invoked skill has `disable-model-invocation: true`. Its description is one line for the human.
- Write the SKILL.md body in STE ([ADR-0014](0014-ste-for-all-markdown.md)).
- Body sections, in this order: Purpose, When to use / When NOT to use, Inputs, Outputs, Steps, Exit conditions, Conventions (a link to `CONVENTIONS.md`), Example.
- Keep SKILL.md short. Put the details in `references/`, and give the condition to read each file.
- Shared rules are only in `CONVENTIONS.md`. A skill links to them.
- A skill refers to its own files with `${CLAUDE_SKILL_DIR}`, and to plugin root files with `${CLAUDE_PLUGIN_ROOT}`. It does not use an absolute path.
- Release checklist for each new or changed skill: update `README.md`, the version, and `CHANGELOG.md`. If the skill adapts outside work, update `NOTICE.md`.

## Rationale

- Claude Code does not accept a top-level `version` field in SKILL.md. It accepts `metadata.version`.
- Claude Code deprecated the `commands/` folder. Skills are slash commands.
- A short SKILL.md with details in `references/` comes from the `writing-for-agents` skill of Matt Pocock.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| A top-level `version` field in the frontmatter | Claude Code does not accept it in SKILL.md. |
| A `commands/` folder | Claude Code deprecated it. Skills are slash commands. |

## Consequences

- The version of a skill is in `metadata.version`. The plugin version is in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §11 "Standard format for the plugin and all future skills", and Part B "Naming and format (Claude Code facts checked)" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Layout", "Paths and configuration", "Skill format", and "Release checklist".
- Superseded: Part A §11 lists a `commands/` folder in the plugin layout. Part B removes it.
- Superseded: Part A §11 gives a `version` field in the frontmatter. Part B replaces it with `metadata.version`.
- Superseded: Part A §11 gives only `${CLAUDE_PLUGIN_ROOT}` for paths. Part B adds `${CLAUDE_SKILL_DIR}` for the files of a skill.
