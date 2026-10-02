# Decision records

Each decision has one record in this folder. The record is the only home of the decision and its reasons. Working docs give the rule and a `Why:` link to the record.

## Names

| Kind | File | Cited as | Template |
|---|---|---|---|
| Architecture record (ADR) | `NNNN-slug.md` | `ADR-0006` | [adr.md](../../skills/doc-management/templates/adr.md) |

This repo has no product records. `productRecords` is off in [devkit.config.json](../../devkit.config.json).

## Format

Each record has these sections, in this order: Context, Decision (its first line is `**In one line:**`), Rationale, Alternatives rejected, Consequences, Revisit when, Sources. At most 1,200 words.

## Lists of decisions

Do not copy the list of records here. `skills/doc-architecture/scripts/build-decision-ledger` generates it from the records:

- Architecture records: [docs/tech-ledger.md](../tech-ledger.md)
- Decisions that are not settled: the index, [CONTEXT.md](../../CONTEXT.md)

## Rules

- When a new decision replaces an older one, update the older record: set its status to `Superseded by <ID>`. The new record marks each older statement "Superseded:" with a link.
- When two sources conflict, the most recent record wins.
