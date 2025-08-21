import getCurrentUser from "@/app/actions/getUsuario";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, tipoDocumento, numeroDocumento, senha, telefone } = body;

    if (!nome || !email || !senha || !tipoDocumento || !numeroDocumento) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(senha, 12);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        tipoDocumento,
        numeroDocumento,
        hashSenha: hashedPassword,
        telefone,
      },
    });

    return NextResponse.json(usuario, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ })
  }
}