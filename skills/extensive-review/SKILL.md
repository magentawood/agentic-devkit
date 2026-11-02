---
name: extensive-review
description: Run the three-reviewer blind review of /build-feature on a branch or a PR, then post the review and merge. Use with "/extensive-review", "/extensive-review <branch>", or "/extensive-review <PR number>".
disable-model-invocation: true
argument-hint: "[branch | PR number]"
metadata:
  version: 0.2.1
---

# Extensive review

## Purpose

Run the blind review of `/build-feature` on any branch or PR. Three blind reviewers check the diff for each round. After the last round, one more round checks only the fixes ([ADR-0029](../../docs/decisions/0029-review-the-fixes-of-the-last-round.md)). On the PR of a different person, the session of the reviewer fixes each problem. Then the skill posts the review and can merge the PR. Why: [ADR-0030](../../docs/decisions/0030-the-extensive-review-skill.md).

## When to use / When NOT to use

Use this skill for these targets:

- Your branch, before you open a PR, when you did not use `/build-feature`.
- The PR of a different person: the review and the fixes, then the merge.
- Your PR that is open. The skill does the loop of fixes. A different person approves the PR.

Do not use this skill inside `/build-feature`. Its review stage has the same rules. Do not use it for a document change only.

## Inputs

- The argument:
  - No argument: the current branch, against the default branch.
  - A branch name.
  - A PR number.
- The configuration: the plugin defaults (`${CLAUDE_PLUGIN_ROOT}/defaults/devkit.defaults.json`), then the project `devkit.config.json`. Use `reviewRounds`, `mergeMode`, `prePush`, `standardsPath`, `repo`, `plan`, and `statusLabels`.
- The review rules of `/build-feature`. Read these files, and do not copy them:
  - `${CLAUDE_PLUGIN_ROOT}/skills/build-feature/references/review.md`
  - `${CLAUDE_PLUGIN_ROOT}/skills/build-feature/references/lean-code.md`
  - `${CLAUDE_PLUGIN_ROOT}/skills/build-feature/references/code-comments.md`
- The requirements: the task note, its spec and its `## Read first` files. Find the task ID in the PR title, the PR description, or the branch name.

## Outputs

- The three reports of each round, in the chat.
- For your work: the fixes, in commits on the branch.
- For the PR of a different person: the fixes on the PR branch, one PR review, and the merge if the person approves.

## Steps

1. **Find the target.** Get the gh user with `gh api user -q .login`. Then select the mode:
   - **Own work:** a branch with no PR, or a PR of the gh user.
   - **A different person:** a PR of a different author. Read [references/pr-of-a-different-person.md](references/pr-of-a-different-person.md), and do its steps.
2. **Get the requirements.** Read the task note and its spec. Copy the `Decisions` and `Out of scope` lists as the settled facts. If no task note exists, use the PR description and the linked issue. If no PR exists, ask the person what the change must do. Use the answer as the requirements.
3. **Do the rounds** of own work. Obey `review.md`: the three blind reviewers, the findings loop, and "The code after the last round".
   - Show the three reports with the headings `## Standards`, `## Spec` and `## Lean`.
   - Fix each finding, or record why you reject it. In the round on the fixes, do not reject a finding. Fix it, or ask the person.
   - Commit each fix. Stage each file by its path.
4. **Push** the fixes only when the person agrees. First, run the `prePush` command of the configuration, if it has one. If it fails, do not push.
5. **Report** the result: the rounds, the fixed findings, the rejected findings with their reasons, and the decisions of the person.

The person who runs the skill makes each pick. No person has a special role.

## Exit conditions

- Each round of `review.md` is complete, and no finding is open.
- Each rejected finding has a reason.
- For the PR of a different person: the exit conditions of [references/pr-of-a-different-person.md](references/pr-of-a-different-person.md).

## Conventions

Obey [CONVENTIONS.md](../../CONVENTIONS.md). The terms are in [docs/glossary.md](../../docs/glossary.md).

## Example

`/extensive-review 187`

1. PR #187 has the author `pulkitshringi`. The gh user is `n3rxv`. Thus, the mode is "a different person".
2. The PR conflicts with `main`. The skill rebases it, keeps the settings of both sides, and builds the generated files again.
3. Round 1 finds a bug: a couple-friendly dealbreaker hides each room. The skill writes a test that fails, then fixes the bug.
4. Round 2 and the round on the fixes find smaller items. The skill fixes them, and asks the person about one optional finding.
5. The person agrees to the push. The checks pass, and the skill posts one review, an approval, with the commits and the line `extensive-review: round 3, commit 3994204`.
6. The person selects "Merge now". The PR merges with rebase-merge, the deploy passes, and issue #27 gets `status:done`.
