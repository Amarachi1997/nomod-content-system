# Skill: Docs writer

## What this skill does
Writes, updates, or restructures Nomod Docs articles. Handles three distinct scenarios. Creates Google Docs directly in Drive following Nomod Docs naming conventions and folder structure.

---

## The three scenarios

### Scenario 1 — New feature
A feature that has no existing docs folder in Nomod Docs 2.0.

**What to do:**
- Read the Linear ticket and parent ticket for full feature context
- Read the Figma file to understand the UI, flows, and feature scope
- Propose sub-article titles based on what the feature does and how it's structured in the UI
- Draft all selected articles from scratch
- Create a new folder inside Nomod Docs 2.0 named after the feature
- Name each article: `Nomod Docs / [Feature] / [Article Title] v1.0`

**Sub-article naming patterns for new features:**
- How [Feature] Works — always the first article. Explains what the feature is, why it exists, and how to enable it
- [Key action the feature enables] — e.g. "Creating an Invoice", "Choosing a Service Fee Method"
- Managing [Feature] — always the last article. Covers disabling, switching, editing settings

Additional articles are added between these two anchors based on what the feature actually does.

---

### Scenario 2 — Feature update
An existing feature with one or more changes that affect some of its current sub-articles.

**What to do:**
- Read the Linear ticket to understand what changed
- Read the Figma file to understand the updated UI and flows
- Read ALL existing sub-articles for this feature from Drive
- Identify which sub-articles are affected by the change
- Update only the affected sub-articles — do not rewrite untouched ones
- Version each updated article at +0.1 from its current version
- Save updated articles back to the same existing folder — do not create a new folder

**Version rule:** If the current version is v1.0, the updated version is v1.1. If v1.2, the new version is v1.3. Always check the current version before saving.

**Naming:** `Nomod Docs / [Feature] / [Article Title] v[new version]`

---

### Scenario 3 — Split and improve
An existing feature with a single monolithic doc (or a doc that covers too many topics in one article) that needs to be restructured into proper sub-articles with improved copy.

