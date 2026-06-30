import prisma from "../../config/prisma";

type EstadoCalculado =
  | "EN_PROCESO"
  | "COMPLETADA"
  | "ATRASADA"
  | "NO_INICIADA";

interface CrearPlanSemanalDTO {
  semana: string;
  avanceProgramado: number;
  avanceReal?: number;
  fechaInicio?: string;
  fechaTermino?: string;
  responsable?: string;
  comentario?: string;
  actividadId: string;
  proyectoId: string;
  tipoCncId?: string | null;
}

interface ActualizarPlanSemanalDTO {
  semana?: string;
  avanceProgramado?: number;
  avanceReal?: number;
  fechaInicio?: string | null;
  fechaTermino?: string | null;
  responsable?: string | null;
  comentario?: string | null;
  actividadId?: string;
  proyectoId?: string;
  tipoCncId?: string | null;
}

function calcularPorcentaje(avanceProgramado: number, avanceReal: number) {
  if (!avanceProgramado || avanceProgramado <= 0) {
    return 0;
  }

  const porcentaje = Math.round((avanceReal / avanceProgramado) * 100);

  if (porcentaje > 100) {
    return 100;
  }

  return porcentaje;
}

function calcularEstado(
  avanceProgramado: number,
  avanceReal: number
): EstadoCalculado {
  if (avanceProgramado > 0 && avanceReal >= avanceProgramado) {
    return "COMPLETADA";
  }

  if (avanceReal > 0 && avanceReal < avanceProgramado) {
    return "EN_PROCESO";
  }

  if (avanceReal === 0) {
    return "NO_INICIADA";
  }

  return "EN_PROCESO";
}

function convertirFecha(fecha?: string | null) {
  if (!fecha) {
    return undefined;
  }

  return new Date(`${fecha}T00:00:00`);
}

function formatearPlan(plan: any) {
  const avanceReal = plan.avanceReal ?? 0;

  return {
    ...plan,
    avanceReal,
    porcentajeReal: calcularPorcentaje(plan.avanceProgramado, avanceReal),
    avanceSemanal: calcularPorcentaje(plan.avanceProgramado, avanceReal),
    estado: calcularEstado(plan.avanceProgramado, avanceReal),
    totalAdjuntos: plan.adjuntos?.length || 0,
  };
}

export async function getCatalogosPlanSemanal() {
  const [proyectos, actividades, tiposCnc] = await Promise.all([
    prisma.proyecto.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
    }),
 prisma.actividad.findMany({
  where: { activo: true },
  orderBy: { createdAt: "asc" },
}),

    prisma.tipoCnc.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
    }),
  ]);

  return {
    proyectos,
    actividades,
    tiposCnc,
  };
}

export async function getPlanesSemanales() {
  const planes = await prisma.planSemanal.findMany({
    include: {
      actividad: true,
      proyecto: true,
      tipoCnc: true,
      adjuntos: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return planes.map(formatearPlan);
}

export async function getPlanSemanalById(id: string) {
  const plan = await prisma.planSemanal.findUnique({
    where: { id },
    include: {
      actividad: true,
      proyecto: true,
      tipoCnc: true,
      adjuntos: true,
    },
  });

  if (!plan) {
    return null;
  }

  return formatearPlan(plan);
}

export async function createPlanSemanal(data: CrearPlanSemanalDTO) {
  const plan = await prisma.planSemanal.create({
    data: {
      semana: data.semana,
      avanceProgramado: data.avanceProgramado,
      avanceReal: data.avanceReal ?? 0,
      fechaInicio: convertirFecha(data.fechaInicio),
      fechaTermino: convertirFecha(data.fechaTermino),
      responsable: data.responsable,
      comentario: data.comentario,
      actividadId: data.actividadId,
      proyectoId: data.proyectoId,
      tipoCncId: data.tipoCncId ?? null,
    },
    include: {
      actividad: true,
      proyecto: true,
      tipoCnc: true,
      adjuntos: true,
    },
  });

  return formatearPlan(plan);
}

export async function updatePlanSemanal(
  id: string,
  data: ActualizarPlanSemanalDTO
) {
  const plan = await prisma.planSemanal.update({
    where: { id },
    data: {
      semana: data.semana,
      avanceProgramado: data.avanceProgramado,
      avanceReal: data.avanceReal,
      fechaInicio:
        data.fechaInicio === null ? null : convertirFecha(data.fechaInicio),
      fechaTermino:
        data.fechaTermino === null ? null : convertirFecha(data.fechaTermino),
      responsable: data.responsable,
      comentario: data.comentario,
      actividadId: data.actividadId,
      proyectoId: data.proyectoId,
      tipoCncId: data.tipoCncId,
    },
    include: {
      actividad: true,
      proyecto: true,
      tipoCnc: true,
      adjuntos: true,
    },
  });

  return formatearPlan(plan);
}

export async function deletePlanSemanal(id: string) {
  return prisma.planSemanal.delete({
    where: { id },
  });
}

export async function createPlanSemanalAdjunto(data: {
  planSemanalId: string;
  url: string;
  nombreArchivo?: string;
  tipoArchivo?: string;
}) {
  const plan = await prisma.planSemanal.findUnique({
    where: { id: data.planSemanalId },
  });

  if (!plan) {
    throw new Error("Plan semanal no encontrado");
  }

  return prisma.planSemanalAdjunto.create({
    data: {
      planSemanalId: data.planSemanalId,
      url: data.url,
      nombreArchivo: data.nombreArchivo,
      tipoArchivo: data.tipoArchivo,
    },
  });
}