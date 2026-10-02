# Tickets

> **Draft.** The Roomsie T-02 POC used a ticket that exists, so it did not test this stage. Finalize after the first `/build-feature` run on a new feature.

This stage divides a new feature into tickets. For a ticket that exists, do not do this stage. Adapted from `to-tickets` (see NOTICE.md).

## Rules

- Make vertical slices (tracer bullets). Each slice goes through all the layers: schema, API, UI, and tests. You can show or verify each slice alone.
- One ticket gives one PR. Each ticket must fit in one new context window.
- Put the prefactor tickets first. Make the change easy, then make the easy change.
- Give each ticket its blockers: the tickets that must be complete before it can start.
- A wide refactor is the exception to vertical slices. Divide it into expand, migrate batches, and contract. The expand blocks each migrate batch. All the migrate batches block the contract.
- Each acceptance criterion becomes one `## Done when` item. Write each item as a result that a person can verify.

## Steps

1. Show the list of tickets to the user. For each ticket, give the title, the blockers, and the result from the view of the user.
2. Ask the user about the size and the blockers, one question at a time (see "Questions to the user" in CONVENTIONS.md). Change the list until the user approves it.
3. Add the tickets to the plan source (`plan.source`). Do not edit the generated task notes. Obey the format of the tasks that exist in the plan source.
4. Run the generator (`plan.build`). Then run the issue sync script (`plan.syncIssues`). The sync script makes one GitHub issue for each ticket.
5. Set `status:spec` on each new issue with `issue-status`.

## Exit condition

Each ticket has a task note with a `## Done when` list, and a GitHub issue. The user approved the list of tickets.
