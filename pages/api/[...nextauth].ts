import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" }, // O NextAuth usa 'email' como padrão
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciais inválidas');
        }

        // Procura o usuário por email ou por número de documento
        const user = await prisma.usuario.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { numeroDocumento: credentials.email }
            ]
          }
        });

        if (!user || !user?.hashSenha) {
          throw new Error('Credenciais inválidas');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashSenha
        );

        if (!isCorrectPassword) {
          throw new Error('Credenciais inválidas');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);