# The PR of a different person

Do these steps when the PR has a different author than the gh user. The author fixes the findings, not you. Thus, each run does one round. The round line of the posted reviews keeps the count for all persons of the team.

## Prepare

1. Read the PR: `gh pr view <N> --json title,body,author,baseRefName,headRefOid,closingIssuesReferences,url`.
2. Make a worktree of the head commit, so that your branch does not change:
   - `git fetch origin pull/<N>/head`
   - `git worktree add <folder> FETCH_HEAD`
   Give the reviewers this folder as the repo.
3. Get the base: `BASE=$(git merge-base origin/<base branch> <head commit>)`.
4. Read the requirements from the worktree: the task note, its spec, and its `## Read first` files. If the PR has no task note, use the PR description and the linked issue.

## Find the round

1. Read the earlier reviews: `gh api repos/<repo>/pulls/<N>/reviews --paginate -q '.[].body'`.
2. Find the last line `extensive-review: round <R>, commit <sha>`. If no review has this line, this run is round 1.
3. Select the round:
   - If `R` is less than `reviewRounds`, this run is round `R + 1`. It reads the full diff: `git diff $BASE...<head commit>`.
   - If `R` is equal to `reviewRounds`, this run is the round on the fixes. It reads only `git diff <sha>...<head commit>`.
   - If `R` is more than `reviewRounds`, the review is complete. Do no round. Go to "Decide".
4. If `<sha>` is not in the branch, the author rebased. Then read the full diff, and tell the person.
5. If the head commit is `<sha>`, the author pushed no change. Do no round. Tell the person.

## Do the round

1. Start the three blind reviewers of `review.md` at the same time, with the inputs that it gives.
2. Check each finding against the code of the worktree. Mark each finding "correct" or "not correct", with one line of evidence.
3. Show the three reports with the headings `## Standards`, `## Spec` and `## Lean`. Do not merge the reports. Give the check of each finding.

## Decide

1. Ask the person, with `AskUserQuestion`, which review to post:
   - **Request changes:** a correct finding blocks the merge.
   - **Comment:** the findings do not block, and the author can reply.
   - **Approve:** no correct finding blocks.
   - **Keep it local:** post nothing. The round does not count.
2. Write the review with [../templates/review-comment.md](../templates/review-comment.md). Put only the correct findings in it. Post it with `gh pr review <N> --approve`, `--comment`, or `--request-changes`, and `--body-file`.
3. Remove the worktree: `git worktree remove <folder>`.

## Merge

Do these steps only after an approval. Obey `mergeMode`. For `ask`, give three options: merge now, the author merges, or auto-merge when the checks pass.

1. Wait for the checks: `gh pr checks <N> --watch`. If a check fails, stop and tell the person.
2. Merge: `gh pr merge <N> --rebase --delete-branch`.
3. Watch each workflow run of the merge commit: `gh run list --commit <merge commit>`, then `gh run watch <id> --exit-status`.
4. Set each linked issue to done: `${CLAUDE_PLUGIN_ROOT}/skills/build-feature/scripts/issue-status <issue> done --note "PR #<N> merged"`.

## Exit conditions

- The PR has the review of the round, or the person kept it local.
- After a merge:
  - The checks passed, and the PR is in the default branch.
  - Each workflow run of the merge passed.
  - Each linked issue has `status:done`.
