"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestricciones = getRestricciones;
exports.getRestriccionById = getRestriccionById;
exports.createRestriccion = createRestriccion;
exports.updateRestriccion = updateRestriccion;
exports.deleteRestriccion = deleteRestriccion;
const prisma_1 = __importDefault(require("../../config/prisma"));
async function getRestricciones() {
    return prisma_1.default.restriccion.findMany({
        include: {
            tipoRestriccion: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}
async function getRestriccionById(id) {
    return prisma_1.default.restriccion.findUnique({
        where: { id },
        include: {
            tipoRestriccion: true,
        },
    });
}
async function createRestriccion(data) {
    return prisma_1.default.restriccion.create({
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
async function updateRestriccion(id, data) {
    return prisma_1.default.restriccion.update({
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
async function deleteRestriccion(id) {
    return prisma_1.default.restriccion.delete({
        where: { id },
    });
}
//# sourceMappingURL=restricciones.service.js.map