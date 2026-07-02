"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProyectos = getAllProyectos;
exports.getProyectoById = getProyectoById;
exports.createProyecto = createProyecto;
exports.updateProyecto = updateProyecto;
exports.deleteProyecto = deleteProyecto;
const prisma_1 = __importDefault(require("../../config/prisma"));
async function getAllProyectos() {
    return prisma_1.default.proyecto.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}
async function getProyectoById(id) {
    return prisma_1.default.proyecto.findUnique({
        where: { id },
    });
}
async function createProyecto(data) {
    return prisma_1.default.proyecto.create({
        data,
    });
}
async function updateProyecto(id, data) {
    return prisma_1.default.proyecto.update({
        where: { id },
        data,
    });
}
async function deleteProyecto(id) {
    return prisma_1.default.proyecto.delete({
        where: { id },
    });
}
//# sourceMappingURL=proyectos.service.js.map