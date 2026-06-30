import prisma from "../../config/prisma";

interface CrearActividadDTO {
  nombre: string;
  activo?: boolean;
}

interface ActualizarActividadDTO {
  nombre?: string;
  activo?: boolean;
}

export async function getActividades() {
  return prisma.actividad.findMany({
 orderBy: {
  createdAt: "asc",
},
  });
}

export async function getActividadById(id: string) {
  return prisma.actividad.findUnique({
    where: { id },
  });
}

export async function createActividad(data: CrearActividadDTO) {
  return prisma.actividad.create({
    data: {
      nombre: data.nombre,
      activo: data.activo ?? true,
    },
  });
}

export async function updateActividad(
  id: string,
  data: ActualizarActividadDTO
) {
  return prisma.actividad.update({
    where: { id },
    data: {
      nombre: data.nombre,
      activo: data.activo,
    },
  });
}

export async function deleteActividad(id: string) {
  return prisma.actividad.update({
    where: { id },
    data: {
      activo: false,
    },
  });
}