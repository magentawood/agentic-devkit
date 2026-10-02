# Review

Do the review before you open the PR. Adapted from `code-review` and `ponytail-review` (see NOTICE.md). The Roomsie T-02 POC confirmed these rules (2026-10-03).

## Prepare

1. Commit all the work on the branch.
2. Get the base: `BASE=$(git merge-base <default branch> HEAD)`. Make sure that `git diff $BASE...HEAD` is not empty.
3. Make the list of requirement files. It has the task note, the spec, and each file in the `## Read first` section of the task note.
4. Copy the `Decisions` list and the `Out of scope` list of the approved spec, with no change. These are the settled facts. Give them as facts, not as reasons. In T-02, reviewers that did not get them raised settled items again, and asked for rules of a different ticket.

## Three blind reviewers

Start three sub-agents at the same time. A sub-agent does not get your context. Give it each path in the instructions that you send to it.

Each reviewer gets only these inputs:

- The diff command: `git diff $BASE...HEAD`, and read access to the repo.
- The paths of the requirement files.
- The settled facts, with this instruction: "The user decided these items. Do not report them as findings. Do not ask for work that is out of scope."
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
4. For each finding that stays open, ask the user with `AskUserQuestion`, one finding at a time. Above each question, tell in plain language what the finding is and what each option changes. In T-02, the user needed this for three of four findings.
5. Put each rejected finding and its reason in the "Review" section of the PR.
6. When the user decides a finding, add the decision to the spec `Decisions` list. Then a next round does not raise it again.

## A change after the last round

The user can ask for a code change after the last round (in T-02, the OpenAPI generation). Do not open the PR with code that no reviewer saw:

The rule: one more blind round on only that change. Disclosure in the PR alone is not sufficient.

1. Commit the change. Get its diff: `git diff <last reviewed commit>...HEAD`.
2. A small diff has one module and approximately 100 lines or less. For a small diff, start the three reviewers one more time with the same inputs. Give them only this diff. This round does not count in `reviewRounds`. Fix each finding, or ask the user about it. Do not start one more round after it.
3. If the diff is larger, it is new work. Do a full round of the findings loop on the full diff. If no round stays in `reviewRounds`, ask the user before you continue.
4. The PR "Review" section lists this round, as it lists each round.

The ticks, the `## Log` entry, the journal entry, and the learn pages of the PR stage are not code changes. They do not need this round.

## Rule candidates

The Standards reviewer can find a mistake that no rule covers. Obey "Rule candidates" in CONVENTIONS.md.

## Exit condition

No finding is open. Each rejected finding has a reason.
