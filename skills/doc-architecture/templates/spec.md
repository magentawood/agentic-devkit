<!-- Spec of one feature. File: <specPath>/<feature>.md. At most 1,200 words. Rules and acceptance criteria only: the reasons are in the decision records. Do not write file paths or code, but you can name the model test. When the feature is complete, move this file to <archivePath>. Write it in STE. Replace each <...>. -->

# Spec: <feature name>

**Status:** draft | approved (<date>) | complete (<date>) · **Grill:** <date> · **Plan:** <link to the task or the issue>

## Goal

<The problem and the solution, from the view of the user. Two to four sentences.>

## User stories

1. As a <person>, I want <result>, so that <benefit>.

## Decisions

- <One line for each decision of the grill, with its record: `Why: [PD7a](../decisions/pd-07a-slug.md)`.>

## Rules

- <Each rule that the build must obey. One rule on each line.>

## Modules and seams

| Module | Interface changes? | Seam for the tests |
|---|---|---|
| <module> | yes / no | <seam, or "none"> |

**Model test:** <a test in the codebase that the new tests copy. Tests use only the public interface.>

## Acceptance criteria

- [ ] <Each result that a test or a reviewer can verify. Give the seam of the test.>

## Out of scope

- <Each thing that this spec does not do.>

## Tickets

<The ticket stage adds one line for each ticket, with its blockers.>
