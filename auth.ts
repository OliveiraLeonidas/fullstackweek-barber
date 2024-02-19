import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AdapterUser } from "@auth/core/adapters"; // Importar o tipo AdapterUser do pacote

// Adicionar a propriedade emailVerified ao tipo AdapterUser
interface LocalUser extends AdapterUser {
  emailVerified?: Date | null | undefined;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as any, // Podemos usar "any" temporariamente para contornar problemas de tipo
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
          emailVerified: user.emailVerified,
        } as LocalUser; // Use o tipo LocalUser aqui
      }
      return session;
    },
  },
});
