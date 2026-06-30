-- CreateEnum
CREATE TYPE "EstadoLookahead" AS ENUM ('PLANIFICADA', 'EN_REVISION', 'LIBERADA', 'BLOQUEADA');

-- CreateTable
CREATE TABLE "Lookahead" (
    "id" TEXT NOT NULL,
    "semana" TEXT NOT NULL,
    "responsable" TEXT NOT NULL,
    "estado" "EstadoLookahead" NOT NULL DEFAULT 'PLANIFICADA',
    "observacion" TEXT,
    "actividadId" TEXT NOT NULL,
    "restriccionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lookahead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lookahead" ADD CONSTRAINT "Lookahead_actividadId_fkey" FOREIGN KEY ("actividadId") REFERENCES "Actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lookahead" ADD CONSTRAINT "Lookahead_restriccionId_fkey" FOREIGN KEY ("restriccionId") REFERENCES "Restriccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
