# Glossary

These are the terms that the skills in this plugin use. Use each term only with the meaning here.

| Term | Meaning |
|---|---|
| Pipeline | The stages of `build-feature`, in order: grill, spec, ticket, implement, review, PR. |
| Stage | One step of the pipeline. Each stage has an exit condition. |
| Gate | A stage change that needs the approval of the user. `approvalGates` in the configuration gives the gates. |
| Grill | The stage that asks the user questions until no decision is open. |
| Spec | The document that tells what to build and which modules change. |
| Ticket | One unit of work. One ticket gives one PR. |
| Task note | The Markdown note for one ticket in the Obsidian vault. |
| Done-when list | The checkboxes of a task note. Each checkbox is one acceptance criterion. |
| Block ID | A stable ID at the end of a block in Obsidian, for example `^done`. |
| Tick | To mark a checkbox as done. A tick shows the PR that did the work. |
| Log | The record of a PR in the task note: the date, the PR, the change, the reason, and the ticks. |
| Blind review | A review by a sub-agent that does not get the reasoning of the implementer. |
| Finding | One problem that a review or a lint tool reports. |
| Rung | One level of the lean-code ladder. |
| Standards path | The folder with the coding rules of the project. `standardsPath` in the configuration gives it. |
| Rule candidate | A mistake that no rule covers yet. It becomes a rule when it occurs a second time. |
| Claim | One fact, rule, case, decision, or reason in a document. |
| Claim inventory | The numbered list of claims in a document before a rewrite. |
| STE | ASD-STE100 Simplified Technical English. |
