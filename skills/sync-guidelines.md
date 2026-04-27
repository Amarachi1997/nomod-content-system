---

# Skill: Sync guidelines

## What this skill does
Pushes the current contents of CLAUDE.md to the Google Doc 
"Nomod CLAUDE.md — Content Guidelines" in Google Drive. 
Run this every time CLAUDE.md is updated to keep Cowork 
and any other tool reading from the Doc in sync.

## How to trigger this skill
Type: /sync-guidelines

No additional input needed. The skill reads CLAUDE.md and 
pushes it to the correct Google Doc automatically.

## Instructions

When this skill is triggered, do the following:

1. Read the full contents of CLAUDE.md from the project folder
2. Using the Google Workspace MCP, find the Google Doc titled 
   "Nomod CLAUDE.md — Content Guidelines" in Google Drive
3. Replace the full contents of the Doc with the current 
   contents of CLAUDE.md exactly as written
4. Confirm the sync was successful and return:

---

### Sync report

**Date:** [date and time]
**File synced:** CLAUDE.md
**Destination:** Nomod CLAUDE.md — Content Guidelines (Google Doc)
**Status:** Success / Failed
**Sections synced:** [list the section headings that were written]

---

If the sync fails, return the exact error and suggest what 
to check. Common issues:
- Google Workspace MCP not authenticated: re-run the OAuth flow
- Doc not found: confirm the Doc title matches exactly
- Permission error: confirm the Doc is owned by 
  amarachi.chiaha@nomod.com

## When to run this skill
- After any update to CLAUDE.md
- After adding a new section to CLAUDE.md
- After a scheduled style guide review
- Before any important Cowork session where guidelines accuracy matters

## Tone
Confirm clearly. If something failed, say exactly what and why.
