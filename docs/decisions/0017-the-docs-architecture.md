# 0017 — The docs architecture

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

Before the Roomsie cleanup, the always-loaded docs of Roomsie were 5,829 tokens. Reasoning, rules, and summaries were in many files, and copies drifted. The architecture has two aims, in this order:

1. Keep the agent context window free for work on code. The docs must not grow without limit.
2. Make the docs easy to read, so that agents and humans are not confused.

## Decision

**In one line:** Each project has an index, records as the only home of reasoning, working docs with `Why:` links, generated ledgers, specs, and history.

- **Parts:** all parts are on by default: `index`, `records`, `productRecords`, `ledgers`, `specs`, `journal`, `archive`, `html`, `hook`, `ci`. A project turns a part off in its own `devkit.config.json`. The skills do not decide that for the project.
- **Index:** `CONTEXT.md`, which `CLAUDE.md` imports. It holds these sections:
  - What the project is.
  - The generated list of decisions that are not settled.
  - A routing table: "when your task touches X, read Y first".
  - Where things live, and the conventions. It holds no reasoning, and it never links the journal or the archive.
- **Decision records:** architecture records `NNNN-slug.md` (`ADR-0006`) and product records `pd-NN[a]-slug.md` (`PD7a`) in `decisionsPath`. One format: Context, Decision (with `**In one line:**`), Rationale, Alternatives rejected, Consequences, Revisit when, Sources. Write a record only for a decision with three properties. It is hard to change. A reader cannot understand it without the reason. It comes from a trade-off. The statuses in `settledStatuses` (default Settled, Accepted, Superseded) show a settled decision.
- **Working docs:** rules only, with `Why: [PD7a](…)` links.
- **Ledgers:** generated from the records, with `--check` for drift. The default names are `docs/product-ledger.md` and `docs/tech-ledger.md`.
- **Specs:** `<specPath>/<feature>.md` (default `docs/specs/`): rules and acceptance criteria, with links to the records. When the feature is complete, the spec moves to `archivePath` (default `docs/archive/`).
- **Plan:** one home, which the configuration gives. Docs link to it and never copy task lists.
- **History:** `docs/journal/YYYY-MM.md` (append only) and `docs/archive/`.
- **HTML:** generated from Markdown, with `--check`.
- **Rules:** one fact, one home. Update or remove replaced text, do not append. When two sources conflict, the most recent record wins, and it marks the older statement "Superseded:" with a link.
- `decisionsPath` and `journalPath` stay at the top level of the configuration, because `build-feature` also uses them. The other keys are in `docArchitecture`.

## Rationale

- In Roomsie, the always-loaded index went from 5,829 to 1,302 tokens. All docs went from 59,487 to 59,530 words. The content moved, and all of it stayed.
- Duplicated summaries drift. Roomsie had drift between `product-base.md`, `tech-base.md`, and the records. Thus generate each summary from its source.
- Folded callouts do not save agent tokens. Agents read the raw Markdown. Only structure cuts words: tables, one-line bullets, links, and reasoning that moves into records.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Hand-written summaries of the records | They drift from the records. |
| Different ledger names | The decision of 2026-10-01 kept `docs/product-ledger.md` and `docs/tech-ledger.md`. |

## Consequences

- Each new decision gets a record, and the ledger generator runs after it.
- A project that does not want a part turns it off in its configuration.

## Revisit when

- None recorded.

## Sources

- [doc-management PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management.md), "Goal" and "The architecture (all parts on by default)" (2026-09-30).
- [doc-management notes](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management-notes.md), "What worked: the final structure", "Lessons", and "Numbers from Roomsie".
- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6), comment "Changes from the decisions of 2026-10-01", item 4 (ledger names).
- [architecture.md](../../skills/doc-architecture/references/architecture.md).
- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6), description, "Changes" (`decisionsPath` and `journalPath` at the top level).
