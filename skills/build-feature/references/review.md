# Review

> **Draft.** Finalize after the POC.

Do the review before you open the PR. Adapted from `code-review` and `ponytail-review` (see NOTICE.md).

## Prepare

1. Commit all the work on the branch.
2. Get the base: `BASE=$(git merge-base <default branch> HEAD)`. Make sure that `git diff $BASE...HEAD` is not empty.
3. Make the list of requirement files. It has the task note, the spec, and each file in the `## Read first` section of the task note.

## Three blind reviewers

Start three sub-agents at the same time. A sub-agent does not get your context. Give it each path in the instructions that you send to it.

Each reviewer gets only these inputs:

- The diff command: `git diff $BASE...HEAD`, and read access to the repo.
- The paths of the requirement files.
- Its rulebook (see the table).

Do not give a reviewer the log, the PR draft, your notes, or your reasoning. A code comment is part of the code, so the reviewers see the comments only in the diff.

| Reviewer | Rulebook | Question | Format of a finding |
|---|---|---|---|
| Standards | All files in `standardsPath` | Does the diff obey each rule? | `<file>:L<line>: <rule> (<standards file>). <fix>.` |
| Spec | The requirement files | Does the diff do what the task note and the spec tell? | `<requirement line>: missing / not complete / incorrect / not asked for. <evidence>.` |
| Lean | [lean-code.md](lean-code.md) and [code-comments.md](code-comments.md) | What can you delete? | `<file>:L<line>: <tag> <what>. <replacement>.` |

Rules for the reviewers:

- **Standards:** skip the rules that a tool enforces (`[tool]`) and the rules with the mark OPEN. Also report these smells as judgement calls only:
  - An unclear name
  - Duplicate code
  - Speculative generality
  - A middle man
  - A data clump
  - A primitive in place of a domain type

  If a rule of the project and a smell disagree, obey the rule.
- **Spec:** quote the requirement line for each finding. Report the items that are missing, not complete, or incorrect. Also report the behavior that the requirements do not ask for.
- **Lean:** use the tags `delete:`, `stdlib:`, `native:`, `yagni:`, `shrink:`, and `comment:`. End with `net: -<N> lines possible.` If there is nothing to delete, write `Lean already.` Do not report correctness, security, or speed. Do not report one smoke test as waste.
- Each reviewer writes a maximum of 400 words.

Show the three reports to the user with the headings `## Standards`, `## Spec`, and `## Lean`. Do not merge or re-sort the findings of different reviewers.

## Findings loop

1. For each finding, fix it, or record why you reject it.
2. Start three new reviewers with the same inputs on the new diff. They do not get the findings of the previous review.
3. Do steps 1 and 2 a maximum of `reviewRounds` times (default 2).
4. For each finding that stays open, ask the user with `AskUserQuestion`, one finding at a time.
5. Put each rejected finding and its reason in the "Review" section of the PR.

## Rule candidates

The Standards reviewer can find a mistake that no rule covers. Obey "Rule candidates" in CONVENTIONS.md.

## Exit condition

No finding is open. Each rejected finding has a reason.
