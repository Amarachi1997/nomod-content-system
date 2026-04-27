# Nomod Content System — CLAUDE.md
Version 1.2 | Last updated: 26th April 2026 | Owner: Amarachi Chiaha

This file defines Nomod's content standards. It applies to every surface: app UI, documentation, emails, notifications, and marketing. Use it whenever writing, reviewing, or editing Nomod content.

---

## 1. Voice

Nomod's voice is built on these core traits. The voice is always on — only the tone shifts by context.

- Effortless simplicity: if we can say it in fewer, clearer words, we do
- Human and responsive: acknowledge first, explain clearly, help immediately
- Speed and momentum: every word should help the user move forward
- Trust and reliability: say exactly what is happening, clearly, calmly, honestly
- Empowerment: we support progress without pressure
- Transparency: say the price plainly and explain it when it matters
- Modern: show capability clearly without the hype

### What the voice always sounds like
- Clear, calm, and plainspoken
- Active and direct
- Warm but professional
- Human: uses "we" to show ownership, "your" to address the user
- Confident without being flashy

### What the voice never sounds like
- Robotic, scripted, or cold
- Marketing-heavy or full of hype
- Patronising or condescending
- Vague or evasive
- Urgent or pressuring

---

## 2. Tone

Tone shifts by situation. Voice stays constant.

| Context | Tone |
|---|---|
| Onboarding | Reassuring, step-by-step |
| Daily use | Invisible, efficient |
| Errors and issues | Calm, empathetic, solution-first — empathy level varies by component: full empathy in tooltips and emails; functional and clear in toasts; solution-focused in inline validations |
| Support prompts | Friendly, inviting |
| Delays and downtime | Transparent, reassuring |
| Payments and payouts | Confident, factual |
| Loading and processing | Calm, purposeful |
| CTAs | Action-oriented |
| Pricing and fees | Direct, neutral |
| FAQs and help docs | Supportive, non-judgmental |
| Marketing | Aspirational but credible |
| Verification steps | Patient, guiding |
| New features | Simple, benefit-led |
| Status updates | Clear, time-bound |
| Onboarding success | Affirming, confidence-building |
| Feature education | Practical, outcome-led |
| Pricing upgrades | Supportive, non-pushy |
| Legal or policy content | Plain, neutral |
| Feature overview | Confident, clear |

### Internal tone test
- Would a first-time business owner understand this on the first read?
- Does this sound like something a helpful teammate would say?
- Would I trust this line with my money?
- Does this help the user move forward?

---

## 3. Writing principles

- Be clear before being clever. Write for a diverse, multilingual audience. Simplify without losing meaning.
- Personalise wherever possible. Use "your" and "we" to make users feel seen. "Your payouts have been paused" not "Payouts are paused."
- Reduce friction everywhere. Guide without talking down. Walk users through things step by step.
- Never over-promise. Only state an outcome if Nomod can guarantee it completely, every time. If the result depends on a review or approval, describe the next step, not the final result.
- No apology openers. State what happened calmly and move immediately to what the user can do next. "Oops!" is never permitted in failure states.
- Never make the user feel stupid, at fault, or alone. This applies to every surface, every error, and every moment where something has gone wrong.
- Front-load the action. Lead with what the user needs to do before explaining why. "Add your bank account to get paid" not "To get paid, add your bank account."
- If a user might feel surprised later, explain it now. Proactive disclosure builds more trust than any reassurance copy written after the fact. Surprise costs are the fastest way to lose trust.
- The user is the hero, not Nomod. Write success states, feature announcements, and marketing copy from the user's perspective. "You are now accepting payments" not "Nomod now processes your payments."
- Speed should feel reassuring, not rushed. Momentum and calm can coexist. Clear next steps. No pressure tactics.

---

## 4. Mental relaxers

A mental relaxer is a short, reassuring statement that reduces a user's sense of risk or panic. It is placed after stating what happened and before the next action.

Structure: What happened → Mental relaxer → What to do next

### How to write one
- Normalising clause: "This can happen if the file is unclear or out of date."
- Reversibility statement: "Don't worry, you can add it back anytime."
- Forward-looking reassurance: "We'll review it again as soon as you upload a valid copy."

