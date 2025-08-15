import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { idUsuario, idRecompensa } = await request.json();

  const usuario = await prisma.usuario.findUnique({
    where: { id: idUsuario },
    include: { pontos: true },
  });

  const recompensa = await prisma.recompensa.findUnique({
    where: { id: idRecompensa },
  });

  if (!usuario || !recompensa) {
    return NextResponse.json({ error: 'Usuário ou recompensa não encontrado' }, { status: 404 });
  }

  const saldo = usuario.pontos.reduce((acc:any, transacao:any) => acc + transacao.pontos, 0);

  if (saldo < recompensa.custo) {
    return NextResponse.json({ error: 'Saldo insuficiente' }, { status: 400 });
  }

  // Cria a transação de resgate (pontos negativos)
  await prisma.transacoes.create({
    data: {
      idUsuario,
      pontos: -recompensa.custo,
      tipo: 'resgate',
    },
  });

  // Cria o registro de resgate
  const novoResgate = await prisma.resgate.create({
    data: {
      idUsuario,
      idRecompensa,
    },
  });

  return NextResponse.json(novoResgate);
}