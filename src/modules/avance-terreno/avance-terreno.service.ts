import prisma from "../../config/prisma";
import { EstadoActividad } from "@prisma/client";

interface CrearAvanceTerrenoDTO {
  actividadId: string;
  proyectoId: string;
  fechaInicio?: string | null;
  fechaTermino?: string | null;
  estado?: EstadoActividad;
  comentario?: string | null;
}

interface ActualizarAvanceTerrenoDTO {
  fechaInicio?: string | null;
  fechaTermino?: string | null;
  estado?: EstadoActividad;
  comentario?: string | null;
}

function convertirFecha(fecha?: string | null) {
  if (!fecha) return undefined;
  return new Date(`${fecha}T00:00:00`);
}

function calcularAvancePorEstado(estado: EstadoActividad) {
  if (estado === "COMPLETADA") return 100;
  if (estado === "NO_INICIADA") return 0;

  return 0;
}

export async function getAvancesTerreno() {
  return prisma.avanceTerreno.findMany({
    include: {
      actividad: true,
      proyecto: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getAvanceTerrenoById(id: string) {
  return prisma.avanceTerreno.findUnique({
    where: { id },
    include: {
      actividad: true,
      proyecto: true,
    },
  });
}

export async function createAvanceTerreno(data: CrearAvanceTerrenoDTO) {
  const estado = data.estado ?? "NO_INICIADA";
  const avance = calcularAvancePorEstado(estado);

  return prisma.avanceTerreno.upsert({
    where: {
      actividadId_proyectoId: {
        actividadId: data.actividadId,
        proyectoId: data.proyectoId,
      },
    },
    update: {
      fechaInicio: convertirFecha(data.fechaInicio),
      fechaTermino: convertirFecha(data.fechaTermino),
      avance,
      estado,
      comentario: data.comentario,
    },
    create: {
      actividadId: data.actividadId,
      proyectoId: data.proyectoId,
      fechaInicio: convertirFecha(data.fechaInicio),
      fechaTermino: convertirFecha(data.fechaTermino),
      avance,
      estado,
      comentario: data.comentario,
    },
    include: {
      actividad: true,
      proyecto: true,
    },
  });
}

export async function updateAvanceTerreno(
  id: string,
  data: ActualizarAvanceTerrenoDTO
) {
  const estado = data.estado;

  return prisma.avanceTerreno.update({
    where: { id },
    data: {
      fechaInicio:
        data.fechaInicio === null ? null : convertirFecha(data.fechaInicio),
      fechaTermino:
        data.fechaTermino === null ? null : convertirFecha(data.fechaTermino),
      estado,
      avance: estado ? calcularAvancePorEstado(estado) : undefined,
      comentario: data.comentario,
    },
    include: {
      actividad: true,
      proyecto: true,
    },
  });
}

export async function deleteAvanceTerreno(id: string) {
  return prisma.avanceTerreno.delete({
    where: { id },
  });
}