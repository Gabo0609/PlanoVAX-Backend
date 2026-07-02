"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardResumen = getDashboardResumen;
const prisma_1 = __importDefault(require("../../config/prisma"));
function calcularEstadoPlanSemanal(plan) {
    const avanceReal = plan.avanceReal ?? 0;
    const hoy = new Date();
    if (plan.avanceProgramado > 0 && avanceReal >= plan.avanceProgramado) {
        return "COMPLETADA";
    }
    if (plan.fechaTermino &&
        new Date(plan.fechaTermino) < hoy &&
        avanceReal < plan.avanceProgramado) {
        return "ATRASADA";
    }
    if (avanceReal > 0 && avanceReal < plan.avanceProgramado) {
        return "EN_PROCESO";
    }
    return "NO_INICIADA";
}
function calcularPorcentaje(parte, total) {
    if (!total || total <= 0) {
        return 0;
    }
    const porcentaje = Math.round((parte / total) * 100);
    if (porcentaje > 100) {
        return 100;
    }
    return porcentaje;
}
function obtenerCumplimientoPorAvance(planes) {
    const avanceRealTotal = planes.reduce((total, plan) => {
        return total + (plan.avanceReal ?? 0);
    }, 0);
    const avanceProgramadoTotal = planes.reduce((total, plan) => {
        return total + (plan.avanceProgramado ?? 0);
    }, 0);
    return calcularPorcentaje(avanceRealTotal, avanceProgramadoTotal);
}
function obtenerUltimasSemanas(planes) {
    const semanasUnicas = Array.from(new Set(planes.map((plan) => plan.semana)))
        .filter(Boolean)
        .sort()
        .slice(-6);
    return semanasUnicas.map((semana, index) => {
        const planesSemana = planes.filter((plan) => plan.semana === semana);
        const avanceRealSemana = planesSemana.reduce((total, plan) => {
            return total + (plan.avanceReal ?? 0);
        }, 0);
        const avanceProgramadoSemana = planesSemana.reduce((total, plan) => {
            return total + (plan.avanceProgramado ?? 0);
        }, 0);
        const cumplimiento = calcularPorcentaje(avanceRealSemana, avanceProgramadoSemana);
        const completadas = planesSemana.filter((plan) => plan.estadoCalculado === "COMPLETADA").length;
        return {
            semana: index === semanasUnicas.length - 1
                ? "Actual"
                : `Sem -${semanasUnicas.length - 1 - index}`,
            semanaOriginal: semana,
            cumplimiento,
            total: planesSemana.length,
            completadas,
            avanceReal: avanceRealSemana,
            avanceProgramado: avanceProgramadoSemana,
        };
    });
}
async function getDashboardResumen() {
    const [planes, avancesTerreno, totalActividadesMaestras, lookaheads] = await Promise.all([
        prisma_1.default.planSemanal.findMany({
            orderBy: { semana: "asc" },
        }),
        prisma_1.default.avanceTerreno.findMany(),
        prisma_1.default.actividad.count({
            where: { activo: true },
        }),
        prisma_1.default.lookahead.findMany(),
    ]);
    const planesConEstado = planes.map((plan) => ({
        ...plan,
        avanceReal: plan.avanceReal ?? 0,
        estadoCalculado: calcularEstadoPlanSemanal(plan),
    }));
    const completadasPlanSemanal = planesConEstado.filter((plan) => plan.estadoCalculado === "COMPLETADA").length;
    const enProcesoPlanSemanal = planesConEstado.filter((plan) => plan.estadoCalculado === "EN_PROCESO").length;
    const atrasadasPlanSemanal = planesConEstado.filter((plan) => plan.estadoCalculado === "ATRASADA").length;
    const noIniciadasPlanSemanal = planesConEstado.filter((plan) => plan.estadoCalculado === "NO_INICIADA").length;
    const avancePlanSemanal = obtenerCumplimientoPorAvance(planesConEstado);
    const completadasTerreno = avancesTerreno.filter((avance) => avance.estado === "COMPLETADA").length;
    const enProcesoTerreno = avancesTerreno.filter((avance) => avance.estado === "EN_PROCESO").length;
    const atrasadasTerreno = avancesTerreno.filter((avance) => avance.estado === "ATRASADA").length;
    const noIniciadasTerreno = Math.max(totalActividadesMaestras -
        completadasTerreno -
        enProcesoTerreno -
        atrasadasTerreno, 0);
    const totalLookahead = lookaheads.length;
    const liberadasLookahead = lookaheads.filter((item) => item.estadoLiberacion === "LIBERADA").length;
    const noLiberadasLookahead = lookaheads.filter((item) => item.estadoLiberacion === "NO_LIBERADA").length;
    const programadasLookahead = lookaheads.filter((item) => item.estadoLiberacion === "PROGRAMADA").length;
    const enGestionLookahead = lookaheads.filter((item) => item.estadoRestricciones === "EN_GESTION").length;
    const vencidasLookahead = lookaheads.filter((item) => item.estadoRestricciones === "VENCIDA").length;
    const cumplimientoUltimasSemanas = obtenerUltimasSemanas(planesConEstado);
    return {
        avanceTerreno: {
            total: totalActividadesMaestras,
            registradas: avancesTerreno.length,
            completadas: completadasTerreno,
            enProceso: enProcesoTerreno,
            atrasadas: atrasadasTerreno,
            noIniciadas: noIniciadasTerreno,
            avanceGeneralObra: calcularPorcentaje(completadasTerreno, totalActividadesMaestras),
        },
        planSemanal: {
            total: planesConEstado.length,
            completadas: completadasPlanSemanal,
            enProceso: enProcesoPlanSemanal,
            atrasadas: atrasadasPlanSemanal,
            noIniciadas: noIniciadasPlanSemanal,
            avancePlanSemanal,
            totalActividadesMaestras,
            cumplimientoUltimasSemanas,
        },
        lookahead: {
            total: totalLookahead,
            liberadas: liberadasLookahead,
            noLiberadas: noLiberadasLookahead,
            programadas: programadasLookahead,
            enGestion: enGestionLookahead,
            vencidas: vencidasLookahead,
            porcentajeLiberadas: calcularPorcentaje(liberadasLookahead, totalLookahead),
            porcentajeProgramadas: calcularPorcentaje(programadasLookahead, totalLookahead),
            porcentajeEnGestion: calcularPorcentaje(enGestionLookahead, totalLookahead),
            porcentajeVencidas: calcularPorcentaje(vencidasLookahead, totalLookahead),
        },
        restricciones: null,
        rendimiento: null,
        tratos: null,
        clima: null,
        reportes: null,
    };
}
//# sourceMappingURL=dashboard.service.js.map