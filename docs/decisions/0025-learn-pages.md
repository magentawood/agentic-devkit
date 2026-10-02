# 0025 — Learn pages: one page for each concept, with a generated index

**Status:** Accepted · **Date:** 2026-10-03 · **Deciders:** Yash Mangal

## Context

Each ticket teaches the team technical concepts. In the Roomsie T-02 POC, the agent explained five concepts to the user:

- What a Postgres driver is, and why we use postgres.js.
- Local development with Docker and `db:up`.
- A bundle for a Docker image.
- OpenAPI from Zod.
- pnpm through Corepack.

These explanations stayed in the session of one person. The decision records hold the reasons for a choice, not an explanation of the concept for a new teammate.

## Decision

**In one line:** Each concept that a ticket explains gets one learn page, and the ledger generator lists the pages in a Learn index.

- A learn page is `<learnPath>/<topic>.md` (default `docs/learn/`), from the template `skills/doc-architecture/templates/learn.md`. One page for each topic, at most 1,200 words.
- It is for a teammate who was not in the grill, in plain language. It tells what the concept is, how it fits the project, the choice we made, and the gotchas.
- When a subsequent ticket adds to a topic, it updates the page. It does not make a second page.
- A learn page links the decision record, or the PR of the ticket, for each choice. It does not give the reasons as a decision. The record stays the only home of the reasons.
- Each page has a `**In one line:**` line. `build-decision-ledger` writes the Learn index between `<!-- learn:start -->` and `<!-- learn:end -->` in `docArchitecture.learnIndex`. The default is the file of `ledgers.tech`. `--check` fails when the index is out of date.
- `render-docs` accepts a glob in `renderPages`, for example `docs/learn/*.md`.
- `/build-feature` writes or updates the learn pages at the PR stage. The `## Log` entry and the PR link them.
- The part `learn` in `docArchitecture.parts` is on by default.

## Rationale

- The user decided this design on 2026-10-03, after the T-02 POC.
- A teammate can read the concepts of each ticket without the session of the implementer.
- With one page for each topic, two pages cannot give different explanations of one concept.
- The index comes from the pages, so it cannot drift. The ledger generator already writes generated lists. `sync-tools` already copies it, and the hook and CI already run it. One more block in that script is smaller than a new tool.
- A glob in `renderPages` keeps the configuration of each project the same, and needs no new key.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Put the explanations in the decision records | A record holds the reasons for one decision. A concept can relate to many records, and the records become long. |
| One learn page for each ticket | The same concept appears in many tickets, so the pages repeat and drift. |
| A new generator script for the index | It needs a new copy in `sync-tools`, the hook, and CI. The ledger generator already does all three. |
| `render-docs` renders each page in `learnPath` automatically | It changes the pages of a project that does not want them. A glob is opt-in. |

## Consequences

- Each project gets `docs/learn/` and a Learn section at the end of its tech ledger.
- A PR of `/build-feature` has more docs. The learn pages obey the size limits.
- `build-decision-ledger` 0.2.0 and `render-docs` 0.2.0. Each project runs `/doc-management check --sync`.

## Revisit when

- The learn pages become too many for one index, or a team wants a different home for them.

## Sources

- User decision, 2026-10-03.
- [Roomsie PR #94](https://github.com/magentawood/roomsie/pull/94): the T-02 POC.
