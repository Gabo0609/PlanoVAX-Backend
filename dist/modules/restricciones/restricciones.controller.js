"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarRestricciones = listarRestricciones;
exports.obtenerRestriccion = obtenerRestriccion;
exports.crearRestriccion = crearRestriccion;
exports.actualizarRestriccion = actualizarRestriccion;
exports.eliminarRestriccion = eliminarRestriccion;
const restricciones_service_1 = require("./restricciones.service");
async function listarRestricciones(req, res) {
    try {
        const restricciones = await (0, restricciones_service_1.getRestricciones)();
        res.json({
            total: restricciones.length,
            data: restricciones,
        });
    }
    catch (error) {
        console.error("Error listarRestricciones:", error);
        res.status(500).json({
            message: "Error al obtener restricciones",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function obtenerRestriccion(req, res) {
    try {
        const restriccion = await (0, restricciones_service_1.getRestriccionById)(String(req.params.id));
        if (!restriccion) {
            return res.status(404).json({
                message: "Restricción no encontrada",
            });
        }
        res.json(restriccion);
    }
    catch (error) {
        console.error("Error obtenerRestriccion:", error);
        res.status(500).json({
            message: "Error al obtener restricción",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function crearRestriccion(req, res) {
    try {
        const restriccion = await (0, restricciones_service_1.createRestriccion)(req.body);
        res.status(201).json(restriccion);
    }
    catch (error) {
        console.error("Error crearRestriccion:", error);
        res.status(400).json({
            message: "Error al crear restricción",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function actualizarRestriccion(req, res) {
    try {
        const restriccion = await (0, restricciones_service_1.updateRestriccion)(String(req.params.id), req.body);
        res.json(restriccion);
    }
    catch (error) {
        console.error("Error actualizarRestriccion:", error);
        res.status(400).json({
            message: "Error al actualizar restricción",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function eliminarRestriccion(req, res) {
    try {
        await (0, restricciones_service_1.deleteRestriccion)(String(req.params.id));
        res.json({
            message: "Restricción eliminada",
        });
    }
    catch (error) {
        console.error("Error eliminarRestriccion:", error);
        res.status(400).json({
            message: "Error al eliminar restricción",
            error: error instanceof Error ? error.message : error,
        });
    }
}
//# sourceMappingURL=restricciones.controller.js.map