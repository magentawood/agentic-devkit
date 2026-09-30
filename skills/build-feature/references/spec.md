# Spec

> **Draft.** Finalize after the POC.

The spec tells what to build and which modules change. Adapted from `to-spec` and `codebase-design` (see NOTICE.md).

## Rules

- Do not ask the user new questions. Use only the decisions of the grill. If a decision is missing, go back to the grill.
- Use the terms of `CONTEXT.md` with no change. Obey the decision records of the area.
- Write the spec in STE. Use the `ste-writing` skill.
- Do not copy reasoning into the spec. Link the decision record, for example "(why: ADR-0012)".
- Do not write file paths or code in the spec, because they quickly become out of date. You can include a type or a schema from a prototype when it tells a decision better than words.

## Modules and seams

1. List each module that the change touches. A module has an interface and an implementation. It can be a function, a class, a package, or a vertical slice.
2. For each module, tell if its interface changes.
3. Select the seams for the tests. Prefer a seam that exists. Use the highest seam possible. The best number of new seams is zero.
4. Include the modules and the seams in the spec. The user approves them at the spec gate.

## Entry points

- **Ticket that exists:** write the short spec into the task note, below `## Read first`. Use [../templates/task-note-section.md](../templates/task-note-section.md). The `## Done when` list stays the acceptance criteria. Do not change or copy it. If an item is not correct, ask the user, then change `plan.source` and run `plan.build`.
- **New feature:** write the full spec with [../templates/spec.md](../templates/spec.md). Put it at the location that the project gives. If the project gives no location, ask the user.

## Exit condition

The user approves the spec. This stage is a gate by default (`spec` in `approvalGates`).
