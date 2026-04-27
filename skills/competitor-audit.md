---

# Skill: Competitor audit

## What this skill does
Fetches public-facing copy from Nomod's competitors in the UAE and 
KSA payments space, analyses their voice and tone patterns, and 
returns a structured report comparing them against Nomod's standards 
in CLAUDE.md.

## How to trigger this skill
Type: /competitor-audit
Then specify one of the following:
- A specific competitor: /competitor-audit Ziina
- All competitors: /competitor-audit all
- A specific surface: /competitor-audit Ziina app store

## Competitors to audit
- Ziina (ziina.com / App Store / Google Play)
- Zbooni (zbooni.com / App Store / Google Play)
- Tap Payments (tap.company / App Store / Google Play)
- PayTabs (paytabs.com / App Store / Google Play)
- Mamo Pay (mamopay.com / App Store / Google Play)
- STC Pay (stcpay.com.sa) — KSA market only

## Surfaces to check per competitor
1. App Store listing: title, subtitle, description, screenshots text
2. Website homepage: headline, subheadline, primary CTA, value proposition
3. Onboarding copy: any visible sign-up or get started flow
4. Error states: any visible error messages in screenshots or reviews

## Instructions

When this skill is triggered, do the following:

1. Read CLAUDE.md in full before analysing anything
2. Fetch the competitor's public-facing copy from their website 
   and app store listing
3. Analyse their copy across these dimensions:
   - Voice: how do they sound? Warm, cold, corporate, casual?
   - Tone: how do they handle errors, success, onboarding?
   - Clarity: is copy clear for a multilingual audience?
   - Capitalisation: sentence case or title case?
   - CTAs: what structure do they use?
   - Promises: do they over-promise outcomes?
   - Personalisation: do they use "your" and "we"?
4. Return the report in this exact format:

---

### Competitor audit report

**Competitor:** [name]
**Date:** [date]
**Surfaces checked:** [list]

---

#### Voice and tone analysis

| Dimension | [Competitor] | Nomod standard |
|---|---|---|
| Overall voice | | |
| Error handling | | |
| Onboarding tone | | |
| CTA structure | | |
| Personalisation | | |
| Clarity for multilingual users | | |
| Capitalisation | | |

---

#### Where Nomod is stronger
[List specific copy patterns where Nomod's approach is clearer, 
warmer, or more trustworthy]

---

#### Where the competitor does something interesting
[List anything the competitor does that is genuinely effective, 
not to copy but to be aware of]

---

#### Gaps to watch
[Any area where the competitor's copy is landing better with 
the SME audience and Nomod should pay attention]

---

#### Raw copy samples collected
[Paste exact copy pulled from each surface for reference]

---

## Tone
Be specific and evidence-based. Every observation must reference 
actual copy pulled from the competitor. No generalisations.
