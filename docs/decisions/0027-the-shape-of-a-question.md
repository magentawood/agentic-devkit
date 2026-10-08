# 0027 — The shape of a question to the user

**Status:** Accepted · **Date:** 2026-10-08 · **Deciders:** Yash Mangal

## Context

The skills ask the user for decisions with `AskUserQuestion` ([ADR-0004](0004-questions-to-the-user.md), [ADR-0024](0024-explain-this-question.md)). In the Roomsie T-04 and F-02 tickets, the user could decide quickly only when the question box itself gave the context. The user did not see the text before the box, and asked for the same explanation again. The user also asked free-text questions in place of an option. The format came from the memory of one user, so the sessions of other people did not get it.

## Decision

**In one line:** Each question text tells what the concept is, the current state, and an example of the result of each option.

- Put the context in the question text, not in a message before the question.
- Use this shape:
  1. What it is: two to four plain sentences.
  2. The current state: the facts that you checked in the code, the docs, or the live system.
  3. Each option, with one example of what changes and what it costs.
- The user can type a question in place of an option. Then answer it in the text of the same question, and ask again.
- When the user selects "Explain this question", explain with a worked example from the project.
- The rule is in "Questions to the user" in `CONVENTIONS.md`, so each skill and each session gets it.

## Rationale

- The user decided this rule on 2026-10-08.
- The user reads the question box. A message before the box is easy to miss. Then the user selects "Explain this question" to get the same text.
- An example of the result is easier to compare than an abstract trade-off.
- The rule in the plugin reaches each session. A rule in the memory of one user does not.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| A short question, and the context only when the user asks | The user asked for the context in most questions of T-04 and F-02. |
| The rule in the memory of each user | The sessions of other people do not get it. |

## Consequences

- Questions are longer. The recommended option and the "Explain this question" option stay ([ADR-0024](0024-explain-this-question.md)).
- This record replaces the rejected alternative "A long explanation above each question" of ADR-0024.

## Revisit when

- `AskUserQuestion` shows text before the box more clearly.

## Sources

- User decision, 2026-10-08.
