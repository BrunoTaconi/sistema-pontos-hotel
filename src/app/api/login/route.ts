import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";
export async function POST(request: Request) {
  try {
    const { identifier, senha } = await request.json();
    const usuario = await prisma.usuario.findFirst({
      where: { OR: [{ email: identifier }, { numeroDocumento: identifier }] },
    });
    if (!usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.hashSenha);
    if (!senhaCorreta) {
      return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
    }
    const token = jwt.sign(
      { id: usuario.id, hierarquia: usuario.hierarquia },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    const response = NextResponse.json({ success: true });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
