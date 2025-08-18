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
        email: { label: "email", type: "text" },
        senha: { label: "senha", type: "senha" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.senha) {
          throw new Error("Credenciais inválidas");
        }
        const usuario = await prisma.usuario.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!usuario || !usuario?.hashSenha) {
          throw new Error("Credenciais inválidas");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.senha,
          usuario.hashSenha
        );
        
        if (!isCorrectPassword) {
          throw new Error("Credenciais inválidas");
        }

        return usuario;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth;
