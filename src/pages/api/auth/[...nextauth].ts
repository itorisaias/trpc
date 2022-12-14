import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import logger from "../../../utils/logger";
import { prisma } from "../../../server/db/prisma";

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
      logger.debug(user, "signIn");

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
    async session(params) {
      logger.debug(params, "session");

      return params.session;
    },
    async jwt(params) {
      logger.debug(params, "jwt");

      return params.token;
    },
    async redirect(params) {
      logger.debug(params, "redirect");

      return params.baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
