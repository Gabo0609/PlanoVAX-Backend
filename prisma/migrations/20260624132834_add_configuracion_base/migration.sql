/*
  Warnings:

  - You are about to drop the `ActividadPlanSemanal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanSemanal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActividadPlanSemanal" DROP CONSTRAINT "ActividadPlanSemanal_planSemanalId_fkey";

-- DropForeignKey
ALTER TABLE "PlanSemanal" DROP CONSTRAINT "PlanSemanal_proyectoId_fkey";

-- DropTable
DROP TABLE "ActividadPlanSemanal";

-- DropTable
DROP TABLE "PlanSemanal";

-- DropEnum
DROP TYPE "EstadoActividad";

-- CreateTable
CREATE TABLE "Actividad" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuadrilla" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuadrilla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoCnc" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoCnc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoRestriccion" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoRestriccion_pkey" PRIMARY KEY ("id")
);
