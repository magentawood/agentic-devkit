# agentic-devkit

A Claude Code plugin with skills for building and shipping products.

## Skills

| Skill | What it does |
|---|---|
| `ste-writing` | Writes and rewrites Markdown in ASD-STE100 Simplified Technical English. Claude uses it when it writes or edits a `.md` file. |
| `/blog` | Draft a post with Claude, review it in the terminal, then cross-post to dev.to, Reddit, Medium, Substack, LinkedIn and Quora. |

## Install

From GitHub (once pushed):

```
/plugin marketplace add magentawood/agentic-devkit
/plugin install agentic-devkit@agentic-devkit
```

For local development, run Claude Code with the repo as a plugin dir:

```
claude --plugin-dir ~/Projects/agentic-devkit
```

## `ste-writing` setup

The skill needs your own copy of the ASD-STE100 specification. ASD owns it, so it is not in this repository.

1. Get Issue 9 from <https://www.asd-ste100.org/STE_downloads.html>.
2. Save it as `~/.config/agentic-devkit/ASD-STE100_ISSUE9.pdf`.
3. Install poppler: `brew install poppler`.
4. Make the local dictionary cache: `skills/ste-writing/scripts/ste-lint --build-dictionary`.

The two scripts also work without Claude:

```
skills/ste-writing/scripts/ste-lint docs/*.md            # report STE problems
skills/ste-writing/scripts/ste-verify diff git:HEAD:a.md a.md   # prove a rewrite kept links, ids, numbers
skills/ste-writing/scripts/ste-verify links .            # find broken links in a repo
skills/ste-writing/scripts/doc-budget --report           # size of each doc against its limit
```

Shared rules for all skills are in `CONVENTIONS.md`. Credits are in `NOTICE.md`.

## `/blog` in one minute

1. `/blog setup` — answers a few questions, creates `~/.config/blog-agent/`, opens Chrome so you can log in to each site once. Put your dev.to key (and optionally Reddit script-app creds) in `~/.config/blog-agent/.env`.
2. `/blog <topic>` — Claude drafts to `~/blog-posts/<date>-<slug>.md`, prints it, iterates with you.
3. Say yes, and it publishes. Sites without an API (Medium, Substack, LinkedIn, Quora) are driven through a persistent Chrome profile; if a step can't be automated, a blue bar in the browser asks you to finish it and click **Done**.

Standalone use without Claude:

```
cd skills/blog/scripts && npm install
node setup.mjs init --substack yourname --subreddits r/programming
node setup.mjs login
node publish.mjs ~/blog-posts/2026-09-19-my-post.md [--dry-run] [--assist] [--platforms devto,medium]
node doctor.mjs --logins
```

Post file format: see `skills/blog/reference/post-format.md`.

### Caveats

- Medium, Substack and Quora publish through browser automation, which their terms of service frown on. Use `--assist` if you'd rather press Publish yourself.
- Site redesigns can break a selector. Each step falls back to asking you to do it by hand; the adapters live in `skills/blog/scripts/platforms/`.
- Google sign-in sometimes refuses automated Chrome. Use email / magic-link login instead.
