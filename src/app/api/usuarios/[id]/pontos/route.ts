import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Params = {
  params: { id: string };
};

export async function POST(request: Request, { params }: Params) {
  try {
    const body = await request.json();
    const { pontos } = body;
    const idUsuario = Number(params.id);

    if (isNaN(idUsuario) || typeof pontos !== "number") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
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
      await resend.emails.send({
        from: "noreply@hotelrealcabofrio.com",
        to: usuario.email,
        subject: "Você recebeu pontos! 🎉",
        html: `
         <p>Olá <b>${usuario.nome}</b>,</p>
          <p>Você acabou de receber <b>${pontos} pontos</b> em sua conta.</p>
          <p>Agora seu saldo total é de <b>${usuario.saldoPontos} pontos</b>.</p>
          <p>Continue participando e acumulando! 🚀</p>
            `,
      });
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
