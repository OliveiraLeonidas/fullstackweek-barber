import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

// Defina os tipos necessários
interface AdapterUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null; // Tornar emailVerified opcional
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        // Atribuir o objeto de usuário à session.user
        session.user = {
          ...session.user,
          id: user.id,
          emailVerified: user.emailVerified, // Adicionar emailVerified se estiver disponível
        } as AdapterUser; // Use o tipo AdapterUser aqui
      }
      return session;
    },
  },
});
