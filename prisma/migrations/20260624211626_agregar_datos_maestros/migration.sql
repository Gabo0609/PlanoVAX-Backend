/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Actividad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `TipoCnc` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `TipoRestriccion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Actividad_nombre_key" ON "Actividad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TipoCnc_nombre_key" ON "TipoCnc"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TipoRestriccion_nombre_key" ON "TipoRestriccion"("nombre");