**What to do:**
- Read the existing doc(s) from Drive
- Read the Figma file to understand the current UI
- Identify natural topic boundaries within the existing content
- Propose a new sub-article structure based on those boundaries
- Rewrite the content from scratch for each new article — do not copy-paste from the existing doc
- Apply the full Nomod Docs writing standard (see below)
- Save all new articles to the existing feature folder
- Version: start new articles at v1.0 unless a version already exists for that title, in which case use +0.1
- The original monolithic doc should be noted as superseded — do not delete it (that is the user's decision)

---

## Nomod Docs writing standard

Apply this to every article regardless of scenario.

### Article structure

```
[Feature name] — HEADING_1
[One to two sentence intro — what the feature does and why it matters] — NORMAL_TEXT
/**image goes here**/ — NORMAL_TEXT (always include this placeholder after the intro)
[Section heading] — HEADING_3
[Body or numbered steps] — NORMAL_TEXT
[Cross-link to related article] — NORMAL_TEXT
```

### Intro paragraph rules
- One to two sentences only
- State what the feature does and the core benefit to the merchant
- Never start with "This feature allows you to..." — lead with what it does
- Never use marketing language — purely informational
- No exclamation marks

**Bad:** "The Service Fee feature allows you to add a small fee to your Links, Invoices, and In-Person transactions, which your customers pay on top of the original amount."
**Good:** "Service Fee lets you pass transaction costs on to your customers as a small addition to their total, keeping those costs off your business."

### Section headings
- HEADING_3 only — never HEADING_2
- Sentence case — first word and proper nouns only
- Describe what the section does, not what it is
- Good: "How to enable Markup", "Disabling the Service Fee", "How the fee is calculated"
- Bad: "The Automatic Method", "Important Considerations", "Overview"

### Steps
- Numbered list format
- Each step is one action only
- Bold the UI element being tapped or selected: **Settings**, **Save**, **Manage markup**
- No full stop at the end of a step
- Start with a verb: "Go to...", "Tap...", "Select...", "Enter..."
- Never say "click" — always "tap" for mobile, "select" for dropdowns

### Body paragraphs
- Plain prose, no bullet points unless listing options that don't have a natural order
- Short sentences — if a sentence has more than two clauses, split it
- Never use "in order to" — use "to"
- Never use "utilise" — use "use"
- Never use "however" to start a sentence — restructure
- Never use "please" — steps are instructions, not requests
- Always use "you" and "your" — never passive voice

**Bad:** "The fee is calculated based on the subtotal."
**Good:** "The fee is calculated on your subtotal, after any discounts."

### Notes and callouts
- Use for: exceptions, important caveats, cross-references to related settings
- Format: `Note: [content]` — label it clearly
- Keep notes to one sentence where possible
- Never use notes for basic information that belongs in the body

### Cross-links
- Always end an article with a cross-link to the next logical article
- Format: "Learn how to [action] [Feature name linked to article title]"
- Good: "Learn how to choose the right method for your business. [Choosing a Service Fee Method]"
- Never use "click here" or "read more"

### What Nomod Docs never does
- Never uses exclamation marks
- Never uses marketing language ("powerful", "seamless", "game-changing")
- Never says "simply" or "just" as filler
- Never uses em dashes — use a comma or full stop
- Never uses passive voice when active is possible
- Never writes steps as prose — steps are always numbered
- Never uses "please" in instructions
- Never writes more than two sentences in the intro
- Never uses title case in headings — always sentence case
- Never addresses the reader as "users" — always "you"

---

## Folder and versioning logic

### Known folders in Nomod Docs 2.0 (ID: 11WHhtxvE8LQTX42O4NzDpF7UFkZ_Nud0)

| Feature | Folder ID |
|---|---|
| Service Fee | 1Hh-pcFJFdDByu3cGxs9iqSAk2fqabcgr |
| Markup | 1XK6lrqIOUMyu7jUskTfXQNwq7PMG6tUV |
| Invoice | 1VZlzEbemgdIfxPsWRbI8cktFyZKi5Jar |
| Links | 16KhMi8jpl7ISayZgnGOOAyXexIsoekMj |
| In Person Payments | 1XydRi3FV82eriyaU_gF-3IWiWS-MrXTm |
| Payouts | 1rVEZlFzRoM-KT71WVkuOFd3NEoloed8S |
| Teams | 1YR87a9WmGi5FDyGJZNKT5SiRb6EP_n_M |
| Price Plans | 1wbwtc3qNZt2FnTGrBV9z2jo26ro8TXHf |
| Integrations | 1-eOUUuYdO5ufTkLDTrEKo5TmysweXOTA |
| Supplies Hub | 1oQ6nMEApQsmzN-8RQKZicBtZKAqGcJfV |
| Collect | 1KiUcil1gvyaK-n7YlMNQYIuvWzY5qKLG |
| Starting Guide | 1lI5hOStCIlYStzehbm-QIVi2VaWV50Oi |
| Bank Account | 1UbzG_eL0J1m9VWD8z0SYtjDj99UJM6D4 |
| Webhooks | 1JHjP1_-G4gv4NtK0wOkw0YHkIGycmUcv |
| Catalogue | 1ULwoUKnD6b3LCUB35s6KVU_B6DNbFRAM |
| Understanding Dashboard | 1i7AlZbizseoVMD4KoyCBShGUjt-Uzv2A |
| API Reference | 1umJbdbT1-_LiVMnglT41yi41MqvmXhU5 |

**Before creating any new folder:** always check the list above and search Drive to confirm the folder does not already exist. Only create a new folder if the feature name does not match any existing folder.

### Versioning rules
- New feature, new article: v1.0
- Existing article, minor update: current version + 0.1 (e.g. v1.0 → v1.1)
- New article added to existing feature folder: v1.0
- Split and improve — new articles replacing a monolithic doc: v1.0

### Naming convention
`Nomod Docs / [Feature] / [Article Title] v[version]`

Examples:
- `Nomod Docs / Markup / How Markup Works v1.0`
- `Nomod Docs / Service Fee / Choosing a Service Fee Method v1.1`
- `Nomod Docs / Invoice / Understanding Invoice v1.1`

---

## Stage 1 — Structure proposal

When given a Linear ticket, parent ticket, and Figma file URL, do the following:

1. Read the ticket and parent ticket to understand the feature, what changed, and the scope
2. Read the Figma file to understand the UI structure and user flows
3. Check the existing folder list above to determine if this is a new or existing feature
4. If existing: read the current sub-articles from Drive to understand what already exists
5. Identify the docs scenario: New feature / Feature update / Split and improve
6. Propose sub-article titles with a one-line description of what each covers

Present the proposal as a numbered list. Ask the user to confirm which articles they want before drafting anything.

---

## Stage 2 — Content generation and Drive creation

Once the user confirms the article list:

1. Draft each article in full using the Nomod Docs writing standard above
2. For each article, determine the correct folder ID from the list above
3. If new feature: create the folder first using `gdocs_create` with folder mimeType, then create the articles inside it
4. Use `gdocs_create` with `structured_content` for each article — use HEADING_1 for the feature title, HEADING_3 for section headings, NORMAL_TEXT for body and steps
5. Name each document following the naming convention above
6. After creating all articles, share the Drive links

---

## Copy quality checklist — run before creating any article in Drive

- [ ] Intro is one to two sentences and leads with what the feature does
- [ ] /**image goes here**/ placeholder is present after the intro
- [ ] All section headings are HEADING_3 and sentence case
- [ ] All steps are numbered and bold UI elements
- [ ] No full stops at the end of steps
- [ ] No marketing language anywhere
- [ ] No exclamation marks anywhere
- [ ] No passive voice in steps or body paragraphs
- [ ] Cross-link present at the end of the article
- [ ] Document title follows naming convention
- [ ] Version is correct for the scenario
