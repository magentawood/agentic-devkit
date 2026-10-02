# Migrate

`/doc-management migrate` moves the docs of a project into the architecture. The rules are in [architecture.md](../../doc-architecture/references/architecture.md). Read [lessons.md](lessons.md) before you start. The pipeline comes from the Roomsie cleanup (PRs #74–#88).

## Rules for the run

- **Keep all content.** Content moves. You do not delete it. The total word count stays almost the same.
- **One commit for each file,** so that `git revert` can undo one file.
- **Stacked PRs:** one PR for each stage, based on the PR of the stage before it. Merge with rebase-merge.
- **0 broken links after each stage.** Run `doc-links` at the end of each stage.
- **Blind sub-agents** get only the files that their task names. They do not get your reasoning. Give each parallel sub-agent disjoint files.
- **Stops for approval.** Stop at these three points. Do not continue without the approval of the user:
  1. The plan, after stage 1.
  2. Each contradiction between docs, one at a time, with `AskUserQuestion`.
  3. The stacked PRs, before merge.

## Stages

### 1. Inventory

1. List each doc. Measure its words and tokens with `doc-budget --report`.
2. Find the files that each session loads: `CLAUDE.md` and each file that it imports.
3. Count the references to each file with `doc-links`, and find each ID scheme (for example `D0`, `ADR-0006`).
4. Write the plan: the moves, the renames, the file divisions, the new records, and the word counts before.

**Stop 1:** show the plan to the user. Continue only after approval.

### 2. Moves and renames

1. Move each file to its home in the architecture. If the index file holds a glossary, first `git mv` it to a glossary doc. Then the history follows the glossary. Then write the new index, with a routing row for the terms.
2. Rename each ID that clashes with a different scheme. Roomsie renamed `D0`–`D13` to `PD0`–`PD13`, because `D-` was also used for design tasks.
3. Fix each link. `doc-links` must show 0 broken links.

### 3. Formats

1. Convert each HTML or PDF source to Markdown.
2. Prove that you keep all content: compare the text that a reader sees in the two versions, word by word. Only page chrome can go.
3. If the project wants browser pages, add them to `renderPages` and run `render-docs`.

### 4. STE rewrite (optional)

Ask the user if they want the rewrite. For each file, obey the rewrite procedure of `ste-writing`:

1. A first sub-agent writes the claim inventory of the file.
2. You rewrite the file. The claim check is blind, so it does not need a different writer.
3. A second, blind sub-agent gets only the claims and the new file. For each claim it gives `present`, `weakened`, or `missing`. It lists each `added` statement.
4. Fix each item. Then do a second blind check of the fixed claims.

### 5. Compaction

1. A sub-agent tags each claim **CORE** or **SUPPORT**.
   - CORE: a decision, a rule, a number, an owner, a condition, or an open question.
   - SUPPORT: a rationale, an example, background, or a restatement.
2. CORE stays in the body of the doc. SUPPORT moves to `<archivePath>/migrate-support-log.md`, with one section for each decision. Commit the log in the stage 5 PR. The limits do not apply to it. Stage 6 puts its content into the records, and stage 7 deletes it.
3. A human skims each list of SUPPORT claims that moves. The tagger can tag a rule as reasoning.
4. A blind sub-agent confirms that each CORE claim is in the body of the doc.
5. Collect each contradiction between docs that the tags show. Also collect each contradiction that stages 6 and 7 find, and ask about it in the same way.

**Stop 2:** ask the user about each contradiction, one at a time, with `AskUserQuestion`. Give the two statements, their sources and dates. Put the most recent record first as "(Recommended)". End with "Explain this question", as "Questions to the user" in [CONVENTIONS.md](../../../CONVENTIONS.md#questions-to-the-user) tells. The record that wins marks the older statement "Superseded:".

### 6. Records

1. Make one record for each decision from all sources and from the SUPPORT log of stage 5. Use [../templates/adr.md](../templates/adr.md) or [../templates/pd.md](../templates/pd.md). Each record gets its `**In one line:**` summary.
2. Two fact-check sub-agents trace each statement in each record back to a source. In Roomsie they found 9 problems in 22 records: an invented detail, an incorrect owner, stale numbers, and incorrect statuses.
3. Fix each problem. Remove each statement with no source.

### 7. Why → links

1. In each working doc, replace the reasoning with `Why: [ID](link)`.
2. Log each reason that the record does not have. Merge it into the record. Remove the duplicates. If it conflicts with the decision of the record, ask the user as in stop 2. Recommend the record.
3. Delete `<archivePath>/migrate-support-log.md` when each of its sections is in a record.

### 8. Splits, ledgers and limits

1. Divide each file that is above its limit, by topic.
2. Do steps 2–8 of [setup.md](setup.md). They set the parts, the paths, the plan, the folders, the templates, the limits, and the tools. Add the `<!-- decisions:start -->` and `<!-- decisions:end -->` markers to the index.
3. Run `build-decision-ledger`.
4. Cut the index to 1,500 tokens or less. It keeps the routing table and links, not the text.
5. Move the history to the journal and the archive.
6. Add an override only for a file that you cannot divide in this run. An override is a ceiling.
7. Run the hook on all files: `DOCS_CHECK_ALL=1 sh .githooks/pre-commit`.

## Report

Add a table to each PR: file, words before, words after, and the result of each check. For the full run, give the totals: the index tokens, the working-doc words, the record words, and all words before and after. In Roomsie, the index went from 5,829 to 1,302 tokens, and all docs went from 59,487 to 59,530 words.

**Stop 3:** show the stacked PRs to the user. Merge only after approval, with rebase-merge, in the order of the stack.

## Exit condition

All cheap checks pass on the last PR. The user approved the plan, each contradiction, and the PRs. Each new lesson is in [lessons.md](lessons.md).
