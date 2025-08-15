import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Rota para criar uma nova recompensa
export async function POST(request: Request) {
  const data = await request.json();
  const novaRecompensa = await prisma.recompensa.create({
    data,
  });
  return NextResponse.json(novaRecompensa);
}

// Rota para buscar todas as recompensas
export async function GET() {
  const recompensas = await prisma.recompensa.findMany();
  return NextResponse.json(recompensas);
}