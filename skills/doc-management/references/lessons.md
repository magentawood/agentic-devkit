# Lessons

These lessons come from the Roomsie cleanup (2026-09-30, PRs #74–#88). Read them before a `migrate` run, and before a large change to the docs.

## Size and compression

- **Folded callouts do not save agent tokens.** Agents read the raw Markdown. Folded callouts help only humans.
- **STE does not compress dense docs.** Articles and one idea in each sentence add about 5–15%. In Roomsie, STE made the docs about 9% longer. Only structure cuts words: tables, one-line bullets, links, and reasoning that moves into records.
- **Word counts:** count words, not table pipes.

## Rewrites

- **"never" → "do not" makes a claim weaker.** Keep absolute and certainty words: "never", "only", "at most", "if at all possible", "is moving to". Keep words that have no approved STE word with the same meaning: "genuine", "real", "already".
- **The claim inventory says too much.** Before you fix a `weakened` or `added` flag, compare with the file before the rewrite. Many flags were errors in the inventory.
- **Keep headings with no change during a rewrite.** Links and anchors point at them. Use GitHub-style slugs, so that one link works on GitHub, in Obsidian, and in the HTML.
- **Linters must check table cells and callout bodies.** The first version of `ste-lint` skipped the lines that start with `|` and `>`.

## Compaction

- **The tagger tags rules as reasoning.** For example, it tagged "never commit to main" as SUPPORT. A human skims each list of dropped claims.
- **Examples can be specification,** for example a scripted reply or a band boundary case. Do not drop them because they are examples.
- **The tags show contradictions between docs.** Collect them and resolve them with the user. Roomsie found 12 or more.

## Generated files

- **Edit the source, never the output.**
- **The tick state uses the exact text as its key.** When you rewrite checklist text, apply the same before → after map to the notes before you run the generator. If you do not, the ticks disappear and duplicates appear.
- **Duplicated summaries drift.** Roomsie had drift between `product-base.md`, `tech-base.md`, and the records, and between `how-to-work.md` and the plan. Generate each summary from its source.
- **A generated list that grows must not live in a file with a fixed limit.** The size limit counts the generated block. In Roomsie, the Learn index grew in `tech-base.md` with each topic. It moved to `docs/learn/README.md`, and the tech ledger keeps a teaser of fixed length (Roomsie, 2026-10-03, plugin PR #12).

## Git

- **Rebase-merge changes the commit hashes.** Do not write a branch hash into a doc. A `git show <hash>` pointer broke in Roomsie.
- **One commit for each file, stacked PRs, rebase-merge.** Then you can revert one file.
- **Parallel agents on one working tree:** give each agent disjoint files. An agent that must not edit a shared file writes to a log. One step merges the logs after all agents finish.

## Feedback loop

A subsequent grill on a project can change records, standards, and docs. An example is the Roomsie design-system grill, which comes when the designs arrive. That grill updates the project docs through the `doc-architecture` skill. Add each new lesson about the architecture to this file, in a plugin PR, so that the next project gets it. Give each lesson the project, the date, and the PR.

## The plugin repo migration

These lessons come from the dogfood `migrate` on agentic-devkit (2026-10-02, PRs #7–#9).

- **The index is not a glossary.** The plugin `CONTEXT.md` was a glossary, and the skills sent agents to `CONTEXT.md` for the terms. `git mv` the glossary to `docs/glossary.md` first, so that its history follows it. Then write the new index, with a routing row for the terms. Point each skill at the glossary that the routing table gives.
- **A repo that holds the master tools does not copy them.** Its hook and CI call `skills/doc-architecture/scripts/*` directly, and the hook has no check of the tool copies. Keep its hook in step with `templates/pre-commit` by hand.
- **A project with no plan system** gets `"plan": null` in its config.
- **`ste-lint` in the hook only reports.** End the line with `|| true`, so that a finding never blocks a commit.
- **`core.hooksPath` in a git worktree** writes the shared config of the first clone. Unset it before you remove the worktree, or set it only in the first clone.
- **Link the sources of a record with a permalink** to a commit on the default branch. A PRD that moves to the archive, or that loses its Part B, breaks a relative link. A commit of the default branch does not change at merge. A branch hash changes.
- **The fact checkers flag reasons with no source most frequently.** In 22 records, they flagged 17 "Revisit when" lines and some Rationale lines. When the sources give no reason, write "None recorded" or "The sources give no reason". Do not write a likely reason.
- **A part of a decision can have a subsequent date.** Give one date for each part, for example "2026-09-30 (the three levels), 2026-10-01 (the defaults file)".
- **The word total grows when the PRDs stay in the archive.** The records restate the decisions, and the archive keeps the initial text. In Roomsie, the reasoning moved out of the working docs, so the total stayed almost the same.
- **The master tools printed project paths.** `build-decision-ledger --check` and `render-docs --check` told you to run `python3 tools/<name>.py`, also in the plugin repo. After the fix, they print the path of the script that runs.
