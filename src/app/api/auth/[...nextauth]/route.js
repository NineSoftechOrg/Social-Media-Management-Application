// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import InstagramProvider from 'next-auth/providers/instagram';
import TwitterProvider from 'next-auth/providers/twitter';

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email pages_manage_posts pages_read_engagement pages_show_list',
        },
      },
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token; // Store the access token
        token.provider = account.provider; // Store the provider
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Include access token in session

      // Initialize connectedProviders if not already set
      if (!session.connectedProviders) {
        session.connectedProviders = [];
      }

      // Fetch user ID using the access token
      if (token.accessToken) {
        try {
          let user;
          if (token.provider === 'facebook') {
            const res = await fetch(
              `https://graph.facebook.com/me?access_token=${token.accessToken}`
            );
            user = await res.json();
            session.userId = user.id; // Store the user ID in session
          } else if (token.provider === 'instagram') {
            // Example endpoint for Instagram (adjust as necessary)
            const res = await fetch(
              `https://graph.instagram.com/me?access_token=${token.accessToken}`
            );
            user = await res.json();
            session.userId = user.id;
          } else if (token.provider === 'twitter') {
            // Example endpoint for Twitter (adjust as necessary)
            const res = await fetch(
              `https://api.twitter.com/2/me?access_token=${token.accessToken}`
            );
            user = await res.json();
            session.userId = user.id;
          }

          // Add the provider to the connectedProviders array if not already present
          if (!session.connectedProviders.includes(token.provider)) {
            session.connectedProviders.push(token.provider);
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }

      return session;
    },
  },
  pages: {
    error: '/auth/error',   // Custom error page
  },

});

export { handler as GET, handler as POST };
