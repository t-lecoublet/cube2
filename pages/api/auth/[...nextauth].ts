

import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvieder from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {type: "text"},
        password: { type: "password" }
      },
      authorize: async (credentials, req) => {
        const user = await fetch(
          `${process.env.NEXTDEFAULT_URL}/api/user/check-credentials`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            body: JSON.parse(JSON.stringify(credentials))
          },
        )
          .then((res) => res.json())
          .catch((err) => {
            return null;
          });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvieder({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.userId = user.id
      session.link = user.customLink
      return session
    }
  }
};
