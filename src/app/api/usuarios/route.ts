import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    const {
      nome,
      email,
      tipoDocumento,
      numeroDocumento,
      hashSenha,
      telefone,
      codigoConviteUsado,
    } = body;

    if (!nome || !email || !hashSenha || !tipoDocumento || !numeroDocumento) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const codigoConvite = randomBytes(4).toString("hex").toUpperCase();
    const hashedPassword = await bcrypt.hash(hashSenha, 12);
    let pontosIniciais = 3;
    let convidante = null;

    if (codigoConviteUsado) {
      convidante = await prisma.usuario.findUnique({
        where: { codigoConvite: codigoConviteUsado },
      });

      if (!convidante) {
        return NextResponse.json(
          { error: "Código de convite inválido." },
          { status: 400 }
        );
      }

      if (convidante.usosConvite >= convidante.limiteConvites) {
        return NextResponse.json(
          { error: "Este código de convite já atingiu o limite de usos." },
          { status: 400 }
        );
      }

      await prisma.usuario.update({
        where: { id: convidante.id },
        data: {
          usosConvite: { increment: 1 },
        },
      });

      pontosIniciais = 4;
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        tipoDocumento,
        numeroDocumento,
        hashSenha: hashedPassword,
        saldoPontos: pontosIniciais,
        telefone,
        codigoConvite,
        limiteConvites: 5,
        usosConvite: 0,
      },
    });

    if (convidante) {
      await prisma.convite.create({
        data: {
          idConvidante: convidante.id,
          idConvidado: usuario.id,
          codigoConvite: codigoConviteUsado,
        },
      });

      await prisma.usuario.update({
        where: { id: convidante.id },
        data: {
          saldoPontos: { increment: 1 },
          transacoes: {
            create: {
              pontos: 1,
              tipo: "ganho",
            },
          },
        },
      });
    }

    try {
      await transporter.sendMail({
        from: `"Hotel Real Cabo Frio" <contato@hotelrealcabofrio.com.br>`,
        to: usuario.email,
        subject: "Você recebeu pontos! 🎉",
        html: `
        <p>Olá <b>${usuario.nome}</b>, parabéns por criar sua conta!</p>
        <p>Você acabou de receber <b>${pontosIniciais} pontos</b> por fazer cadastro no nosso sistema.</p>
        <p>Por enquanto seu saldo total é de <b>${pontosIniciais} pontos</b>.</p>
        <p>Continue participando e acumulando! 🚀</p>
      `,
      });
    } catch (error) {
      console.error("Erro ao enviar email", error);
    }

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
