module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticketId } = req.body || {};

  if (!ticketId || typeof ticketId !== 'string' || !ticketId.trim()) {
    return res.status(400).json({ error: 'ticketId is required' });
  }

  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'LINEAR_API_KEY is not configured' });
  }

  // Extract identifier from a Linear URL or plain ticket ID
  // Linear URLs look like: https://linear.app/nomod/issue/NOD-123/ticket-title
  let id = ticketId.trim();
  if (id.includes('linear.app')) {
    // Extract the segment after /issue/
    const match = id.match(/\/issue\/([A-Z]+-\d+)/i);
    if (match) {
      id = match[1].toUpperCase();
    } else {
      return res.status(400).json({ error: 'Could not extract ticket ID from the Linear URL. Paste the URL in the format: https://linear.app/workspace/issue/ID-123/title' });
    }
  } else if (id.includes('/')) {
    // Some other URL format — try extracting a ticket-like segment
    const match = id.match(/([A-Z]+-\d+)/i);
    if (match) {
      id = match[1].toUpperCase();
    } else {
      id = id.split('/').filter(Boolean).pop().toUpperCase();
    }
  } else {
    id = id.toUpperCase();
  }

  // Use issueSearch — searches by the full identifier string like ENG-9245
  const query = `
    query GetIssue($id: String!) {
      issueSearch(query: $id, first: 1) {
        nodes {
          identifier
          title
          description
          state { name }
          assignee { name }
          labels { nodes { name } }
          parent {
            identifier
            title
            description
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        'x-apollo-operation-name': 'GetIssue',
        'apollo-require-preflight': 'true'
      },
      body: JSON.stringify({ query, variables: { id } })
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Linear API responded with ${response.status}` });
    }

    const data = await response.json();
    console.log('Linear response:', JSON.stringify(data).slice(0, 1000));

    if (data.errors) {
      console.error('Linear GraphQL errors:', JSON.stringify(data.errors));
      return res.status(404).json({
        error: 'Ticket not found or not accessible',
        detail: data.errors[0]?.message || 'Unknown error'
      });
    }

    const issue = data?.data?.issueSearch?.nodes?.[0];
    if (!issue) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.status(200).json({
      identifier: issue.identifier,
      title: issue.title,
      description: issue.description || '',
      status: issue.state?.name || '',
      assignee: issue.assignee?.name || '',
      labels: issue.labels?.nodes?.map(l => l.name) || [],
      parent: issue.parent ? {
        identifier: issue.parent.identifier,
        title: issue.parent.title,
        description: issue.parent.description || ''
      } : null
    });

  } catch (err) {
    console.error('Linear fetch error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch ticket' });
  }
};
