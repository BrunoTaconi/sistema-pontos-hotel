-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "hashSenha" TEXT NOT NULL,
    "papel" TEXT NOT NULL DEFAULT 'usuario',
    "telefone" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transacoes" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "pontos" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Recompensa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "custo" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recompensa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resgate" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idRecompensa" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resgate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Transacoes" ADD CONSTRAINT "Transacoes_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resgate" ADD CONSTRAINT "Resgate_idRecompensa_fkey" FOREIGN KEY ("idRecompensa") REFERENCES "public"."Recompensa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resgate" ADD CONSTRAINT "Resgate_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
