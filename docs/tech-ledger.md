# Architecture decisions

Generated from the decision records in [decisions/](decisions/README.md). Edit the records, not this list. Run `skills/doc-architecture/scripts/build-decision-ledger`.

<!-- ledger:start -->
| ID | Decision | Status | In one line |
|---|---|---|---|
| [ADR-0001](decisions/0001-plugin-layout-and-skill-format.md) | Plugin layout and skill format | Accepted | Each skill is `skills/<name>/SKILL.md` with `metadata.version`, eight body sections in a fixed order, and no `commands/` folder. |
| [ADR-0002](decisions/0002-skill-types-and-the-call-rule.md) | Skill types and the call rule | Accepted | A skill is user-invoked or model-invoked, and a user-invoked skill can use a model-invoked skill but never calls a different user-invoked skill. |
| [ADR-0003](decisions/0003-three-configuration-levels.md) | Three configuration levels and the defaults file | Accepted | The configuration has three levels, `defaults/devkit.defaults.json`, the project `devkit.config.json`, and the user file, and each level replaces the level before it. |
| [ADR-0004](decisions/0004-questions-to-the-user.md) | Questions to the user | Accepted | Ask the user one question at a time with `AskUserQuestion`, with the recommended option first. |
| [ADR-0005](decisions/0005-build-feature-pipeline-and-entry-points.md) | The build-feature pipeline and its two entry points | Accepted | `/build-feature` runs grill, spec, ticket, implement, review, and PR, and a ticket that exists skips the ticket stage. |
| [ADR-0006](decisions/0006-poc-first-stage-references-are-drafts.md) | POC first: the stage references of build-feature are drafts | Proposed | The stage references and the templates of `/build-feature` stay drafts until a POC on one real Roomsie ticket. |
| [ADR-0007](decisions/0007-approval-gates-and-merge-mode.md) | Approval gates, merge mode, and rebase-merge | Accepted | The default approval gates are after the spec and before the PR, `mergeMode` defaults to `ask`, and repo merges use rebase-merge. |
| [ADR-0008](decisions/0008-progress-in-the-project-plan.md) | Progress lives in the project plan: ticks and logs | Accepted | `/build-feature` uses the plan of the project, ticks items in the PR, and logs each PR in the task note and journal. |
| [ADR-0009](decisions/0009-blind-review-before-the-pr.md) | Blind review before the PR | Accepted | Three blind sub-agents review the diff before the PR opens, for at most two rounds, and the user decides each open finding. |
| [ADR-0010](decisions/0010-issue-status-labels.md) | GitHub issues show the status of each ticket | Accepted | `/build-feature` sets one `status:*` label and adds a comment at each stage change, and the PR closes the issue. |
| [ADR-0011](decisions/0011-pr-format.md) | The PR format | Accepted | Each PR uses `pr-template.md` in STE, and its Progress section gives the blocker of each item that is not done. |
| [ADR-0012](decisions/0012-lean-code-and-code-comments.md) | Lean code and code comments | Accepted | The implement stage stops at the first lean-code rung that works, and the default for a code comment is no comment. |
| [ADR-0013](decisions/0013-project-coding-standards.md) | The code standards of a project live in the project | Accepted | The standards are files in the project, from its decision records, with one rule on each line and a `Why:` citation. |
| [ADR-0014](decisions/0014-ste-for-all-markdown.md) | STE for all Markdown, with the user's own copy of the specification | Accepted | `ste-writing` keeps each Markdown file in STE, and its word check uses the user's ASD copy, which never goes into a repo. |
| [ADR-0015](decisions/0015-ste-rewrite-keeps-each-claim.md) | An STE rewrite keeps each claim, with blind claim checks | Accepted | An STE rewrite keeps the strength of each claim, and a blind claim check proves that no claim is missing. |
| [ADR-0016](decisions/0016-two-docs-skills.md) | Two docs skills: doc-architecture guards, doc-management runs | Accepted | The model-invoked `doc-architecture` skill guards each Markdown change, and the user-invoked `/doc-management` skill does the large runs: `setup`, `migrate`, and `check`. |
| [ADR-0017](decisions/0017-the-docs-architecture.md) | The docs architecture | Accepted | Each project has an index, records as the only home of reasoning, working docs with `Why:` links, generated ledgers, specs, and history. |
| [ADR-0018](decisions/0018-size-limits-and-the-context-budget.md) | Size limits and the context budget | Accepted | `doc-budget` keeps the index at most 1,500 tokens and other docs at most 1,200 words, and an override can only shrink. |
| [ADR-0019](decisions/0019-master-tools-and-tool-copies.md) | Master tools in the plugin, tool copies in each project | Accepted | The plugin holds the master tools, each project runs its own copies, and `check --sync` updates the older copies through a PR. |
| [ADR-0020](decisions/0020-hook-activation-and-plugin-recommendation.md) | sync-tools turns on the hook and recommends the plugin | Accepted | `sync-tools` turns on the hook in the clone, the `prepare` script, and `SessionStart`, or only in `.husky/pre-commit`, and recommends the plugin. |
| [ADR-0021](decisions/0021-one-spec-template.md) | One spec template, owned by doc-architecture | Accepted | The one spec template is `skills/doc-architecture/templates/spec.md`, and `build-feature` and `doc-management` use it. |
| [ADR-0022](decisions/0022-the-migrate-pipeline.md) | The migrate pipeline | Accepted | `/doc-management migrate` runs the Roomsie pipeline with stacked PRs, one commit for each file, 0 broken links after each stage, and three stops. |
<!-- ledger:end -->
