# 0019 — Master tools in the plugin, tool copies in each project

**Status:** Accepted · **Date:** 2026-09-30 (master and copies), 2026-10-02 (CI and `check --sync`, from the brief for this migration) · **Deciders:** Yash Mangal

## Context

The cheap checks must run in the hook and in CI of each project. CI and some developers do not have the plugin. The master tools change, so a project copy can become older than the master.

## Decision

**In one line:** The plugin holds the master tools, each project runs its own copies, and `check --sync` updates the older copies through a PR.

- The master tools: `doc-budget`, `doc-links`, `build-decision-ledger`, `render-docs`, the hook template, the CI template, and the defaults file.
- `sync-tools` copies them to `tools/`, `.githooks/`, and `.github/workflows/` of the project. It records the plugin version and the hash of each copy in `docArchitecture`.
- Each tool has a `TOOL_VERSION` line. Never edit a project copy. Change the master, then run `/doc-management check --sync`.
- The hook and CI run only the cheap checks. These are limits, links, ledger drift, render drift, and the hashes of the tool copies. CI runs only the copies in the project. It never fetches the plugin.
- `/doc-management check` runs `sync-tools --check`. It reports each copy that is older than the master or not the same.
- `/doc-management check --sync` refreshes the copies on a branch and opens a PR.
- Nothing runs on a schedule. The user starts each check.

## Rationale

- With the copies in the project, CI and developers without the plugin can run the tools.
- The hook and CI do not have the plugin, so they cannot compare a copy with the master. Only `sync-tools --check` can.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| CI fetches the plugin and runs the master tools | The user decided that CI runs only the copies in the project. |
| A hook check for copies older than the master | The hook does not have the plugin. |

## Consequences

- A project can have older copies until the user runs `check --sync`.
- The plugin repo holds the masters, so it gets no tool copies. Its hook calls the master scripts (the brief for this migration).

## Revisit when

- None recorded.

## Sources

- [doc-management PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management.md), "doc-management (user-invoked)", `check`, and "Tools: master copy plus project copies" (2026-09-30).
- [doc-management notes](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management-notes.md), "Open questions for the PRD grill" (scaffold the tools, or call them from the plugin).
- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6), description, "Review", "Rejected" (the hook cannot see an old copy).
- User decision, in the brief for this migration (2026-10-02): CI runs only the copied tools and never fetches the plugin. `check` reports older copies, and `check --sync` updates them through a PR. The plugin repo does not copy its own tools.
