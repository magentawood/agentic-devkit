# agentic-devkit

A Claude Code plugin with skills for building and shipping products.

## Skills

| Skill | What it does |
|---|---|
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
