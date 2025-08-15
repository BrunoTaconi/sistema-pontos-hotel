import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { identifier, senha } = await request.json();

  const usuario = await prisma.usuario.findFirst({
    where: {
      OR: [
        { email: identifier },
        { numeroDocumento: identifier },
      ],
    },
  });

  if (!usuario) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.hashSenha);

  if (!senhaValida) {
    return NextResponse.json({ error: 'Senha inválida' }, { status: 401 });
  }

  const token = jwt.sign({ id: usuario.id, hierarquia: usuario.hierarquia }, 'seu-segredo-jwt', {
    expiresIn: '1d',
  });

  return NextResponse.json({ token });
}