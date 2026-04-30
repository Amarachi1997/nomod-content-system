const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticketSummary } = req.body || {};

  if (!ticketSummary || typeof ticketSummary !== 'string' || !ticketSummary.trim()) {
    return res.status(400).json({ error: 'ticketSummary is required' });
  }

  const prompt = `You are a content classifier for Nomod, a payments company serving merchants in the UAE and KSA.

Read the following Linear ticket and infer three things:

1. emailType — which of these four types best fits:
   - Notification: triggered by an account event or system change (e.g. fee change, payout sent, document expiring, setting updated)
   - Announcement: a new feature or product change that merchants can now use
   - Promotional: an offer or incentive (discount, free trial, referral bonus)
   - Update: downtime, outage, maintenance, or a partner/service issue

2. recipient — who this email is most likely addressed to:
   - Merchant (most common — business owners using Nomod)
   - Customer (the end customer paying a merchant)
   - Internal (Nomod team only)

3. market — which market this is most likely for:
   - UAE
   - KSA
   - Both
   - Unknown (if not determinable from the ticket)

Return ONLY a valid JSON object. No explanation, no markdown, no code fences.

{
  "emailType": "Notification" | "Announcement" | "Promotional" | "Update",
  "recipient": "Merchant" | "Customer" | "Internal",
  "market": "UAE" | "KSA" | "Both" | "Unknown"
}

Ticket content:
${ticketSummary}`;

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }]
    });

    const textBlock = message.content.find(b => b.type === 'text');
    if (!textBlock) return res.status(500).json({ error: 'No response from Claude' });

    let parsed;
    try {
      const raw = textBlock.text.trim().replace(/^```json\s*/i, '').replace(/```\s*$/, '');
      parsed = JSON.parse(raw);
    } catch (e) {
      return res.status(500).json({ error: 'Claude returned invalid JSON', raw: textBlock.text });
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error('Infer email type error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};
