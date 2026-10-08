# Glossary

These are the terms that the skills in this plugin use. Use each term only with the meaning here.

| Term | Meaning |
|---|---|
| Pipeline | The stages of `build-feature`, in order: grill, spec, ticket, implement, review, PR. |
| Stage | One step of the pipeline. Each stage has an exit condition. |
| Gate | A stage change that needs the approval of the user. `approvalGates` in the configuration gives the gates. |
| Merge mode | How the PR merges at the end: `ask` (the default), the user merges, or the agent merges. `mergeMode` in the configuration gives it. |
| Entry point | How `build-feature` starts: from a ticket that exists (for example, `T-13`), or from a new feature. |
| Grill | The stage that asks the user questions until no decision is open. |
| Frontier | The open decisions that have all their prerequisites. The grill asks only about the frontier. |
| Spec | The document that tells what to build and which modules change. |
| Short spec | The spec of a ticket that exists. It is a `## Spec` section in the task note. |
| Environment preflight | The checks before the first line of code: the toolchain versions, the package manager, Docker, permissions, and ports. |
| Seam | The public interface where a test verifies behavior. The user approves the seams at the spec gate. |
| Ticket | One unit of work. One ticket gives one PR. |
| Blocker | A task that must be complete before a different task can start. |
| Plan source | The one file where you edit the plan. A generator makes the task notes from it. `plan.source` in the configuration gives it. |
| Claim | The assignee of the GitHub issue of a ticket. `/build-feature` claims the issue when it starts. A claimed ticket is not free for a different person. |
| Status label | The `status:*` label of a GitHub issue. It shows the stage of the ticket. An issue has one status label at a time. |
| Task note | The Markdown note for one ticket in the Obsidian vault. |
| Done-when list | The checkboxes of a task note. Each checkbox is one acceptance criterion. |
| Block ID | A stable ID at the end of a block in Obsidian, for example `^done`. |
| Tick | To mark a checkbox as done. A tick shows the PR that did the work. |
| Log | The record of a PR in the task note: the date, the PR, the change, the reason, and the ticks. |
| Build journal | The long record of the build, one file for each month. You add entries only at the end. `journalPath` in the configuration gives it. |
| Blind review | A review by a sub-agent that does not get the reasoning of the implementer. |
| Settled facts | The `Decisions` and `Out of scope` lists of the approved spec. Each reviewer gets them as facts, without the reasons. |
| Finding | One problem that a review or a lint tool reports. |
| Rung | One level of the lean-code ladder. |
| Standards path | The folder with the coding rules of the project. `standardsPath` in the configuration gives it. |
| Rule candidate | A mistake that no rule covers yet. It becomes a rule when it occurs a second time. |
| Claim | One fact, rule, case, decision, or reason in a document. |
| Claim inventory | The numbered list of claims in a document before a rewrite. |
| STE | ASD-STE100 Simplified Technical English. |
| Docs architecture | Where each fact lives in the docs of a project, and the size limit of each file. The `doc-architecture` skill guards it. `docArchitecture` in the configuration gives its parts and paths. |
| Index | The always-loaded file, `CONTEXT.md` of the project. It has what the project is, the decisions that are not settled, a routing table, where things live, and the conventions. `indexFile` in the configuration gives it. |
| Routing table | The table in the index that tells which file to read before a task in an area. |
| Decision record | The only home of the reasoning for a decision: an architecture record (ADR, `NNNN-slug.md`) or a product record (PD, `pd-NN[a]-slug.md`). |
| In one line | The one-sentence summary at the start of the Decision section of a record, or below the title of a learn page. The ledgers and the Learn index show it. |
| Working doc | A doc that holds rules only, with a `Why:` link to the record of each rule. |
| Ledger | A generated list of the decision records. `build-decision-ledger` writes it. |
| Learn page | A page that explains one concept to a teammate who was not in the grill. It is in `docArchitecture.learnPath`. |
| Learn index | The generated list of the learn pages, with the "In one line" of each page. `build-decision-ledger` writes it in `docArchitecture.learnIndex` (default `<learnPath>/README.md`). |
| Learn teaser | The generated link to the Learn index and the titles of the newest learn pages. `build-decision-ledger` writes it in `docArchitecture.learnTeaser.file` (default the tech ledger). |
| Explain this question | The last option of each question to the user. It gives a plain-language explanation, then the same question again. |
| Superseded | The mark that the most recent record puts on an older statement that it replaces. |
| Master copy | The copy of a docs tool in the plugin. |
| Tool copy | The copy of a docs tool in a project (`tools/`, `.githooks/`, `.github/workflows/`). `sync-tools` makes it and records its plugin version. |
| Cheap checks | The script checks that the hook and CI run: limits, links, ledger drift, render drift, and tool copies. |
| CORE claim | A decision, rule, number, owner, condition, or open question. It stays in the body of a doc during compaction. |
| SUPPORT claim | A rationale, example, background, or restatement. It moves to a decision record during compaction. |
