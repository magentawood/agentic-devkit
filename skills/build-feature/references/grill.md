# Grill

The grill asks the user questions until each branch of the decision tree has a decision. Adapted from `grilling`, `grill-with-docs`, and `domain-modeling` (see NOTICE.md). The Roomsie T-02 POC confirmed these rules (2026-10-03).

## Before the first question

1. Read the project `CONTEXT.md` and the project glossary. Then read the task note, the files in its `## Read first` section, and the decision records for the area.
2. Read the code that the change touches. Trace the flow of the code from the start to the end.
3. **Check the ticket against the current docs.** A task note can be older than the docs. Do this also for a ticket that exists:
   - Each Read-first link and each file that a done item names must exist and hold the fact at this time. In T-02, a done item named "the repo layout in CONTEXT.md", but the layout had moved to `docs/repo-layout.md`.
   - Each done item must agree with the most recent decision records.
   - A product decision can look stale. For example, a record names a design that the team no longer uses (in T-02, the V3 prototype). Do not change it. Tell the user the two statements and their dates, and ask. The user decides.
4. Make the decision tree. Each decision has branches: the decisions that come after it.
5. Find the frontier: the decisions that have all their prerequisites. Ask only the questions on the frontier.

## Ask

- Obey "Questions to the user" in CONVENTIONS.md. Ask one question at a time with `AskUserQuestion`. Give at most three options, then "Explain this question".
- Above each technical question, give plain-language context in two to four sentences. Tell what the concept is, and the trade-off of the options. Write for a user who does not know the term. Give each option one line that tells its result.
- Ask the user only for a decision. You must find each fact in the code and the documents. For a long search, start a sub-agent, and ask other frontier questions while it works.
- After each answer, find the frontier again. An answer can close branches or open new branches.

## Explain this question

When the user selects "Explain this question":

1. Explain in plain language: what the concept is, how it fits this project, and what each option changes.
2. Ask the same question again, with the same options.
3. Keep the explanation in your notes. It is input for a learn page at the PR stage (see [pr.md](pr.md#learn-pages)).

## Entry points

- **Ticket that exists:** ask about the implementation: the seams to test, the modules that change, edge cases, and the error behavior. The task note and its Read-first files give the product decisions. Do not ask about them again. Ask only about a stale reference or a stale decision from step 3.
- **New feature:** ask about the full tree. This includes the problem, the users, and the scope. It also includes what is out of scope, the modules, and the seams.

## Record as you go

- **Terms:** when the user uses a term that is not the same as the project glossary, tell the user immediately. When a term is clear, update the glossary immediately. The routing table of `CONTEXT.md` gives the glossary. Do not put terms in `CONTEXT.md`: it is an index, and it must stay inside its token limit.
- **Decisions:** write a decision record only for a decision with these three properties:
  - It is hard to change subsequently.
  - A subsequent reader cannot understand it without the reason.
  - It comes from a trade-off between alternatives.

  Put the reasoning only in the record. Give it an "In one line:" summary. Then run `build-decision-ledger` (see the `doc-architecture` skill).
- **Replaced text:** when a new decision replaces a previous decision, update or remove the text of the previous decision. Do not append. A product decision from step 3 can change many docs. Each change goes in the PR of the ticket, and the PR summary tells the decision.
- **Contradictions:** when the user says something that the code does not do, tell the user. Ask which one is correct.
- **Concepts:** record each concept that you explain or research (for example, a database driver or a build tool). Each one becomes a learn page at the PR stage.

## Exit condition

The frontier is empty: each branch has a decision, and you assume nothing. Tell the user the list of decisions in short lines. The user confirms that the list is complete.
