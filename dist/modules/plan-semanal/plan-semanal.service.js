"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatalogosPlanSemanal = getCatalogosPlanSemanal;
exports.getPlanesSemanales = getPlanesSemanales;
exports.getPlanSemanalById = getPlanSemanalById;
exports.createPlanSemanal = createPlanSemanal;
exports.updatePlanSemanal = updatePlanSemanal;
exports.deletePlanSemanal = deletePlanSemanal;
exports.createPlanSemanalAdjunto = createPlanSemanalAdjunto;
const prisma_1 = __importDefault(require("../../config/prisma"));
function calcularPorcentaje(avanceProgramado, avanceReal) {
    if (!avanceProgramado || avanceProgramado <= 0) {
        return 0;
    }
    const porcentaje = Math.round((avanceReal / avanceProgramado) * 100);
    if (porcentaje > 100) {
        return 100;
    }
    return porcentaje;
}
function calcularEstado(avanceProgramado, avanceReal) {
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
function convertirFecha(fecha) {
    if (!fecha) {
        return undefined;
    }
    return new Date(`${fecha}T00:00:00`);
}
function formatearPlan(plan) {
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
async function getCatalogosPlanSemanal() {
    const [proyectos, actividades, tiposCnc] = await Promise.all([
        prisma_1.default.proyecto.findMany({
            where: { activo: true },
            orderBy: { nombre: "asc" },
        }),
        prisma_1.default.actividad.findMany({
            where: { activo: true },
            orderBy: { createdAt: "asc" },
        }),
        prisma_1.default.tipoCnc.findMany({
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
async function getPlanesSemanales() {
    const planes = await prisma_1.default.planSemanal.findMany({
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
async function getPlanSemanalById(id) {
    const plan = await prisma_1.default.planSemanal.findUnique({
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
async function createPlanSemanal(data) {
    const plan = await prisma_1.default.planSemanal.create({
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
async function updatePlanSemanal(id, data) {
    const plan = await prisma_1.default.planSemanal.update({
        where: { id },
        data: {
            semana: data.semana,
            avanceProgramado: data.avanceProgramado,
            avanceReal: data.avanceReal,
            fechaInicio: data.fechaInicio === null ? null : convertirFecha(data.fechaInicio),
            fechaTermino: data.fechaTermino === null ? null : convertirFecha(data.fechaTermino),
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
async function deletePlanSemanal(id) {
    return prisma_1.default.planSemanal.delete({
        where: { id },
    });
}
async function createPlanSemanalAdjunto(data) {
    const plan = await prisma_1.default.planSemanal.findUnique({
        where: { id: data.planSemanalId },
    });
    if (!plan) {
        throw new Error("Plan semanal no encontrado");
    }
    return prisma_1.default.planSemanalAdjunto.create({
        data: {
            planSemanalId: data.planSemanalId,
            url: data.url,
            nombreArchivo: data.nombreArchivo,
            tipoArchivo: data.tipoArchivo,
        },
    });
}
//# sourceMappingURL=plan-semanal.service.js.map