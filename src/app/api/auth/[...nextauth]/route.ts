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
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        const user = await prisma.usuario.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { numeroDocumento: credentials.email },
            ],
          },
        });

        if (!user || !user?.hashSenha) {
          throw new Error("Credenciais inválidas");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashSenha
        );

        if (!isCorrectPassword) {
          throw new Error("Credenciais inválidas");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };