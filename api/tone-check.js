const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

let SYSTEM_PROMPT = null;

async function buildSystemPrompt(host) {
  if (SYSTEM_PROMPT) return SYSTEM_PROMPT;

  const base = `https://${host}`;
  const [claudeRes, skillRes] = await Promise.all([
    fetch(`${base}/CLAUDE.md`),
    fetch(`${base}/skills/tone-checker.md`)
  ]);

  if (!claudeRes.ok) throw new Error(`Failed to fetch CLAUDE.md: ${claudeRes.status}`);
  if (!skillRes.ok) throw new Error(`Failed to fetch tone-checker.md: ${skillRes.status}`);

  const claudeMd = await claudeRes.text();
  const skillMd = await skillRes.text();

  SYSTEM_PROMPT = `${claudeMd}

---

${skillMd}

---

You are a tone checker for Nomod. When given a piece of copy, you review it strictly against the rules in CLAUDE.md and return ONLY a valid JSON object — no explanation, no markdown, no code fences. The JSON must have this exact shape:

{
  "verdict": "Pass" | "Fail" | "Pass with notes",
  "copyReviewed": "<the original copy>",
  "issues": [
    {
      "rule": "<section and rule name from CLAUDE.md>",
      "copy": "<the exact phrase or sentence that breaks the rule>",
      "fix": "<suggested replacement>"
    }
  ],
  "whatWorks": "<a brief note on what is already well-written — or null if nothing>",
  "revised": "<the full revised version of the copy with all issues fixed>"
}

If there are no issues, return an empty array for "issues" and set verdict to "Pass".`;

  return SYSTEM_PROMPT;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { copy } = req.body || {};

  if (!copy || typeof copy !== 'string' || copy.trim().length === 0) {
    return res.status(400).json({ error: 'copy is required' });
  }

  const host = req.headers.host;

  let systemPrompt;
  try {
    systemPrompt = await buildSystemPrompt(host);
  } catch (err) {
    console.error('File load error:', err);
    return res.status(500).json({
      error: 'Failed to load content guidelines',
      detail: err.message
    });
  }

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Please tone-check the following copy against Nomod's brand voice guidelines and return only the JSON object described:\n\n${copy}`
        }
      ]
    });

    const message = await stream.finalMessage();

    const textBlock = message.content.find(block => block.type === 'text');
    if (!textBlock) {
      return res.status(500).json({ error: 'No text response from Claude' });
    }

    let parsed;
    try {
      const raw = textBlock.text.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, '');
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr);
      return res.status(500).json({
        error: 'Claude returned invalid JSON',
        detail: parseErr.message,
        raw: textBlock.text
      });
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error('Claude API error:', err);
    res.status(500).json({
      error: err.message || 'Internal server error',
      type: err.constructor?.name || null,
      status: err.status || null
    });
  }
};
