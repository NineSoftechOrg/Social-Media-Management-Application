// src/lib/facebook.js

export const getPages = async (userId, userAccessToken) => {
    const response = await fetch(`https://graph.facebook.com/v20.0/${userId}/accounts?access_token=${userAccessToken}`);
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }
    return response.json();
  };
  
export const postToPage = async (pageId, pageAccessToken, message) => {
    const response = await fetch(`https://graph.facebook.com/v20.0/${pageId}/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        access_token: pageAccessToken,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to post to Facebook Page');
    }
  
    return response.json();
  };
  // src/lib/facebook.js

export const verifyPost = async (pageId, pageAccessToken) => {
    const response = await fetch(`https://graph.facebook.com/v20.0/${pageId}/feed?access_token=${pageAccessToken}`);
    if (!response.ok) {
      throw new Error('Failed to fetch page feed');
    }
    return response.json();
  };
  
  