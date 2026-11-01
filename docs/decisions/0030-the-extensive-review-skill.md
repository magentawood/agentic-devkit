# 0030 — The `extensive-review` skill

**Status:** Accepted · **Date:** 2026-11-02 · **Deciders:** Niruv Bhardwaj

## Context

The blind review of [ADR-0009](0009-blind-review-before-the-pr.md) and [ADR-0029](0029-review-the-fixes-of-the-last-round.md) ran only inside `/build-feature`. In Roomsie, a person who reviewed the PR of a teammate read the diff by hand, and then merged it. That review had no three reviewers and no round on the fixes. A branch without `/build-feature` had no review.

## Decision

**In one line:** `extensive-review` runs the blind review on any branch or PR, and it can merge the PR of a different person.

- **The name:** `extensive-review`. A person types `/agentic-devkit:extensive-review` or `/extensive-review`.
- **The type:** user-invoked. The skill can post a review and merge a PR, so it runs only when a person starts it.
- **One home for the review rules:** the skill reads `review.md`, `lean-code.md` and `code-comments.md` of `build-feature`. It does not copy them, and it does not call `/build-feature`.
- **The person who runs it makes each pick.** No person has a special role.
- **Own work:** the findings loop of `review.md`, with the fixes in commits.
- **The PR of a different person:** one round for each run, in a worktree of the head commit. The skill checks each finding, and the person selects the review to post. Each posted review ends with the line `extensive-review: round <N>, commit <sha>`. The next run reads that line, and it does the next round.
- **The merge:** after an approval, the skill obeys `mergeMode`. It waits for the checks, merges with rebase-merge, watches the workflow runs, and sets the linked issue to `status:done`.

## Rationale

- The user decided the skill, the name, and the open use for the team on 2026-11-02.
- `/review` is a built-in command of Claude Code: an alias of `/code-review` since version 2.1.223. A plugin skill cannot replace a built-in command.
- A reviewer of a different PR cannot fix the code, so each run does one round. The round line on the PR keeps the count for each person of the team, with no file in the repo.
- A worktree keeps the branch of the reviewer as it is.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| The name `review` | `/review` runs the built-in `/code-review`. The long name `/agentic-devkit:review` is easy to mix up with it. |
| A model-invoked skill | Claude can start it with no request, and the skill can post and merge. |
| A copy of `review.md` in the skill | Two copies of one rule drift apart. |
| Post nothing to GitHub | The author does not see the findings, and the next run cannot find the round. |

## Consequences

- The PR of a teammate can go from the review to the merge with one command.
- The skill depends on the paths of the `build-feature` references. A move of these files needs a change of this skill.

## Revisit when

- The team wants comments on single lines of the diff.

## Sources

- User decision, 2026-11-02, after the review of Roomsie T-35 ([#185](https://github.com/magentawood/roomsie/pull/185)).
- [Claude Code commands](https://code.claude.com/docs/en/commands), `/review` and `/code-review`.
