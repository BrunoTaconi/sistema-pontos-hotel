"use server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.usuario.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        saldoPontos: true,
        criadoEm: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.criadoEm.toISOString(),
    };
  } catch (error: any) {
    console.error("Erro em getCurrentUser:", error);
    return null;
  }
}
