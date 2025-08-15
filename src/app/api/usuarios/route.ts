import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

/**
 * Rota para criar um novo usuário (Cadastro)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nome, 
      email, 
      tipoDocumento, 
      numeroDocumento, 
      senha, // Recebe a senha em texto plano
      telefone 
    } = body;

    // Validação simples dos campos
    if (!nome || !email || !numeroDocumento || !senha || !telefone) {
      return new NextResponse('Campos obrigatórios ausentes', { status: 400 });
    }

    const hashSenha = await bcrypt.hash(senha, 12);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        tipoDocumento,
        numeroDocumento,
        hashSenha,
        telefone,
        hierarquia: 'usuario' // Define o papel padrão
      }
    });

    return NextResponse.json(usuario);

  } catch (error) {
    console.error("ERRO AO CRIAR USUÁRIO:", error);
    return new NextResponse('Erro Interno do Servidor', { status: 500 });
  }
}

/**
 * Rota para buscar usuários (Painel Administrativo)
 */
export async function GET(request: Request) {
    // Implementação da busca de usuários permanece a mesma,
    // pois já utiliza o estilo Prisma de forma adequada.
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
  
    const usuarios = await prisma.usuario.findMany({
      where: {
        OR: [
          { nome: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { numeroDocumento: { contains: search, mode: 'insensitive' } },
          { telefone: { contains: search, mode: 'insensitive' } },
        ],
      },
      include: {
        pontos: true,
      },
    });
  
    const usuariosComSaldo = usuarios.map(usuario => {
      const saldo = usuario.pontos.reduce((acc, transacao) => acc + transacao.pontos, 0);
      // Remove o hash da senha da resposta
      const { hashSenha, ...restoDoUsuario } = usuario;
      return { ...restoDoUsuario, saldo };
    });
  
    return NextResponse.json(usuariosComSaldo);
}