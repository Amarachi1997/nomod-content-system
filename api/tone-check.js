const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Lazy-loaded once per Lambda instance — keeps cold-start errors visible
let SYSTEM_PROMPT = null;

function buildSystemPrompt() {
  if (SYSTEM_PROMPT) return SYSTEM_PROMPT;

  const root = path.join(__dirname, '..');
  const claudeMd = fs.readFileSync(path.join(root, 'CLAUDE.md'), 'utf8');
  const skillMd = fs.readFileSync(path.join(root, 'skills', 'tone-checker.md'), 'utf8');

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
  // DEBUG: expose runtime environment so we can see exactly what's failing
  const debugEnv = {
    __dirname,
    cwd: process.cwd(),
    nodeVersion: process.version,
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
    filesAtRoot: (() => {
      try { return fs.readdirSync(path.join(__dirname, '..')); } catch (e) { return e.message; }
    })(),
    filesAtDirname: (() => {
      try { return fs.readdirSync(__dirname); } catch (e) { return e.message; }
    })(),
    skillsDir: (() => {
      try { return fs.readdirSync(path.join(__dirname, '..', 'skills')); } catch (e) { return e.message; }
    })(),
  };

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', debug: debugEnv });
  }

  const { copy } = req.body || {};

  if (!copy || typeof copy !== 'string' || copy.trim().length === 0) {
    return res.status(400).json({ error: 'copy is required', debug: debugEnv });
  }

  let systemPrompt;
  try {
    systemPrompt = buildSystemPrompt();
  } catch (err) {
    console.error('File load error:', err);
    return res.status(500).json({
      error: 'Failed to load content guidelines',
      detail: err.message,
      stack: err.stack,
      path: err.path || null,
      debug: debugEnv
    });
  }

  try {
    const stream = await client.messages.stream({
      model: 'claude-opus-4-7',
      max_tokens: 4096,
      thinking: { type: 'adaptive' },
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' }
        }
      ],
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
      return res.status(500).json({ error: 'No text response from Claude', debug: debugEnv });
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
        stack: parseErr.stack,
        raw: textBlock.text,
        debug: debugEnv
      });
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error('Claude API error:', err);
    res.status(500).json({
      error: err.message || 'Internal server error',
      detail: err.message,
      stack: err.stack,
      type: err.constructor?.name || null,
      status: err.status || null,
      headers: err.headers || null,
      debug: debugEnv
    });
  }
};
