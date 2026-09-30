# PRD: build-feature

**Status:** approved spec + grill decisions (2026-09-30) · **Owner:** Yash

Part A is the user's spec: word for word, except §6 and §9–§11, which are condensed with nothing left out. Part B holds the decisions from the grill session. **Where Part B and Part A disagree, Part B wins.** Part C lists what is already built.

---

## Part A — the spec

# Agentic DevKit Plugin: Build Spec

## Goal
Build a Claude Code plugin called `agentic-devkit` for the Roomsie product.
- `build-feature` takes any feature from idea to merged MR through:
  grill → spec → ticket → implement → review.
- Lean code and comment discipline run inside that pipeline.
- `ste-writing` keeps every Markdown file in ASD-STE100 Simplified Technical English.
- Obsidian is the single source of truth for progress, and GitHub issues mirror ticket status.
- Project coding standards live in the Roomsie repo, and the pipeline enforces them.

## 0. Reference sources (read these first, don't work from memory)
- Matt Pocock skills: https://github.com/mattpocock/skills (MIT).
  - Read the CURRENT SKILL.md for: grilling, grill-with-docs, to-spec, to-tickets,
    implement, tdd, code-review, codebase-design, domain-modeling, writing-for-agents.
  - Skill names change often, so fetch the repo and don't guess.
- Ponytail: https://github.com/DietrichGebert/ponytail (MIT).
  - Read its main skill and ponytail-review.
- Roomsie tech base: `docs/tech-base.html` in the Roomsie repo. It is the source for
  all project coding standards.
- Adapt these sources; don't copy them blindly. Credit Pocock and Ponytail in NOTICE.md
  with their MIT license text.

## 1. POC first, then extract
- Run the pipeline by hand on one real story first.
- Record what worked, which prompts were used, and where things went off track.
- Only then finalize the stage reference files. Don't design the skill in the abstract.

## 2. Skill inventory
| Skill         | Type          | Purpose |
|---------------|---------------|---------|
| build-feature | user-invoked  | Orchestrates the pipeline; carries the lean-code and code-comments rules |
| ste-writing   | model-invoked | Every .md file in ASD-STE100 Simplified Technical English |

Rule (from Pocock): a user-invoked skill may call model-invoked skills, but it
never calls another user-invoked skill.

## 3. build-feature pipeline
Keep one reference file per stage in `skills/build-feature/references/`.

1. **Grill** (based on `grilling` + `grill-with-docs`)
   - Interview me relentlessly until every branch of the decision tree is resolved.
   - Ask one question at a time and give your recommended answer.
   - If the codebase can answer a question, explore it instead of asking me.
   - Update CONTEXT.md (the shared glossary) and ADRs inline.
   - Exit condition: no open branches remain.
2. **Spec** (based on `to-spec`)
   - Don't interview. Synthesize what the grill session produced.
   - Confirm which modules will be touched (see `codebase-design`).
   - Write the spec in STE.
   - Exit condition: I approve the spec.
3. **Ticket** (based on `to-tickets`)
   - Use tracer-bullet vertical slices, one ticket per MR, and declare the blocking edges.
   - Map each acceptance criterion to an Obsidian checkbox, and create a GitHub issue per ticket.
4. **Implement** (based on `implement` + `tdd`)
   - Before writing any code, read `references/lean-code.md`,
     `references/code-comments.md`, and the relevant files in the project standards path.
   - Work one ticket at a time on its own branch, using red-green-refactor at the agreed seams.
   - Update the Obsidian log as you go.
5. **Review** (based on `code-review` + `ponytail-review`)
   - Review on three axes, each run as a separate sub-agent. Sub-agents do not inherit
     context, so pass every file path explicitly.
     - **Standards:** does the diff follow every file in the project standards path?
     - **Spec:** does it do what the ticket and spec say?
     - **Lean:** using lean-code.md and code-comments.md, produce a delete-list of
       over-engineering, boilerplate, and unnecessary comments.
   - Then produce the MR in the standard format.
- Every stage has an explicit exit condition. Stage transitions need my approval
  (configurable in devkit.config.json).

## 4. Lean code (`references/lean-code.md`, based on the Ponytail ladder)
- First read the code the change touches and trace the real flow. Be lazy about
  the solution, never about reading.
- Then climb the ladder and stop at the first rung that works:
  1. Is it needed at all? If not, skip it (YAGNI).
  2. Does the codebase already have it? Reuse it.
  3. Does the standard library do it? Use it.
  4. Does the platform do it natively? Use it.
  5. Does an already-installed dependency do it? Use it.
  6. Can it be done in one line? Write one line.
  7. Only then, write the minimum code that works.
