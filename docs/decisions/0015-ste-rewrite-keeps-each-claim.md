# 0015 — An STE rewrite keeps each claim, with blind claim checks

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

A rewrite of a document into STE can lose a claim, or make a claim weaker. The first Roomsie rewrite batches showed the two problems.

## Decision

**In one line:** An STE rewrite keeps the strength of each claim, and a blind claim check proves that no claim is missing.

- Rewrite one file in one commit.
- A sub-agent that gets only the file before the rewrite writes the claim inventory.
- After the rewrite, `ste-verify diff` proves that all links, anchors, headings, code, identifiers, and numbers stay.
- A blind sub-agent gets only the claim list and the new file. For each claim, it gives `present`, `weakened`, or `missing`, and it lists each `added` statement. Fix each item, then check the fixed claims one more time.
- Keep absolute words ("never", "always", "only", "at most") and certainty words ("is moving to", "if at all possible").
- Keep a word that has no approved STE word with the same meaning (for example "genuine", "real", "already"), and give the reason.
- Set no target length.
- Before you fix a `weakened` or `added` item, compare with the file before the rewrite.
- The claim check is blind, so the rewrite does not need a different writer.
- If the claim check shows missing claims after two rounds, stop the rewrite of that file. Keep the file as it was before the rewrite, and tell the user.

## Rationale

- "Do not" in place of "never" makes a statement of fact weaker. The blind checks found this again and again.
- The claim inventory can miss a statement, or state a claim more strongly than the file. Many flags were errors in the inventory.
- STE adds articles and short sentences. In Roomsie, STE made the docs about 9% longer.
- In Roomsie, the procedure kept all of about 7,100 claims, and it caught about 100 drifts.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Change "never" to "do not", as STE prefers | It makes the claim weaker. |
| A target length for the rewrite | Dense text frequently becomes longer in STE. |
| A different agent for the rewrite | The claim check is blind, so it does not need a different writer. |

## Consequences

- `ste-lint` reports "never" as a word that is not approved. The writer keeps it, because meaning is more important than a lint finding.
- `ste-lint` checks table cells and the text in blockquotes and callouts.

## Revisit when

- None recorded.

## Sources

- [PR #2](https://github.com/magentawood/agentic-devkit/pull/2) and `CHANGELOG.md` 0.2.1 (2026-09-30).
- [rewrite.md](../../skills/ste-writing/references/rewrite.md).
- [doc-management notes](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management-notes.md), "The pipeline we ran" step 4, and "Lessons".
- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6), "Review", "Rejected" (no second writer).
- [lessons.md](../../skills/doc-management/references/lessons.md), "Rewrites".
- Superseded: the doc-management notes give "a rewrite by a second" agent. PR #6 keeps one writer, because the claim check is blind.
