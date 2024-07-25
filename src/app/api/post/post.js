import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken, content, linkedInId } = req.body;

  try {
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-li-format': 'json'
      },
      body: JSON.stringify({
        author: `urn:li:person:${linkedInId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to post content');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error posting to LinkedIn:', error);
    res.status(500).json({ error: 'Error posting to LinkedIn' });
  }
}
