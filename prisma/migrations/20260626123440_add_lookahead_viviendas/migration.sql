/*
  Warnings:

  - You are about to drop the column `estado` on the `Lookahead` table. All the data in the column will be lost.
  - You are about to drop the column `restriccionId` on the `Lookahead` table. All the data in the column will be lost.
  - Added the required column `proyectoId` to the `Lookahead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viviendaId` to the `Lookahead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoRestriccionesLookahead" AS ENUM ('SIN_RESTRICCIONES', 'EN_GESTION', 'LIBERADA', 'VENCIDA');

-- CreateEnum
CREATE TYPE "EstadoLiberacionLookahead" AS ENUM ('LIBERADA', 'NO_LIBERADA', 'PROGRAMADA');

-- DropForeignKey
ALTER TABLE "Lookahead" DROP CONSTRAINT "Lookahead_restriccionId_fkey";

-- AlterTable
ALTER TABLE "Lookahead" DROP COLUMN "estado",
DROP COLUMN "restriccionId",
ADD COLUMN     "estadoLiberacion" "EstadoLiberacionLookahead" NOT NULL DEFAULT 'NO_LIBERADA',
ADD COLUMN     "estadoRestricciones" "EstadoRestriccionesLookahead" NOT NULL DEFAULT 'SIN_RESTRICCIONES',
ADD COLUMN     "fechaInicioTentativa" TIMESTAMP(3),
ADD COLUMN     "fechaTerminoTentativa" TIMESTAMP(3),
ADD COLUMN     "proyectoId" TEXT NOT NULL,
ADD COLUMN     "restriccionesAsociadas" TEXT,
ADD COLUMN     "viviendaId" TEXT NOT NULL,
ALTER COLUMN "responsable" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Vivienda" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "zona" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "proyectoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vivienda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vivienda_numero_zona_proyectoId_key" ON "Vivienda"("numero", "zona", "proyectoId");

-- AddForeignKey
ALTER TABLE "Vivienda" ADD CONSTRAINT "Vivienda_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lookahead" ADD CONSTRAINT "Lookahead_viviendaId_fkey" FOREIGN KEY ("viviendaId") REFERENCES "Vivienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lookahead" ADD CONSTRAINT "Lookahead_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
