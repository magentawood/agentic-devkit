# PR

This stage writes the learn pages, the ticks, the generated plan files, the log, and the journal entry. Then it opens the PR. The Roomsie T-02 POC confirmed these rules (2026-10-03).

## Learn pages

A teammate who was not in the grill must understand each concept of the ticket. Each concept that you explained or researched in the ticket gets a learn page. In T-02, these were five concepts. Examples are a Postgres driver, local development with Docker, and pnpm through Corepack.

1. Find the concepts in your notes from the grill (each "Explain this question"), the implement stage, and the review.
2. For each concept, look in `docArchitecture.learnPath` (default `docs/learn/`) for a page on the same topic. If one exists, update it. Do not make a second page on one topic.
3. Make each new page from `${CLAUDE_PLUGIN_ROOT}/skills/doc-architecture/templates/learn.md`. Obey the rules of a learn page in the `doc-architecture` skill. Link the decision record or this PR for the choice. Do not copy the reasons of a decision.
4. Run `build-decision-ledger`. It writes the Learn index in `docArchitecture.learnIndex`. If the project renders the learn pages, run `render-docs`.
5. Link each new or updated page from the `Learn:` line of the `## Log` entry and from the PR "Changes" section.

If `docArchitecture.parts.learn` is off, do not do this section.

## Ticks, log, and journal

1. Tick the done items with `${CLAUDE_SKILL_DIR}/scripts/tick`.
2. Add the `## Log` entry to the task note with [../templates/task-note-section.md](../templates/task-note-section.md).
3. Add the journal entry at the end of the file that `journalPath` gives.
4. If the project config has `plan.build`, run it. The generator updates the counts and the status marks in `plan.progressNote` and the other generated plan files. Why: [ADR-0026](../../../docs/decisions/0026-rebuild-the-plan-in-the-pr.md).

These steps need the PR number. You can predict it before the PR exists, so that one commit has all of them:

1. Get the highest number: `gh issue list --state all --limit 1 --json number` and `gh pr list --state all --limit 1 --json number`. Issues and PRs use one sequence. The PR number is the highest number plus 1. A discussion also uses the sequence, so verify the number in step 3.
2. Use the predicted number in the ticks, the log, and the journal. Commit them together with the generated plan files.
3. After `gh pr create`, compare the number of the PR with the prediction. If they are different, fix each link and number. Then run `plan.build` again, and push one more commit.

The hook runs `<plan.build> --check`. It fails when a generated plan file is stale.

## PR draft

1. Write the PR description with [../templates/pr-template.md](../templates/pr-template.md), in STE.
2. Print the complete text of the PR draft in your reply, in one fenced Markdown block. Copy it word for word. Do not give a summary. Why: [ADR-0023](../../../docs/decisions/0023-print-the-complete-text-at-a-gate.md).
3. Ask for approval. This stage is a gate by default (`pr` in `approvalGates`).
4. If you change the text after the user reads it, print the new text again before you ask.
5. Push the branch and run `gh pr create`. Set `status:in-review` with `issue-status`.

## Exit condition

The PR is open, and its number agrees with each link. The learn pages, the ticks, the generated plan files, the log, and the journal entry are in the PR.
