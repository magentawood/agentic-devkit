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
| Seam | The public interface where a test verifies behavior. The user approves the seams at the spec gate. |
| Ticket | One unit of work. One ticket gives one PR. |
| Blocker | A task that must be complete before a different task can start. |
| Plan source | The one file where you edit the plan. A generator makes the task notes from it. `plan.source` in the configuration gives it. |
| Status label | The `status:*` label of a GitHub issue. It shows the stage of the ticket. An issue has one status label at a time. |
| Task note | The Markdown note for one ticket in the Obsidian vault. |
| Done-when list | The checkboxes of a task note. Each checkbox is one acceptance criterion. |
| Block ID | A stable ID at the end of a block in Obsidian, for example `^done`. |
| Tick | To mark a checkbox as done. A tick shows the PR that did the work. |
| Log | The record of a PR in the task note: the date, the PR, the change, the reason, and the ticks. |
| Build journal | The long record of the build, one file for each month. You add entries only at the end. `journalPath` in the configuration gives it. |
| Blind review | A review by a sub-agent that does not get the reasoning of the implementer. |
| Finding | One problem that a review or a lint tool reports. |
| Rung | One level of the lean-code ladder. |
| Standards path | The folder with the coding rules of the project. `standardsPath` in the configuration gives it. |
| Rule candidate | A mistake that no rule covers yet. It becomes a rule when it occurs a second time. |
| Claim | One fact, rule, case, decision, or reason in a document. |
| Claim inventory | The numbered list of claims in a document before a rewrite. |
| STE | ASD-STE100 Simplified Technical English. |
