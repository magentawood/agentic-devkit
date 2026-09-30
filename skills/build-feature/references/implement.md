# Implement

> **Draft.** Finalize after the POC.

Adapted from `implement` and `tdd` (see NOTICE.md).

## Before you write code

1. Read [lean-code.md](lean-code.md) and [code-comments.md](code-comments.md).
2. Read the files in `standardsPath` for the areas that the ticket touches. Do not enforce a rule that has the mark OPEN.
3. Read the approved spec and the `## Done when` list.
4. Make a branch from the default branch for this ticket. Do one ticket at a time.

## The test loop

Use red-green at the seams that the user approved in the spec. Do not write a test at a different seam.

1. **Red:** write one test that fails. The test uses only the public interface. The expected value comes from the spec or a known example, not from the code.
2. **Green:** write only the code that makes the test pass. Climb the lean-code ladder.
3. Do the next slice: one seam, one test, one minimum implementation.

These tests are not good:

- A test that breaks after a refactor when the behavior does not change.
- A test that calculates the expected value in the same way as the code.
- All the tests first, then all the code.

Do the refactor after the loop, before the review. Run the type check and one test file frequently. Run the full test suite one time at the end.

## Record as you go

- Commit small, clear steps on the branch.
- When the work shows a new decision, stop and ask the user with `AskUserQuestion`. Write a decision record if the grill rules require one.
- Record what you did, the reasons, and the dead ends. They go into the `## Log` entry and the journal entry at the PR stage.
- If an item of `## Done when` needs a different task first, record that task as the blocker.

## Exit condition

All the tests pass. The type check and the lint pass. You did each `## Done when` item, or the item has a blocker.
