# 0024 — An "Explain this question" option on each question

**Status:** Accepted · **Date:** 2026-10-03 · **Deciders:** Yash Mangal

## Context

The skills ask the user for decisions with `AskUserQuestion` ([ADR-0004](0004-questions-to-the-user.md)). In the Roomsie T-02 POC, the user needed a plain explanation for many technical questions: for example, for three of the four open review findings. The user had to ask for the explanation in plain text, outside the picker. Then the agent asked the question again by hand.

## Decision

**In one line:** Each question to the user has at most three real options, then the last option "Explain this question".

- The last option of each question has the label "Explain this question". Its description is "Explain the options in more detail before I decide".
- A question has at most three real options, plus "Explain this question". The recommended option stays first.
- When the user selects it, give a plain-language explanation. Tell what the concept is, how it fits the project, and what each option changes. Then ask the same question again, with the same options.
- The rule is in "Questions to the user" in `CONVENTIONS.md`, so each skill gets it. A skill reference links that section. It does not copy the rule.

## Rationale

- The user decided this rule on 2026-10-03, after the T-02 POC.
- The user can get an explanation with one selection, in the picker, and does not need to type a request.
- `AskUserQuestion` takes at most four options. One option for the explanation leaves three real options.
- The explanation of a concept is also input for a learn page ([ADR-0025](0025-learn-pages.md)).

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| The user types "explain" in the free-text answer | The user must know that this works, and must type it each time. |
| The rule only in the grill | Review findings, gates, and `doc-management` questions also need explanations. |

## Consequences

- Each question has at most three real options. A decision with four options must divide into two questions.
- The grill keeps each explanation as input for a learn page.

## Revisit when

- `AskUserQuestion` gets a different way to ask for help, or takes more options.

## Sources

- User decision, 2026-10-03.
- [Roomsie PR #94](https://github.com/magentawood/roomsie/pull/94): the T-02 POC, "Review" section.

Superseded (2026-10-08): the rejected alternative "A long explanation above each question". Each question now has its context in the question text ([ADR-0027](0027-the-shape-of-a-question.md)).
