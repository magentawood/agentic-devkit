# 0023 — Print the complete text at a gate

**Status:** Accepted · **Date:** 2026-10-02 · **Deciders:** Yash Mangal

## Context

At the spec gate and at the PR gate of `/build-feature`, the user approves a text. In the Roomsie T-02 POC, the agent gave a summary of the spec before it asked for approval. A summary can omit or change a detail. Then the user approves a text that the user did not read.

## Decision

**In one line:** At the spec and PR gates, print the complete text word for word in a fenced block, then ask for approval.

- At the spec gate, print the spec as it is in the file, word for word. Do not give a summary.
- At the PR gate, print the PR draft as it is, word for word.
- Put the text in the reply, in one fenced Markdown block. Then ask for approval.
- If you change the text after the user reads it, print the new text again before you ask.

## Rationale

- The user approves the text word for word, not a summary of it.
- A summary can omit a detail or change it, and the user cannot see this.
- The user reads the text in the terminal, and does not open the file.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| A summary, with the file path | The user approves text that the user did not read. |
| Only the file path | The user must open the file outside the terminal. |

## Consequences

- The reply at a gate is longer. A short spec is at most 1,200 words, so it fits in the terminal.

## Revisit when

- A spec or a PR draft becomes too long to read in the terminal.

## Sources

- User decision during the Roomsie T-02 POC, 2026-10-02.
