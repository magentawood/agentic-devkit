# agentic-devkit — context index

Each agent session loads this file. It is an index: it tells you what agentic-devkit is, where each fact lives, and what to read before a task. It holds no reasoning. **When your task touches an area in the routing table, read the files for that area before you act.**

**Owner:** Yash Mangal · **Org:** magentawood · **Limit:** 1,500 tokens (`doc-budget`)

## What agentic-devkit is

- A Claude Code plugin with skills to build and ship products: `/build-feature`, `ste-writing`, `doc-architecture`, `/doc-management`, and `/blog`.
- This repo is also a project. Its docs obey the docs architecture. It holds the master copy of each docs tool, so it has no tool copies.
- The `/build-feature` POC on Roomsie T-02 finalized the stage references. The ticket stage stays a draft. The next milestone: a run on a new feature, which proves the ticket stage.

## Decisions

Each decision has one record in `docs/decisions/`: ADRs (`NNNN-slug.md`). This repo has no product records. The record is the only home of the decision and its reasons. Cite it as `ADR-0006`.

<!-- decisions:start -->
**Not settled yet:** none.

**All decisions:** architecture in [tech-ledger.md](docs/tech-ledger.md). Each links its record.
<!-- decisions:end -->

## Routing: read before you act

| When your task touches… | Read first |
|---|---|
| Any skill: add or change | [CONVENTIONS.md](CONVENTIONS.md), then the `SKILL.md` and the references of the skill, [ADR-0001](docs/decisions/0001-plugin-layout-and-skill-format.md), [ADR-0002](docs/decisions/0002-skill-types-and-the-call-rule.md) |
| Terms | [docs/glossary.md](docs/glossary.md) |
| Any Markdown | [ste-writing](skills/ste-writing/SKILL.md) and [doc-architecture](skills/doc-architecture/SKILL.md) |
| STE rules, `ste-lint`, `ste-verify` | [ste-rules.md](skills/ste-writing/references/ste-rules.md), [rewrite.md](skills/ste-writing/references/rewrite.md), [ADR-0014](docs/decisions/0014-ste-for-all-markdown.md), [ADR-0015](docs/decisions/0015-ste-rewrite-keeps-each-claim.md) |
| A script, the configuration, the defaults | [devkit.defaults.json](defaults/devkit.defaults.json), [devkit.config.json](devkit.config.json), [ADR-0003](docs/decisions/0003-three-configuration-levels.md) |
| A docs tool, the hook, CI, `sync-tools` | [architecture.md](skills/doc-architecture/references/architecture.md), [setup.md](skills/doc-management/references/setup.md), [check.md](skills/doc-management/references/check.md), [ADR-0019](docs/decisions/0019-master-tools-and-tool-copies.md), [ADR-0020](docs/decisions/0020-hook-activation-and-plugin-recommendation.md) |
| The docs architecture, limits | [architecture.md](skills/doc-architecture/references/architecture.md), [ADR-0017](docs/decisions/0017-the-docs-architecture.md), [ADR-0018](docs/decisions/0018-size-limits-and-the-context-budget.md) |
| A `/doc-management` run | [doc-management](skills/doc-management/SKILL.md), [migrate.md](skills/doc-management/references/migrate.md), [lessons.md](skills/doc-management/references/lessons.md), [ADR-0022](docs/decisions/0022-the-migrate-pipeline.md) |
| `/build-feature` | [build-feature](skills/build-feature/SKILL.md), [docs/specs/build-feature.md](docs/specs/build-feature.md), [ADR-0005](docs/decisions/0005-build-feature-pipeline-and-entry-points.md) to [ADR-0013](docs/decisions/0013-project-coding-standards.md), [ADR-0026](docs/decisions/0026-rebuild-the-plan-in-the-pr.md) |
| `/blog` | [blog](skills/blog/SKILL.md), [post-format.md](skills/blog/references/post-format.md) |
| A release | [CONVENTIONS.md](CONVENTIONS.md#release-checklist), [CHANGELOG.md](CHANGELOG.md), [NOTICE.md](NOTICE.md) |

## Where things live

- **Skills:** `skills/<name>/`, with `SKILL.md`, `references/`, `templates/`, and `scripts/`.
- **Master docs tools:** `skills/doc-architecture/scripts/` and `templates/`. `sync-tools` is in `skills/doc-management/scripts/`.
- **Decision ledger:** `skills/doc-architecture/scripts/build-decision-ledger` writes the list in this file and [docs/tech-ledger.md](docs/tech-ledger.md) from the records.
- **Configuration:** the plugin defaults in `defaults/devkit.defaults.json`, the project values of this repo in `devkit.config.json`, and the user values in `~/.config/agentic-devkit/config.json`.
- **Specs:** `docs/specs/`. A spec moves to `docs/archive/` when its feature is complete.
- **The plan:** this repo has no plan system. The open work of a skill is in its spec.
- **Hook and CI:** `.githooks/pre-commit` calls the master tools. CI runs it with `DOCS_CHECK_ALL=1`.
- **History:** `docs/journal/` (one file for each month, append only) and `docs/archive/`.

## Conventions

- **Never push to `main`.** Each change goes in through a pull request. Merge with rebase-merge.
- In a docs rewrite or a docs migration, make one commit for each file.
- Write all Markdown in STE with the `ste-writing` skill. The `doc-architecture` skill guards each doc change.
- One fact, one home. Link to it. Do not copy it. When a decision changes, update its record and remove the replaced text.
- Never commit the ASD-STE100 specification or the dictionary cache. ASD owns them.
- Keep each doc inside its limit. The hook turns on in each Claude Code session. If the hook does not run, run `git config core.hooksPath .githooks` one time.
