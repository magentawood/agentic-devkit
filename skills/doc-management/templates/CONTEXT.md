<!-- The index of the project. CLAUDE.md imports it. Limit: 1,500 tokens. It holds no reasoning. Write it in STE. Replace each <...>. -->

# <project> — context index

Each agent session loads this file. It is an index: it tells you what <project> is, where each fact lives, and what to read before a task. **When your task touches an area in the routing table, read the files for that area before you act.**

**Owner:** <name> · **Limit:** 1,500 tokens (`doc-budget`)

## What <project> is

- <What the product does, for whom, in one line.>
- <The scope of this version.>
- <The launch date or the next milestone, with its record.>

## Decisions

Each decision has one record in `docs/decisions/`: ADRs (architecture, `NNNN-slug.md`) and product records (`pd-NN-slug.md`). The record is the only home of the decision and its reasons. Cite it as `ADR-0006` or `PD7a`.

<!-- decisions:start -->
<!-- decisions:end -->

## Routing: read before you act

| When your task touches… | Read first |
|---|---|
| Any task | Its task note and its "Read first" list |
| Terms | <the glossary, for example `docs/glossary.md`> |
| Code: write or review | <the standards index> |
| <an area> | <the records and the working doc of the area> |

## Where things live

- **The plan:** <the one file where you edit the plan, and its generator>.
- **Decision ledgers:** `python3 tools/build-decision-ledger.py` writes the list in this file and the ledgers from the records.
- **Specs:** `docs/specs/`. A spec moves to `docs/archive/` when its feature is complete.
- **Learn pages:** `docs/learn/`, one page for each concept. The Learn index is in <the tech ledger>.
- **Browser pages:** `python3 tools/render-docs.py` writes each `.html` from its `.md`.
- **History:** `docs/journal/` (one file for each month, append only) and `docs/archive/`.

## Conventions

- **Never push to the default branch.** Each change goes in through a pull request.
- Write all Markdown in STE with the `ste-writing` skill. The `doc-architecture` skill guards each doc change.
- One fact, one home. Link to it. Do not copy it. When a decision changes, update its record and remove the replaced text.
- Keep each doc inside its limit. The hook turns on in each Claude Code session, and at each package install. If the hook does not run, run `git config core.hooksPath .githooks` one time.
