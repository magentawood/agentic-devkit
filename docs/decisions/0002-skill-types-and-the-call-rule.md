# 0002 — Skill types and the call rule

**Status:** Accepted · **Date:** 2026-09-30 · **Deciders:** Yash Mangal

## Context

Some skills do a large run that the user starts. Other skills must load by themselves on each applicable edit. A skill can use a different skill, so the plugin needs a rule for the calls that it permits.

## Decision

**In one line:** A skill is user-invoked or model-invoked, and a user-invoked skill can use a model-invoked skill but never calls a different user-invoked skill.

| Skill | Type | Job |
|---|---|---|
| `build-feature` | user-invoked | The feature pipeline. It carries the lean-code and code-comments rules. |
| `ste-writing` | model-invoked | Each `.md` file in ASD-STE100 Simplified Technical English. |
| `doc-architecture` | model-invoked | It loads on each Markdown edit and guards each change to the docs. |
| `doc-management` | user-invoked | `/doc-management setup`, `migrate`, or `check`: large runs that the user starts. |
| `next-task` | model-invoked | Lists the free tasks of the plan and the claimed tasks ([ADR-0028](0028-claim-at-the-start-and-the-next-task-skill.md)). |

- A user-invoked skill has `disable-model-invocation: true` ([ADR-0001](0001-plugin-layout-and-skill-format.md)).
- `/build-feature` gets the `doc-architecture` rules through the usual Markdown edits. It never calls `/doc-management`.

## Rationale

- The call rule comes from Matt Pocock's skills.
- `doc-architecture` loads on each Markdown edit, and it guards each change, in the plugin repo and in each project.
- The `doc-management` modes are large runs that the user starts.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| None recorded | — |

## Consequences

- `/build-feature` and `/doc-management` cannot start each other. The user starts each of them.
- `ste-writing` and `doc-architecture` load together on a Markdown edit.

## Revisit when

- None recorded.

## Sources

- [build-feature PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/build-feature.md), Part A §2 "Skill inventory" (2026-09-30).
- [doc-management PRD](https://github.com/magentawood/agentic-devkit/blob/a88b115/docs/prd/doc-management.md), "Two skills" and "Relations" (2026-09-30).
- [CONVENTIONS.md](../../CONVENTIONS.md), "Skill format".
