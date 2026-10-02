# STE rules summary

This file is a summary in our own words of ASD-STE100 Issue 9, Part 1. The rule numbers agree with the specification. ASD owns the specification and its dictionary. Do not copy the dictionary into a repository.

The full specification is the user's own copy. Its path is `steSpecPdf` in `~/.config/agentic-devkit/config.json`. The default path is `~/.config/agentic-devkit/ASD-STE100_ISSUE9.pdf`. Get a copy from <https://www.asd-ste100.org/STE_downloads.html>.

## Words (section 1)

- 1.1 Use approved words, technical nouns, and technical verbs.
- 1.2 Use an approved word only as its part of speech in the dictionary.
- 1.3 Use an approved word only with its approved meaning.
- 1.4 Use only the approved forms of verbs and adjectives.
- 1.5–1.11 A technical noun is a name for a thing in your field (for example, `API`, `migration`, `issue`). Use the name from the project glossary. Use one name for one thing. Do not use a technical noun as a verb.
- 1.12–1.13 A technical verb is a verb for an action in your field (for example, `deploy`, `commit`). Do not use a technical verb as a noun.
- 1.14 Spelling follows the project directive, `ste.spelling` in `devkit.config.json`.

## Multi-word nouns (section 2)

- 2.1 Use a maximum of three words in a multi-word noun.
- 2.2 If a technical noun has more words, write it in full one time. Then use a short form.

## Verbs (section 3)

- 3.1–3.2 Use only these verb forms:
  - The infinitive and the imperative
  - The simple present tense, the simple past tense, and the simple future tense
  - The past participle, as an adjective only
- 3.4 Do not make complex verb forms with helper verbs (for example, "has been done", "would have").
- 3.5 Use an -ing form only in a technical noun (for example, "error reporting").
- 3.6 Use the active voice. In descriptive text, you can use the passive voice only when you do not know who does the action.
- 3.7 Use a verb to show an action, not a noun ("inspect", not "do an inspection").

## Sentences (section 4)

- 4.1 Write short, clear sentences.
- 4.2 Do not remove words or use contractions to make a sentence shorter ("do not", not "don't").
- 4.3 Use a vertical list for complex text.
- 4.4 Use words that connect sentences, ("then", "thus", "but") between related sentences.
- 4.5 Use "the", "a", "an", "this", or "these" before a noun when applicable.

## Procedures (section 5)

- 5.1 Use a maximum of 20 words in a sentence.
- 5.2 Write one instruction in each sentence. Two actions can be in one sentence only if they occur at the same time.
- 5.3 Write instructions in the imperative.
- 5.4 If the reader must know a condition first, start with the condition. Then put a comma before the command.
- 5.5 A note gives information. A note does not give an instruction.

## Descriptive text (section 6)

- 6.1 Give information gradually, one subject in each sentence.
- 6.2 Use key words and headings to give the text a logical structure.
- 6.3 Use a maximum of 25 words in a sentence.
- 6.4–6.6 Put related information in one paragraph. Each paragraph has one topic and a maximum of six sentences.

## Safety instructions (section 7)

- 7.1 Start with a word that shows the level of risk ("WARNING", "CAUTION").
- 7.2 Then give a clear command or condition.
- 7.3 Then give the risk or the possible result.
- Put a warning or a caution before the step that it applies to.

## Punctuation and word count (section 8)

- 8.1 Do not use the semicolon.
- 8.2 Use a hyphen between words that you use as one unit.
- 8.4 In a vertical list, a colon ends a sentence for the word count.
- 8.5 Text in parentheses counts as one word.
- 8.6 Numbers, numbers with units, abbreviations, identifiers, quoted text, headings, and the names of people and organizations each count as one word.
- 8.7 A hyphenated word counts as one word.

## Writing practices (section 9)

- 9.1 If you cannot replace a word with an approved word, write a different sentence.
- 9.3 Do not use phrasal verbs ("set up", "carry out", "find out"). Use one verb.
- 9.4 Use the same words and the same style for the same thing.

## What ste-lint checks

`ste-lint` finds these problems:

- Long sentences (5.1, 6.3) and long paragraphs (6.6)
- A possible passive voice (3.6)
- -ing forms (3.5)
- Semicolons (8.1) and contractions (4.2)
- Spelling that is not the project directive (1.14)
- Words that the dictionary marks as not approved (1.1)

The word check uses the user's copy of the dictionary. Run `ste-lint --build-dictionary` one time to make the local cache. By default, the word check flags only adjectives, adverbs, prepositions, conjunctions, and pronouns. Nouns and verbs can be technical names, so use `--verbs` to see them too.

`ste-lint` does not check rules 1.3, 3.7, 4.4, 4.5, 6.1, 9.1, or 9.4. You must apply those rules.
