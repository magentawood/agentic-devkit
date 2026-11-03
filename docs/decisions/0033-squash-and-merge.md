# 0033 — Squash and merge

**Status:** Accepted · **Date:** 2026-11-03 · **Deciders:** Niruv Bhardwaj

## Context

The skills merged each PR with rebase-merge ([ADR-0007](0007-approval-gates-and-merge-mode.md)). Thus, each commit of a branch went into the default branch: the fixes of each review round, the ticks, and the generated files. In Roomsie, T-29 put six commits on `main` ([#202](https://github.com/magentawood/roomsie/pull/202)), and most of them did not build a full feature alone.

## Decision

**In one line:** each PR of a project merges with squash and merge, so one PR is one commit on the default branch.

- The merge command is `gh pr merge <N> --squash --delete-branch`. `/build-feature`, `/extensive-review` and the stacks of `/doc-management migrate` use it.
- The subject of the commit is the PR title with "(#N)". The GitHub setting `squash_merge_commit_title` is `COMMIT_OR_PR_TITLE`.
- Superseded: "Repo merges use rebase-merge" of [ADR-0007](0007-approval-gates-and-merge-mode.md).
- Superseded: "one stacked PR for each stage, and rebase-merge" of [ADR-0022](0022-the-migrate-pipeline.md). Each stage PR is one commit.
- The rebase of the branch before the review and before the push stays ([ADR-0031](0031-pull-the-latest-repo-first.md)). It changes the base of the branch, not the merge.

## Rationale

- The user decided this on 2026-11-03: "we always have to do squash and merge".
- One commit for each PR gives a history that tells the features. A revert of a PR is one `git revert`.
- The commits of the review rounds stay on the PR, with the review of each round.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Rebase-merge | Each review fix and each generated file becomes a commit of the default branch. |
| Merge commits | The default branch gets a merge commit and all the branch commits. |

## Consequences

- A revert removes a full PR. In a migrate stack, it removes a full stage, not one file.
- The commit hashes of the branch still change at the merge. Do not write a branch hash into a doc ([lessons.md](../../skills/doc-management/references/lessons.md)).
- After the merge, the skills watch the runs of the squash commit: `gh pr view <N> --json mergeCommit`.

## Revisit when

- A project needs a revert of one commit of a PR.

## Sources

- User decision, 2026-11-03.
