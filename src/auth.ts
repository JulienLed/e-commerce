import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { Session, User } from "next-auth";
import { getUserByCredentials } from "@/lib/getUserByCredentials";
import { signInSchema } from "@/lib/schema";
import bcrypt from "bcrypt";

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Email",
          type: "password",
          placeholder: "Mot de passe",
        },
      },
      async authorize(credentials) {
        const result = signInSchema.safeParse(credentials);
        if (result.error) return null;
        const { email, password } = result.data;
        const hashPassword = await bcrypt.hash(password, 15);
        const user = await getUserByCredentials(email, hashPassword);
        if (!user) return null;
        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session, user }: { session: Session; user: User }) {
      session.user!.id = user.id;
      return session;
    },
  },
  session: {
    strategy: "database" as const,
  },
  pages: {
    signIn: "/signIn",
  },
  events: {
    async signIn() {
      const { mergeCart } = await import("@/app/_action/mergeCart");
      await mergeCart();
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
