# Input notes for the doc-management skill PRD

**Status:** raw notes, to turn into a PRD (grill with the user first) · **Date:** 2026-09-30

These notes record what we did to the Roomsie docs (PRs #74–#88), so a reusable skill can do it for another project. The PRD is not written yet.

## The goals (the user's words, in order)

1. Keep the agent context window free for real programming work. The project will get more files and bigger files, so stop the docs from growing.
2. Make the docs easy to read and understand for agents and humans, so nobody is confused.

## What worked: the final structure

- **Always-loaded index** (`CONTEXT.md`, imported by `CLAUDE.md`): ≤1,500 tokens. It gives what the product is, the decisions that are not settled (generated), a **routing table** "when your task touches X, read Y first", where things live, and the conventions. Roomsie: 6,200 → 1,300 tokens.
- **Decision records are the only home of reasoning:** ADRs + one file per product decision (`pd-NN-slug.md`, ADR format: Context, Decision with an `**In one line:**` summary, Rationale, Alternatives rejected, Consequences, Revisit when, Sources). ≤1,200 words each.
- **Working docs hold rules only,** with one link line per section: `Why: [PD7a](decisions/pd-07a-…md)`. ≤1,200 words each.
- **Ledgers are generated** from the records (`tools/build-decision-ledger.py` writes CONTEXT's block and the product/tech ledger pages). `--check` fails on drift.
- **The plan lives only in the plan** (`team-plan.json` → generated notes, Progress, issues). Docs link, never copy task lists.
- **History is outside the limits:** a journal with one file per month, and `docs/archive/`. The index never links them.
- **Size limits enforced:** `doc-budget` (limits in `devkit.config.json`; `overrides` = a per-file ceiling that can shrink, not grow) in a versioned pre-commit hook (`.githooks/pre-commit`, turned on with `git config core.hooksPath .githooks`) + CI. The hook also runs the ledger and HTML-render `--check`s.
- **One fact, one home.** Resolve contradictions with "most recent decision record wins"; mark the older statement "Superseded:" in the record.
- **Markdown is the source; HTML is generated** (`tools/render-docs.py`, folded callouts → `<details>`).

## The pipeline we ran (roughly the skill's stages)

1. **Inventory:** list every doc, measure words and tokens, find the always-loaded files, count the references (`ste-verify links`).
2. **Moves and renames:** move files to their home, rename clashing IDs (Roomsie: D0–D13 → PD0–PD13 because D- was also design tasks and ADRs), fix every link. A link checker must show 0 broken links after each step.
3. **Formats:** convert HTML/PDF sources to Markdown (word-by-word visible-text diff to prove no loss; only page chrome may go), add a renderer for HTML.
4. **STE rewrite** (optional, per project): per file, a claim inventory by one agent → a rewrite by a second → a **blind** claim check by a third (claims + new file only) → fix → a second blind check of the fixed claims. Result in Roomsie: 0 of ~7,100 claims lost, ~100 drifts caught. STE made the docs ~9% LONGER.
5. **Compaction:** tag each claim CORE (decision, rule, number, owner, condition, open question) or SUPPORT (rationale, example, background, restatement). CORE stays in the main text; SUPPORT moves. A blind check confirms that all CORE claims are in the main text.
6. **Decision records:** create one record per decision from all the sources; two fact-check agents trace each statement back to a source (found 9 problems in 22 records: an invented detail, a wrong owner, stale numbers, wrong statuses).
7. **Why → links:** replace the reasoning in working docs with links; log any reasoning that a record lacks; merge it into the record (dedupe; conflicts: the record's decision wins).
8. **Split oversized docs** by topic; generate the ledgers; cut the index; move history out; set the limits and the hook.

## Lessons (put these in the skill)

- **Folded callouts do not save agent tokens.** Agents read raw Markdown. They only help humans.
- **STE does not compress** dense docs: articles and one idea per sentence add ~5–15%. Only structure (tables, one-line bullets, links) and moving reasoning out cut words.
- **"never" → "do not" weakens a claim.** Keep absolute and certainty words ("never", "only", "at most", "if at all possible", "is moving to"). Keep words with no approved equivalent ("genuine", "real", "already").
- **The claim inventory over-reaches.** Before you fix a "weakened" or "added" flag, compare with the ORIGINAL file; many flags were inventory errors.
- **The tagger mislabels rules as reasoning** (e.g. "never commit to main" tagged SUPPORT). A human skims each dropped list.
- **Examples can be specification** (a scripted reply, a band boundary case). Do not drop them as "examples".
- **Generated files:** edit the source, never the output. Tick state keyed on exact text: when you rewrite checklist text, apply the same old→new mapping to the existing notes BEFORE you regenerate, or the ticks are lost and duplicates appear.
- **Rebase-merge changes commit hashes;** do not write a branch hash into a doc (a `git show <hash>` pointer broke).
- **Keep headings exact during rewrites;** links and anchors point at them. Use GitHub-style slugs so one link works on GitHub, Obsidian and HTML.
- **Linters:** check table cells and callout bodies too (the first version skipped `|` and `>` lines). Word counts: count words, not table pipes.
- **Parallel agents on one working tree:** give each agent disjoint files; agents that must not edit a shared file write to a log that one step merges after.
- **Per-file revertibility:** one commit per file; stacked PRs; rebase-merge.
- **Cross-document contradictions surface during tagging** — collect them and resolve with the user (Roomsie found 12+).
- **Duplicated summaries drift** (product-base/tech-base vs records; how-to-work vs the plan). Generate summaries from the source instead.

## Tools already built (reuse in the skill)

In `skills/ste-writing/scripts/`: `ste-lint` (STE rules + dictionary from the user's ASD copy), `ste-verify diff` (links, anchors, headings, code, ids, numbers must match) and `ste-verify links` (repo-wide link check, wikilinks, `^block` and `#heading` anchors), `doc-budget` (limits, `--changed`, `--staged`, `--report`, overrides as ceilings). In Roomsie `tools/`: `render-docs.py`, `build-decision-ledger.py`, `doc-budget.py` (copy for CI), `.githooks/pre-commit`. One-off scripts (not saved): html→md converter, visible-text word diff, claim-tag scripts.

## Numbers from Roomsie

- Always loaded: 5,829 → 1,302 tokens. Working docs: 22,009 → 14,595 words (the largest 3,920 → 652). Decision records: 10,106 → 26,636 words (the reasoning moved in). Ledgers: 9,836 → 1,733 words. All docs: 59,487 → 59,530 words (nothing lost, only moved).

## Open questions for the PRD grill

- Name: `doc-management`, `/docs-cleanup`, `/context-budget`? User-invoked (a run) plus model-invoked rules (the context budget is already in CONVENTIONS.md)?
- Which stages are optional (STE rewrite, HTML generation, the ledger generator)?
- How much is project-specific (plan generator, issue sync) versus generic?
- Should the skill scaffold the tools (`build-decision-ledger.py`, the hook) into a new project, or ship them in the plugin and have the project call them?
- How does it relate to `ste-writing` and `/build-feature` (which must follow the same rules on every change)?
