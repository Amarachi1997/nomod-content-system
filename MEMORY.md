# Nomod Content System — MEMORY.md

This file logs corrections, decisions, and edge cases made during tone checks and microcopy generation. It is updated automatically each time a skill is used and a decision is worth recording.

## How this file works
Every time /tone-checker or /microcopy-gen is used and a notable decision is made, add a new entry at the top of the log below. Newer entries always appear first.

## What to log
- A rule that was debated or needed interpretation
- A copy decision that was not obvious from CLAUDE.md alone
- A pattern of errors appearing repeatedly
- A new surface or moment not yet covered in CLAUDE.md
- Any copy approved as an exception to a standard rule

## What not to log
- Routine passes with no issues
- Changes that are already clearly covered in CLAUDE.md

---

## Log

### Entry 001
Date: 22 April 2026
Skill used: /microcopy-gen
Surface: Modal
Flow: Document verification
Decision: "We couldn't verify" was chosen over "Looks like…" because the system has a definitive result. "Looks like" implies uncertainty. "We couldn't" states the outcome and takes ownership without blame.

Rule reference: Section 9 — Error and failure messages

---

### Entry 002
Date: 22 April 2026
Skill used: /microcopy-gen
Surface: Modal
Flow: Document verification
Decision: Body copy does not say "your payouts will resume once verified" because Nomod cannot guarantee the timeline or outcome of the next review. "We'll review it again" is the only step Nomod can commit to.

Rule reference: Section 3 — Writing principles, never over-promise

---

### Entry 003
Date: 22 April 2026
Skill used: /microcopy-gen
Surface: Modal
Flow: Document verification
Decision: "Contact support" added as a secondary CTA because this moment blocks payouts. Users who cannot resubmit need an immediate route to a person.

Rule reference: Section 11 — Channel-specific rules, Product UI

---

### Entry 004
Date: 22 April 2026
Skill used: /microcopy-gen
Surface: Modal
Flow: Document verification
Decision: A dismiss option should not be labelled "Cancel" as it implies the user is cancelling the verification process. Use a close icon only with no label.

Rule reference: Section 10 — Microcopy patterns, confirmation pop-ups

---

## Instruction to Claude Code
After every /tone-checker or /microcopy-gen session, check whether any decision made is worth logging. If yes, add it as a new entry at the top of the log, above the most recent entry. Increment the entry number. Always include: date, skill used, surface, flow, decision, and rule reference.
