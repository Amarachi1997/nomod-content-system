# Skill: Glossary validator

## What this skill does
Checks any piece of copy — from any team member — against Nomod's approved terminology list. Flags banned terms, unapproved synonyms, and inconsistent naming across surfaces. Built for designers, PMs, engineers, and writers who need to verify they are using the right Nomod terms before copy ships.

## How to trigger this skill
Type: /glossary-validator
Then provide:

Copy: [paste the copy to check]
Surface: [e.g. modal, email, Figma spec, Jira ticket, Notion doc, PRD, app string]
Market: [UAE / KSA / Both — omit if not applicable]

Surface can be any document type, not just product UI. This skill is for the whole team.

## Instructions

When this skill is triggered, do the following:

1. Read CLAUDE.md in full — specifically Section 11 (Terminology), Section 12 (Banned words), Section 14 (Localisation), and Section 6 (Capitalisation feature names) before checking anything
2. Run every check listed below against the copy provided
3. Return ONLY a valid JSON object — no explanation, no markdown, no code fences

## Checks to run

### Check 1 — Banned terms
Scan for every banned term from CLAUDE.md Section 12 and the terminology table in Section 11.

Banned terms and their approved replacements:
| Banned | Use instead |
|---|---|
| Transfers | Payouts |
| Withdrawals | Payouts |
| Bank accounts (as UI label) | Payout methods |
| Payment request | Charge |
| Register | Sign up |
| Create account | Sign up |
| Log in / Login | Sign in |
| Seller / Vendor | Merchant |
| Buyer / Payer | Customer |
| Team member | Team mate |
| Instalments / Deferred payment | BNPL |
| Instant payouts / Fast payouts | Same-Day Payouts |
| Oops! | Not permitted — remove |
| Click here | Use a specific action verb |
| Simply / Just (as filler) | Remove entirely |
| Seamlessly / Leverage / Utilise | Remove or replace with plain language |
| We're sorry / Unfortunately (as opener) | Rewrite without apology opener |
| Shortly / Very soon / Almost there / ASAP | State a specific timeframe or describe the next step |
| Don't worry (without a specific reason) | Remove or follow with a specific reassurance |
| Everything is sorted | Describe what specifically has been resolved |
| Interest (in financial context) | Fee or charge |
| Contact support | Chat with us on WhatsApp (or name the channel) |

### Check 2 — Feature name capitalisation
Check every Nomod feature name in the copy. When referring to the feature itself, it must be capitalised. When describing the implementation, it must be sentence case.

Feature names — always capitalised when referring to the feature:
Membership, Payment Link, Invoice, Same-Day Payouts, Team, Store, Campaign, Tap to Pay, QR Pay, Buy Now Pay Later, Service Fee, Markup

Merchant account terms — camel case:
Price Plan, Payment Method, Account Balance

Feature name vs implementation examples:
- "Enable Service Fee" — feature name, capitalised ✅
- "A service fee of AED 2.00 applies" — implementation, sentence case ✅
- "Set up Same-Day Payouts" — feature name, capitalised ✅
- "Your same-day payouts will arrive by 18:00" — implementation, sentence case ✅

### Check 3 — Partner and brand name spelling
Check every partner or brand name against the approved list.

| Brand | Approved spelling |
|---|---|
| Tabby | Tabby |
| Tamara | Tamara |
| Apple Pay | Apple Pay |
| Google Pay | Google Pay |
| MasterCard | MasterCard |
| Visa | Visa |
| Mada / mada | Mada or mada (both accepted) |
| American Express | Amex or American Express |

### Check 4 — Cross-surface conflict detection
This check only applies when copy from more than one surface is provided, or when the user pastes content from a spec, ticket, or doc that references multiple surfaces.

Look for:
- The same concept named differently in different places (e.g. "payout method" in one place, "bank account" in another)
- A feature name capitalised on one surface and lowercase on another
- A partner name spelled differently across surfaces
- A CTA using different verbs for the same action (e.g. "Add bank account" vs "Set up payout method")

Flag each conflict with: what it is, where it appears, and what the consistent approved term should be.

### Check 5 — Audience clarity
This check is specifically for non-writers — designers, PMs, engineers — who may use internal or technical language that would not make sense to a merchant or customer.

Flag any term that:
- Is an internal Nomod term not exposed to users (e.g. "merchant_id", "settlement", "ledger entry")
- Is a technical term that a small business owner in UAE or KSA may not understand
- Is an English idiom that may not translate clearly for a non-native English reader
- Assumes knowledge the user may not have (e.g. "your MID", "the acquiring bank", "the webhook")

For each flagged term, suggest plain language that a first-time Nomod merchant would understand.

### Check 6 — Localisation conflicts
If a market is provided or can be inferred, check for:
- Emirates ID referenced in KSA copy — never permitted
- Trade Licence referenced in KSA copy — never permitted
- Mada missing from KSA payment method copy — must be included
- Tabby listed before Tamara in KSA copy — must be Tamara first in KSA
- "Interest" used in any financial context in either market — use "fee" or "charge"
- Weekend or payout day references that don't match the market (UAE: Mon–Fri / Sat–Sun weekend; KSA: Sun–Thu / Fri–Sat weekend)

## JSON output shape

Return ONLY this JSON object. No explanation, no markdown, no code fences.

{
  "verdict": "Pass" | "Fail" | "Pass with notes",
  "surface": "<identified or confirmed>",
  "market": "<UAE | KSA | Both | Unknown>",
  "bannedTerms": [
    {
      "found": "<the banned term as it appears in the copy>",
      "approved": "<the correct Nomod term>",
      "context": "<the sentence or phrase it appeared in>"
    }
  ],
  "capitalisationIssues": [
    {
      "term": "<the term with the wrong capitalisation>",
      "issue": "<feature name used as lowercase, or implementation incorrectly capitalised>",
      "context": "<the sentence it appeared in>",
      "fix": "<corrected version>"
    }
  ],
  "brandNameIssues": [
    {
      "found": "<how it was written>",
      "approved": "<correct spelling>",
      "context": "<the sentence it appeared in>"
    }
  ],
  "crossSurfaceConflicts": [
    {
      "concept": "<what the conflict is about>",
      "conflict": "<how it appears differently across surfaces>",
      "approvedTerm": "<the single correct term to use everywhere>"
    }
  ],
  "clarityFlags": [
    {
      "term": "<the unclear or internal term>",
      "issue": "<why it may not be clear to a merchant or non-native English reader>",
      "suggestion": "<plain language alternative>"
    }
  ],
  "localisationConflicts": [
    {
      "rule": "<which localisation rule is broken>",
      "found": "<what appears in the copy>",
      "fix": "<what it should say>"
    }
  ],
  "cleanVersion": "<full copy with all issues corrected>",
  "summary": "<X issues found. One sentence on the most important issue to fix before this ships.>"
}

If a check returns no issues, return an empty array for that field.
If cross-surface conflict detection is not applicable (single surface, no spec provided), return an empty array for crossSurfaceConflicts and do not flag it as an issue.
