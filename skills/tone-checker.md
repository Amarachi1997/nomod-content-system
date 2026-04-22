# Skill: Tone checker

## What this skill does
Reviews Nomod copy against the rules in CLAUDE.md and returns a structured report of what passes, what fails, and what to change.

## How to trigger this skill
Type: /tone-checker
Then paste the copy you want reviewed.

## Instructions

When this skill is triggered, do the following:

1. Read CLAUDE.md in full before reviewing anything
2. Review the copy provided against every relevant rule in CLAUDE.md
3. Return a report in this exact format:

---

### Tone check report

**Copy reviewed:** [paste the copy here]

**Overall verdict:** Pass / Fail / Pass with notes

**Issues found:**

| # | Rule broken | Copy flagged | Suggested fix |
|---|---|---|---|
| 1 | [Rule name from CLAUDE.md] | [Exact copy that breaks it] | [Your suggested fix] |

**What works well:**
[List what the copy gets right]

**Revised version:**
[A full rewrite of the copy that fixes all issues and follows CLAUDE.md]

---

## Rules to always check
- Sentence case: first word and proper nouns only
- No em dashes
- No exclamation marks mid-sentence or at the end of a sentence
- No apology openers: no "Oops!", no "Unfortunately", no "We're sorry"
- No over-promising: only state outcomes Nomod can guarantee every time
- UK English spelling
- Personalisation: "your payouts" not "payouts"
- Mental relaxer placement: after what happened, before next action
- Button CTAs: Verb + Feature, no punctuation
- Feature names capitalised correctly
- No filler words: simply, just, seamlessly, leverage, utilise
- Numbers: spell out one to nine, numerals for 10 and above
- Currency format: [CURRENCY] [Amount] with two decimal places

## Tone
Be direct and specific. Do not soften feedback. Name the exact rule, quote the exact copy, and give a concrete fix every time.
