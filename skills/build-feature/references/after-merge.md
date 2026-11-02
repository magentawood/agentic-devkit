# After the merge

Do these steps after a merge. The issue gets `status:done` only at the end. Why: [ADR-0032](../../../docs/decisions/0032-the-pre-push-check-and-the-live-check.md).

1. Watch each workflow run of the merge commit: `gh run list --commit <merge commit>`, then `gh run watch <id> --exit-status`. If a run fails, stop. Tell the user, and keep the issue `status:in-review`.
2. Find the live check in the spec of the task note, for example the seam "A check of the live API after the deploy". If the spec has no live check, go to step 4.
3. Do the live check on the live app:
   - If the check needs a person (a sign-in, a phone, a payment), give the user the exact steps or the command, and wait for the result.
   - If the check fails, tell the user, and keep the issue `status:in-review`.
4. Set each linked issue to done: `${CLAUDE_PLUGIN_ROOT}/skills/build-feature/scripts/issue-status <issue> done --note "<one line>"`.
