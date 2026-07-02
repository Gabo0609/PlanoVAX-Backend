"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvancesTerreno = getAvancesTerreno;
exports.getAvanceTerrenoById = getAvanceTerrenoById;
exports.createAvanceTerreno = createAvanceTerreno;
exports.updateAvanceTerreno = updateAvanceTerreno;
exports.deleteAvanceTerreno = deleteAvanceTerreno;
const prisma_1 = __importDefault(require("../../config/prisma"));
function convertirFecha(fecha) {
    if (!fecha)
        return undefined;
    return new Date(`${fecha}T00:00:00`);
}
function calcularAvancePorEstado(estado) {
    if (estado === "COMPLETADA")
        return 100;
    if (estado === "NO_INICIADA")
        return 0;
    return 0;
}
async function getAvancesTerreno() {
    return prisma_1.default.avanceTerreno.findMany({
        include: {
            actividad: true,
            proyecto: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
}
async function getAvanceTerrenoById(id) {
    return prisma_1.default.avanceTerreno.findUnique({
        where: { id },
        include: {
            actividad: true,
            proyecto: true,
        },
    });
}
async function createAvanceTerreno(data) {
    const estado = data.estado ?? "NO_INICIADA";
    const avance = calcularAvancePorEstado(estado);
    return prisma_1.default.avanceTerreno.upsert({
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
async function updateAvanceTerreno(id, data) {
    const estado = data.estado;
    return prisma_1.default.avanceTerreno.update({
        where: { id },
        data: {
            fechaInicio: data.fechaInicio === null ? null : convertirFecha(data.fechaInicio),
            fechaTermino: data.fechaTermino === null ? null : convertirFecha(data.fechaTermino),
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
async function deleteAvanceTerreno(id) {
    return prisma_1.default.avanceTerreno.delete({
        where: { id },
    });
}
//# sourceMappingURL=avance-terreno.service.js.map