### When to use mental relaxers

Use when:
- The user needs reassurance
- They cannot take any action to change the situation
- They need to be patient while something is processed or reviewed

Do not use when:
- A failure has occurred and the user needs to take immediate action
- In those moments, lead with the action first, not a reassurance

Example of the distinction:

Mental relaxer appropriate:
"We are reviewing your documents. This usually takes one to two business days. You will hear from us as soon as it is done."

Action-first appropriate:
"We could not verify your Emirates ID. Upload a clear, valid copy to continue."

### Approved mental relaxer patterns

Reassurance:
- "This won't affect your payouts."
- "No action needed right now."
- "Your account is still secure."

Progress confirmation:
- "We're reviewing this now."
- "This usually takes up to 48 hours."
- "You'll hear from us as soon as it's done."

Control and escape:
- "You can come back to this later."
- "You can update this anytime."
- "Chat with us on WhatsApp if you'd like help."

### Checklist before publishing
- Is the statement actually true?
- Is it specific?
- Is it placed after the problem and before the next action?
- Does it avoid blame?
- Is it appropriate for the severity of the situation?

---

## 5. Exclamation marks

Use only in genuine, non-financial success moments. One exclamation opener only. Never mid-sentence. Never at the end of a sentence.

| Format | Permitted? | Example |
|---|---|---|
| Celebratory opener | Yes | Nice! You've created your first Link. |
| Mid-sentence | No | You've created your first Link, finally! |
| End of sentence | No | You've created your first Link! |
| Multiple exclamations | No | Awesome! You've created your first Link! |
| Error or urgent state | Never | Your payout wasn't processed correctly! |

Before adding an exclamation, ask:
- Has the user just completed a meaningful or beneficial action?
- Is this a non-financial moment?
- Would a real person say "well done" here without it feeling patronising?

All three must be true.

---

## 6. Capitalisation

Sentence case everywhere. Capitalise the first word and proper nouns only.

| Component | Rule | Example |
|---|---|---|
| Buttons | Sentence case | Add payout method |
| Modal titles | Sentence case | Remove this business? |
| Headings | Sentence case | How payouts work |
| Email subject lines | Sentence case | Same-day payouts are now available |
| Inline errors | Sentence case | Enter a valid mobile number |
| Success messages | Sentence case | Nice! Your order has been submitted |
| Failure messages | Sentence case | Looks like your details didn't save correctly |
| Loading states | Sentence case + ellipsis | Loading your dashboard… |
| Tab and navigation labels | Sentence case | Payout methods |
| Feature names | Capitalised | Membership / Same-Day Payouts / Payment Link |
| Merchant account terms | Camel case | Price Plan / Payment Method / Account Balance |
| Brand and partner names | As defined by brand | Apple Pay / Tabby / Tamara |
| Currency abbreviations | All caps | AED / USD / GBP |
| Variables | Lowercase snake_case | [account_holder_name] |

### Feature names — always capitalised
Membership, Payment Link, Invoice, Same-Day Payouts, Team, Store, Campaign, Tap to Pay, QR Pay, Buy Now Pay Later, Service Fee

### Common mistakes
| Wrong | Correct |
|---|---|
| Add Payout Method (button) | Add payout method |
| upgrade to membership | Upgrade to Membership |
| LOADING… | Loading… |
| Payment method (account term) | Payment Method |
| same-day payouts (feature) | Same-Day Payouts |

---

## 7. Punctuation

| Mark | Rule |
|---|---|
| Full stop | Separate complete thoughts. Not on short labels or single-line actions. |
| Comma | Clarify meaning, improve readability, list items. |
| Exclamation | See Section 5. |
| Ellipsis | Ongoing actions or loading states only. |
| Colon | Introduce lists or explanations. |
| Em dash | Never. Use a full stop or restructure the sentence. |
| Parentheses | Minor clarifications only. No nesting. |

- CTAs and button labels: no punctuation
- Error messages: complete sentences ending with a full stop
- Tooltip text: no full stop for single sentences
- Steps in documentation: no full stop at the end

---

## 8. Numbers, dates, and currency

