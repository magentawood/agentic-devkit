# Spec

The spec tells what to build and which modules change. Adapted from `to-spec` and `codebase-design` (see NOTICE.md). The Roomsie T-02 POC confirmed these rules (2026-10-03).

## Rules

- Do not ask the user new questions. Use only the decisions of the grill. If a decision is missing, go back to the grill.
- Use the terms of the project glossary with no change. Obey the decision records of the area.
- Write the spec in STE. Use the `ste-writing` skill.
- Do not copy reasoning into the spec. Link the decision record, for example "(why: ADR-0012)".
- Do not write file paths or code in the spec, because they quickly become out of date. You can include a type or a schema from a prototype when it tells a decision better than words.
- **Exception for a scaffold or an infrastructure ticket:** when the modules are packages, folders, or tool files, name them. In T-02 the modules were `apps/api`, `packages/contract`, and the workspace root.
- Write each grill decision in `Decisions`, and each thing that the ticket does not do in `Out of scope`. The review gives these two lists to all reviewers as settled facts (see [review.md](review.md)).

## Modules and seams

1. List each module that the change touches. A module has an interface and an implementation. It can be a function, a class, a package, or a vertical slice.
2. For each module, tell if its interface changes.
3. Select the seams for the tests. Prefer a seam that exists. Use the highest seam possible. The best number of new seams is zero.
4. Include the modules and the seams in the spec. The user approves them at the spec gate.

## Entry points

- **Ticket that exists:** write the short spec into the task note, below `## Read first`. Use [../templates/task-note-section.md](../templates/task-note-section.md). The `## Done when` list stays the acceptance criteria. Do not copy it.
- **New feature:** write the full spec with the template of `doc-architecture`: `${CLAUDE_PLUGIN_ROOT}/skills/doc-architecture/templates/spec.md`. Put it in `docArchitecture.specPath` (default `docs/specs/<feature>.md`). The spec is at most 1,200 words. After the merge of the feature, move the spec to `docArchitecture.archivePath`.

## A done item that is not correct

A done item can name a file that moved, or contradict a new decision. Change it only with the approval of the user:

1. Show the user the current text and the new text. Ask for approval with `AskUserQuestion`.
2. Change the item in `plan.source`.
3. **Before you run the generator**, apply the same before → after change to the task note. The tick state and the lines of the task note use the text of the item as their key. If you do not, the ticks disappear and duplicate lines appear. T-02 had this bug.
4. Run `plan.build`. Make sure that the task note has each item one time, with its tick state.
5. Record each change in the spec `Decisions` and in the "Changed" part of the PR Progress section.

## Spec gate

1. Print the complete text of the spec in your reply, in one fenced Markdown block. Copy it word for word from the file. Do not give a summary.
2. Then ask the user for approval.
3. If you change the spec after the user reads it, print the new text again before you ask.

## Exit condition

The user approves the spec. This stage is a gate by default (`spec` in `approvalGates`).
