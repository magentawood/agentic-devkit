# Lean code

Write the minimum code that works. Adapted from the ladder of `ponytail` (see NOTICE.md).

## Read first

Read the code that the change touches, and trace the flow of the code. Be lazy about the solution. Never be lazy when you read the code. A small change in an incorrect location is a second bug.

For a bug, fix the root cause, not the symptom. Before you change a function, find all its callers. One guard in the shared function is smaller than one guard in each caller.

## The ladder

Climb the ladder. Stop at the first rung that works:

1. Is it necessary? If not, do not write it (YAGNI).
2. Does the codebase have it? Use it again.
3. Does the standard library do it? Use it.
4. Does the platform do it natively? Use it. For example, use a database constraint, not application code.
5. Does an installed dependency do it? Use it.
6. Can it be one line? Write one line.
7. Only then, write the minimum code that works.

If two rungs work, use the higher rung. If two standard functions are the same size, use the function that is correct at the edge cases.

## Never cut these

- Validation at a trust boundary
- Error handling that prevents data loss
- Security
- Accessibility

## Never add these without a reason in the ticket

- A new dependency
- An abstraction, for example an interface with one implementation or a factory for one product
- A wrapper
- A configuration option for a value that does not change
- A hook or a scaffold "for the future"

## Tests

Logic that is not simple (a branch, a loop, a parser, a money or security path) gets one test that fails if the logic breaks. A one-line change does not need a test.

## Record the rung

When the rung is not obvious, write it in the "Changes" section of the PR. For example: "Rung 4: the database unique constraint prevents duplicates. No application check."
