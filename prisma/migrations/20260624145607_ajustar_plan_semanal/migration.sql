/*
  Warnings:

  - You are about to drop the column `manzana` on the `PlanSemanal` table. All the data in the column will be lost.
  - You are about to drop the column `programado` on the `PlanSemanal` table. All the data in the column will be lost.
  - You are about to drop the column `real` on the `PlanSemanal` table. All the data in the column will be lost.
  - You are about to drop the column `responsable` on the `PlanSemanal` table. All the data in the column will be lost.
  - Added the required column `avanceProgramado` to the `PlanSemanal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avanceReal` to the `PlanSemanal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanSemanal" DROP COLUMN "manzana",
DROP COLUMN "programado",
DROP COLUMN "real",
DROP COLUMN "responsable",
ADD COLUMN     "avanceProgramado" INTEGER NOT NULL,
ADD COLUMN     "avanceReal" INTEGER NOT NULL;
