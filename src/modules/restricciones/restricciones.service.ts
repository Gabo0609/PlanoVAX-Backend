import prisma from "../../config/prisma";

interface CrearRestriccionDTO {
  descripcion: string;
  prioridad: "IMPORTANTE" | "URGENTE";
  responsable: string;
  fechaCompromiso: string;
  estado?: "PENDIENTE" | "EN_PROCESO" | "CERRADA";
  tipoRestriccionId: string;
}

export async function getRestricciones() {
  return prisma.restriccion.findMany({
    include: {
      tipoRestriccion: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRestriccionById(id: string) {
  return prisma.restriccion.findUnique({
    where: { id },
    include: {
      tipoRestriccion: true,
    },
  });
}

export async function createRestriccion(data: CrearRestriccionDTO) {
  return prisma.restriccion.create({
    data: {
      descripcion: data.descripcion,
      prioridad: data.prioridad,
      responsable: data.responsable,
      fechaCompromiso: new Date(data.fechaCompromiso),
      estado: data.estado ?? "PENDIENTE",
      tipoRestriccionId: data.tipoRestriccionId,
    },
    include: {
      tipoRestriccion: true,
    },
  });
}

export async function updateRestriccion(
  id: string,
  data: Partial<CrearRestriccionDTO>
) {
  return prisma.restriccion.update({
    where: { id },
    data: {
      ...data,
      fechaCompromiso: data.fechaCompromiso
        ? new Date(data.fechaCompromiso)
        : undefined,
    },
    include: {
      tipoRestriccion: true,
    },
  });
}

export async function deleteRestriccion(id: string) {
  return prisma.restriccion.delete({
    where: { id },
  });
}