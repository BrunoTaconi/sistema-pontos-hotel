import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

type Params = {
  params: { id: string };
};

const transporter = nodemailer.createTransport({
  host: "smtp.uni5.net",
  port: 587, // ou 587 se não usar SSL
  secure: false, // true = 465, false = 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, tipoDocumento, numeroDocumento, hashSenha, telefone } =
      body;

    if (!nome || !email || !hashSenha || !tipoDocumento || !numeroDocumento) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(hashSenha, 12);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        tipoDocumento,
        numeroDocumento,
        hashSenha: hashedPassword,
        saldoPontos: 3,
        telefone,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Hotel Real Cabo Frio" <contato@hotelrealcabofrio.com.br>`,
        to: usuario.email,
        subject: "Você recebeu pontos! 🎉",
        html: `
        <p>Olá <b>${usuario.nome}</b>,, parabéns por criar sua conta!</p>
        <p>Você acabou de receber <b>${3} pontos</b> por fazer cadastro no nosso sistema.</p>
        <p>Por enquanto seu saldo total é de <b>${3} pontos</b>.</p>
        <p>Continue participando e acumulando! 🚀</p>
      `,
      });
    } catch (error) {}

    return NextResponse.json(usuario, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
