import prisma from "../../config/prisma";

export async function getAllProyectos() {
  return prisma.proyecto.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProyectoById(id: string) {
  return prisma.proyecto.findUnique({
    where: { id },
  });
}

export async function createProyecto(data: {
  nombre: string;
  codigo?: string;
  ubicacion?: string;
  descripcion?: string;
}) {
  return prisma.proyecto.create({
    data,
  });
}

export async function updateProyecto(
  id: string,
  data: {
    nombre?: string;
    codigo?: string;
    ubicacion?: string;
    descripcion?: string;
    activo?: boolean;
  }
) {
  return prisma.proyecto.update({
    where: { id },
    data,
  });
}

export async function deleteProyecto(id: string) {
  return prisma.proyecto.delete({
    where: { id },
  });
}