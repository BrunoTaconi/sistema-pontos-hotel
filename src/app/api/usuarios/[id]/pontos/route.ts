import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { pontos } = await request.json();

  const novaTransacao = await prisma.transacoes.create({
    data: {
      idUsuario: Number(params.id),
      pontos,
      tipo: 'credito',
    },
  });

  return NextResponse.json(novaTransacao);
}