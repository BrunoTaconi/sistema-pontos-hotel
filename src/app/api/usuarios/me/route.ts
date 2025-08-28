import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";

export async function GET(request: Request) {
  try {

    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    const tokenMatch = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("token="));

    if (!tokenMatch) {
      return NextResponse.json({ error: "Token não enviado" }, { status: 401 });
    }

    const token = tokenMatch.split("=")[1];

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      select: { id: true, nome: true, email: true, tipoDocumento: true, numeroDocumento: true, telefone: true, hierarquia: true, saldoPontos: true },
    });

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }
}
