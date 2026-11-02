# The PR of a different person

Do these steps when the PR has a different author than the gh user. The session of the reviewer fixes each problem. The author does not get findings to fix. Why: [ADR-0030](../../../docs/decisions/0030-the-extensive-review-skill.md).

## Prepare

1. Read the PR: `gh pr view <N> --json title,body,author,baseRefName,headRefName,headRefOid,isCrossRepository,maintainerCanModify,mergeable,url`. Record the head commit. The push compares the branch with it.
2. Find the push access. A PR of the same repo has it. A PR from a fork has it only with `maintainerCanModify`. With no push access, go to [No push access](#no-push-access).
3. Make a worktree with a local branch at the head commit, so that the branch of the person does not change:
   - `git fetch origin pull/<N>/head:refs/remotes/pr/<N>`
   - `git worktree add -b review-<N> <folder> <head commit>`
   Install the dependencies in the worktree. Give the reviewers this folder as the repo.
4. Read the requirements from the worktree: the task note, its spec and its `## Read first` files. Without a task note, use the PR description and the linked issue.
5. Find the earlier reviews of this skill: `gh api repos/<repo>/pulls/<N>/reviews --paginate -q '.[].body'`. If the last line `extensive-review: round <R>, commit <sha>` has `R` more than `reviewRounds`, the review is complete. Then do only the round on the code after the last round, on `git diff <sha>...<head commit>`. If the head commit is `<sha>`, go to "Merge".

## The base first

If `mergeable` is `CONFLICTING`, rebase the branch on the base before round 1:

1. `git fetch origin <base branch>`, then `git rebase origin/<base branch>`.
2. In code, keep the changes of both sides.
3. In a generated file (the OpenAPI file, the plan, the ledgers) or an append-only file (the journal), keep the base side, or both entries. Then build the generated files again, and commit them in one commit.
4. Run the typecheck and the tests before round 1.

## The rounds

Do the findings loop of `review.md` on the worktree: `reviewRounds` rounds on the full diff, then the round on the fixes of the last round.

- Show the three reports of each round with the headings `## Standards`, `## Spec` and `## Lean`. Give the check of each finding against the code.
- Fix each finding, or record why you reject it. In the round on the fixes, do not reject a finding. Fix it, or ask the person.
- For a change of behavior, write a test that fails before the fix.
- After the fixes of each round, run the typecheck, the lint and the tests. If a test fails only in a full run, run its file alone. Give both results to the person.
- Commit each group of fixes. Stage each file by its path.

## Push

1. Ask the person, with `AskUserQuestion`, before the push. Tell the person if the push replaces the history of the branch.
2. If the configuration has `prePush`, run that command. If it fails, do not push. Show the output, then fix the cause or ask the person.
3. Push with a lease on the head commit that you read: `git push --force-with-lease=<head branch>:<head commit> origin review-<N>:<head branch>`. If the author pushed a new commit, the push fails. Then fetch the commit, and do its changes in a new round.
4. Wait for the checks: `gh pr checks <N> --watch`.

## Post

1. Write the review with [../templates/review-comment.md](../templates/review-comment.md).
2. Ask the person which review to post: approve, or comment.
3. Post it with `gh pr review <N> --approve` or `--comment`, and `--body-file`.
4. Remove the worktree and its branch.

## Merge

Do these steps only after an approval. Obey `mergeMode`. For `ask`, give three options: merge now, the author merges, or auto-merge when the checks pass.

1. Wait for the checks: `gh pr checks <N> --watch`. If a check fails, stop and tell the person.
2. Merge: `gh pr merge <N> --rebase --delete-branch`.
3. Do [after-merge.md](../../build-feature/references/after-merge.md): the workflow runs, then the live check of the spec, then `status:done`.

## No push access

The author fixes the findings. Thus, each run does one round:

1. Find the round in the last line of the earlier reviews of this skill. With no such line, this run is round 1. Rounds 1 to `reviewRounds` read the full diff. The next round reads only `git diff <sha>...<head commit>`. After that round, do no round.
2. Do the round, and check each finding against the code.
3. Ask the person: request changes, comment, approve, or keep it local. Post only the correct findings, with the round line of the template.

## Exit conditions

- No finding is open, and each rejected finding has a reason.
- The PR has the review, or the person kept it local.
- After a merge:
  - The checks passed, and the PR is in the default branch.
  - Each workflow run of the merge passed, and the live check of the spec passed.
  - Each linked issue has `status:done`.
