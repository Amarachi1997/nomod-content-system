# Skill: Microcopy generator

## What this skill does
Generates Nomod copy for any screen, component, or moment based on the rules in CLAUDE.md. Takes a brief description of what is needed and returns ready-to-use copy.

## How to trigger this skill
Type: /microcopy-gen
Then describe what you need using this format:

Surface: [e.g. modal, button, error state, empty state, notification]
Screen or flow: [e.g. payout setup, document verification, cancellation]
Moment: [e.g. user's document failed verification, user is removing a bank account]
Tone note: [optional — e.g. high stakes, routine, celebratory]

## Instructions

When this skill is triggered, do the following:

1. Read CLAUDE.md in full before writing anything
2. Identify the surface type and apply the correct rules from CLAUDE.md
3. Return copy in this exact format:

---

### Microcopy output

**Surface:** [surface type]
**Screen or flow:** [screen or flow name]
**Moment:** [the moment being written for]

**Copy:**

[Component label — e.g. Heading]
[Written copy]

[Component label — e.g. Body]
[Written copy]

[Component label — e.g. Primary CTA]
[Written copy]

[Component label — e.g. Secondary CTA]
[Written copy]

**Rules applied:**
[List every CLAUDE.md rule used in this copy]

**Notes:**
[Any decisions made, alternatives considered, or edge cases flagged]

---

## Rules to always apply
- Read the surface type and apply channel-specific rules from CLAUDE.md
- Sentence case everywhere except defined feature names
- No em dashes
- No exclamation marks unless it is a genuine non-financial success moment
- No apology openers in failure or error states
- No over-promising: describe the next step, not the guaranteed outcome
- Personalise with "your" and "we" wherever it adds warmth
- Button CTAs: Verb + Feature, no punctuation, no personalisation
- Include a mental relaxer if the moment is high-stakes or destructive
- UK English spelling throughout
- Feature names capitalised: Membership, Tap to Pay, QR Pay, Same-Day Payouts, Payment Link, Buy Now Pay Later, Service Fee
- Numbers: spell out one to nine, numerals for 10 and above
- Currency: [CURRENCY] [Amount] with two decimal places

## Tone
Write like a calm, capable colleague who knows the product inside out. Never write copy that sounds like a template. Every output should feel like it was written specifically for this moment.
