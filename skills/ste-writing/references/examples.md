# Before and after examples

These examples use text from the Roomsie documents. Each example gives the rule that applies.

## Long descriptive sentence (6.3) and a word that is not approved (1.1)

Before (28 words):

> This page lists every change we already know is coming, where each one lands, and what has to be true from day one so that it lands cleanly.

After (3 sentences, 7 to 11 words each):

> This page lists all the changes that we know about. For each change, it gives the location in the code. It also gives the conditions that must be correct at launch.

"Every" is not approved. Use "all". "Already" and "coming" add no information.

## Passive voice (3.6)

Before:

> This plan is built around that.

After:

> We made this plan for that condition.

## Contraction (4.2) and a phrasal verb (9.3)

Before:

> So don't cut corners to hit a day. Say you're running long.

After:

> Do not decrease the quality to meet a date. If your task will be late, tell the team.

## Procedure: one instruction in each step (5.2, 5.3)

Before:

> Edit docs/team-plan.json, then run the builder, which also regenerates team-plan.md, and commit the result.

After:

> 1. Edit `docs/team-plan.json`.
> 2. Run `python3 tools/build-obsidian-plan.py`. This also makes `docs/team-plan.md` again.
> 3. Commit the changes.

## Descriptive text: one subject in each sentence (6.1)

Before:

> A chip tap costs nothing. It runs no model. Counting it against a budget that exists to control model spend is wrong, and it punishes the users who are cheapest to serve.

After:

> A chip tap does not start a model. Thus, a chip tap has no cost. The turn limit controls the cost of the model. Thus, the turn limit must not count chip taps. If it counts them, it stops the users that cost the least.

## Compaction: keep the case, remove the words

Before (31 words, then a table):

> Of the original 115 hours of engineering, **80 needed no design at all** and **35 could not start without one**. But the split was lopsided:

After (25 words, then the same table):

> Of the 115 engineering hours, **80 needed no design**. The other **35 could not start without a design**. The table shows that the lanes did not get equal parts:

All the numbers stay. "Lopsided" is not approved, so the last sentence says the same thing with approved words.
