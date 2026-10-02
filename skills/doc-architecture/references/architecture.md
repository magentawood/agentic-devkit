# The docs architecture

Each project uses this architecture from the first day. It has two aims, in this order:

1. Keep the agent context window free for work on code. The docs must not grow without limit.
2. Make the docs easy to read, so that agents and humans are not confused.

All parts are on by default. A project turns a part off in `docArchitecture.parts` of its own `devkit.config.json`. The skills do not decide that for the project. The config keys in this file are in `docArchitecture`. Two keys are at the top level, because `build-feature` also uses them: `decisionsPath` and `journalPath`.

## Index

- The index is `indexFile` (default `CONTEXT.md`). `CLAUDE.md` imports it, so each session loads it.
- Limit: 1,500 tokens.
- It holds these sections and nothing more:
  - What the project is, in two to five lines.
  - The decisions that are not settled. The ledger generator writes this list between `<!-- decisions:start -->` and `<!-- decisions:end -->`.
  - A routing table: "When your task touches X, read Y first". Add a row when a new area appears.
  - Where things live: the plan, the ledgers, the generated pages, the history.
  - The conventions.
- It holds no reasoning and no glossary. A routing row links the glossary, for example `docs/glossary.md`. It never links the journal or the archive.

## Decision records

A decision record is the only home of the reasoning for a decision.

| Kind | File in `decisionsPath` | Cited as |
|---|---|---|
| Architecture record (ADR) | `NNNN-slug.md`, for example `0006-drizzle.md` | `ADR-0006` |
| Product record (PD) | `pd-NN[a]-slug.md`, for example `pd-07a-agent-architecture.md` | `PD7a` |

Both kinds use one format, in this order:

1. `# NNNN — <title>` (ADR) or `# PDNa — <title>` (PD), then `**Status:** <status> · **Date:** <date>`. The ledger reads the first word of the status. The statuses in `settledStatuses` (default "Settled", "Accepted", and "Superseded") show a settled decision.
2. `## Context`
3. `## Decision`. Its first line is `**In one line:** <summary>`. The ledgers show this line.
4. `## Rationale`
5. `## Alternatives rejected`
6. `## Consequences`
7. `## Revisit when`
8. `## Sources`

A record is at most 1,200 words. Write a record only for a decision with three properties. It is hard to change. A reader cannot understand it without the reason. It comes from a trade-off.

## Working docs

- A working doc holds rules only.
- Each section that has a reason gets one link line to its record: `Why: [PD7a](decisions/pd-07a-agent-architecture.md)`.
- If a record does not have the reasoning, move the reasoning into the record. Do not keep it in the working doc.
- Limit: 1,200 words. Research docs: 1,500 words.

## Ledgers

- The ledger generator makes the ledgers from the records. Never edit them by hand.
- `ledgers.product` lists the product records. `ledgers.tech` lists the architecture records. Each ledger has one table between `<!-- ledger:start -->` and `<!-- ledger:end -->`: ID, title, status, "In one line".
- After each new or changed record, run `build-decision-ledger`. `--check` fails when a ledger is out of date.
- Do not write a summary of the records in a different doc. A copied summary drifts. Generate it.

## Specs

- A spec is `<specPath>/<feature>.md` (default `docs/specs/`). Make it from the one spec template, [../templates/spec.md](../templates/spec.md).
- It holds the rules and the acceptance criteria. It links the records for the reasons. It does not copy them.
- Limit: 1,200 words.
- When the feature is complete, move the spec to `archivePath` (default `docs/archive/`).

## Learn pages

- A learn page explains one concept, for example a database driver, for a teammate who was not in the grill. It is `<learnPath>/<topic>.md` (default `docs/learn/`), from [../templates/learn.md](../templates/learn.md). Limit: 1,200 words.
- Concepts live in learn pages. Decisions and their reasons live in records. A learn page links the record of each choice. It never gives the reasons as a decision.
- One topic, one page. When a subsequent ticket adds to a topic, update its page.
- Each page has a `**In one line:**` line. The ledger generator writes the Learn index from these lines, between `<!-- learn:start -->` and `<!-- learn:end -->` in `learnIndex` (default the file of `ledgers.tech`, else the index). It runs when the `learnPath` folder exists, and adds missing markers at the end of the file.
- To render the pages, add `<learnPath>/*.md` to `renderPages`.

