-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "limiteConvites" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "usosConvite" INTEGER NOT NULL DEFAULT 0;
