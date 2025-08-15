/*
  Warnings:

  - You are about to drop the column `papel` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Transacoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Hierarquia" AS ENUM ('usuario', 'admin');

-- CreateEnum
CREATE TYPE "public"."TipoTransacao" AS ENUM ('ganho', 'resgate');

-- DropForeignKey
ALTER TABLE "public"."Resgate" DROP CONSTRAINT "Resgate_idRecompensa_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resgate" DROP CONSTRAINT "Resgate_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transacoes" DROP CONSTRAINT "Transacoes_idUsuario_fkey";

-- AlterTable
ALTER TABLE "public"."Recompensa" ADD COLUMN     "imagem" TEXT,
ALTER COLUMN "ativo" SET DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Usuario" DROP COLUMN "papel",
ADD COLUMN     "hierarquia" "public"."Hierarquia" NOT NULL DEFAULT 'usuario',
ADD COLUMN     "saldoPontos" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."Transacoes";

-- CreateTable
CREATE TABLE "public"."Transacao" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "pontos" INTEGER NOT NULL,
    "tipo" "public"."TipoTransacao" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Transacao" ADD CONSTRAINT "Transacao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resgate" ADD CONSTRAINT "Resgate_idRecompensa_fkey" FOREIGN KEY ("idRecompensa") REFERENCES "public"."Recompensa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resgate" ADD CONSTRAINT "Resgate_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
