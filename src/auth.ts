import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { Session, User } from "next-auth";

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
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
  events: {
    async signIn() {
      const { mergeCart } = await import("@/app/action/mergeCart");
      await mergeCart();
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
