import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email, 
        nome, 
        senha,
        tipoDocumento,
        numeroDocumento,
        telefone
    } = body;

    const hashSenha = await bcrypt.hash(senha, 12);

    const usuario = await prisma.usuario.create({
        data: {
            email,
            nome,
            hashSenha,
            tipoDocumento,
            numeroDocumento,
            telefone,
        }
    });

    return NextResponse.json(usuario);
}