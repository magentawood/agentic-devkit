# 0013 — The code standards of a project live in the project

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The Standards reviewer and the implement stage need the code rules of each project, and the pipeline enforces them. The first spec took the Roomsie rules from `docs/tech-base.html`, which no longer exists as a source.

## Decision

**In one line:** The standards are files in the project, from its decision records, with one rule on each line and a `Why:` citation.

- The standards are in the project repo, not in the plugin. `standardsPath` in the project configuration gives the folder.
- Roomsie: extract the standards from the ADRs (`docs/decisions/0001`–`0016`) and the PD records.
- Rule format, one rule on each line: `- <rule>. Why: <one line>. (ADR-0004)`, `(PD7a)`, or `(S1)`, with a link.
- At most about 40 rules in each file, and at most 1,200 words. Write each file in STE.
- A rule that is not resolved gets the mark OPEN. Reviewers do not enforce an OPEN rule.
- Enforce a rule with a tool where possible (ESLint, tsc, a CI check), and mark it `[tool]`. Prose rules exist only for what a tool cannot check.
- Add a new rule only when a decision requires it, or when a review finds the same mistake two times.
- **Rule candidates:** a review records a mistake that no rule covers in `<standardsPath>/_candidates.md`, with the date, the PR link, and one line. On the second occurrence, it becomes a rule in the applicable standards file. Write the rule in STE, with `Why:` and a source link. The PR notes this change in its Progress section.
- Roomsie: the folder is `docs/standards/`, next to `docs/decisions/`. The files are `_index`, `api`, `database`, `web`, `styling`, and `testing`. Do not make `kotlin-kmp.md` before the month-4 mobile work starts, or `analytics.md` before the design of S7. The product name is Roomsie: replace "femmeflats" in all locations.
- Roomsie product decisions are `PD0`…`PD13`, ADRs are `ADR-0012`, schema phases are `S1`…`S7`, and design tasks keep `D-01`….

## Rationale

- `docs/tech-base.md` in Roomsie became a short overview and a ledger that the generator makes from the ADRs. The records are the source of the rules.
- Roomsie renamed `D0`–`D13` to `PD0`–`PD13`, because `D-` was also used for design tasks.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Extract the standards from `docs/tech-base.html` | It no longer exists as a source. |
| Standards inside the plugin | The spec puts them in the project repo, not in the plugin. |

## Consequences

- The Standards reviewer reads all files in `standardsPath` ([ADR-0009](0009-blind-review-before-the-pr.md)).

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §7 "Project coding standards" and §12 "Rule candidates", and Part B "Decision citations and numbering (Roomsie)" and "Context budget" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Rule candidates".
- [migrate.md](../../skills/doc-management/references/migrate.md), stage 2 (the Roomsie rename).
- Superseded: Part A §7 extracts the rules from `docs/tech-base.html`. Part B extracts them from the ADRs and the PD records.
- Superseded: Part A §7 gives the citation `(D<nn>)`. Part B gives `(ADR-0004)`, `(PD7a)`, or `(S1)`.
