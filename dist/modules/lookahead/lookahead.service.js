"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatalogosLookahead = getCatalogosLookahead;
exports.getLookaheads = getLookaheads;
exports.getLookaheadById = getLookaheadById;
exports.createLookahead = createLookahead;
exports.updateLookahead = updateLookahead;
exports.deleteLookahead = deleteLookahead;
exports.getResumenLookahead = getResumenLookahead;
const prisma_1 = __importDefault(require("../../config/prisma"));
const client_1 = require("@prisma/client");
function convertirFecha(fecha) {
    if (!fecha)
        return undefined;
    return new Date(`${fecha}T00:00:00`);
}
function calcularPorcentaje(parte, total) {
    if (!total || total <= 0)
        return 0;
    return Math.round((parte / total) * 100);
}
async function getCatalogosLookahead() {
    const [proyectos, actividades, viviendas] = await Promise.all([
        prisma_1.default.proyecto.findMany({
            where: { activo: true },
            orderBy: { nombre: "asc" },
        }),
        prisma_1.default.actividad.findMany({
            where: { activo: true },
            orderBy: { createdAt: "asc" },
        }),
        prisma_1.default.vivienda.findMany({
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
async function getLookaheads() {
    return prisma_1.default.lookahead.findMany({
        include: {
            actividad: true,
            vivienda: true,
            proyecto: true,
        },
        orderBy: [{ semana: "asc" }, { createdAt: "desc" }],
    });
}
async function getLookaheadById(id) {
    return prisma_1.default.lookahead.findUnique({
        where: { id },
        include: {
            actividad: true,
            vivienda: true,
            proyecto: true,
        },
    });
}
async function createLookahead(data) {
    return prisma_1.default.lookahead.create({
        data: {
            semana: data.semana,
            responsable: data.responsable,
            fechaInicioTentativa: convertirFecha(data.fechaInicioTentativa),
            fechaTerminoTentativa: convertirFecha(data.fechaTerminoTentativa),
            restriccionesAsociadas: data.restriccionesAsociadas,
            observacion: data.observacion,
            estadoRestricciones: data.estadoRestricciones ??
                client_1.EstadoRestriccionesLookahead.SIN_RESTRICCIONES,
            estadoLiberacion: data.estadoLiberacion ?? client_1.EstadoLiberacionLookahead.NO_LIBERADA,
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
async function updateLookahead(id, data) {
    return prisma_1.default.lookahead.update({
        where: { id },
        data: {
            semana: data.semana,
            responsable: data.responsable,
            fechaInicioTentativa: data.fechaInicioTentativa === null
                ? null
                : convertirFecha(data.fechaInicioTentativa),
            fechaTerminoTentativa: data.fechaTerminoTentativa === null
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
async function deleteLookahead(id) {
    return prisma_1.default.lookahead.delete({
        where: { id },
    });
}
async function getResumenLookahead() {
    const lookaheads = await prisma_1.default.lookahead.findMany();
    const total = lookaheads.length;
    const liberadas = lookaheads.filter((l) => l.estadoLiberacion === "LIBERADA").length;
    const noLiberadas = lookaheads.filter((l) => l.estadoLiberacion === "NO_LIBERADA").length;
    const programadas = lookaheads.filter((l) => l.estadoLiberacion === "PROGRAMADA").length;
    const sinRestricciones = lookaheads.filter((l) => l.estadoRestricciones === "SIN_RESTRICCIONES").length;
    const enGestion = lookaheads.filter((l) => l.estadoRestricciones === "EN_GESTION").length;
    const restriccionesLiberadas = lookaheads.filter((l) => l.estadoRestricciones === "LIBERADA").length;
    const vencidas = lookaheads.filter((l) => l.estadoRestricciones === "VENCIDA").length;
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
//# sourceMappingURL=lookahead.service.js.map