| Rule | Correct | Incorrect |
|---|---|---|
| Spell out one to nine | Two, three, nine | 2, 3, 9 |
| Numerals for 10 and above | 10, 50, 25,000 | Ten, fifty |
| Thousands separator | AED 20,000 | AED 20000 |
| Date format | 30th October 2025 | October 30th / 30/10/25 |
| Time format | 14:30 | 2:30pm |
| Currency format | AED 50.00 / USD 10.00 | 50 AED / $10 |
| Decimal places | AED 9.99 / AED 33.33 | AED 10 (for amounts under 10) |

---

## 9. Error and failure messages

Structure: What happened + What to do next
In high-stakes moments: What happened → Mental relaxer → What to do next

### Permitted openers
| Opener | Permitted? |
|---|---|
| Oops! | No — apology opener in an error state |
| Unfortunately, | No — adds unnecessary weight |
| Looks like… | Yes |
| We couldn't… | Yes |
| Something went wrong | Yes |

### Examples
- Looks like your details didn't save correctly. Please try again.
- We couldn't verify your document. This can happen if the file is unclear or out of date. Please upload a valid copy and we'll review it again.
- Something went wrong. Please try again.

---

## 10. Microcopy patterns

### Button CTAs
Structure: Verb + Feature name or requirement
- Add payout method / Create Campaign / Sign in
- No personalisation: "Add payout method" not "Add your payout method"
- No vague language: "Add bank account" not "Add some account details"

### Standard CTAs by feature
| Feature | CTA |
|---|---|
| Membership | Become a member / Join Membership |
| Account | Get started / Sign up / Sign in |
| Team | Add a team member / Join a team |
| Payout | Add payout method |

### Success states
Single exclamation opener permitted. Celebrate the action, not Nomod.
- Nice! Your order has been submitted.
- Great! You've added a payment method.

### Failure states
No blame. No "Oops!". State what happened. Point to next step.

Support channel: When a secondary CTA routes to support, name the channel explicitly. Use "Chat with us on WhatsApp" not "Contact support."

### Confirmation pop-ups
Structure: Question → Supporting text (include mental relaxer if destructive) → CTAs
- Remove this business? Don't worry, you can add it back anytime. Yes / No

### Empty states
Structure: No [Item] yet → Supporting text → CTA
- No payout methods yet. You need at least one to start receiving payouts.

---

## 11. Channel-specific rules

### Product UI
- Always personalise: "Your payouts" not "Payouts"
- State what happened before what to do next
- Never over-promise
- Mental relaxers in confirmation pop-ups, error states, cancellation flows
- No marketing language inside the product

### In-app notifications
- No exclamation marks. Ever.
- No emojis unless the design system explicitly includes them
- State the consequence of not acting, only if you can state it accurately
- One to two lines maximum

### Marketing emails
- Sentence case subject lines
- No clickbait
- Open with value, not with Nomod
- One primary CTA per email: Verb + Feature or Verb + Benefit
- Never "Click here"

### Transactional emails
- Include specific amount, date, and account reference
- No exclamation marks
- No humour
- Do not over-promise timelines

### Nomod Docs
- Numbered steps, not bullet points
- CTA text in steps is always bold
- No full stops at the end of steps
- No marketing language
- Always include a "What happens next" section

### Customer support templates
- Always use the user's first name
- Never use "revert" to mean "reply"
- Promise a timeline for an update, not a resolution
- Sign off with a name

---

## 12. Terminology

Consistency is trust. Use the same terms everywhere. "Payout" not "transfer" sometimes and "payout" other times. Same timeframes across app, email, and docs. Same tone in good and bad moments. Inconsistency signals unreliability even when the product is not at fault.

| Term | Definition |
|---|---|
| Payouts | Money earned by merchants that Nomod sends out |
| Payout methods | Bank accounts where Nomod sends merchants' payouts |
| Charge | A request to collect money from a customer's payment method |
| BNPL | Buy Now, Pay Later — refers to Tabby and Tamara on Nomod |
| Membership | Paid tier giving merchants same-day payouts and higher limits |
| Same-day payout | Payout processed and sent same day, subject to eligibility |
| Customer | A person who makes a payment to a merchant |
| Merchant | A business or individual using Nomod to accept payments |
| Sign up | Creating a new Nomod account |
| Sign in | Accessing an existing Nomod account |
| Team | The feature that lets users add team members |
| Team mate | A person who is a member of a team |
| Payout days | UAE: Monday to Friday / KSA: Sunday to Thursday |

