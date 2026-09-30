<!-- The README of the decisions folder. Write it in STE. Replace each <...>. -->

# Decision records

Each decision has one record in this folder. The record is the only home of the decision and its reasons. Working docs give the rule and a `Why:` link to the record.

## Names

| Kind | File | Cited as | Template |
|---|---|---|---|
| Architecture record (ADR) | `NNNN-slug.md` | `ADR-0006` | `adr.md` of the `doc-management` skill |
| Product record (PD) | `pd-NN[a]-slug.md` | `PD7a` | `pd.md` of the `doc-management` skill |

## Format

Each record has these sections, in this order: Context, Decision (its first line is `**In one line:**`), Rationale, Alternatives rejected, Consequences, Revisit when, Sources. At most 1,200 words.

## Lists of decisions

Do not copy the list of records here. `python3 tools/build-decision-ledger.py` generates it from the records:

- Product records: <a link to the file in `docArchitecture.ledgers.product`>
- Architecture records: <a link to the file in `docArchitecture.ledgers.tech`>
- Decisions that are not settled: the index, `CONTEXT.md`

## Rules

- When a new decision replaces an older one, update the older record: set its status to `Superseded by <ID>`. The new record marks each older statement "Superseded:" with a link.
- When two sources conflict, the most recent record wins.
