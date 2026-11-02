# 0032 — The pre-push check and the live check

**Status:** Accepted · **Date:** 2026-11-02 · **Deciders:** Niruv Bhardwaj

## Context

In Roomsie, two people work at night and review and merge the PRs of each other with `/extensive-review`. Two steps came only from the session of one person:

- `pnpm secrets` before each push. The skills did not run it, so CI found a leak only after the push.
- A check of the live app after the deploy, for example the check of the model keys of T-11. The skills watched the workflow runs, and then set the issue to done.

## Decision

**In one line:** both skills run the pre-push check of the project before a push, and the live check of the spec after the deploy.

- **The pre-push check:** the configuration key `prePush` is a shell command, with no default. If it fails, the skill does not push. Roomsie sets `corepack pnpm secrets`.
- **The live check:** after the merge, the skill waits for the workflow runs of the merge commit. Then it does the live check that the spec names. If the check needs a person, for example a sign-in, the skill gives the steps and waits. The issue gets `status:done` only after the check passes. A spec with no live check goes to done when the deploy passes.
- The steps are in [after-merge.md](../../skills/build-feature/references/after-merge.md) and [pull.md](../../skills/build-feature/references/pull.md), "Before the push of the PR".

## Rationale

- The user decided this on 2026-11-02, so that Ankit and Pulkit can review and merge with no help.
- A leak that CI finds after the push is already on GitHub. A check before the push keeps it local.
- A green deploy does not prove that the feature works. In T-11, the deploy passed, but the keys were not checked yet.
- A command in the configuration fits each project. A fixed command does not.

## Alternatives rejected

| Alternative | Why we rejected it |
|---|---|
| The CI scan only | The leak is on GitHub before the scan. |
| `status:done` at the merge | The issue says done before anyone knows that the live app works. |
| A tool that signs in for the live check | Each project signs in a different way. A person does it in seconds. |

## Consequences

- A project with a scan sets `prePush` in `devkit.config.json`.
- An issue can stay `status:in-review` after its merge, until its live check passes.

## Revisit when

- A project can do its live checks with no person.

## Sources

- User decision, 2026-11-02.
- Roomsie T-11 ([#186](https://github.com/magentawood/roomsie/pull/186)): the live check of the model keys.
