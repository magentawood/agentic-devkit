---
name: blog
description: Draft a blog post with the user, let them review it in the terminal, then cross-post it to dev.to, Reddit, Medium, Substack, LinkedIn and Quora. Use when the user says "/blog", "write a blog post", "publish this post", "cross-post", "post to medium/substack/dev.to/reddit/quora/linkedin", or wants to set up / check the blog publisher.
---

# Blog cross-poster

You draft, the user reviews in the terminal, then a Node + Playwright publisher posts to every platform. dev.to and Reddit go through their APIs; Medium, Substack, LinkedIn and Quora are driven through a logged-in Chrome profile.

## Paths

- `SCRIPTS` = `${CLAUDE_PLUGIN_ROOT}/skills/blog/scripts`. If `CLAUDE_PLUGIN_ROOT` is unset, use the `scripts/` directory next to this file.
- Config and secrets live outside the repo in `~/.config/blog-agent/` (`config.json`, `.env`, `chrome-profile/`).
- Drafts go in `postsDir` from config (default `~/blog-posts`), named `YYYY-MM-DD-<slug>.md`.
- Post format: read `reference/post-format.md` before writing a draft.

## Subcommands (from `$ARGUMENTS`)

| Invocation | What to do |
|---|---|
| `/blog setup` | Run the **Setup** section. |
| `/blog doctor` | Run `node SCRIPTS/doctor.mjs --logins` and report. |
| `/blog publish <file>` | Skip drafting; go to **Confirm** with that file. |
| `/blog <topic>` or `/blog` | Full flow below. |

## Preflight (every run)

1. If `SCRIPTS/node_modules/playwright` is missing, run `npm install --prefix SCRIPTS`.
2. Run `node SCRIPTS/doctor.mjs`. If `config.json` is missing, do **Setup** first. Warn about (but do not stop on) missing dev.to key or Substack publication if those platforms are not wanted this time.

## Setup (first time)

Ask **one question at a time** and wait for each answer. Never batch questions.

1. Substack publication subdomain (`yourname` for yourname.substack.com) or custom-domain URL. Skip if they don't use Substack.
2. Default subreddits to post to (optional).
3. LinkedIn default: `article` (long-form) or `post` (feed post with a teaser).
4. Drafts folder (default `~/blog-posts`).

Then:
- `node SCRIPTS/setup.mjs init --substack <pub> --subreddits <a,b> --linkedin-mode <mode> --posts-dir <dir>` (omit flags that weren't answered).
- Tell the user to put `DEVTO_API_KEY` (from https://dev.to/settings/extensions) and optionally `REDDIT_*` (script app from https://www.reddit.com/prefs/apps) into `~/.config/blog-agent/.env`. Reddit falls back to the browser if those are blank, which is also the route for 2FA accounts.
- Run `node SCRIPTS/setup.mjs login` with a 20-minute timeout. It opens Chrome with one tab per site and returns once each login is detected. Tell the user to log in there, and that if Google sign-in refuses the browser they should use email / magic link instead.

## Flow

### 1. Brief
Ask one question at a time, only the ones not already answered by the user's message: topic → audience and angle → length and tone → which platforms (default: all configured). If they gave a topic and say "just write it", skip straight to drafting with sensible defaults.

### 2. Draft
Write the post to `postsDir/YYYY-MM-DD-<slug>.md` in the format from `reference/post-format.md`. Keep the body in clean GitHub-flavored markdown (headings, lists, fenced code). No front-loaded title in the body; the title lives in frontmatter.

Then print the **entire** file to the terminal with `cat` so the user reviews it there. Ask a single question: "What should change?" Edit the file in place and reprint the changed sections (or the whole thing if short) until they say it's good.

### 3. Platform variants
Once the body is approved, fill the per-platform fields in the frontmatter and show them to the user:
- `tags`: up to 4, lowercase alphanumeric (dev.to rejects anything else).
- `reddit.subreddits` and a `reddit.body` that reads like a Reddit post: conversational, no marketing tone, mention it's a write-up, keep links minimal. Ask which subreddits if none are configured.
- `linkedin.post_text` (under 1300 chars) when LinkedIn mode is `post`, or as the share text for an article.
- `quora.title` phrased as something a Quora reader would search for, if the original title is too blog-ish.
- `canonical_url` if the user has a home for the post (their own site); otherwise leave empty.

### 4. Confirm
Show a short table: platform → target (subreddits, Substack publication, LinkedIn mode). Run `node SCRIPTS/publish.mjs <file> --dry-run` and show its summary. Then ask exactly one yes/no question: publish now? Offer `--assist` (the editors get filled but the user presses Publish) as the alternative. **Never publish without an explicit yes.**

### 5. Publish
Run the publisher in the **foreground** so its output comes back to you, one call per browser platform so each stays inside the tool timeout:

```
node SCRIPTS/publish.mjs <file> --platforms devto,reddit          # API platforms together
node SCRIPTS/publish.mjs <file> --platforms medium                # then each browser platform
node SCRIPTS/publish.mjs <file> --platforms substack
...
```
Use a 600000 ms timeout for each browser call. Before the first browser call, tell the user: a Chrome window will open; don't touch it unless a blue bar at the top asks them to finish a step and click **Done** (or **Skip**). The script never waits on terminal input.

If a call exits non-zero, read the `RESULT` line, report what failed, and offer to retry that platform with `--platforms <p> --force` or `--assist`.

### 6. Report
Parse the final `RESULT` JSON lines and show one table: platform → URL or error. The URLs are also written under `published:` in the post's frontmatter, so a re-run skips platforms already done unless `--force` is passed.

## Rules
- One question per turn during brief, review, and setup.
- Never edit the `published:` block by hand; the script owns it.
- Never run `publish.mjs` in the background or with `--headless` unless the user asks; browser steps may need them.
- If a site's editor has changed and a step keeps failing, say so plainly and point at the adapter file (`SCRIPTS/platforms/<platform>.mjs`) rather than retrying blindly.
