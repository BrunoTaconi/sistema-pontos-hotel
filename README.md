# 📘 Sistema de Pontos — Hotel Real Cabo Frio

## Este repositório contém o código-fonte do MVP do Sistema de Pontos.
O projeto foi desenvolvido em Next.js, utilizando Vercel para deploy e Neon Database para o banco de dados PostgreSQL.

## 🚀 Tecnologias utilizadas

Next.js (Front-end e Back-end)

PostgreSQL (Neon Database)

Prisma ORM

Resend (envio de e-mails)

# ⚙️ Passos para configuração
## 1️⃣ Criar o banco de dados no Neon
 
Acesse https://neon.tech
 e crie uma conta gratuita.

Clique em “New Project”.

Após criado, copie a Database URL (Connection String) que aparece nas configurações do projeto.

Substitua o valor de DATABASE_URL no seu .env pela URL do banco recém-criado.

## 2️⃣ Configurar variáveis de ambiente

Faça uma cópia do arquivo .env.example e renomeie para .env

Preencha cada campo com os dados reais:

DATABASE_URL → sua URL do Neon

RESEND_API_KEY → sua chave da conta Resend

EMAIL_USER e EMAIL_PASSWORD → credenciais do e-mail que será usado no sistema

JWT_SECRET → gere uma chave aleatória (por exemplo, usando randomkeygen.com)

## 3️⃣ Deploy no Vercel

Crie uma conta em https://vercel.com

Clique em “New Project” e conecte este repositório do GitHub.

Antes de publicar, vá em:

Settings → Environment Variables

Adicione as mesmas variáveis do .env (copie e cole linha por linha).

Faça o Deploy — o Vercel vai compilar automaticamente o projeto.

## 4️⃣ Sincronizar o banco de dados

Após o deploy, você pode sincronizar o schema do banco executando (localmente ou via terminal online da Vercel):

npx prisma migrate deploy

Isso garante que todas as tabelas estejam criadas corretamente no seu novo banco.

✅ Pronto!

O sistema estará online e funcional no domínio gerado pela Vercel (exemplo:
https://sistema-pontos-hotel.vercel.app).

📁 Estrutura básica do projeto

```
src/
├── app/               # Páginas e rotas do Next.js
├── components/        # Componentes reutilizáveis
├── lib/               # Configurações (ex: prisma)
├── services/          # Funções de integração
└── utils/             # Funções auxiliares

```

💡 Observações finais

O projeto entregue é a versão MVP, funcional e hospedável.
Em caso de dúvidas sobre configuração, basta seguir as instruções acima passo a passo.
