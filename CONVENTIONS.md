# Conventions

These rules apply to all skills in this plugin. A skill links to this file. A skill does not copy these rules. The reasons are in the decision records that each `Why:` line links.

## Layout

- `plugin.json` is only in `.claude-plugin/`. All component folders are at the plugin root.
- Use kebab-case for all file and folder names.
- A skill is `skills/<name>/SKILL.md`. Put details in `references/`, templates in `templates/`, and scripts in `scripts/`.
- Do not add a `commands/` folder.

Why: [ADR-0001](docs/decisions/0001-plugin-layout-and-skill-format.md)

## Paths and configuration

- In a skill, refer to its own files with `${CLAUDE_SKILL_DIR}`. Refer to plugin root files with `${CLAUDE_PLUGIN_ROOT}`. Do not write an absolute path.
- The configuration has three levels. Each level replaces the keys of the level before it:
  1. `defaults/devkit.defaults.json` in the plugin: the default values.
  2. `devkit.config.json` at the project root: the project values (for example, `vaultPath`, `repo`, `standardsPath`). The plugin repo is also a project. Its root `devkit.config.json` holds only its project values.
  3. `~/.config/agentic-devkit/config.json`: the values for the user (for example, `steSpecPdf`). `ste-lint`, `issue-status`, and `tick` read this level.
- `sync-tools` copies the defaults file next to the tool copies of a project, as `tools/devkit-defaults.json`.
- Keep secrets and licensed files out of all repositories.

Why: [ADR-0001](docs/decisions/0001-plugin-layout-and-skill-format.md), [ADR-0003](docs/decisions/0003-three-configuration-levels.md)

## Skill format

- Frontmatter:
  - `name`: kebab-case.
  - `description`: what the skill does, then when to use it, with trigger phrases.
  - `metadata.version`: the skill version. SKILL.md has no top-level `version` field.
  - A user-invoked skill has `disable-model-invocation: true`. Its description is one line for the human.
- Body sections, in this order:
  1. Purpose
  2. When to use / When NOT to use
  3. Inputs
  4. Outputs
  5. Steps
  6. Exit conditions
  7. Conventions (a link to this file)
  8. Example
- Keep SKILL.md short. Put the details in `references/`, and give the condition to read each file.
- A user-invoked skill can use a model-invoked skill. A user-invoked skill does not use a different user-invoked skill.

Why: [ADR-0001](docs/decisions/0001-plugin-layout-and-skill-format.md), [ADR-0002](docs/decisions/0002-skill-types-and-the-call-rule.md)

## Writing

- Write all Markdown in STE. Use the `ste-writing` skill.
- Use the terms in [docs/glossary.md](docs/glossary.md) with no change.
- Use the terms of the code host in all templates. For GitHub, write "pull request" or "PR".

Why: [ADR-0014](docs/decisions/0014-ste-for-all-markdown.md), [ADR-0011](docs/decisions/0011-pr-format.md)

## Context budget

The [`doc-architecture`](skills/doc-architecture/SKILL.md) skill owns these rules and their checks. The summary:

- The always-loaded file is an index with a routing table. Before a task, read the files that the routing table gives for its area.
- The reasoning for a decision is only in its decision record. A working doc gives the rule and a `Why:` link.
- Each fact has one home. Other documents link to it. They do not copy it.
- When a subsequent decision replaces text, update or remove the replaced text. Do not append.
- Each file stays inside its limit in `docBudget`. An override is a ceiling for one file, and a reviewer sees it in the PR.

Why: [ADR-0016](docs/decisions/0016-two-docs-skills.md), [ADR-0017](docs/decisions/0017-the-docs-architecture.md), [ADR-0018](docs/decisions/0018-size-limits-and-the-context-budget.md)

## Questions to the user

- Ask one question at a time. Use the `AskUserQuestion` tool.
- Put your recommended option first, and add "(Recommended)" to its label.
- Give at most three real options. The last option is always "Explain this question", with the description "Explain the options in more detail before I decide".
- When the user selects "Explain this question", give a plain-language explanation. Tell what the concept is, how it fits the project, and what each option changes. Then ask the same question again.
- Before you ask, look for the answer in the code and the documents. Ask the user only for a decision.

Why: [ADR-0004](docs/decisions/0004-questions-to-the-user.md), [ADR-0024](docs/decisions/0024-explain-this-question.md)

## Sub-agents

- Give a sub-agent each file path that it must read. A sub-agent does not get your context.
- A reviewer sub-agent is blind. It gets the diff, the requirements, and its rule files. It does not get the log, the PR draft, or your reasoning.

Why: [ADR-0009](docs/decisions/0009-blind-review-before-the-pr.md)

## Git

- Do not push to the default branch. Send each change as a PR.
- For a rewrite of documents, make one commit for each file.

Why: [ADR-0007](docs/decisions/0007-approval-gates-and-merge-mode.md), [ADR-0022](docs/decisions/0022-the-migrate-pipeline.md)

## Rule candidates

- A review can find a mistake that no standards rule covers. Record it in `<standardsPath>/_candidates.md` with the date, the PR link, and one line that describes it.
- If the same mistake occurs a second time, make it a rule in the applicable standards file. Write the rule in STE, with `Why:` and a source link. Record this change in the Progress section of the PR.

Why: [ADR-0013](docs/decisions/0013-project-coding-standards.md)

## Release checklist

For each new or changed skill:

1. Add or update the skill in `README.md`.
2. Increase `version` in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`.
3. Add an entry to `CHANGELOG.md`.
4. If the skill adapts work from a different project, update `NOTICE.md`.

Why: [ADR-0001](docs/decisions/0001-plugin-layout-and-skill-format.md)
