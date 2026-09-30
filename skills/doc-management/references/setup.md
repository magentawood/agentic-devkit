# Setup

`/doc-management setup` gives a project the docs architecture. The rules are in [architecture.md](../../doc-architecture/references/architecture.md). Do the steps on a new branch. Never push to the default branch.

## Steps

1. **Read the project.** Read `CLAUDE.md`, `README.md`, `devkit.config.json`, and the list of Markdown files. If the project has docs that do not obey the architecture, stop and tell the user to run `migrate`.

2. **Parts.** All parts are on by default: `index`, `records`, `productRecords`, `ledgers`, `specs`, `journal`, `archive`, `html`, `hook`, `ci`. Ask the user one question with `AskUserQuestion`: "Which parts do you want off?" Put "Keep all parts on (Recommended)" first. Write each part that the user turns off to `docArchitecture.parts` in the project `devkit.config.json`. Do not write the parts that stay on.

3. **Paths and plan.** Use the default paths. If the project already uses a different path, write it to the project config, for example `decisionsPath`. Find the one home of the plan. If you cannot find it, ask the user. Write it to `plan` in the project config.

4. **Folders.** Make each folder of a part that is on. Put a `.gitkeep` in each empty folder.
   - `decisionsPath` (default `docs/decisions/`)
   - `specPath` (default `docs/specs/`)
   - `archivePath` (default `docs/archive/`)
   - The folder of `journalPath` (default `docs/journal/`)

5. **Index.** Make `indexFile` from [../templates/CONTEXT.md](../templates/CONTEXT.md). Fill in what the project is, the routing table, and where things live. Add `@CONTEXT.md` to `CLAUDE.md` if it is not there.

6. **Records.** Make `<decisionsPath>/README.md` from [../templates/decisions-README.md](../templates/decisions-README.md). Copy [../templates/adr.md](../templates/adr.md) and [../templates/pd.md](../templates/pd.md) to `<decisionsPath>/templates/`, so that people without the plugin can use them. Do not make an empty record.

7. **Journal.** Make the file of this month from [../templates/journal-month.md](../templates/journal-month.md).

8. **Limits and tools.** Add `"docBudget": {"overrides": {}}` to the project config. The limits come from the plugin defaults, which `sync-tools` copies to `tools/devkit-defaults.json`. A project rule replaces the default list. Run `${CLAUDE_SKILL_DIR}/scripts/sync-tools <project root>`. It copies the tools, the hook, and CI. It writes the plugin version and the hash of each copy to `docArchitecture` in the project config. With the hook on, it sets `git config core.hooksPath .githooks`. Tell the user that each clone needs this command one time.

9. **Ledgers.** Run `python3 tools/build-decision-ledger.py`. It makes the ledger files and fills the index block.

10. **HTML.** If the user wants browser pages, add each page to `docArchitecture.renderPages`. Then run `python3 tools/render-docs.py`. It needs `pip3 install markdown==3.9`.

11. **Checks.** Run the hook with `DOCS_CHECK_ALL=1 sh .githooks/pre-commit`. All checks must pass.

12. **PR.** Write all new Markdown in STE. Commit one file in each commit. Open the PR. Do not merge it without the approval of the user.

## Exit condition

The hook passes on all files, `sync-tools --check` passes, and the PR is open.
