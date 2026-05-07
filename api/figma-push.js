const FIGMA_API_BASE = 'https://api.figma.com/v1';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileKey, updates } = req.body || {};
  // updates: array of { nodeId, text } or { search, text } objects

  if (!fileKey || !updates || !Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: 'fileKey and updates array are required' });
  }

  const apiKey = process.env.FIGMA_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'FIGMA_API_KEY environment variable is not set' });
  }

  try {
    // If updates use search (text matching) instead of nodeId,
    // first fetch the file to find matching text nodes
    const needsSearch = updates.some(u => u.search && !u.nodeId);

    let resolvedUpdates = [...updates];

    if (needsSearch) {
      // Fetch file to find text nodes matching the search strings
      const fileRes = await fetch(`${FIGMA_API_BASE}/files/${fileKey}`, {
        headers: { 'X-Figma-Token': apiKey }
      });

      if (!fileRes.ok) {
        const err = await fileRes.json();
        return res.status(fileRes.status).json({
          error: 'Failed to fetch Figma file',
          detail: err.message || fileRes.statusText
        });
      }

      const fileData = await fileRes.json();

      // Walk the document tree to find text nodes
      const textNodes = [];
      function walk(node) {
        if (node.type === 'TEXT') {
          textNodes.push({ id: node.id, characters: node.characters, name: node.name });
        }
        if (node.children) {
          node.children.forEach(walk);
        }
      }
      walk(fileData.document);

      // Match search strings to node IDs
      resolvedUpdates = updates.map(update => {
        if (update.nodeId) return update;

        const match = textNodes.find(n =>
          n.characters === update.search ||
          n.name === update.search ||
          n.characters.includes(update.search)
        );

        if (!match) {
          return { ...update, error: `No text node found matching: "${update.search}"` };
        }

        return { ...update, nodeId: match.id, originalText: match.characters };
      });
    }

    // Apply updates using the Figma REST API
    // Note: Figma REST API doesn't support direct text content updates on arbitrary nodes.
    // Updates require the Figma Plugin API (desktop app) for text content changes.
    // We return the resolved node IDs so the user can confirm what will be updated,
    // and flag nodes that need to be updated via the plugin.

    const results = resolvedUpdates.map(update => {
      if (update.error) {
        return { status: 'not_found', search: update.search, error: update.error };
      }
      return {
        status: 'ready',
        nodeId: update.nodeId,
        originalText: update.originalText || update.search || '[unknown]',
        newText: update.text,
        figmaUrl: `https://www.figma.com/design/${fileKey}?node-id=${update.nodeId.replace(':', '-')}`
      };
    });

    const notFound = results.filter(r => r.status === 'not_found');
    const ready = results.filter(r => r.status === 'ready');

    res.status(200).json({
      success: true,
      fileKey,
      totalUpdates: updates.length,
      resolved: ready.length,
      unresolved: notFound.length,
      results,
      note: ready.length > 0
        ? 'Text nodes identified. To apply updates, open the Figma file and use the Talk to Figma plugin with the node IDs below.'
        : 'No matching text nodes found.'
    });

  } catch (err) {
    console.error('Figma push error:', err);
    res.status(500).json({ error: err.message || 'Failed to process Figma update' });
  }
};
