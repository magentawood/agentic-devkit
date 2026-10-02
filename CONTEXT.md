# agentic-devkit — context index

Each agent session loads this file. It is an index: it tells you what agentic-devkit is, where each fact lives, and what to read before a task. It holds no reasoning. **When your task touches an area in the routing table, read the files for that area before you act.**

**Owner:** Yash Mangal · **Org:** magentawood · **Limit:** 1,500 tokens (`doc-budget`)

## What agentic-devkit is

- A Claude Code plugin with skills to build and ship products: `/build-feature`, `ste-writing`, `doc-architecture`, `/doc-management`, and `/blog`.
- This repo is also a project. Its docs obey the docs architecture. It holds the master copy of each docs tool, so it has no tool copies.
- The next milestone: the `/build-feature` POC on one Roomsie ticket. The POC finalizes the stage references.

## Decisions

Each decision has one record in `docs/decisions/`: ADRs (`NNNN-slug.md`). This repo has no product records. The record is the only home of the decision and its reasons. Cite it as `ADR-0006`.

<!-- decisions:start -->
<!-- decisions:end -->

## Routing: read before you act

| When your task touches… | Read first |
|---|---|
| Any skill: add or change | [CONVENTIONS.md](CONVENTIONS.md), then the `SKILL.md` and the references of the skill |
| Terms | [docs/glossary.md](docs/glossary.md) |
| Any Markdown | [ste-writing](skills/ste-writing/SKILL.md) and [doc-architecture](skills/doc-architecture/SKILL.md) |
| STE rules, `ste-lint`, `ste-verify` | [ste-rules.md](skills/ste-writing/references/ste-rules.md), [rewrite.md](skills/ste-writing/references/rewrite.md) |
| A script, the configuration, the defaults | [devkit.defaults.json](defaults/devkit.defaults.json), [devkit.config.json](devkit.config.json), [architecture.md](skills/doc-architecture/references/architecture.md) |
| A docs tool, the hook, CI, `sync-tools` | [architecture.md](skills/doc-architecture/references/architecture.md), [setup.md](skills/doc-management/references/setup.md), [check.md](skills/doc-management/references/check.md) |
| A `/doc-management` run | [doc-management](skills/doc-management/SKILL.md), [migrate.md](skills/doc-management/references/migrate.md), [lessons.md](skills/doc-management/references/lessons.md) |
| `/build-feature` | [build-feature](skills/build-feature/SKILL.md), [docs/prd/build-feature.md](docs/prd/build-feature.md) |
| `/blog` | [blog](skills/blog/SKILL.md), [post-format.md](skills/blog/references/post-format.md) |
| A release | [CONVENTIONS.md](CONVENTIONS.md#release-checklist), [CHANGELOG.md](CHANGELOG.md), [NOTICE.md](NOTICE.md) |

## Where things live

- **Skills:** `skills/<name>/`, with `SKILL.md`, `references/`, `templates/`, and `scripts/`.
- **Master docs tools:** `skills/doc-architecture/scripts/` and `templates/`. `sync-tools` is in `skills/doc-management/scripts/`.
- **Configuration:** the plugin defaults in `defaults/devkit.defaults.json`, the project values of this repo in `devkit.config.json`, and the user values in `~/.config/agentic-devkit/config.json`.
- **The plan:** this repo has no plan system. The open work of a skill is in its spec or PRD.
- **History:** `docs/journal/` (one file for each month, append only) and `docs/archive/`.

## Conventions

- **Never push to `main`.** Each change goes in through a pull request. Merge with rebase-merge.
- In a docs rewrite or a docs migration, make one commit for each file.
- Write all Markdown in STE with the `ste-writing` skill. The `doc-architecture` skill guards each doc change.
- One fact, one home. Link to it. Do not copy it. When a decision changes, update its record and remove the replaced text.
- Never commit the ASD-STE100 specification or the dictionary cache. ASD owns them.
- Keep each doc inside its limit.
