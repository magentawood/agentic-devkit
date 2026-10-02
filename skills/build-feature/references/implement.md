# Implement

Adapted from `implement` and `tdd` (see NOTICE.md). The Roomsie T-02 POC confirmed these rules (2026-10-03).

## Before you write code

1. Read [lean-code.md](lean-code.md) and [code-comments.md](code-comments.md).
2. Read the files in `standardsPath` for the areas that the ticket touches. Do not enforce a rule that has the mark OPEN.
3. Read the approved spec and the `## Done when` list.
4. Make a branch from the default branch for this ticket. Do one ticket at a time.
5. Do the environment preflight.

## Environment preflight

In T-02, problems with the environment took more time than the code. Before the first line of code, do these checks. Tell the user each problem before you continue:

- **Toolchain versions:** the runtime and the package manager versions that the repo pins (`engines`, `packageManager`, `.nvmrc`, or the equivalent). A new version can break a tool. In T-02, pnpm 12 did not run through Corepack, so the repo pinned pnpm 11.
- **Package manager:** get it through Corepack (`corepack enable`), not from a global install. If `corepack enable` cannot write to its folder, use a different folder in `PATH`: `corepack enable --install-directory <folder>`.
- **Docker:** if the ticket needs a container, `docker info` must pass. A problem with the Docker files is for the user to fix, for example a file that root owns.
- **Permissions:** you can write to each folder that the tools write to.
- **Ports:** the ports of the dev servers and the database are free.
- **Safety defaults of a tool:** keep them on. Approve each exception one at a time, for example one package that can run install scripts.

## The test loop

Use red-green at the seams that the user approved in the spec. Do not write a test at a different seam.

1. **Red:** write one test that fails. The test uses only the public interface. The expected value comes from the spec or a known example, not from the code.
2. **Green:** write only the code that makes the test pass. Climb the lean-code ladder.
3. Do the next slice: one seam, one test, one minimum implementation.

Red-green needs a seam that exists. A scaffold ticket makes the seam, so the code comes first. Then write the tests at the approved seams, and record in the PR Testing section that the code came first.

These tests are not good:

- A test that breaks after a refactor when the behavior does not change.
- A test that calculates the expected value in the same way as the code.
- All the tests first, then all the code.

Do the refactor after the loop, before the review. Run the type check and one test file frequently. Run the full test suite one time at the end.

## Files that a tool writes

A tool can write files that you did not ask for. Read `git status` after each install and each first run of a tool. A tool can detect an agent and write an agent file, for example `AGENTS.md`. Turborepo did this in T-02. Turn it off with the option of the tool (in T-02, `agentGuidance: false`). The project has one agent file, which the docs architecture owns.

## Commits

- Commit small, clear steps on the branch.
- Stage each file by its path: `git add <path> ...`. Do not use `git add -A` or `git add .`.
- Before each commit, read `git status` and `git diff --cached --stat`. Make sure that the commit has only the files of this step. In T-02, renames from `git mv` stayed staged and went into the incorrect commit.

## Record as you go

- When the work shows a new decision, stop and ask the user with `AskUserQuestion`. Write a decision record if the grill rules require one.
- Record what you did, the reasons, and the dead ends. They go into the `## Log` entry and the journal entry at the PR stage.
- Record each concept that you research or explain to the user. It becomes a learn page at the PR stage.
- Code that exists can fail the type check or the lint with the current dependencies. Fix it only when the ticket cannot pass without the fix. Tell it in the PR Changes section.
- If an item of `## Done when` needs a different task first, record that task as the blocker.

## Exit condition

All the tests pass. The type check and the lint pass. You did each `## Done when` item, or the item has a blocker.
