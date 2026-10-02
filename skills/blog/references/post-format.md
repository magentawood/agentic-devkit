# Post file format

One markdown file per post, YAML frontmatter + GitHub-flavored markdown body. Everything except `title` is optional.

```markdown
---
title: Why I stopped mocking my database
subtitle: Integration tests were cheaper than I thought          # dev.to description, Substack subtitle, Medium H2
tags: [testing, postgres, node]                                    # ≤4, lowercase alphanumeric (dev.to rule); Medium takes ≤5
canonical_url: https://yoursite.com/posts/stop-mocking-db          # optional; sent to dev.to
platforms: [devto, reddit, medium, substack, linkedin, quora]      # default: config.platforms
draft: false                                                       # true → dev.to saves unpublished

devto:
  series: Testing in practice                                      # optional

reddit:
  subreddits: [r/node, r/programming]                              # required unless config.reddit.defaultSubreddits
  title: I replaced every DB mock with a real Postgres and tests got faster   # optional override
  body: |                                                          # optional: a reddit-flavoured version of the post
    Wrote up how I ...
  flair_id: abc123                                                 # optional, API route only

linkedin:
  mode: article                                                    # article | post   (default: config.linkedin.mode)
  post_text: |                                                     # feed post text (mode=post) or share text (mode=article)
    Mocks lied to me for two years...

medium:
  tags: [Testing, Postgres]                                        # optional override
substack:
  subtitle: ...                                                    # optional override
quora:
  title: Should you mock your database in tests?                   # optional override, question-shaped works best

published: {}                                                      # written by publish.mjs, do not edit
---

Body in markdown. Headings, lists, links, images by URL and fenced code blocks all convert.
```

Per-platform override keys: `title`, `body`, and where noted `tags`, `subtitle`, `series`, `flair_id`, `post_text`, `mode`.
Anything not overridden falls back to the top-level field.

After publishing, `published` looks like:

```yaml
published:
  devto: { url: https://dev.to/you/slug, id: 123, at: 2026-09-19T10:00:00.000Z }
  reddit: { url: https://www.reddit.com/r/node/comments/..., urls: [...], via: api, at: ... }
  medium: { url: https://medium.com/@you/slug-abc, at: ... }
```
