"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActividades = getActividades;
exports.getActividadById = getActividadById;
exports.createActividad = createActividad;
exports.updateActividad = updateActividad;
exports.deleteActividad = deleteActividad;
const prisma_1 = __importDefault(require("../../config/prisma"));
async function getActividades() {
    return prisma_1.default.actividad.findMany({
        orderBy: {
            createdAt: "asc",
        },
    });
}
async function getActividadById(id) {
    return prisma_1.default.actividad.findUnique({
        where: { id },
    });
}
async function createActividad(data) {
    return prisma_1.default.actividad.create({
        data: {
            nombre: data.nombre,
            activo: data.activo ?? true,
        },
    });
}
async function updateActividad(id, data) {
    return prisma_1.default.actividad.update({
        where: { id },
        data: {
            nombre: data.nombre,
            activo: data.activo,
        },
    });
}
async function deleteActividad(id) {
    return prisma_1.default.actividad.update({
        where: { id },
        data: {
            activo: false,
        },
    });
}
//# sourceMappingURL=actividades.service.js.map