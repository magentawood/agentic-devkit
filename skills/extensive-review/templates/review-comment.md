<!-- Write the review in STE. Replace each <...>. Keep the last line exactly: the next run reads it. -->

## Extensive review: fixed in the review

**Result:** <approve | comment>. <one sentence: what the review found, and that the fixes passed the rounds and the checks>.

**@<author>, before you work on this branch again:** <if the push replaced the history> run `git fetch origin && git reset --hard origin/<head branch>`.

### What changed

- **<the change>:** <what it fixes, and why> (`<commit>`).

### Rejected findings

- <the finding>. <the reason>.

### Decisions of the person

- <the question>: <the answer>. <Write "None." if the person decided nothing.>

<!-- With no push access, replace the three parts above with the correct findings under "### Standards", "### Spec" and "### Lean". -->

extensive-review: round <R>, commit <head commit after the push>
