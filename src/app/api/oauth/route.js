import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json({ error: 'Authorization code or state missing' }, { status: 400 });
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  });

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (tokenResponse.ok) {
      const accessToken = tokenData.access_token;

      // Fetch user profile from LinkedIn using the correct endpoint
      const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const profileData = await profileResponse.json();
      console.log('Profile Data:', profileData); // Log entire profileData
      console.log('Access Token', accessToken);

      const userProfile = {
        firstName: profileData.given_name || 'N/A',
        lastName: profileData.family_name || 'N/A',
        email: profileData.email || 'Email not available', // Update based on LinkedIn's response format
        linkedInId: profileData.sub || 'N/A',
      };

      // Construct the redirect URL with query parameters
      const redirectUrl = new URL('/dashboard/posts', req.url);
      redirectUrl.searchParams.append('accessToken', accessToken);
      redirectUrl.searchParams.append('firstName', userProfile.firstName);
      redirectUrl.searchParams.append('lastName', userProfile.lastName);
      redirectUrl.searchParams.append('email', userProfile.email);
      redirectUrl.searchParams.append('linkedInId', userProfile.linkedInId);

      return NextResponse.redirect(redirectUrl.toString());
    } else {
      return NextResponse.json({ error: tokenData.error_description || 'Failed to get access token' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    return NextResponse.json({ error: 'Error exchanging authorization code' }, { status: 500 });
  }
}
