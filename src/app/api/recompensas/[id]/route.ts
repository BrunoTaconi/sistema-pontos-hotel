import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Rota para buscar uma recompensa específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const recompensa = await prisma.recompensa.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(recompensa);
}

// Rota para atualizar uma recompensa
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const recompensaAtualizada = await prisma.recompensa.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(recompensaAtualizada);
}

// Rota para deletar uma recompensa
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.recompensa.delete({
    where: { id: Number(params.id) },
  });
  return new NextResponse(null, { status: 204 });
}