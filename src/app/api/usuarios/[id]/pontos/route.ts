import { prisma } from "@/lib/prisma";
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

export async function POST(request: Request, { params }: Params) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "ID não fornecido na URL" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { pontos } = body;
    const idUsuario = Number(id);

    if (isNaN(idUsuario)) {
      return NextResponse.json(
        { error: "ID de usuário inválido (não é um número)" },
        { status: 400 }
      );
    }
    if (typeof pontos !== "number") {
      return NextResponse.json(
        { error: "Quantidade de pontos inválida (deve ser um número)" },
        { status: 400 }
      );
    }

    const usuarioAtual = await prisma.usuario.findUnique({
      where: { id: idUsuario },
    });

    if (!usuarioAtual) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    if (usuarioAtual.saldoPontos + pontos < 0) {
      return NextResponse.json(
        { error: "Saldo insuficiente" },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.update({
      where: { id: idUsuario },
      data: {
        saldoPontos: { increment: pontos },
        transacoes: {
          create: {
            pontos,
            tipo: pontos >= 0 ? "ganho" : "resgate",
          },
        },
      },
    });

    if (pontos > 0 && usuario.email) {
      try {
        // Envia o e-mail para o usuário (com cópia oculta)
        await transporter.sendMail({
          from: `"Hotel Real Cabo Frio" <contato@hotelrealcabofrio.com.br>`,
          bcc: "brunotaconi@gmail.com",
          to: usuario.email,
          subject: "Você recebeu pontos! 🎉",
          html: `
        <p>Olá <b>${usuario.nome}</b>,</p>
        <p>Você acabou de receber <b>${pontos} pontos</b> em sua conta.</p>
        <p>Agora seu saldo total é de <b>${usuario.saldoPontos} pontos</b>.</p>
        <p>Continue participando e acumulando! 🚀</p>
      `,
        });

      //   await transporter.sendMail({
      //     from: `"Hotel Real Cabo Frio" <contato@hotelrealcabofrio.com.br>`,
      //     to: "alairandolphi@gmail.com",
      //     subject: `Novo usuário ganhou pontos: ${usuario.nome}`,
      //     html: `
      //   <p>O usuário <b>${usuario.nome}</b> (${usuario.email}) acabou de receber <b>${pontos} pontos</b>.</p>
      // `,
      //   });
      } catch (emailError) {
        console.error("Erro ao enviar email:", emailError);
      }
    }

    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar pontos do usuário" },
      { status: 500 }
    );
  }
}
