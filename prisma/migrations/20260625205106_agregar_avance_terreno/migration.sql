-- DropIndex
DROP INDEX "Actividad_nombre_key";

-- DropIndex
DROP INDEX "TipoCnc_nombre_key";

-- DropIndex
DROP INDEX "TipoRestriccion_nombre_key";

-- AlterTable
ALTER TABLE "PlanSemanal" ADD COLUMN     "avanceReal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fechaInicio" TIMESTAMP(3),
ADD COLUMN     "fechaTermino" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "AvanceTerreno" (
    "id" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3),
    "fechaTermino" TIMESTAMP(3),
    "avance" INTEGER NOT NULL DEFAULT 0,
    "estado" "EstadoActividad" NOT NULL DEFAULT 'NO_INICIADA',
    "comentario" TEXT,
    "actividadId" TEXT NOT NULL,
    "proyectoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvanceTerreno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvanceTerreno_actividadId_proyectoId_key" ON "AvanceTerreno"("actividadId", "proyectoId");

-- AddForeignKey
ALTER TABLE "AvanceTerreno" ADD CONSTRAINT "AvanceTerreno_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvanceTerreno" ADD CONSTRAINT "AvanceTerreno_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
