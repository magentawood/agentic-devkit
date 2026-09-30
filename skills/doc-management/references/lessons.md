# Lessons

These lessons come from the Roomsie cleanup (PRs #74–#88). Read them before a `migrate` run, and before a large change to the docs.

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

## Git

- **Rebase-merge changes the commit hashes.** Do not write a branch hash into a doc. A `git show <hash>` pointer broke in Roomsie.
- **One commit for each file, stacked PRs, rebase-merge.** Then you can revert one file.
- **Parallel agents on one working tree:** give each agent disjoint files. An agent that must not edit a shared file writes to a log. One step merges the logs after all agents finish.

## Feedback loop

A subsequent grill on a project can change records, standards, and docs. An example is the Roomsie design-system grill, which comes when the designs arrive. That grill updates the project docs through the `doc-architecture` skill. Add each new lesson about the architecture to this file, in a plugin PR, so that the next project gets it. Give each lesson the project, the date, and the PR.
