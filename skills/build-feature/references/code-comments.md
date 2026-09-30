# Code comments

The default is no comment.

## Before you write a comment

Try these first:

1. A better name
2. A smaller function
3. A type

## Write a comment only for what the code cannot tell

- WHY the code does something that is not obvious: a constraint, a trade-off, or a business rule.
- A workaround. Link the issue or the upstream bug.
- Public API documentation, where the convention of the language requires it.

## Each comment must be

- One line where possible, and a maximum of approximately 15 words.
- In the present tense.
- Without filler words ("basically", "simply", "note that").

## Never write these

- A comment that tells what the code does
- Code in a comment
- A history of changes (git keeps the history)
- A TODO without a ticket ID

## Examples

| Not correct | Correct |
|---|---|
| `// increment the retry count` | No comment. The code tells it. |
| `// TODO: handle timeout` | `// TODO(T-21): stop at the spend ceiling` |
| `// changed to v7 on 2026-09-12` | No comment. Git keeps the history. |
| `// basically we sort by created_at because ids can be off` | `// Client ids can be 5 minutes off. Sort by created_at.` |
