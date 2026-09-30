# Conventions

These rules apply to all skills in this plugin. A skill links to this file. A skill does not copy these rules.

## Layout

- `plugin.json` is only in `.claude-plugin/`. All component folders are at the plugin root.
- Use kebab-case for all file and folder names.
- A skill is `skills/<name>/SKILL.md`. Put details in `references/`, templates in `templates/`, and scripts in `scripts/`.
- Do not add a `commands/` folder. Claude Code shows each skill as a slash command.

## Paths and configuration

- In a skill, refer to its own files with `${CLAUDE_SKILL_DIR}`. Refer to plugin root files with `${CLAUDE_PLUGIN_ROOT}`. Do not write an absolute path.
- The configuration has three levels. Each level replaces the keys of the level before it:
  1. `devkit.config.json` at the plugin root: the default values.
  2. `devkit.config.json` at the project root: the project values (for example, `vaultPath`, `repo`, `standardsPath`).
  3. `~/.config/agentic-devkit/config.json`: the values for the user (for example, `steSpecPdf`).
- Keep secrets and licensed files out of all repositories.

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

## Writing

- Write all Markdown in STE. Use the `ste-writing` skill.
- Use the terms in `CONTEXT.md` with no change.
- Use the terms of the code host in all templates. For GitHub, write "pull request" or "PR".

## Questions to the user

- Ask one question at a time. Use the `AskUserQuestion` tool.
- Put your recommended option first, and add "(Recommended)" to its label.
- Before you ask, look for the answer in the code and the documents. Ask the user only for a decision.

## Sub-agents

- A sub-agent does not get your context. Give it each file path that it must read.
- A reviewer sub-agent is blind. It gets the diff, the requirements, and its rule files. It does not get the log, the PR draft, or your reasoning.

## Git

- Do not push to the default branch. Send each change as a PR.
- For a rewrite of documents, make one commit for each file.

## Rule candidates

- A review can find a mistake that no standards rule covers. Record it in `<standardsPath>/_candidates.md` with the date, the PR link, and one line that describes it.
- If the same mistake occurs a second time, make it a rule in the applicable standards file. Write the rule in STE, with `Why:` and a source link. Record this change in the Progress section of the PR.

## Release checklist

For each new or changed skill:

1. Add or update the skill in `README.md`.
2. Increase `version` in `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`.
3. Add an entry to `CHANGELOG.md`.
4. If the skill adapts work from a different project, update `NOTICE.md`.
