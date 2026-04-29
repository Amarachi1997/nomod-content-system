const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

let SYSTEM_PROMPT = null;

async function buildSystemPrompt(host) {
  if (SYSTEM_PROMPT) return SYSTEM_PROMPT;

  const base = `https://${host}`;
  const [claudeRes, skillRes] = await Promise.all([
    fetch(`${base}/CLAUDE.md`),
    fetch(`${base}/skills/copy-reviewer.md`)
  ]);

  if (!claudeRes.ok) throw new Error(`Failed to fetch CLAUDE.md: ${claudeRes.status}`);
  if (!skillRes.ok) throw new Error(`Failed to fetch copy-reviewer.md: ${skillRes.status}`);

  const claudeMd = await claudeRes.text();
  const skillMd = await skillRes.text();

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
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: systemPrompt,
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
