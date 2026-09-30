# Grill

> **Draft.** Finalize after the POC.

The grill asks the user questions until each branch of the decision tree has a decision. Adapted from `grilling`, `grill-with-docs`, and `domain-modeling` (see NOTICE.md).

## Before the first question

1. Read the project `CONTEXT.md`, the task note, the files in its `## Read first` section, and the decision records for the area.
2. Read the code that the change touches. Trace the flow of the code from the start to the end.
3. Make the decision tree. Each decision has branches: the decisions that come after it.
4. Find the frontier: the decisions that have all their prerequisites. Ask only the questions on the frontier.

## Ask

- Ask one question at a time with the `AskUserQuestion` tool. Do not batch questions. Do not ask in plain text.
- Put your recommended option first. Add "(Recommended)" to its label. Give each option one line that tells its result.
- Ask the user only for a decision. You must find each fact in the code and the documents. For a long search, start a sub-agent, and ask other frontier questions while it works.
- After each answer, find the frontier again. An answer can close branches or open new branches.

## Entry points

- **Ticket that exists:** ask only about the implementation: the seams to test, the modules that change, edge cases, and the error behavior. The task note and its Read-first files give the product decisions. Do not ask about them again.
- **New feature:** ask about the full tree. This includes the problem, the users, and the scope. It also includes what is out of scope, the modules, and the seams.

## Record as you go

- **Terms:** when the user uses a term that is not the same as `CONTEXT.md`, tell the user immediately. When a term is clear, update `CONTEXT.md` immediately. Keep `CONTEXT.md` an index. Do not go above its token limit.
- **Decisions:** write a decision record only for a decision with these three properties:
  - It is hard to change subsequently.
  - A subsequent reader cannot understand it without the reason.
  - It comes from a trade-off between alternatives.

  Put the reasoning only in the record. Give it an "In one line:" summary. Then run `build-decision-ledger` (see the `doc-architecture` skill).
- **Replaced text:** when a new decision replaces a previous decision, update or remove the text of the previous decision. Do not append.
- **Contradictions:** when the user says something that the code does not do, tell the user. Ask which one is correct.

## Exit condition

The frontier is empty: each branch has a decision, and you assume nothing. Tell the user the list of decisions in short lines. The user confirms that the list is complete.
