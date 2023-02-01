import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const googleClientId: string = process.env.GOOGLE_CLIENT_ID ?? '';
const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET ?? '';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
