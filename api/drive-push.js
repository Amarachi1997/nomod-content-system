const { google } = require('googleapis');

// Known folder IDs
const FOLDERS = {
  // Nomod Docs 2.0
  'docs_root': '11WHhtxvE8LQTX42O4NzDpF7UFkZ_Nud0',
  'Service Fee': '1Hh-pcFJFdDByu3cGxs9iqSAk2fqabcgr',
  'Markup': '1XK6lrqIOUMyu7jUskTfXQNwq7PMG6tUV',
  'Invoice': '1VZlzEbemgdIfxPsWRbI8cktFyZKi5Jar',
  'Links': '16KhMi8jpl7ISayZgnGOOAyXexIsoekMj',
  'In Person Payments': '1XydRi3FV82eriyaU_gF-3IWiWS-MrXTm',
  'Payouts': '1rVEZlFzRoM-KT71WVkuOFd3NEoloed8S',
  'Teams': '1YR87a9WmGi5FDyGJZNKT5SiRb6EP_n_M',
  'Price Plans': '1wbwtc3qNZt2FnTGrBV9z2jo26ro8TXHf',
  'Integrations': '1-eOUUuYdO5ufTkLDTrEKo5TmysweXOTA',
  'Supplies Hub': '1oQ6nMEApQsmzN-8RQKZicBtZKAqGcJfV',
  'Collect': '1KiUcil1gvyaK-n7YlMNQYIuvWzY5qKLG',
  'Starting Guide': '1lI5hOStCIlYStzehbm-QIVi2VaWV50Oi',
  'API Reference': '1umJbdbT1-_LiVMnglT41yi41MqvmXhU5',
  // FAQ Documents
  'faq_root': '1CAExZE03SjnrZNZkMIzxlZBrT_dxFxyc',
  'faq_app': '1chgNUmraPwkO1SLHvMCf13l3CJcqXT-C',
  'faq_web': '1oIqPBbR_Jkeby3KiIJ3u2l4pUByAitp6',
  'faq_feature_pages': '1Hj16yT7jfu355oyNzNEm1b8CVDp-rji0',
};

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT environment variable is not set');
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/documents'
    ]
  });
}

async function findOrCreateFolder(drive, name, parentId) {
  // Search for existing folder with this name under the parent
  const res = await drive.files.list({
    q: `name = '${name.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and '${parentId}' in parents and trashed = false`,
    fields: 'files(id, name)',
    spaces: 'drive'
  });

  if (res.data.files && res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  // Create the folder
  const folder = await drive.files.create({
    requestBody: {
      name,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId]
    },
    fields: 'id'
  });

  return folder.data.id;
}

async function getLatestVersion(drive, folderId, baseName) {
  const res = await drive.files.list({
    q: `name contains '${baseName.replace(/'/g, "\\'")}' and '${folderId}' in parents and trashed = false`,
    fields: 'files(id, name)',
    orderBy: 'name desc',
    spaces: 'drive'
  });

  if (!res.data.files || res.data.files.length === 0) return null;

  // Extract version numbers and find the highest
  let highest = 0;
  for (const file of res.data.files) {
    const match = file.name.match(/v(\d+\.\d+)$/);
    if (match) {
      const v = parseFloat(match[1]);
      if (v > highest) highest = v;
    }
  }

  return highest > 0 ? highest : null;
}

function bumpVersion(current) {
  if (!current) return '1.0';
  const parts = current.toString().split('.');
  const minor = parseInt(parts[1] || '0') + 1;
  return `${parts[0]}.${minor}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    type,        // 'doc' | 'faq'
    feature,     // feature name e.g. 'Markup'
    title,       // article title e.g. 'How Markup Works'
    content,     // array of { style, text } blocks or plain string
    surface,     // for FAQs: 'app' | 'web'
    isNew        // true if new feature, false if updating existing
  } = req.body || {};

  if (!type || !feature || !title || !content) {
    return res.status(400).json({ error: 'type, feature, title, and content are required' });
  }

  let auth;
  try {
    auth = getAuth();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  const drive = google.drive({ version: 'v3', auth });
  const docs = google.docs({ version: 'v1', auth });

  try {
    // Determine the parent folder
    let parentFolderId;

    if (type === 'doc') {
      // Check if a known folder exists for this feature
      const knownId = FOLDERS[feature];
      if (knownId) {
        parentFolderId = knownId;
      } else {
        // Create a new folder under docs_root
        parentFolderId = await findOrCreateFolder(drive, feature, FOLDERS['docs_root']);
      }
    } else if (type === 'faq') {
      const faqParent = surface === 'app' ? FOLDERS['faq_app'] : FOLDERS['faq_feature_pages'];
      // Check for existing feature folder inside the FAQ parent
      const res2 = await drive.files.list({
        q: `name = '${feature.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and '${faqParent}' in parents and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive'
      });
      if (res2.data.files && res2.data.files.length > 0) {
        parentFolderId = res2.data.files[0].id;
      } else {
        parentFolderId = await findOrCreateFolder(drive, feature, faqParent);
      }
    }

    // Determine version
    const latestVersion = await getLatestVersion(drive, parentFolderId, title);
    const version = isNew ? '1.0' : bumpVersion(latestVersion);

    // Build document title
    let docTitle;
    if (type === 'doc') {
      docTitle = `Nomod Docs / ${feature} / ${title} v${version}`;
    } else {
      docTitle = surface === 'app'
        ? `${feature} FAQ App v${version}`
        : `${feature} FAQs v${version}`;
    }

    // Create the Google Doc
    const docRes = await docs.documents.create({
      requestBody: { title: docTitle }
    });
    const docId = docRes.data.documentId;

    // Move to the correct folder
    await drive.files.update({
      fileId: docId,
      addParents: parentFolderId,
      removeParents: 'root',
      fields: 'id, parents'
    });

    // Insert content using batchUpdate
    const requests = [];
    let index = 1;

    const blocks = Array.isArray(content) ? content : [{ style: 'NORMAL_TEXT', text: content }];

    // Build requests in reverse order so indices stay valid
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      const text = block.text + '\n';

      requests.push({
        insertText: {
          location: { index },
          text
        }
      });

      const styleMap = {
        'HEADING_1': 'HEADING_1',
        'HEADING_2': 'HEADING_2',
        'HEADING_3': 'HEADING_3',
        'NORMAL_TEXT': 'NORMAL'
      };

      const namedStyle = styleMap[block.style] || 'NORMAL';

      if (namedStyle !== 'NORMAL') {
        requests.push({
          updateParagraphStyle: {
            range: { startIndex: index, endIndex: index + text.length },
            paragraphStyle: { namedStyleType: namedStyle },
            fields: 'namedStyleType'
          }
        });
      }
    }

    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId: docId,
        requestBody: { requests }
      });
    }

    const docUrl = `https://docs.google.com/document/d/${docId}/edit`;

    res.status(200).json({
      success: true,
      title: docTitle,
      url: docUrl,
      docId,
      version,
      folderId: parentFolderId
    });

  } catch (err) {
    console.error('Drive push error:', err);
    res.status(500).json({
      error: err.message || 'Failed to create document in Drive',
      details: err.errors || null
    });
  }
};
