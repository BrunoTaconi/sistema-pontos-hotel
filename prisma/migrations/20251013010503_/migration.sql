/*
  Warnings:

  - A unique constraint covering the columns `[codigoConvite]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "codigoConvite" TEXT;

-- CreateTable
CREATE TABLE "public"."Convite" (
    "id" SERIAL NOT NULL,
    "idConvidante" INTEGER NOT NULL,
    "idConvidado" INTEGER,
    "codigoConvite" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Convite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_codigoConvite_key" ON "public"."Usuario"("codigoConvite");

-- AddForeignKey
ALTER TABLE "public"."Convite" ADD CONSTRAINT "Convite_idConvidante_fkey" FOREIGN KEY ("idConvidante") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Convite" ADD CONSTRAINT "Convite_idConvidado_fkey" FOREIGN KEY ("idConvidado") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
