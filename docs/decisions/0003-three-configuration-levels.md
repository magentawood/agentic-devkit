# 0003 — Three configuration levels and the defaults file

**Status:** Accepted · **Date:** 2026-09-30 (the three levels), 2026-10-01 (the defaults file) · **Deciders:** Yash Mangal

## Context

The skills and scripts need default values, project values, and values for one user. The plugin repo is also a project, so its own values must not mix with the generic defaults. The tool copies in a project do not have the plugin.

## Decision

**In one line:** The configuration has three levels, `defaults/devkit.defaults.json`, the project `devkit.config.json`, and the user file, and each level replaces the level before it.

1. `defaults/devkit.defaults.json` in the plugin: the generic default values.
2. `devkit.config.json` at the project root: the project values, for example `repo`, `vaultPath`, `standardsPath`, `decisionsPath`, the plan scripts, `ste.spelling`, and `docBudget`. The root `devkit.config.json` of the plugin repo holds only the project values of the plugin repo.
3. `~/.config/agentic-devkit/config.json`: the values for one user, for example `steSpecPdf`. `ste-lint`, `issue-status`, and `tick` read this level.

- These scripts read the defaults file, then the project file: `doc-budget`, `build-decision-ledger`, `render-docs`, `sync-tools`, `ste-lint`, `issue-status`, and `tick`. `doc-links` and `ste-verify` read no configuration.
- `sync-tools` copies the defaults file, with no change, to `tools/devkit-defaults.json` in a project. The tool copies read it, so they work without the plugin.
- Secrets and licensed files stay out of all repositories.

## Rationale

- Each project has its own values, for example British spelling in Roomsie. The project file wins, so other projects can be different.
- The sources give no reason for a defaults file of its own.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| The generic defaults in the root `devkit.config.json` of the plugin | The decision of 2026-10-01 replaced it. The sources give no reason. |

## Consequences

- The plugin repo can have its own limits, parts, and paths, and other projects do not get them.
- A script that reads the user level reads it last. The last level wins.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part B "Config" (2026-09-30).
- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6), comment "Changes from the decisions of 2026-10-01", item 1, and the "Review" section of the description (the leak of plugin repo values into `devkit-defaults.json`).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Paths and configuration".
- Superseded: Part B "Config" says that the plugin `devkit.config.json` holds the generic defaults. The decision of 2026-10-01 moves them to `defaults/devkit.defaults.json`.
