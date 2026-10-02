# 0014 — STE for all Markdown, with the user's own copy of the specification

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

The plugin and each project write many Markdown files: specs, task notes, standards, records, and PR descriptions. Agents and humans read them. ASD owns the ASD-STE100 specification and its dictionary.

## Decision

**In one line:** `ste-writing` keeps each Markdown file in STE, and its word check uses the user's ASD copy, which never goes into a repo.

- `ste-writing` is model-invoked. It loads on each `.md` create or edit. It owns the language: how you write a sentence.
- The rules:
  - A sentence has at most 20 words in a procedure, and at most 25 words in a description.
  - A paragraph has at most six sentences.
  - Active voice, simple tenses, and instructions in the imperative.
  - One word has one meaning.
  - No -ing forms and no phrasal verbs.
  - A noun cluster has at most three words.
  - Vertical lists, and warnings before the step.
- STE does not apply to code blocks, quoted text, frontmatter keys, and file paths.
- `references/ste-rules.md` is a summary in our own words. It does not copy the dictionary, and it invents no dictionary entries.
- `ste-lint` only reports. The agent fixes the text, or keeps it and gives the reason in one line.
- Each user gets Issue 9 from ASD and saves it at `~/.config/agentic-devkit/ASD-STE100_ISSUE9.pdf` (`steSpecPdf` in the user configuration). `ste-lint --build-dictionary` makes the cache `~/.config/agentic-devkit/ste-dictionary.json`. The specification and the cache never go into a repository.
- The spelling comes from `ste.spelling` in the configuration: `american` by default, `british` in Roomsie. `ste.allowWords` gives the approved technical names of a project.

## Rationale

- ASD owns the specification and its dictionary. Thus each user gets a copy, and the copy stays on the machine of that user.
- STE gives one word one meaning, short sentences, and clear steps, so all readers, human and agent, can read the files easily.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Commit the specification or its dictionary to the plugin | ASD owns them. |

## Consequences

- A user without the PDF gets no word check. The other `ste-lint` checks run.
- `NOTICE.md` and `README.md` tell each user where to get the specification.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A "Goal" and §6 "ste-writing skill", Part B "Config" (Roomsie `ste.spelling`), and Part C (2026-09-30).
- [PR #1](https://github.com/magentawood/agentic-devkit/pull/1): the `ste-writing` skill.
- [ste-writing SKILL.md](../../skills/ste-writing/SKILL.md) and [ste-rules.md](../../skills/ste-writing/references/ste-rules.md).
- [NOTICE.md](../../NOTICE.md) and [README.md](../../README.md), "`ste-writing` setup".
