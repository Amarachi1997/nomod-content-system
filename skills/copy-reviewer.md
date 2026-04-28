# Skill: Copy reviewer

## What this skill does
Reviews any piece of Nomod copy against every rule in CLAUDE.md. Returns a structured report covering tone match, all rule violations, UI recommendations where copy alone cannot fix the problem, and a full clean version with all issues resolved.

## How to trigger this skill
Type: /copy-reviewer
Then provide the following:

Copy: [paste the copy to review]
Surface: [e.g. modal, notification, email, FAQ, Nomod Docs, app listing, button, error state]
Market: [UAE / KSA / Both — omit if unknown]
Context: [what triggers this copy — e.g. document verification failed, user is setting up payouts]
Outcome controlled by Nomod: [Yes / No / Partially]

If surface or market are not provided, infer from the copy and state the inference at the top of the report.

## Instructions

When this skill is triggered, do the following:

1. Read CLAUDE.md in full before reviewing anything
2. Identify the surface type and set the expected tone using the tone table in CLAUDE.md Section 2
3. Run every rule check listed below against the copy provided
4. Return the report as a valid JSON object — no explanation, no markdown, no code fences

## Rules to check

Run all of the following. Do not skip any rule even if the copy looks clean.

### Rule 1 — Outcome guarantee
Only state an outcome if Nomod can guarantee it completely, every time. If the result depends on a review, approval, or any variable outside Nomod's direct control, describe the next step — not the final result.

### Rule 2 — Sentence structure
No apology openers. State what happened and move immediately to what the user can do next.
Permitted openers: "Looks like…", "We couldn't…", "Something went wrong"
Never permitted: "Oops!", "Unfortunately,", "We're sorry"
Standard structure: What happened + What to do next
High-stakes structure: What happened → Mental relaxer → What to do next

### Rule 3 — Mental relaxer
Use when the user needs reassurance, cannot take immediate action, or needs to wait for a review or process. Do NOT use when a failure has occurred and the user needs to take immediate action — in those moments, lead with the action.
Structure: What happened → Mental relaxer → What to do next
Mental relaxer must be: true, specific, placed after the problem and before the action, free of blame, appropriate for the severity.

### Rule 4 — Writing principles
- Front-load the action: lead with what the user needs to do before explaining why
- The user is the hero: write from the user's perspective, not Nomod's
- Never make the user feel stupid, at fault, or alone
- Proactive disclosure: if a user might feel surprised later, explain it now
- No filler qualifiers: "simply" and "just" are never permitted

### Rule 5 — Exclamation marks
One exclamation opener only. Never mid-sentence. Never at end of sentence. Only in genuine, non-financial success moments. All three must be true: meaningful action completed, non-financial moment, "well done" would not feel patronising. Never in in-app notifications, error states, or financial confirmations.

### Rule 6 — Capitalisation
Sentence case everywhere. Feature names always capitalised when referring to the feature itself (Service Fee, Membership, Same-Day Payouts, Tap to Pay, QR Pay, Payment Link, Invoice, Team, Store, Campaign, Buy Now Pay Later). Same feature names in sentence case when describing the actual implementation. Merchant account terms in camel case (Price Plan, Payment Method, Account Balance). Brand names as defined (Apple Pay, Tabby, Tamara, MasterCard, Mada). Currency abbreviations all caps (AED, SAR). Variables in snake_case ([account_holder_name]).

### Rule 7 — Punctuation
No em dashes — ever. Full stops used to separate thoughts within toast messages, inline copy, headings, and subheadings only — never to end them. Error messages end with a full stop. CTA and button labels have no punctuation. Tooltip text: no full stop for single sentences. Steps in documentation: no full stop at the end. Ellipsis for loading states and ongoing actions only.

### Rule 8 — UK English spelling
Check: organise, authorise, customise, recognise, colour, behaviour, cancellation. Flag any US English spelling.

### Rule 9 — Numbers, dates, and currency
Spell out one to nine. Numerals for 10 and above. Thousands separator: AED 20,000. Date format: 30th October 2025. Time: 14:30. Currency: [CURRENCY] [Amount] with two decimal places — AED 50.00, SAR 10.00. Never: 50 AED, AED10, AED 10 (for amounts under 10 without decimals).

