/*
  Warnings:

  - You are about to drop the `Sector` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoActividad" AS ENUM ('EN_PROCESO', 'COMPLETADA', 'ATRASADA', 'NO_INICIADA');

-- DropTable
DROP TABLE "Sector";

-- CreateTable
CREATE TABLE "PlanSemanal" (
    "id" TEXT NOT NULL,
    "semana" TEXT NOT NULL,
    "manzana" TEXT NOT NULL,
    "responsable" TEXT NOT NULL,
    "programado" INTEGER NOT NULL,
    "real" INTEGER NOT NULL,
    "estado" "EstadoActividad" NOT NULL,
    "comentario" TEXT,
    "actividadId" TEXT NOT NULL,
    "tipoCncId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanSemanal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanSemanal" ADD CONSTRAINT "PlanSemanal_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSemanal" ADD CONSTRAINT "PlanSemanal_tipoCncId_fkey" FOREIGN KEY ("tipoCncId") REFERENCES "TipoCnc"("id") ON DELETE SET NULL ON UPDATE CASCADE;
