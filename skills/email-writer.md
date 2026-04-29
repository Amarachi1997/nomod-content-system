# Skill: Email writer

## What this skill does
Generates or reviews Nomod email copy based on email type, Linear ticket context, Figma frame URL, and optional notes. Applies all rules from CLAUDE.md and the nomod-email skill. Returns structured JSON with every email component clearly labelled.

## Email types and their purpose

### Notification
Triggered by an action or system event. The merchant needs to know something has happened or changed.
Examples: service fee change, payout method update, payout sent, document verified, account change.
Tone: Calm, factual, direct. State what happened. Include next step or confirmation.
No exclamation marks. No marketing language.

### Announcement
Introduces a new feature or a change to how something works.
Examples: new BNPL partner, updated payout schedule, new payment method available.
Tone: Simple, benefit-led. Open with what changed and why it matters to the merchant.
One optional exclamation opener only if the feature is genuinely beneficial and non-financial.

### Promotional
Drives a specific merchant action with an incentive.
Examples: discount on Membership, fee-free transactions for a limited period, referral offer.
Tone: Aspirational but credible. Lead with the benefit. Be specific about the offer and its terms.
One exclamation opener permitted. State any conditions clearly — never bury them.

### Update
Communicates a system issue, downtime, or partner outage.
Examples: scheduled maintenance, Tabby outage, delayed payouts due to a bank holiday.
Tone: Transparent, reassuring. State what is affected, the expected resolution, and what the merchant should do (if anything).
No exclamation marks. Mental relaxer required after stating the issue.

## Email structure — apply every time

```
Subject line — sentence case, value-led, no clickbait
Heading — mirrors or elaborates on subject, not identical
Body:
  Greeting: Hi [first_name],
  What happened (1 sentence, direct)
  [Mental relaxer if the event could cause concern]
  What it means or what it enables (1–2 sentences)
  What to do next or fallback action (1 sentence)
CTA (if applicable) — Verb + Feature, no punctuation
Footer — internal or external (see below)
```

## Footer rules

Internal emails (to Nomod team):
```
INTERNAL USE ONLY
This message was sent from Nomod and is intended for Nomod team members only. Please do not share outside the organisation.
© [Year] Nomod Inc.
```

External emails (to merchants or customers):
```
This email was sent to [email]. If you'd rather not receive this kind of email, you can unsubscribe or manage your email preferences.
© [Year] Nomod Inc.
```

## Voice rules — apply every time

- No apology openers
- No exclamation marks except: one opener only, non-financial success, Announcement and Promotional types only
- Outcome guarantee: only state a result Nomod can guarantee completely and every time. If it depends on a review or external variable, describe the next step instead
- Mental relaxer: place after stating what happened, before the next action. Required for Update emails and any notification that could cause concern
- Use "your" and "we" throughout
- UK English spelling
- Sentence case: subject lines, headings, buttons, footers — first word and proper nouns only
- Feature names capitalised (Membership, Same-Day Payouts, Service Fee, Markup, Tap to Pay, BNPL)
- No em dashes — use a comma, full stop, or restructure
- Currency: [CURRENCY] [Amount] — AED 250, SAR 1,200
- Numbers: spell out one to nine, numerals for 10 and above
- Variables: [snake_case] in square brackets — [first_name], [payout_amount], [change_date]

## Mode: generate vs review

### Generate mode
Use when the user wants copy written from scratch based on the brief.
Read the Linear ticket context and Figma URL description provided.
Write every component: subject line, heading, body, CTA (if applicable), footer.
Include copy decisions explaining key choices.

### Review mode
Use when the user pastes existing copy for checking.
Check against all voice rules and email type rules above.
Return issues with original, fix, and why.
Return a clean version with all fixes applied.

## JSON output shape — generate mode

Return ONLY this JSON. No explanation, no markdown, no code fences.

{
  "mode": "generate",
  "emailType": "<Notification | Announcement | Promotional | Update>",
  "recipient": "<Merchant | Customer | Internal>",
  "components": {
    "subjectLine": "<subject line copy>",
    "heading": "<heading copy>",
    "greeting": "Hi [first_name],",
    "body": "<full body copy as a single string with line breaks>",
    "cta": "<CTA label or null if no CTA>",
    "footer": "<footer copy>"
  },
  "copyDecisions": [
    "<decision 1 — what was chosen and why>",
    "<decision 2>",
    "..."
  ],
  "checklist": {
    "noApologyOpener": true | false,
    "exclamationMarkCheck": true | false,
    "outcomeGuaranteeCheck": true | false,
    "mentalRelaxerCheck": true | false,
    "ukEnglish": true | false,
    "capitalisationCheck": true | false
  }
}

## JSON output shape — review mode

Return ONLY this JSON. No explanation, no markdown, no code fences.

{
  "mode": "review",
  "emailType": "<Notification | Announcement | Promotional | Update>",
  "verdict": "Pass" | "Fail" | "Pass with notes",
  "issues": [
    {
      "rule": "<rule name>",
      "original": "<the copy that breaks the rule>",
      "fix": "<corrected version>",
      "why": "<one sentence explanation>"
    }
  ],
  "cleanVersion": {
    "subjectLine": "<corrected subject line>",
    "heading": "<corrected heading>",
    "body": "<corrected body>",
    "cta": "<corrected CTA or null>",
    "footer": "<corrected footer>"
  },
  "summary": "<X issues found. One sentence on the most critical.>"
}