- Never cut trust-boundary validation, data-loss handling, security, or accessibility.
- Never add new dependencies, abstractions, wrappers, config options, or "future-proof"
  hooks without an explicit reason in the ticket.
- Record the chosen rung in the MR "Changes" section when it is non-obvious.

## 5. Code comments (`references/code-comments.md`)
- The default is no comment. First try a better name, a smaller function, or a type.
- Write a comment only for things the code cannot say:
  - WHY something non-obvious is done (a constraint, a trade-off, a business rule)
  - Workarounds (link the issue or upstream bug)
  - Public API docs, where the language convention requires them
- Every comment must be:
  - One line where possible, and at most ~15 words
  - In present tense, with no filler ("basically", "simply", "note that")
- Never write:
  - Comments that restate what the code does
  - Commented-out code
  - Change-history comments (that is git's job)
  - A TODO without a ticket ID

## 6. ste-writing skill (ASD-STE100)
(Built — see Part C.) Trigger on every .md create/edit; sentence ≤20 procedural / ≤25 descriptive; paragraphs ≤6 sentences; active voice, simple tenses, imperative instructions; one word one meaning; no -ing forms or phrasal verbs; noun clusters ≤3; vertical lists; warnings before the step. Exempt code blocks, quoted text, frontmatter keys, file paths. ste-rules.md summary, no invented dictionary entries; scripts/ste-lint reports only; examples.md before/after.

## 7. Project coding standards (in the Roomsie repo, NOT in the plugin)
- Location: `docs/standards/` in the Roomsie repo, next to `docs/decisions/`.
  Set `standardsPath` in devkit.config.json.
- Extract the rules from `docs/tech-base.html`. The product name is **Roomsie**:
  replace "femmeflats" everywhere, including the monorepo root name.
- Rule format, with one rule per line:
  `- <rule>. Why: <one line>. (D<nn>)`
- Limits and style:
  - Max ~40 rules per file.
  - Write every file in STE.
  - Mark any unresolved rule OPEN; reviewers do not enforce OPEN rules.
- Enforce a rule with tooling where possible (ESLint, tsc, CI check), and mark those
  rules `[tool]`. Prose rules exist only for what tools cannot check.
- Add a new rule only when a decision requires it, or when review catches the same
  mistake twice.

### Files
- `_index.md`: global standing rules
  - Clients never touch the database; all business logic lives in apps/api (D02, D03).
  - `users.id` is the only identity key; the Firebase UID lives only in `auth_provider_id` (D05).
  - A package imports only what it declares; shared code goes in `packages/`, and apps
    never import each other [tool: pnpm strict] (D10).
  - Credentials:
    - Secrets live only in apps/api's environment.
    - `NEXT_PUBLIC_*` means public.
    - gitleaks runs on pre-commit.
    - `.env.example` documents every key.
  - Privacy:
    - PII is scrubbed in `beforeSend`: no message bodies, phone numbers, precise
      locations, or Authorization headers.
    - Tokens are never logged.
  - Events referencing `users.id` are personal data under DPDP; deletion must purge
    or pseudonymise them (D12).
- `api.md`: Fastify, Zod, auth, errors
  - Parse every external input (body, query, params, headers, webhooks, third-party
    responses) with Zod before any other code runs. No `as` casts on external data (D04).
  - OpenAPI is generated from the Zod schemas and committed; CI fails if it is stale [tool] (D04, D13).
  - Verify the Firebase JWT locally, then reject it if `iat` is before `users.tokens_valid_after` (D07).
  - Never UPDATE or DELETE by a client-supplied id without `WHERE user_id = <JWT user>` (S1).
  - Realtime is broadcast only: the API writes, applies the rules, then publishes.
    Never use `postgres_changes` (D05).
  - Storage:
    - Image bytes never pass through the API; use presigned R2 URLs.
    - Verification selfies go in the private bucket.
  - Application code calls `reportError(err, ctx)` only, never the Sentry SDK directly (D14).
  - Analytics writes are buffered and batched; the event schema lives in
    `packages/contract` with an `event_version` field (D12).
- `database.md`: Drizzle and schema
  - `schema.ts` is the source of truth.
  - Migrations:
    - Generate them with drizzle-kit and commit them.
    - Never edit an applied migration or change the database by hand (D06).
  - Primary keys:
    - Every primary key is a UUIDv7 with no database default, minted via `$defaultFn` in the API (S1).
    - Clients may mint ids only for messages, swipes, reports, and blocks.
    - Zod checks that the id is v7 and that its timestamp is within ±5 minutes of the server clock (S1).
  - Client-minted inserts use `ON CONFLICT (id) DO NOTHING` (S1).
  - Every table has `created_at timestamptz not null default now()`. Order by
    `created_at`, never by id (S1).
  - Complex queries (e.g. ranking) run in Postgres via typed `sql` (D06).
  - Design tables in S1→S7 order, never ahead of their dependencies.
  - RLS stays on as defence in depth (D02).
- `web.md`: Next 16, React 19, TanStack Query
  - No business logic and no database access in Next. Route handlers are allowed only
    for OAuth callbacks, image proxying, and webhooks [tool: no-restricted-imports] (D03).
  - Landing and listings pages are server-rendered via API calls; the authenticated app
    is client-rendered (D07).
  - All data fetching goes through TanStack Query plus the generated contract client.
    No fetch inside `useEffect` (D08).
  - Auth uses an `Authorization: Bearer` ID token only; no session cookies (D07).
  - Port the existing design pages; don't rebuild them (D08).
- `styling.md`: Tailwind v4, Untitled UI, tokens
  - Use an Untitled UI React component before building a new one (D11).
  - Tokens:
    - `theme.css` is generated; never edit it by hand.
    - If a token is missing, raise a DS-GAP for the designer (D11).
  - Theme syntax:
    - Use plain `@theme`, never `@theme inline`.
    - Dark mode reassigns semantic tokens only (D11).
  - Components use semantic tokens, never primitives or hex values (D11).
  - Utility names come from the real Untitled UI `theme.css` (OPEN until
    `npx untitledui@latest tailwind` is run).
  - Block, Report, and destructive actions must never look like primary brand actions (D11).
- `testing.md`: CI gate
  - The CI gate runs: typecheck, lint, build, unit tests, API integration tests,
    generated-file check, token check, and gitleaks. Budget ~5 minutes (D13).
  - These rules require tests:
    - Verification gating
    - Token revocation
    - Chat rate limits
    - Queue exclusion and suppression
  - Integration tests run against a real Postgres. Never mock the database (D13).
  - No snapshot tests on UI components while the design is still moving (D13).
  - Playwright E2E is deferred until the UI stabilises (D13).

### Do NOT create yet
- `kotlin-kmp.md`: wait until the month-4 mobile work starts.
- `analytics.md`: wait until S7 is designed.

## 8. MR format
Keep this as a template at `skills/build-feature/templates/mr-template.md`:
- **Title:** `[TICKET-ID] short imperative summary`
- **Summary:** ONE readable paragraph that says what the MR does and why, written in
  STE with no bullets.
- **Linked issue:** the GitHub issue and the Obsidian feature note.
- **Changes:** the key changes, plus the lean-code rung when it is non-obvious.
- **Progress:** checkboxes ticked, checkboxes partially addressed, and checkboxes added.
- **Testing:** how the change was verified.
- **Follow-ups / notes**

## 9. Obsidian progress log (single source of truth)
- Don't create a separate logging system. All progress lives in the Obsidian vault
  (the vault path comes from config).
- Structure:
  - `Progress/_index.md` is the global view. It clusters all checkboxes by area/epic,
    links to each feature note, and shows rollup counts (done / total).
  - `Progress/<feature-name>.md` has a checkbox per task plus a log of what was done,
    why, the decisions made, and dead ends.
- Give every checkbox a stable block ID, e.g. `- [ ] Add retry to upload ^auth-012`.
- Rules: on each MR, tick ONLY the checkboxes that are actually done; add new checkboxes with the date and source MR; never delete a checkbox, mark dropped items `- [-]` with a reason.
- Logging: one log entry per MR/session (date, MR link, what changed, why, which checkboxes ticked or added); update `_index.md` every time a feature note changes. Consistent headings, plain Markdown, STE.

## 10. GitHub issue sync
- Create one issue per ticket at the Ticket stage.
- Status labels: `status:spec` → `status:in-progress` → `status:in-review` → `status:done`. Comment at each stage change. Link the MR, and close the issue on merge.
- The issue body mirrors the ticket's Obsidian checkboxes; Obsidian stays the source of truth. Use the `gh` CLI.

## 11. Standard format for the plugin and all future skills
- Plugin layout: `.claude-plugin/plugin.json`, `skills/<name>/{SKILL.md,references/,templates/,scripts/}`, `commands/`, `CONVENTIONS.md`, `CONTEXT.md`, `devkit.config.json`, `NOTICE.md`, `CHANGELOG.md`, `README.md`. build-feature: `references/` grill.md spec.md tickets.md implement.md review.md lean-code.md code-comments.md; `templates/` spec, ticket, mr, obsidian-feature-note, obsidian-index; `scripts/` issue sync, checkbox parsing.
- Roomsie side: `docs/tech-base.html`, `docs/decisions/`, `docs/standards/` (_index, api, database, web, styling, testing).
- Plugin rules: plugin.json only in `.claude-plugin/`; kebab-case names; `${CLAUDE_PLUGIN_ROOT}` for paths; config from devkit.config.json.
- Every skill: frontmatter `name`, `description` (what + when, trigger phrases), `version`; mark user-invoked skills so the model does not auto-trigger them. Body sections in order: Purpose; When to use / When NOT to use; Inputs; Outputs; Steps; Exit conditions; Conventions (link to CONVENTIONS.md); Example. Keep SKILL.md short, details in `references/` (Pocock's writing-for-agents). SKILL.md bodies in STE. Shared rules only in CONVENTIONS.md. Release checklist: README, bump version, CHANGELOG, NOTICE if adapting outside work.

## First task
1. Fetch and read the reference skills listed in section 0.
2. Scaffold the plugin layout in section 11. Write skeletons for both SKILL.md files, and fill in CONVENTIONS.md, NOTICE.md, and devkit.config.json.
3. Create `docs/standards/` in the Roomsie repo from `docs/tech-base.html`, following section 7.
4. Stop. We run the POC on one real story before finalizing the stage reference files.

## 12. Addendum
- **Rule candidates:** review logs each standards violation that no rule covers in `docs/standards/_candidates.md` (date, MR link, one line). On the second occurrence, promote it to a rule in the right standards file (STE, `Why:`, source link), and note it in the MR's Progress section. The process rule lives in CONVENTIONS.md.
- **Tick on merge:** at MR open, list the checkboxes the MR intends to tick; tick them only after merge; if the MR closes unmerged, tick nothing and add a log entry.
- **Vault access:** `vaultPath` must be readable and writable. If the vault is outside the repo, Obsidian updates run post-merge, not inside the MR diff.
- **Code host:** GitHub PRs via `gh` (Roomsie). Use this host's terms in all templates.

---

## Part B — decisions from the grill (2026-09-30). These win over Part A.

**Progress and issues**
- Reuse Roomsie's existing planning system; do NOT build `Progress/_index.md` / `Progress/<feature>.md`. Tasks are notes in `docs/plan/tasks/` with a `## Done when` checklist and a `^done` block ID, rolled up in `docs/plan/Progress.md`, generated by `tools/build-obsidian-plan.py` from `docs/team-plan.json` (the only place the plan is edited). Ticks survive regeneration by exact text match. The vault layout comes from the project config so other projects can differ.
- Entry points: an existing ticket (e.g. `T-13`) → short grill (implementation-level questions only, answered from code/Read-first docs where possible) + short spec written into the task note → approval → implement; the ticket stage is skipped. A new feature → full pipeline; new tasks are added to `team-plan.json` and generated.
- Status labels: build-feature sets `status:*` and comments at each stage change; `tools/sync-issues.py` must preserve `status:*` labels (it currently replaces the whole label set). Close issues via `Closes #N` in the PR.
- Ticks: committed inside the PR (vault is in the repo), each ticked line gets ` · [#N](link)` → merge = ticked; closed unmerged = nothing ticked. No post-merge step.
- Log: both — a short entry per PR in the task note's `## Log` (generator must preserve this section) AND a longer narrative in the build journal (now `docs/journal/YYYY-MM.md`, one file per month, append-only).

**Grill stage**
- Ask ONE question at a time with the `AskUserQuestion` picker, recommended option first with "(Recommended)". Never batch, never plain text.

**Gates and merge**
- Default approval gates: after spec, and before the PR (PR draft). Others configurable in devkit.config.json.
- `mergeMode` config, default `ask`: at the end offer (you merge / agent merges after approval / auto-merge on clean review).
- Repo merges use rebase-merge (keeps per-commit reverts).

**Review**
- Runs BEFORE the PR opens. Three blind sub-agents (Standards, Spec, Lean) get only: the diff, read access to the repo, the requirements (task note, spec, Read-first docs), and their rulebook. NOT the implementer's log, PR draft or reasoning. Code comments are part of the code.
- Findings loop: implementer fixes or records why it rejects; fresh reviewers re-run; max 2 rounds; then remaining items go to the user via the picker; rejected findings + reasons go in the PR notes.

**PR format additions**
- Progress lists what was completed, what was not, and for each not-completed item which blocking task caused it (e.g. "migrations not done — blocked on T-02").
- The whole PR description is written in STE.

**Config**
- Plugin `devkit.config.json` = generic defaults; each project has its own `devkit.config.json` at its root that wins (Roomsie: repo, vaultPath ".", standardsPath "docs/standards", decisionsPath "docs/decisions", plan scripts, ste.spelling "british", docBudget). User-level `~/.config/agentic-devkit/config.json` (e.g. steSpecPdf).

**Naming and format (Claude Code facts checked)**
- Skill name stays `/build-feature`.
- `version` is not a valid SKILL.md field → use `metadata.version`. User-invoked = `disable-model-invocation: true`. Paths: `${CLAUDE_SKILL_DIR}` for own files, `${CLAUDE_PLUGIN_ROOT}` for plugin root. No `commands/` folder (deprecated; skills are slash commands).

**Decision citations and numbering (Roomsie)**
- Product decisions are `PD0…PD13` (renamed from D0–D13). ADRs are cited as `ADR-0012`. `S1…S7` are schema phases. Design tasks keep `D-01…`. So the standards rule format becomes `- <rule>. Why: <one line>. (ADR-0004)` / `(PD7a)` / `(S1)`, linked.
- `docs/tech-base.html` no longer exists as source: `docs/tech-base.md` is now a short overview + a ledger generated from the ADRs. **Extract standards from the ADRs (docs/decisions/0001–0016) and PD records**, not from tech-base.

**Context budget (decided after the grill; see Roomsie PR #88 and plugin CONVENTIONS.md "Context budget")**
- build-feature must: keep CONTEXT.md an index (≤1,500 tokens) and update its routing table when a new area appears; put reasoning only in decision records (ADR / `pd-*.md`), with working docs linking `(why: PD7a)`; respect `doc-budget` limits (index 1,500 tokens; docs and records 1,200 words; research 1,500) and run `tools/doc-budget.py`; update or remove replaced text instead of appending; add a decision record for any new decision the grill makes (and an "In one line:" summary), then run `tools/build-decision-ledger.py`.
- Standards files must also stay ≤1,200 words each (spec says ~40 rules/file).

---

## Part C — already built

- Plugin repo `~/Projects/agentic-devkit` (magentawood/agentic-devkit): scaffold, CONVENTIONS.md, CONTEXT.md glossary, NOTICE.md (MIT texts for Pocock + Ponytail at their commits), devkit.config.json, CHANGELOG. PRs: #1 merged (ste-writing 0.2.0), #2 open (0.2.1: keep claim strength; lint tables/callouts), #3 open (0.3.0: doc-budget + context budget conventions).
- `ste-writing` skill: SKILL.md, references/ste-rules.md, rewrite.md, examples.md; scripts `ste-lint` (dictionary from the user's own ASD copy at `~/.config/agentic-devkit/ASD-STE100_ISSUE9.pdf`, cache `ste-dictionary.json`, never committed), `ste-verify` (diff / links), `doc-budget`.
- Roomsie: docs cleanup PRs #76–#88 open as one stack (merge in order after the skills work, rebase-merge; then run `python3 tools/sync-issues.py --apply`).
- Reference repos were cloned to a scratchpad (lost after the session): re-clone `mattpocock/skills` and `DietrichGebert/ponytail` when building the stage references.

## Next steps (in order)

1. Step 3 of "First task": `docs/standards/` in Roomsie from the ADRs + PD records (Part B citations), each file ≤1,200 words, `[tool]` marks, OPEN marks, `_candidates.md`.
2. `skills/build-feature/` skeleton: SKILL.md (user-invoked, STE, sections per §11), references stubs, templates (spec, ticket/task-note section, PR template per §8 + Part B), scripts (status-label + issue comment helper; tick-with-PR-link helper). Update sync-issues.py to keep `status:*`, and build-obsidian-plan.py to keep `## Log`.
3. POC on one real Roomsie ticket by hand; record what worked; then finalize the stage references.
