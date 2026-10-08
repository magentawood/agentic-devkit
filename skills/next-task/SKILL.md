---
name: next-task
description: List the tasks of the project plan that a person can start now, and the tasks that a different person has taken. Use when the user asks "what is next", "what can I pick up", "what should I work on", "which tickets are free", or "who works on what".
metadata:
  version: 0.1.0
---

# Next task

## Purpose

Tell the user which tasks they can start at this time. A task is free when the team completed its dependencies and nobody claimed its GitHub issue. `/build-feature` claims an issue when it starts ([ADR-0028](../../docs/decisions/0028-claim-at-the-start-and-the-next-task-skill.md)). Thus, this skill does not suggest a task that a different person works on.

## When to use / When NOT to use

Use this skill when the user asks what to work on next, or who works on which task.

Do not use it to start a task. To start a task, the user runs `/build-feature <ID>`.

## Inputs

- `repo` and `plan.source` in `devkit.config.json`. The plan source is a JSON file with a `tasks` list. Each task has `id`, `title`, `deps`, `issue`, and `role`.
- The GitHub issues of the repo, through `gh`.

## Outputs

A short answer in the chat. It gives the free tasks for the role of the user and the tasks that other people took. It also gives the command to start one task.

## Steps

1. Run `${CLAUDE_SKILL_DIR}/scripts/next-task` from the project root. It prints the free tasks by role, the taken tasks with the assignee and the status label, and the counts.
2. If the script fails because the project has no `plan.source`, tell the user. Do not guess the next task from other files.
3. Find the role of the user: from the request, from the project index, or from the earlier conversation. If you cannot find it, show the free tasks of all roles.
4. Answer with:
   - The free tasks of the role, in the order of the script. Give the issue link of each task.
   - The taken tasks, with the assignee. Say that a task with no assignee and a status label is in progress, but nobody claimed it.
   - The command to start the first free task: `/build-feature <ID>`.
5. If the project index or the progress note gives a different order of work, follow it. Use the script only to remove the taken tasks.

## Exit conditions

- The user has the list of free tasks and taken tasks, from the current GitHub data.

## Conventions

Obey [CONVENTIONS.md](../../CONVENTIONS.md). The terms are in [docs/glossary.md](../../docs/glossary.md).

## Example

The user asks: "What can I pick up next? I am on the platform lane."

1. The script gives 3 free tasks for P1 Platform, and T-03 as taken by @pulkitshringi.
2. The answer: "Free for P1: T-07 (#28), T-25 (#43), T-40 (#69). T-03 is in review by @pulkitshringi. Start T-07 with `/build-feature T-07`."
