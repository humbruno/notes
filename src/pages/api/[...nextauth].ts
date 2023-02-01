import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const googleClientId: string = process.env.GOOGLE_CLIENT_ID ?? '';
const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET ?? '';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
