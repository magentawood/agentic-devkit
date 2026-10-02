# Setup

`/doc-management setup` gives a project the docs architecture. The rules are in [architecture.md](../../doc-architecture/references/architecture.md). Do the steps on a new branch. Never push to the default branch.

## Steps

1. **Read the project.** Read `CLAUDE.md`, `README.md`, `devkit.config.json`, and the list of Markdown files. If the project has docs that do not obey the architecture, stop and tell the user to run `migrate`.

2. **Parts.** All parts are on by default: `index`, `records`, `productRecords`, `ledgers`, `specs`, `journal`, `archive`, `html`, `learn`, `hook`, `ci`. Ask the user one question with `AskUserQuestion`: "Which parts do you want off?" Put "Keep all parts on (Recommended)" first. Obey "Questions to the user" in [CONVENTIONS.md](../../../CONVENTIONS.md#questions-to-the-user), with its "Explain this question" option. Write each part that the user turns off to `docArchitecture.parts` in the project `devkit.config.json`. Do not write the parts that stay on.

3. **Paths and plan.** Use the default paths. If the project already uses a different path, write it to the project config, for example `decisionsPath`. Find the one home of the plan. If you cannot find it, ask the user. Write it to `plan` in the project config. If the project has no plan system, write `"plan": null`. If the project has a plan generator, write its command to `plan.build`. The command must accept `--check` ([ADR-0026](../../../docs/decisions/0026-rebuild-the-plan-in-the-pr.md)).

4. **Folders.** Make each folder of a part that is on. Put a `.gitkeep` in each empty folder.
   - `decisionsPath` (default `docs/decisions/`)
   - `specPath` (default `docs/specs/`)
   - `archivePath` (default `docs/archive/`)
   - The folder of `journalPath` (default `docs/journal/`)
   - `learnPath` (default `docs/learn/`), for the learn pages

5. **Index.** Make `indexFile` from [../templates/CONTEXT.md](../templates/CONTEXT.md). Fill in what the project is, the routing table, and where things live. Add `@CONTEXT.md` to `CLAUDE.md` if it is not there.

6. **Records.** Make `<decisionsPath>/README.md` from [../templates/decisions-README.md](../templates/decisions-README.md). Copy [../templates/adr.md](../templates/adr.md) and [../templates/pd.md](../templates/pd.md) to `<decisionsPath>/templates/`, so that people without the plugin can use them. Do not make an empty record.

7. **Journal.** Make the file of this month from [../templates/journal-month.md](../templates/journal-month.md).

8. **Limits and tools.** Add `"docBudget": {"overrides": {}}` to the project config. The limits come from the plugin defaults file, `${CLAUDE_PLUGIN_ROOT}/defaults/devkit.defaults.json`. `sync-tools` copies this file to `tools/devkit-defaults.json`, so the tool copies work without the plugin. A project `rules` list replaces the full default list. Run `${CLAUDE_SKILL_DIR}/scripts/sync-tools --recommend-plugin <project root>`. It copies the tools, the hook, and CI. It writes the plugin version and the hash of each copy to `docArchitecture` in the project config.

9. **Hook activation.** Git never runs the hooks of a clone by itself. With the `hook` part on, `sync-tools` turns on the hook. If the project uses husky, see "With husky" below. If not, `sync-tools` turns on the hook in three ways. It merges each change with the values that are there. It never overwrites them.
   - It runs `git config core.hooksPath .githooks` for this clone.
   - It adds `git config core.hooksPath .githooks` to `scripts.prepare` of the root `package.json`, if the project has one. Each install with npm, pnpm, or yarn runs `prepare`. If `prepare` exists, `sync-tools` adds the command after it with `&&`. If `prepare` uses husky or sets `core.hooksPath`, `sync-tools` does not change it. The two hook folders are in conflict. Ask the user which folder to keep.
   - It adds a Claude Code `SessionStart` hook to `.claude/settings.json`: `cd "$CLAUDE_PROJECT_DIR" && git config core.hooksPath .githooks`. Commit this file, so that each session of each clone turns on the hook.

   Keep the fallback line in the conventions of the index: "If the hook does not run, run `git config core.hooksPath .githooks` one time."

   **With husky.** The project uses husky if it has one of these:
   - A `.husky/` folder.
   - `husky` in `devDependencies` or `dependencies` of the root `package.json`.
   - A `core.hooksPath` in `.husky`.

   Husky owns `core.hooksPath`. Thus `sync-tools` does not change `core.hooksPath`, `scripts.prepare`, or the `SessionStart` hook. It adds this line to `.husky/pre-commit` one time: `sh .githooks/pre-commit`. It keeps the text that is in the file.

   If `.husky/pre-commit` does not exist, `sync-tools` makes it. It makes the file executable. `.githooks/pre-commit` stays the only home of the checks. Commit `.husky/pre-commit`. Do not add the fallback line to the index.

10. **Plugin.** `--recommend-plugin` adds this plugin to `.claude/settings.json`, so that Claude Code offers it to each person who opens the project:

    ```json
    {
      "extraKnownMarketplaces": {
        "agentic-devkit": {"source": {"source": "github", "repo": "magentawood/agentic-devkit"}}
      },
      "enabledPlugins": {"agentic-devkit@agentic-devkit": true}
    }
    ```

    Claude Code reads `extraKnownMarketplaces` only after the person trusts the folder. Each person installs the plugin one time. If `enabledPlugins` has the plugin, `sync-tools` keeps its value.

11. **Ledgers.** Run `python3 tools/build-decision-ledger.py`. It makes the ledger files and fills the index block. With the `learn` part on, it also writes two Learn blocks:
   - The Learn index lists each learn page with its "In one line" line. It goes between `<!-- learn:start -->` and `<!-- learn:end -->` in `learnIndex` (default `<learnPath>/README.md`). If the file does not exist, the script makes it with a heading.
   - The teaser links the Learn index and gives the titles of the `count` newest pages. It goes between `<!-- learn-newest:start -->` and `<!-- learn-newest:end -->` in `learnTeaser.file` (default `{ledgers.tech}`, the tech ledger). `learnTeaser.count` is 5 by default. The newest page has the most recent date in its `## Tickets` section. Pages with the same date sort by title. Pages with no date go after the dated pages, by title. A count of 0 or a file of `null` turns off the teaser. In the teaser file, the teaser markers replace a Learn index block of version 0.2.0.
   - The script always fills the markers that are in a file. If the markers or the file are missing, it adds them at the end of the file. It does this only when `learnPath` has a learn page. You can move the markers to a different place in that file.

12. **HTML.** If the user wants browser pages, add each page to `docArchitecture.renderPages`. For the learn pages, add the glob `<learnPath>/*.md`. Then run `python3 tools/render-docs.py`. It needs `pip3 install markdown==3.9`.

13. **Checks.** Run the hook with `DOCS_CHECK_ALL=1 sh .githooks/pre-commit`. All checks must pass.

14. **PR.** Write all new Markdown in STE. Commit one file in each commit. Open the PR. Do not merge it without the approval of the user.

## Exit condition

The hook passes on all files, `sync-tools --check` passes, and the PR is open. `sync-tools --check` also fails when a way to turn on the hook is missing. It checks `core.hooksPath` only in a git clone. With husky, it checks only the line in `.husky/pre-commit`.
