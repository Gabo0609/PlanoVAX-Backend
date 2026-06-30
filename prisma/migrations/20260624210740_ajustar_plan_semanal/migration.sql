/*
  Warnings:

  - You are about to drop the column `avanceReal` on the `PlanSemanal` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `PlanSemanal` table. All the data in the column will be lost.
  - Added the required column `proyectoId` to the `PlanSemanal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanSemanal" DROP COLUMN "avanceReal",
DROP COLUMN "estado",
ADD COLUMN     "proyectoId" TEXT NOT NULL,
ADD COLUMN     "responsable" TEXT;

-- CreateTable
CREATE TABLE "PlanSemanalAdjunto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nombreArchivo" TEXT,
    "tipoArchivo" TEXT,
    "planSemanalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanSemanalAdjunto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanSemanal" ADD CONSTRAINT "PlanSemanal_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSemanalAdjunto" ADD CONSTRAINT "PlanSemanalAdjunto_planSemanalId_fkey" FOREIGN KEY ("planSemanalId") REFERENCES "PlanSemanal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
