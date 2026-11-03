# Changelog

## 0.8.4 (2026-11-03)

- Squash and merge ([ADR-0033](docs/decisions/0033-squash-and-merge.md)):
  - `build-feature` 0.3.4 and `extensive-review` 0.2.2 merge each PR with `gh pr merge <N> --squash --delete-branch`, not rebase-merge.
  - `doc-management` 0.2.2: the stacked PRs of `migrate` merge with squash and merge. A revert removes one stage.
  - ADR-0007, ADR-0022, ADR-0030 and ADR-0031 mark the replaced rebase-merge text.

## 0.8.3 (2026-11-02)

- The pre-push check and the live check ([ADR-0032](docs/decisions/0032-the-pre-push-check-and-the-live-check.md)):
  - New configuration key `prePush`, a shell command, with no default. `build-feature` 0.3.3 and `extensive-review` 0.2.1 run it before each push, and do not push when it fails.
  - New `build-feature/references/after-merge.md`: after a merge, the skills wait for the workflow runs, then do the live check of the spec. The issue gets `status:done` only after the check passes.
  - Each project with a scan sets `prePush` in its `devkit.config.json`. Roomsie sets `corepack pnpm secrets`.

## 0.8.2 (2026-11-02)

- `build-feature` 0.3.2 ([ADR-0031](docs/decisions/0031-pull-the-latest-repo-first.md)), with the new `references/pull.md`:
  - Before the claim, it pulls the latest default branch with `--ff-only`. It stops when the working tree has changes that are not committed.
  - Before the review, it rebases the ticket branch on the latest default branch.
  - Before the push of the PR, it rebases again if the default branch moved. A conflict in code gets the round on the code after the last round.

## 0.8.1 (2026-11-02)

- `extensive-review` 0.2.0 ([ADR-0030](docs/decisions/0030-the-extensive-review-skill.md)): on the PR of a different person, the session of the reviewer fixes each problem.
  - It rebases a PR that conflicts with its base.
  - It does the loop of own work: the rounds of `reviewRounds`, then the round on the fixes.
  - It pushes after the person agrees, with a lease on the head commit that it read.
  - It posts one review with the commits, the rejected findings and the decisions of the person.
  - With no push access, the author fixes the findings, and each run does one round, as in 0.1.0.

## 0.8.0 (2026-11-02)

- New user-invoked skill `extensive-review` 0.1.0 ([ADR-0030](docs/decisions/0030-the-extensive-review-skill.md)). Type `/extensive-review` or `/agentic-devkit:extensive-review`, with no argument, a branch, or a PR number.
  - On your work, it does the findings loop of `build-feature`: the rounds of `reviewRounds`, then the round on the fixes.
  - On the PR of a different person, it does one round for each run, and posts one PR review with a round line. After an approval, it can merge the PR and set the linked issue to `status:done`.
  - It reads the review references of `build-feature`, and it does not copy them.

## 0.7.2 (2026-11-02)

- `build-feature` 0.3.1 ([ADR-0029](docs/decisions/0029-review-the-fixes-of-the-last-round.md)): after the fixes of the last review round, three blind reviewers check only those fixes. In this round, fix each finding or ask the user. Do not reject a finding. When two reviewers do not agree, ask the user. No round comes after it. The PR template lists this round.

## 0.7.1 (2026-10-24)

- `docs-check.yml` 0.1.2: the docs job uses Python 3.12. From 19 October 2026, the `ubuntu-latest` runners of GitHub are Ubuntu 26.04, and `actions/setup-python` has no Python 3.9 for Ubuntu 26.04. Thus, the job stopped before the first check. The `docs-check.yml` of this repo gets the same change. Run `/doc-management check --sync` in each project.

## 0.7.0 (2026-10-08)

