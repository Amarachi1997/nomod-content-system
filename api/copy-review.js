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
  const skillMd = fs.readFileSync(path.join(root, 'skills', 'copy-reviewer.md'), 'utf8');

  SYSTEM_PROMPT = `${claudeMd}

---

${skillMd}

---

You are a copy reviewer for Nomod. When given copy to review, you check it strictly against every rule in CLAUDE.md and return ONLY a valid JSON object — no explanation, no markdown, no code fences. The JSON must match the exact shape defined in the skill above.`;

  return SYSTEM_PROMPT;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { copy, surface, market, context, outcomeControlled } = req.body || {};

  if (!copy || typeof copy !== 'string' || copy.trim().length === 0) {
    return res.status(400).json({ error: 'copy is required' });
  }

  let systemPrompt;
  try {
    systemPrompt = buildSystemPrompt();
  } catch (err) {
    console.error('File load error:', err);
    return res.status(500).json({
      error: 'Failed to load content guidelines',
      detail: err.message,
      path: err.path || null
    });
  }

  const userPrompt = [
    `Copy: ${copy}`,
    surface ? `Surface: ${surface}` : null,
    market ? `Market: ${market}` : null,
    context ? `Context: ${context}` : null,
    outcomeControlled ? `Outcome controlled by Nomod: ${outcomeControlled}` : null
  ]
    .filter(Boolean)
    .join('\n');

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
          content: `Please review the following copy against Nomod's content standards and return only the JSON object described:\n\n${userPrompt}`
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
