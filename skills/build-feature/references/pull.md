# Pull the latest repo

`/build-feature` starts from the latest default branch, and keeps the ticket branch on it until the PR. Why: [ADR-0031](../../../docs/decisions/0031-pull-the-latest-repo-first.md).

## At the start

Do these steps before the claim:

1. Run `git status`. If the working tree has changes that are not committed, stop and tell the user.
2. Run `git fetch origin`.
3. For a new ticket, switch to the default branch, and run `git pull --ff-only`. If the pull is not a fast-forward, stop and tell the user.
4. For a ticket that has a branch already, switch to that branch, and run `git rebase origin/<default branch>`.

## Before the review

1. Run `git fetch origin`, then `git rebase origin/<default branch>`.
2. In code, keep the changes of both sides. In a generated file or an append-only file (the journal), keep both sides, then build the generated files again.
3. Run the typecheck, the lint, and the tests.

## Before the push of the PR

1. Run `git fetch origin`. If `origin/<default branch>` moved, rebase again, as before the review.
2. If the rebase has a conflict in code, the resolved code is code after the last round. Do the round of [review.md](review.md), "The code after the last round".
3. Run the tests again.
4. If the configuration has `prePush`, run that command. If it fails, do not push. Show the output, then fix the cause or ask the user. Why: [ADR-0032](../../../docs/decisions/0032-the-pre-push-check-and-the-live-check.md).
5. Push. If the branch is on the remote already, push with `--force-with-lease`.