- New model-invoked skill `next-task` 0.1.0 ([ADR-0028](docs/decisions/0028-claim-at-the-start-and-the-next-task-skill.md)). It lists the free tasks of `plan.source` by role, and the claimed tasks. A free task has complete dependencies, no assignee, and no open status label.
- `build-feature` 0.3.0: before the first grill question, it claims the issue with `issue-status <N> spec --claim`. It stops when a different person has the issue.
- `issue-status`: the new `--claim` flag assigns the issue to the gh user. It exits 2 when a different person is an assignee.
- "Questions to the user" ([ADR-0027](docs/decisions/0027-the-shape-of-a-question.md)): the context goes inside the question text. It tells what the concept is, the current state, and an example of the result of each option. ADR-0024 loses its rejected alternative "A long explanation above each question".

## 0.6.2 (2026-10-03)

- `build-feature` 0.2.1 ([ADR-0026](docs/decisions/0026-rebuild-the-plan-in-the-pr.md)): at the PR stage, after the ticks, the log, and the journal entry, run `plan.build`. Commit the generated plan files together with the ticks, in the same PR.
- `pre-commit` 0.2.0: if the project config has `plan.build`, the hook runs `<plan.build> --check` and fails on a non-zero exit. If not, it skips the check. `docs-check.yml` 0.1.1 names the new check. CI runs the same hook.
- A `plan.build` command must accept `--check`. With `--check`, it writes no file. It exits 1 when a generated plan file is stale, and 0 when all files are current. Give the generator this flag before you sync.
- `doc-architecture` 0.2.2 and `doc-management` 0.2.1 tell the new rules. Run `/doc-management check --sync` in each project.

## 0.6.1 (2026-10-03)

- `build-decision-ledger` 0.3.0 ([ADR-0025](docs/decisions/0025-learn-pages.md)): the full Learn index goes to `learnIndex` (default `<learnPath>/README.md`). The tech ledger gets a teaser with a link and the 5 newest titles (`learnTeaser`). The teaser replaces a 0.2.0 Learn block in its file. Remove a 0.2.0 Learn block in a different file by hand.
- `doc-architecture` 0.2.1 and the `doc-management` references tell the new rules. Run `/doc-management check --sync` in each project.

## 0.6.0 (2026-10-03)

- `build-feature` 0.2.0: the stage references and the templates come from the Roomsie T-02 POC, and lose the "Draft" mark. `tickets.md` stays a draft: the POC did not use the ticket stage. [ADR-0006](docs/decisions/0006-poc-first-stage-references-are-drafts.md) has the status Accepted.
  - Grill: check the Read-first files and the done items against the current docs. Ask the user about a stale product decision.
  - Spec: a scaffold ticket can name its packages. Apply the before → after text of a done item to the task note before the plan generator runs.
  - Implement: an environment preflight, staged files by path, and tool-written agent files off.
  - Review: all reviewers get the spec decisions and the out-of-scope list. One more round on a change after the last round.
  - New `references/pr.md`: the learn pages, the predicted PR number, and the PR gate.
- Each question ends with "Explain this question" (`CONVENTIONS.md`, [ADR-0024](docs/decisions/0024-explain-this-question.md)).
- Learn pages ([ADR-0025](docs/decisions/0025-learn-pages.md)): `doc-architecture` 0.2.0 adds the doc type and `templates/learn.md`. `build-decision-ledger` 0.2.0 writes the Learn index. `render-docs` 0.2.0 accepts a glob in `renderPages`. `doc-management` 0.2.0 sets up `docs/learn/`. The defaults add `learnPath`, `learnIndex`, and `parts.learn`. Run `/doc-management check --sync` in each project.

## 0.5.2 (2026-10-02)

- `build-feature` 0.1.3: at the spec gate, print the complete text of the spec, then ask for approval. At the PR gate, print the complete text of the PR draft. Do not give a summary. Why: [ADR-0023](docs/decisions/0023-print-the-complete-text-at-a-gate.md).

Older versions (0.1.0 to 0.5.1) are in [docs/archive/changelog-0.1-0.5.md](docs/archive/changelog-0.1-0.5.md).
