-- AlterEnum
ALTER TYPE "RolUsuario" ADD VALUE 'AYUDANTE_TERRENO';

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "cargo" TEXT;
