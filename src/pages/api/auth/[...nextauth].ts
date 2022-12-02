import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import logger from "../../../utils/logger";
import { prisma } from "../../../utils/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "auto",
  },
  callbacks: {
    async signIn({ user }) {
      logger.debug(user);

      if (user.email) {
        await prisma.user.upsert({
          where: {
            email: user.email,
          },
          create: {
            email: user.email,
            name: user.name,
          },
          update: {
            name: user.name,
          },
        });
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
