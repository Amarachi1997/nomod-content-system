const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

let SYSTEM_PROMPT = null;

async function buildSystemPrompt(host) {
  if (SYSTEM_PROMPT) return SYSTEM_PROMPT;

  const base = `https://${host}`;
  const [claudeRes, skillRes, emailSkillRes] = await Promise.all([
    fetch(`${base}/CLAUDE.md`),
    fetch(`${base}/skills/email-writer.md`),
    fetch(`${base}/skills/tone-checker.md`)
  ]);

  if (!claudeRes.ok) throw new Error(`Failed to fetch CLAUDE.md: ${claudeRes.status}`);
  if (!skillRes.ok) throw new Error(`Failed to fetch email-writer.md: ${skillRes.status}`);

  const claudeMd = await claudeRes.text();
  const skillMd = await skillRes.text();
  const toneSkillMd = emailSkillRes.ok ? await emailSkillRes.text() : '';

  SYSTEM_PROMPT = `${claudeMd}

---

${skillMd}

---

${toneSkillMd}

---

You are an email writer and reviewer for Nomod. You generate or review email copy based on the brief provided. Always return ONLY a valid JSON object — no explanation, no markdown, no code fences. The JSON must match the exact shape defined in the skill above for the relevant mode (generate or review).`;

  return SYSTEM_PROMPT;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    mode,
    emailType,
    market,
    recipient,
    figmaUrl,
    ticketSummary,
    notes,
    existingCopy
  } = req.body || {};

  if (!mode || !emailType) {
    return res.status(400).json({ error: 'mode and emailType are required' });
  }

  const host = req.headers.host;

  let systemPrompt;
  try {
    systemPrompt = await buildSystemPrompt(host);
  } catch (err) {
    console.error('File load error:', err);
    return res.status(500).json({ error: 'Failed to load content guidelines', detail: err.message });
  }

  const userPrompt = mode === 'generate'
    ? [
        `Mode: Generate`,
        `Email type: ${emailType}`,
        market ? `Market: ${market}` : null,
        recipient ? `Recipient: ${recipient}` : null,
        figmaUrl ? `Figma frame URL: ${figmaUrl}` : null,
        ticketSummary ? `Linear ticket context:\n${ticketSummary}` : null,
        notes ? `Additional notes: ${notes}` : null,
      ].filter(Boolean).join('\n\n')
    : [
        `Mode: Review`,
        `Email type: ${emailType}`,
        market ? `Market: ${market}` : null,
        `Existing copy to review:\n${existingCopy}`,
        ticketSummary ? `Linear ticket context:\n${ticketSummary}` : null,
        notes ? `Additional notes: ${notes}` : null,
      ].filter(Boolean).join('\n\n');

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Please ${mode === 'generate' ? 'write' : 'review'} the Nomod email based on the following brief and return only the JSON object described:\n\n${userPrompt}`
        }
      ]
    });

    const message = await stream.finalMessage();
    const textBlock = message.content.find(block => block.type === 'text');
    if (!textBlock) return res.status(500).json({ error: 'No text response from Claude' });

    let parsed;
    try {
      const raw = textBlock.text.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, '');
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr);
      return res.status(500).json({ error: 'Claude returned invalid JSON', raw: textBlock.text });
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error('Claude API error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