### Brand and partner names
| Brand | How it is written |
|---|---|
| American Express | Amex or American Express |
| Tabby | Tabby |
| Tamara | Tamara |
| Apple Pay | Apple Pay |
| Google Pay | Google Pay |
| MasterCard | MasterCard |
| Visa | Visa |
| Mada | Mada or mada |

---

## 13. Dynamic content

Variables must be enclosed in square brackets and use snake_case.
- [account_holder_name]
- [membership_plan]
- [business_name]

For plurals, use conditional brackets:
- Update your document[s]
- Your document[s] is[are] being reviewed

---

## 14. Internationalisation

- Keep celebrations inclusive. Avoid language that assumes every user participates in a specific tradition.
- Stylistic devices must survive translation. Before using any metaphor or idiom, ask: does this make sense if someone runs it through a translation tool?

---

## 15. What Nomod never says

- "Oops!" in any error or failure state
- "Click here"
- "Simply" or "just" as filler
- "Seamlessly" or "leverage" or "utilise"
- "We're sorry" or any apology opener
- "Shortly", "very soon", "almost there", "as soon as possible"
- "Don't worry" without following it with a specific reason
- "Everything is sorted" or vague resolution language
- Anything that promises an outcome Nomod cannot guarantee every time

---

## 16. Localisation: UAE vs KSA

These rules apply to all copy. Every skill reads this section before generating or reviewing any output.

### Payout days
- UAE: Monday to Friday
- KSA: Sunday to Thursday

Never reference payout days without specifying the market.

### Currency
- UAE: AED
- KSA: SAR

Use [CURRENCY] as a variable in copy that serves both markets.

### Payment methods
- UAE: Apple Pay, Google Pay, Visa, Mastercard, AMEX
- KSA: Mada is the dominant local debit network and must always be included in KSA copy. STC Pay is mainstream. Reference Tamara before Tabby in KSA copy.

Never omit Mada from KSA-facing payment method copy.

### Identity documents
- UAE: Emirates ID
- KSA: National ID (Iqama for residents, Hawiyya for citizens)

Never reference "Emirates ID" in KSA copy.

### Business registration
- UAE: Trade Licence
- KSA: Commercial Registration (CR)

Never use "Trade Licence" in KSA copy.

### Regulatory bodies
- UAE: Central Bank of the UAE (CBUAE)
- KSA: Saudi Central Bank (SAMA)

Never reference the wrong regulatory body for the market.

### Working week
- UAE: Weekend is Saturday and Sunday
- KSA: Weekend is Friday and Saturday

Never use "over the weekend" without specifying the market.

### Trust tone
- UAE: Startup and challenger-brand language is acceptable.
- KSA: Trust is earned through alignment with established systems. Avoid disruption-led language. Include regulatory reassurance in onboarding and verification copy.

### Urgency tone
- UAE: Direct urgency is acceptable in time-sensitive copy.
- KSA: Pair urgency language with a reassurance element in financial and verification surfaces.

### Cultural references
- UAE: UAE National Day, Dubai Shopping Festival, multicultural celebrations
- KSA: Saudi National Day, Founding Day, Ramadan

Never use UAE-specific references in KSA copy or vice versa. Ramadan copy must be inclusive and not assume all users participate equally.

### BNPL
- UAE: Tabby and Tamara. Either can be referenced.
- KSA: Reference Tamara first. Tabby is also present.

### Terminology to avoid in both markets
- "Interest" in any financial context. Use "fee" or "charge".
- Any idiom that does not survive Arabic translation.
- Any culturally inappropriate metaphor or reference.

### Copy that must always be market-specific
- Payout day references
- Currency amounts
- Identity document names
- Business registration terms
- Regulatory body names
- Weekend references
- Payment method lists
