import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prisma';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const googleClientId: string = process.env.GOOGLE_CLIENT_ID ?? '';
const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET ?? '';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
