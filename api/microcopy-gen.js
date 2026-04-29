const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

let SYSTEM_PROMPT = null;

async function buildSystemPrompt(host) {
  if (SYSTEM_PROMPT) return SYSTEM_PROMPT;

  const base = `https://${host}`;
  const [claudeRes, skillRes] = await Promise.all([
    fetch(`${base}/CLAUDE.md`),
    fetch(`${base}/skills/microcopy-gen.md`)
  ]);

  if (!claudeRes.ok) throw new Error(`Failed to fetch CLAUDE.md: ${claudeRes.status}`);
  if (!skillRes.ok) throw new Error(`Failed to fetch microcopy-gen.md: ${skillRes.status}`);

  const claudeMd = await claudeRes.text();
  const skillMd = await skillRes.text();

  SYSTEM_PROMPT = `${claudeMd}

---

${skillMd}

---

You are a microcopy generator for Nomod. When given a surface, screen or flow, moment, and optional tone note, you generate ready-to-use product copy that fully follows the rules in CLAUDE.md. Return ONLY a valid JSON object — no explanation, no markdown, no code fences. The JSON must have this exact shape:

{
  "surface": "<surface type>",
  "flow": "<screen or flow name>",
  "moment": "<the moment being written for>",
  "components": [
    {
      "label": "<component name, e.g. Heading, Body, Primary CTA, Secondary CTA>",
      "text": "<the written copy>",
      "isCta": true | false
    }
  ],
  "rulesApplied": ["<rule 1>", "<rule 2>", "..."],
  "notes": "<any decisions made, alternatives considered, or edge cases flagged — or null>"
}

Generate every component relevant to the surface type. For a modal: Heading, Body, Primary CTA, and optionally Secondary CTA and a dismiss note. For a button: just the CTA label. For a notification: a single line of copy. For an empty state: heading, supporting text, CTA. Use judgment based on the surface.`;

  return SYSTEM_PROMPT;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { surface, flow, moment, tone } = req.body || {};

  if (!surface || !flow || !moment) {
    return res.status(400).json({ error: 'surface, flow, and moment are required' });
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
    `Surface: ${surface}`,
    `Screen or flow: ${flow}`,
    `Moment: ${moment}`,
    tone ? `Tone note: ${tone}` : null
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
          content: `Please generate microcopy for the following brief and return only the JSON object described:\n\n${userPrompt}`
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
