# Check

`/doc-management check` gives the full report on a project that uses the architecture. The rules are in [architecture.md](../../doc-architecture/references/architecture.md). Nothing runs on a schedule. The user starts each check.

## The cheap checks

The hook and CI run only these checks. Run them first:

| Check | Command | Passes when |
|---|---|---|
| Limits | `python3 tools/doc-budget.py --report` | No file is `OVER` |
| Links | `python3 tools/doc-links.py .` | 0 broken links |
| Ledger drift | `python3 tools/build-decision-ledger.py --check` | 0 stale ledgers |
| Render drift | `python3 tools/render-docs.py --check` | 0 stale pages |
| Tool copies | `${CLAUDE_SKILL_DIR}/scripts/sync-tools --check <project root>` | Each copy is the same as the master |
| Hook activation | `git config core.hooksPath` | It gives `.githooks` in this clone |
| Hook on install | `scripts.prepare` in the root `package.json`, if there is one | It runs `git config core.hooksPath .githooks` |
| Hook on session | `hooks.SessionStart` in `.claude/settings.json` | It runs `git config core.hooksPath .githooks` |

The hook compares each copy with the hash that `sync-tools` recorded. Only `sync-tools --check` compares the copies with the master, because the hook and CI do not have the plugin. With the `hook` part on, `sync-tools --check` also reports the three hook activation rows. A hook that is not on does not stop a bad commit, so report it first.

## The agent checks

Start a blind sub-agent for each group of about ten files. Give each sub-agent the file paths, `architecture.md`, and the list of records. Give disjoint files to each sub-agent. Each sub-agent writes its items to its own scratch file. You merge the files.

Report these items:

1. **Contradictions:** two docs that tell different facts. Give the two lines and the most recent record.
2. **Duplicated facts:** a fact that has more than one home. Give the home and each copy.
3. **Reasoning outside the records:** a working doc, a spec, or the index that gives reasons. Give the record that must get them.
4. **Records without "In one line":** each record that the ledger cannot summarize.
5. **Decisions without a record:** a decision in a working doc that has no record.
6. **Routing gaps:** an area with docs but no row in the routing table.
7. **Stale specs:** a spec of a feature that is complete. It must go to `archivePath`.
8. **Copied plan:** a task list, a date, or an owner that a doc copies from the plan.
9. **Near the limit:** each file above 90% of its limit.
10. **Index links to history:** each index link to the journal or the archive.

## Report

Show one table for the cheap checks and one list for each agent item, with the file and the line. For each item, give the fix in one line. Do not fix the items in the check. The user selects the fixes. Then the fixes go into a PR, with the `doc-architecture` rules.

## `check --sync`

1. Make a branch.
2. Run `${CLAUDE_SKILL_DIR}/scripts/sync-tools <project root>`. It copies the master tools, the hook, and CI, and it records the new plugin version and hashes.
3. Run the cheap checks. A new tool version can find a problem that the previous version did not find. Fix it in the same PR, or tell the user.
4. Open the PR with the list of copies that changed.
