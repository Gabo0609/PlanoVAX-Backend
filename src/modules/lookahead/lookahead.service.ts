import prisma from "../../config/prisma";
import {
  EstadoLiberacionLookahead,
  EstadoRestriccionesLookahead,
} from "@prisma/client";

interface CrearLookaheadDTO {
  semana: string;
  actividadId: string;
  viviendaId: string;
  proyectoId: string;
  responsable?: string | null;
  fechaInicioTentativa?: string | null;
  fechaTerminoTentativa?: string | null;
  restriccionesAsociadas?: string | null;
  observacion?: string | null;
  estadoRestricciones?: EstadoRestriccionesLookahead;
  estadoLiberacion?: EstadoLiberacionLookahead;
}

interface ActualizarLookaheadDTO {
  semana?: string;
  actividadId?: string;
  viviendaId?: string;
  proyectoId?: string;
  responsable?: string | null;
  fechaInicioTentativa?: string | null;
  fechaTerminoTentativa?: string | null;
  restriccionesAsociadas?: string | null;
  observacion?: string | null;
  estadoRestricciones?: EstadoRestriccionesLookahead;
  estadoLiberacion?: EstadoLiberacionLookahead;
}

function convertirFecha(fecha?: string | null) {
  if (!fecha) return undefined;
  return new Date(`${fecha}T00:00:00`);
}

function calcularPorcentaje(parte: number, total: number) {
  if (!total || total <= 0) return 0;
  return Math.round((parte / total) * 100);
}

export async function getCatalogosLookahead() {
  const [proyectos, actividades, viviendas] = await Promise.all([
    prisma.proyecto.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
    }),
    prisma.actividad.findMany({
      where: { activo: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.vivienda.findMany({
      where: { activo: true },
      orderBy: [{ zona: "asc" }, { numero: "asc" }],
    }),
  ]);

  return {
    proyectos,
    actividades,
    viviendas,
    zonas: Array.from(new Set(viviendas.map((v) => v.zona))).sort(),
  };
}

export async function getLookaheads() {
  return prisma.lookahead.findMany({
    include: {
      actividad: true,
      vivienda: true,
      proyecto: true,
    },
    orderBy: [{ semana: "asc" }, { createdAt: "desc" }],
  });
}

export async function getLookaheadById(id: string) {
  return prisma.lookahead.findUnique({
    where: { id },
    include: {
      actividad: true,
      vivienda: true,
      proyecto: true,
    },
  });
}

export async function createLookahead(data: CrearLookaheadDTO) {
  return prisma.lookahead.create({
    data: {
      semana: data.semana,
      responsable: data.responsable,
      fechaInicioTentativa: convertirFecha(data.fechaInicioTentativa),
      fechaTerminoTentativa: convertirFecha(data.fechaTerminoTentativa),
      restriccionesAsociadas: data.restriccionesAsociadas,
      observacion: data.observacion,
      estadoRestricciones:
        data.estadoRestricciones ??
        EstadoRestriccionesLookahead.SIN_RESTRICCIONES,
      estadoLiberacion:
        data.estadoLiberacion ?? EstadoLiberacionLookahead.NO_LIBERADA,
      actividadId: data.actividadId,
      viviendaId: data.viviendaId,
      proyectoId: data.proyectoId,
    },
    include: {
      actividad: true,
      vivienda: true,
      proyecto: true,
    },
  });
}

export async function updateLookahead(id: string, data: ActualizarLookaheadDTO) {
  return prisma.lookahead.update({
    where: { id },
    data: {
      semana: data.semana,
      responsable: data.responsable,
      fechaInicioTentativa:
        data.fechaInicioTentativa === null
          ? null
          : convertirFecha(data.fechaInicioTentativa),
      fechaTerminoTentativa:
        data.fechaTerminoTentativa === null
          ? null
          : convertirFecha(data.fechaTerminoTentativa),
      restriccionesAsociadas: data.restriccionesAsociadas,
      observacion: data.observacion,
      estadoRestricciones: data.estadoRestricciones,
      estadoLiberacion: data.estadoLiberacion,
      actividadId: data.actividadId,
      viviendaId: data.viviendaId,
      proyectoId: data.proyectoId,
    },
    include: {
      actividad: true,
      vivienda: true,
      proyecto: true,
    },
  });
}

export async function deleteLookahead(id: string) {
  return prisma.lookahead.delete({
    where: { id },
  });
}

export async function getResumenLookahead() {
  const lookaheads = await prisma.lookahead.findMany();

  const total = lookaheads.length;

  const liberadas = lookaheads.filter(
    (l) => l.estadoLiberacion === "LIBERADA"
  ).length;

  const noLiberadas = lookaheads.filter(
    (l) => l.estadoLiberacion === "NO_LIBERADA"
  ).length;

  const programadas = lookaheads.filter(
    (l) => l.estadoLiberacion === "PROGRAMADA"
  ).length;

  const sinRestricciones = lookaheads.filter(
    (l) => l.estadoRestricciones === "SIN_RESTRICCIONES"
  ).length;

  const enGestion = lookaheads.filter(
    (l) => l.estadoRestricciones === "EN_GESTION"
  ).length;

  const restriccionesLiberadas = lookaheads.filter(
    (l) => l.estadoRestricciones === "LIBERADA"
  ).length;

  const vencidas = lookaheads.filter(
    (l) => l.estadoRestricciones === "VENCIDA"
  ).length;

  return {
    total,
    liberadas,
    noLiberadas,
    programadas,
    sinRestricciones,
    enGestion,
    restriccionesLiberadas,
    vencidas,
    porcentajeLiberadas: calcularPorcentaje(liberadas, total),
    porcentajeNoLiberadas: calcularPorcentaje(noLiberadas, total),
    porcentajeProgramadas: calcularPorcentaje(programadas, total),
    porcentajeEnGestion: calcularPorcentaje(enGestion, total),
    porcentajeVencidas: calcularPorcentaje(vencidas, total),
  };
}