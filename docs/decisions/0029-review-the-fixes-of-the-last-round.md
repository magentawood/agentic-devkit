# 0029 — Review the fixes of the last round

**Status:** Accepted · **Date:** 2026-11-02 · **Deciders:** Niruv Bhardwaj

## Context

[ADR-0009](0009-blind-review-before-the-pr.md) gives a maximum of two review rounds. The implementer fixes the findings of round 2, and then opens the PR. Thus, no reviewer sees the fixes of round 2. The T-02 POC added one more round, but only for a change that the user asks for after the last round. In Roomsie, the agent of one person also reviewed the fixes of round 2. The agents of the other people did not, because no rule told them to do it.

## Decision

**In one line:** three blind reviewers check the fixes of the last round, and the implementer fixes each finding or asks the user.

- The round gets the diff from the last reviewed commit, and the same inputs as each round.
- The round does not count in `reviewRounds`.
- The implementer does not reject a finding of this round. The implementer fixes it, or asks the user. When two reviewers do not agree, the user decides.
- No round comes after this round.
- When the last round gives no code change, this round does not occur.
- A change that the user asks for after the last round gets the same round. A large change is new work, as before.

## Rationale

- A fix is new code. In Roomsie T-11 ([#186](https://github.com/magentawood/roomsie/pull/186)), this round found three problems in the fixes of round 2:
  - A connection that stopped during the body sent the call to the same model again.
  - One bad key gave two error reports.
  - The vendor names were in two places, and the two places did not agree.
- The round reads only the fixes. Thus, it costs less than a full round.
- No round comes after this round. Thus, a rejected finding gets no second check. The user sees each finding that the implementer does not fix.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| `reviewRounds: 3` | A third full round reads the full diff again, and the fixes of round 3 have no review. |
| Disclosure in the PR | A person who reads the PR does not do the work of a blind reviewer. |
| A rule in the docs of each project | Only that project gets it. |

## Consequences

- When the last round gives a code change, the PR lists this round in its "Review" section.
- The user can get more questions at the end of the review.

## Revisit when

- This round finds no problem in many PRs. Then the round can become optional.

## Sources

- User decision, 2026-11-02, after the review of Roomsie T-11 ([#186](https://github.com/magentawood/roomsie/pull/186)) and T-35 ([#185](https://github.com/magentawood/roomsie/pull/185)).
- [review.md](../../skills/build-feature/references/review.md), "The code after the last round".
