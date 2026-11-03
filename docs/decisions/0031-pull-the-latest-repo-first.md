# 0031 — Pull the latest repo first

**Status:** Accepted · **Date:** 2026-11-02 · **Deciders:** Niruv Bhardwaj

## Context

`/build-feature` made the ticket branch from the local default branch. The local copy could be old, so the grill read old docs. During a ticket, other PRs merge. In Roomsie, #186 (T-11) and #187 (T-14) each had a conflict with a PR that merged during the ticket. Each needed a rebase at the end, after the review.

## Decision

**In one line:** `/build-feature` pulls the latest default branch first, and rebases on it before the review and the push.

- **At the start:** stop if the working tree has changes that are not committed. Fetch, then `git pull --ff-only` on the default branch. Stop if the pull is not a fast-forward. A resumed ticket rebases its branch on `origin/<default branch>`.
- **Before the review:** rebase on `origin/<default branch>`, build the generated files again, and run the checks. Thus, the reviewers see the code on the latest base.
- **Before the push:** if the default branch moved, rebase again. A conflict in code makes code after the last round, which gets its round ([ADR-0029](0029-review-the-fixes-of-the-last-round.md)).
- The steps are in [pull.md](../../skills/build-feature/references/pull.md).

## Rationale

- The user decided this on 2026-11-02, after the rebases of Roomsie #186 and #187.
- The grill checks the Read-first files and the done items against the current docs. An old copy gives old answers.
- A rebase before the review puts the resolved conflicts in front of the reviewers. A rebase only at the end adds code that no reviewer saw.
- `--ff-only` never makes a merge commit on the default branch. A local commit on the default branch is a problem for the user, not for the skill.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Pull only at the start | A long ticket still falls behind, as T-11 did. |
| Merge the default branch into the ticket branch | The branch then has the commits of the default branch, and the diff of each review round is harder to read. |
| Rebase only before the push | The resolved conflicts then reach the PR with no review. |

## Consequences

- A ticket stops at the start when the working tree has changes that are not committed.
- A branch on the remote gets a push with `--force-with-lease` after a rebase.

## Revisit when

- The repos change from squash and merge to merge commits.

## Sources

- User decision, 2026-11-02.
- [Roomsie #186](https://github.com/magentawood/roomsie/pull/186) and [#187](https://github.com/magentawood/roomsie/pull/187): the rebases at the end.