Why: [ADR-0025](../../../docs/decisions/0025-learn-pages.md)

## Plan

- The plan has one home, which the project config gives (`plan`).
- Docs link to the plan. They never copy task lists, dates, or owners from it.

## History

- The journal is `journalPath` (default `docs/journal/YYYY-MM.md`), one file for each month. Add entries only at the end.
- Replaced docs go to `archivePath`.
- The limits do not apply to the journal and the archive. The index never links them.

## HTML

- Markdown is the source. `render-docs` makes an `.html` page next to each Markdown file in `renderPages`. An entry can be a glob, for example `docs/learn/*.md`.
- Headings get GitHub-style anchors, so one link works on GitHub, in Obsidian, and in the HTML. A folded callout (`> [!note]- Why`) becomes a `<details>` box.
- `--check` fails when a page is out of date. Edit the Markdown, never the HTML.

## Limits

`doc-budget` reads `docBudget`: first the plugin defaults (`defaults/devkit.defaults.json`), then the project `devkit.config.json`. The first rule that matches a file applies.

| Files | Limit |
|---|---|
| The index (`CONTEXT.md`) | 1,500 tokens |
| Records (`**/decisions/*.md`) | 1,200 words |
| Research (`**/research/*.md`) | 1,500 words |
| Specs (`**/specs/*.md`) | 1,200 words |
| All other Markdown | 1,200 words |
| Journal and archive | no limit (excluded) |

An entry in `docBudget.overrides` is a ceiling for one file that is above its rule. It can only shrink: `doc-budget --staged` in the hook fails when an override grows. A reviewer sees it in the PR.

A project `docBudget.rules` list replaces the full default list. If a project changes `indexFile`, copy the full default list and change only the glob of the index rule.

When a file is above its limit, do one of these: divide it by topic, move the reasoning into its record, or remove replaced text.

## Rules

- **One fact, one home.** Other docs link to the home. They do not copy it.
- **Update, do not append.** When a new decision replaces text, update or remove the replaced text.
- **The most recent record wins.** When two sources conflict, the most recent decision record wins. That record marks the older statement "Superseded:" with a link.
- **Keep headings with no change.** Links and anchors point at them.
- **Generated files:** edit the source, then run the generator.
- **Agent files that a tool writes** are a drift source: a second home for the agent rules. Turn them off, for example Turborepo `AGENTS.md` with `agentGuidance: false`.

## Tools

The plugin holds the master copy of each tool in `scripts/` and `templates/` of this skill. `/doc-management setup` copies them into the project, so CI and developers without the plugin can run them.

| Tool | Project copy | Check |
|---|---|---|
| `doc-budget` | `tools/doc-budget.py` | The size limits |
| `doc-links` | `tools/doc-links.py` | 0 broken links and anchors |
| `build-decision-ledger` | `tools/build-decision-ledger.py` | Ledger and Learn index drift (`--check`) |
| `render-docs` | `tools/render-docs.py` | Render drift (`--check`) |
| `templates/pre-commit` | `.githooks/pre-commit` | Runs all checks above, and the hashes of the tool copies |
| `templates/docs-check.yml` | `.github/workflows/docs-check.yml` | Runs the hook in CI |
| `defaults/devkit.defaults.json` of the plugin | `tools/devkit-defaults.json` | The defaults for the tool copies |

Git never runs the hooks of a clone by itself. `sync-tools` turns on the hook in the clone, in the `prepare` script of `package.json`, and in a `SessionStart` hook in `.claude/settings.json`. Each tool has a `TOOL_VERSION` line. Never edit a project copy. Change the master, then run `/doc-management check --sync`.
