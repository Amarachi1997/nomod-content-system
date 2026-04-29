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

  // Normalise ticket ID — strip prefix if user pastes full URL
  const id = ticketId.trim().toUpperCase().replace(/^.*\//, '');

  const query = `
    query GetIssue($id: String!) {
      issue(id: $id) {
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
  `;

  try {
    const response = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey
      },
      body: JSON.stringify({ query, variables: { id } })
    });

    if (!response.ok) {
      return res.status(502).json({ error: `Linear API responded with ${response.status}` });
    }

    const data = await response.json();

    if (data.errors) {
      return res.status(404).json({
        error: 'Ticket not found or not accessible',
        detail: data.errors[0]?.message || 'Unknown error'
      });
    }

    const issue = data?.data?.issue;
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
