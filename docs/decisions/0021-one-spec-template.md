# 0021 — One spec template, owned by doc-architecture

**Status:** Accepted · **Date:** 2026-10-01 · **Deciders:** Yash Mangal

## Context

`build-feature` and `doc-management` each had a spec template. The review of PR #6 said that they had different jobs, and it left the choice to the `/build-feature` POC.

## Decision

**In one line:** The one spec template is `skills/doc-architecture/templates/spec.md`, and `build-feature` and `doc-management` use it.

- Sections: the goal, user stories, decisions with `Why:` links, rules, modules and seams, a model test, acceptance criteria, out of scope, and tickets.
- At most 1,200 words. The spec goes to the archive when the feature is complete.
- `build-feature` and `doc-management` use `${CLAUDE_PLUGIN_ROOT}/skills/doc-architecture/templates/spec.md`.
- A ticket that exists keeps its short spec in the task note ([ADR-0005](0005-build-feature-pipeline-and-entry-points.md)).

## Rationale

- The sources give no reason.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| Two templates, one in each skill, and the POC decides | The user decided on one template on 2026-10-01. |

## Consequences

- `build-feature` has no `templates/spec.md`.

## Revisit when

- None recorded.

## Sources

- [PR #6](https://github.com/magentawood/agentic-devkit/pull/6), comment "Changes from the decisions of 2026-10-01", item 2.
- Superseded: the description of PR #6 ("Review", "Rejected") keeps two spec templates and lets the `build-feature` POC decide. The decision of 2026-10-01 makes one template.
- Superseded: the build-feature PRD, Part A §11, lists a spec template in `build-feature/templates/`.