### Rule 10 — Microcopy patterns
Button CTAs: Verb + Feature, no punctuation, no personalisation ("Add payout method" not "Add your payout method"). Never "Click here". "Continue" alone only when the next step is visually obvious. Support channel: always name it explicitly — "Chat with us on WhatsApp" not "Contact support". Confirmation pop-ups: Question → Supporting text → CTAs. Empty states: No [Item] yet → Supporting text → CTA.

### Rule 11 — Terminology
Approved terms: Payouts (not transfers), Sign in (not log in), Sign up (not register), Merchant (not seller/vendor), Customer (not buyer/payer), Charge (not payment request), Team mate (not team member), BNPL (not instalments), Same-Day Payouts (not instant payouts). Brand names: Amex or American Express, Tabby, Tamara, Apple Pay, Google Pay, MasterCard, Visa, Mada or mada.

### Rule 12 — Banned words and phrases
Never: "Oops!", "Click here", "simply", "just" (as filler), "seamlessly", "leverage", "utilise", "We're sorry" or any apology opener, "shortly", "very soon", "almost there", "as soon as possible", "Don't worry" without a specific reason following, "Everything is sorted", "interest" in any financial context, any idiom that does not survive Arabic translation.

### Rule 13 — Dynamic content
Variables in square brackets, snake_case: [account_holder_name], [membership_plan], [business_name]. Plurals use conditional brackets: "your document[s]", "document[s] is[are]".

### Rule 14 — Localisation (run only if market is known or inferable)
UAE: AED, Monday–Friday payouts, Emirates ID, Trade Licence, CBUAE, Saturday–Sunday weekend, Tabby and Tamara order, startup tone acceptable.
KSA: SAR, Sunday–Thursday payouts, National ID (Iqama/Hawiyya), Commercial Registration (CR), SAMA, Friday–Saturday weekend, Tamara listed before Tabby, Mada must be included in payment method copy, regulatory reassurance required in onboarding and verification, urgency copy must be paired with reassurance.
Hard rules: never Emirates ID in KSA, never Trade Licence in KSA, never omit Mada from KSA payment method copy, never "interest" in any financial context, never market-specific cultural references in the wrong market.

### Rule 15 — UI change recommendation
If the copy problem cannot be fixed by rewording — because the root cause is structure, information hierarchy, missing affordance, or a broken flow — flag it as a UI recommendation, not a copy issue.

## FAQ and Docs context

### FAQs
In-app FAQs: user is a merchant, mid-task, familiar with the product. Steps can be concise and assume product knowledge.
Web FAQs: audience includes prospects with no prior Nomod context. Steps must be detailed enough for someone encountering the product for the first time. Do not assume familiarity with features or flows.

### Nomod Docs
Operational and how-to sections: no marketing language. Steps must be neutral and functional.
Public-facing overview sections: a promotional tone is permitted in feature benefit descriptions. Flag if marketing language has leaked into instructional steps, or if instructional copy is too bare for a prospect audience in an overview section.

## JSON output shape

Return ONLY this JSON object. No explanation, no markdown, no code fences.

{
  "verdict": "Pass" | "Fail" | "Pass with notes",
  "surface": "<identified or confirmed surface>",
  "market": "<UAE | KSA | Both | Unknown>",
  "context": "<what the copy is for and what triggers it>",
  "expectedTone": "<tone from CLAUDE.md tone table>",
  "toneMatch": true | false,
  "toneMismatch": "<describe the mismatch, or null if tone matches>",
  "issues": [
    {
      "rule": "<rule name in all caps, e.g. LOCALISATION>",
      "description": "<short description of the issue>",
      "original": "<the exact copy that breaks the rule>",
      "fix": "<the corrected version>",
      "why": "<one sentence explaining the rule and why it applies here>"
    }
  ],
  "uiRecommendations": [
    {
      "problem": "<description of the structural or design problem>",
      "recommendation": "<specific UI change>",
      "reason": "<one sentence on why copy alone cannot fix this>"
    }
  ],
  "cleanVersion": "<full revised copy with all issues fixed>",
  "summary": "<X issues found across Y rules. One sentence on the most critical issue.>"
}

If no issues are found, return an empty array for issues, empty array for uiRecommendations, set verdict to "Pass", and deliver the original copy as cleanVersion.
