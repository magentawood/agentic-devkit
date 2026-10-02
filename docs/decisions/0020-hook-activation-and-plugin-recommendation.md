# 0020 — sync-tools turns on the hook and recommends the plugin

**Status:** Accepted · **Date:** 2026-10-01 (hook activation, plugin recommendation), 2026-10-02 (husky) · **Deciders:** Yash Mangal

## Context

Git never runs the hooks of a clone by itself. A hook that is not on does not stop a bad commit. Some projects use husky, which owns `core.hooksPath`. People who open a project in Claude Code also need the plugin.

## Decision

**In one line:** `sync-tools` turns on the hook in the clone, the `prepare` script, and `SessionStart`, or only in `.husky/pre-commit`, and recommends the plugin.

These rules apply with the `hook` part on.

**Without husky,** `sync-tools` turns on the hook in three ways. It merges each change with the values that are there. It never overwrites them.

- `git config core.hooksPath .githooks` in this clone.
- `scripts.prepare` in the root `package.json`: it adds the command after a `prepare` that exists, with `&&`. It does not change a `prepare` that uses husky or sets `core.hooksPath`. Then it tells you to ask the user.
- A `SessionStart` hook in `.claude/settings.json`: `cd "$CLAUDE_PROJECT_DIR" && git config core.hooksPath .githooks`.
- The index keeps a one-line fallback: "If the hook does not run, run `git config core.hooksPath .githooks` one time."

**With husky,** `sync-tools` does not change `core.hooksPath`, `scripts.prepare`, or the `SessionStart` hook. It adds the line `sh .githooks/pre-commit` to `.husky/pre-commit` one time, and it touches nothing else. If the file does not exist, it makes the file, executable. `.githooks/pre-commit` stays the only home of the checks.

**Plugin recommendation:** `sync-tools --recommend-plugin` adds `extraKnownMarketplaces` (`agentic-devkit`, GitHub `magentawood/agentic-devkit`) and `enabledPlugins` (`agentic-devkit@agentic-devkit`) to `.claude/settings.json`. It keeps a value that is there, also `false`. `setup` uses this option. The recommendation applies with and without husky.

`sync-tools --check`, `check.md`, and `doc-architecture` report a hook that is not on.

## Rationale

- Each install with npm, pnpm, or yarn runs `prepare`, and each Claude Code session runs `SessionStart`. Thus each clone turns on the hook.
- Husky owns `core.hooksPath`. Two hook folders are in conflict.
- Claude Code offers the plugin to each person who opens the project, after the person trusts the folder.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Tell each developer to run `git config core.hooksPath .githooks` | Git never runs the hooks of a clone by itself. The command stays only as the fallback. |
| Change `core.hooksPath` in a husky project | Husky owns it. |

## Consequences

- A husky project runs the checks through `.husky/pre-commit`. Its index does not get the fallback line.

## Revisit when

- None recorded.

## Sources

- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6), comment "Changes from the decisions of 2026-10-01", item 3, and the husky comment of 2026-10-02.
- [setup.md](../../skills/doc-management/references/setup.md), steps 9 and 10.
