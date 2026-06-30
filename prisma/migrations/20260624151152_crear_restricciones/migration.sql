-- CreateEnum
CREATE TYPE "PrioridadRestriccion" AS ENUM ('IMPORTANTE', 'URGENTE');

-- CreateEnum
CREATE TYPE "EstadoRestriccion" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'CERRADA');

-- CreateTable
CREATE TABLE "Restriccion" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "prioridad" "PrioridadRestriccion" NOT NULL,
    "responsable" TEXT NOT NULL,
    "fechaCompromiso" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoRestriccion" NOT NULL DEFAULT 'PENDIENTE',
    "tipoRestriccionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restriccion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Restriccion" ADD CONSTRAINT "Restriccion_tipoRestriccionId_fkey" FOREIGN KEY ("tipoRestriccionId") REFERENCES "TipoRestriccion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
