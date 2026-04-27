---

# Skill: Localisation checker

## What this skill does
Takes any piece of Nomod copy and flags what needs to change 
for KSA versus UAE. Returns a structured report with specific 
changes required per market, not generic observations.

## How to trigger this skill
Type: /localisation-checker
Then paste the copy you want checked and specify the direction:

- /localisation-checker UAE to KSA [paste copy]
- /localisation-checker KSA to UAE [paste copy]
- /localisation-checker both [paste copy]

## Instructions

When this skill is triggered, do the following:

1. Read CLAUDE.md in full before reviewing anything
2. Identify which market the copy is currently written for
3. Apply every rule in the localisation reference below
4. Return the report in this exact format:

---

### Localisation report

**Copy reviewed:** [paste copy here]
**Current market:** [UAE / KSA / Unknown]
**Target market:** [UAE / KSA / Both]

---

#### Changes required

| # | Category | Current copy | Issue | KSA version | UAE version |
|---|---|---|---|---|---|
| 1 | [Category] | [Exact copy] | [Why it needs changing] | [KSA fix] | [UAE fix] |

---

#### What does not need to change
[List elements that work across both markets without modification]

---

#### Revised versions

**UAE version:**
[Full rewrite for UAE]

**KSA version:**
[Full rewrite for KSA]

---

## Localisation reference

### 1. Payout days
UAE: Payouts are processed Monday to Friday
KSA: Payouts are processed Sunday to Thursday
Flag any copy that references payout days without specifying 
the market, or that uses UAE days in KSA-facing copy.

### 2. Currency
UAE: AED
KSA: SAR
Flag any copy that hardcodes a currency without a market-
specific version. Copy should use [CURRENCY] as a variable 
unless it is market-specific.

### 3. Payment methods
UAE: Mada is not relevant. Apple Pay, Google Pay, Visa, 
Mastercard, AMEX are primary.
KSA: Mada is the dominant local debit network and is 
non-negotiable in KSA copy. STC Pay is a mainstream 
payment method. Flag any KSA copy that omits Mada.

### 4. Trust signals
UAE: Users are comfortable with startup and challenger-brand 
language. Regulatory references are reassuring but not 
required in every surface.
KSA: Trust is earned through alignment with established 
systems. SAMA compliance and regulatory backing should be 
referenced in onboarding and verification copy. Copy that 
sounds too casual or disruption-led can undermine trust.
Flag: Any copy that uses challenger-brand language 
(e.g. "forget the old way", "banking is broken") in KSA 
surfaces.

### 5. Tone and urgency
UAE: Direct urgency is acceptable in time-sensitive copy. 
Users are accustomed to fast-moving digital products.
KSA: Urgency copy should be used carefully. The KSA user 
base skews younger and mobile-native but expects more 
formal reassurance around financial decisions.
Flag: Any copy that uses urgency language in KSA financial 
or verification surfaces without a reassurance element.

### 6. Cultural references and celebrations
UAE: References to UAE National Day, Dubai Shopping Festival, 
and multicultural celebrations are appropriate.
KSA: References to Saudi National Day, Founding Day, 
and Ramadan are appropriate. Ramadan copy should be 
inclusive and not assume all users participate equally.
Flag: Any celebration copy that uses UAE-specific references 
in KSA surfaces or vice versa.

### 7. Document references
UAE: Emirates ID is the primary identity document.
KSA: National ID (Iqama for residents, Hawiyya for citizens) 
is the primary identity document.
Flag: Any copy that references "Emirates ID" in KSA surfaces. 
Replace with "national ID" or the specific document name.

### 8. Business registration
UAE: Trade Licence is the standard term.
KSA: Commercial Registration (CR) is the standard term.
Flag: Any copy that uses "Trade Licence" in KSA surfaces.

### 9. Regulatory body references
UAE: Central Bank of the UAE (CBUAE)
KSA: Saudi Central Bank (SAMA)
Flag: Any copy that references the wrong regulatory body 
for the market.

### 10. Working week references
UAE: Weekend is Saturday and Sunday.
KSA: Weekend is Friday and Saturday.
Flag: Any
