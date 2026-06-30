-- CreateEnum
CREATE TYPE "EstadoActividad" AS ENUM ('NO_INICIADA', 'EN_PROCESO', 'COMPLETADA', 'ATRASADA');

-- CreateTable
CREATE TABLE "PlanSemanal" (
    "id" TEXT NOT NULL,
    "proyectoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "semanaInicio" TIMESTAMP(3) NOT NULL,
    "semanaFin" TIMESTAMP(3) NOT NULL,
    "observacion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanSemanal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActividadPlanSemanal" (
    "id" TEXT NOT NULL,
    "planSemanalId" TEXT NOT NULL,
    "actividad" TEXT NOT NULL,
    "area" TEXT,
    "responsable" TEXT,
    "fechaInicio" TIMESTAMP(3),
    "fechaTermino" TIMESTAMP(3),
    "avance" INTEGER NOT NULL DEFAULT 0,
    "estado" "EstadoActividad" NOT NULL DEFAULT 'NO_INICIADA',
    "cerrada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActividadPlanSemanal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanSemanal" ADD CONSTRAINT "PlanSemanal_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActividadPlanSemanal" ADD CONSTRAINT "ActividadPlanSemanal_planSemanalId_fkey" FOREIGN KEY ("planSemanalId") REFERENCES "PlanSemanal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
