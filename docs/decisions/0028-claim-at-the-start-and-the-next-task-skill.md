# 0028 — Claim a ticket at the start, and the `next-task` skill

**Status:** Accepted · **Date:** 2026-10-08 · **Deciders:** Yash Mangal

## Context

In Roomsie, more than one person works on one wave of the plan. A person takes a task when they assign its GitHub issue to themselves. `/build-feature` set only a status label, and only at the spec stage. Thus, during the grill, a ticket showed no claim. Nothing answered "what can I pick up next?". The agent read the progress note, which does not know the assignees.

## Decision

**In one line:** `/build-feature` claims the issue before the first grill question, and the `next-task` skill lists the free tasks.

- Before the first grill question, `/build-feature` runs `issue-status <N> spec --claim`. The script assigns the issue to the gh user and sets `status:spec`.
- If a different person is an assignee, the script makes no change and exits 2. `/build-feature` stops and tells the user who has the ticket.
- To drop a ticket, the user removes their assignment and the status label.
- `next-task` reads `plan.source` and all issues of the repo. A task is free when the team completed each dependency. Its issue must also have no assignee and no open status label.
- `next-task` groups the free tasks by role, because the people of different roles do different tasks.

## Rationale

- The user decided the claim at the start on 2026-10-08. The grill can take an hour. A claim at the spec stage leaves that hour open to a second person.
- The Roomsie team plan uses the assignee as the claim. The skill makes the claim automatic.
- A script gives the same answer each time. Prose rules in each project give different answers.
- The plan source has the dependencies, and GitHub has the claims. A generator writes the progress note, and it cannot show assignees, because assignees change without a commit.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Claim at the spec stage | The grill window stays without a claim. |
| A rule in the docs of each project | Only that project gets it, and the agent follows prose, not a script. |
| Show the assignees in the progress note | Assignees change without a commit, so the check of the generated files fails at random. |

## Consequences

- `issue-status` accepts `--claim`. Exit code 2 means "claimed by a different person".
- A ticket that the user drops keeps the claim until the user removes it.
- `next-task` needs `plan.source` with `deps`, `issue`, and `role` for each task.

## Revisit when

- The team uses a board, for example GitHub Projects, as the source of claims.

## Sources

- User decision, 2026-10-08, after the Roomsie F-02 ticket.
