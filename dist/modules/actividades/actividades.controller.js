"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarActividades = listarActividades;
exports.obtenerActividad = obtenerActividad;
exports.crearActividad = crearActividad;
exports.actualizarActividad = actualizarActividad;
exports.eliminarActividad = eliminarActividad;
const actividades_service_1 = require("./actividades.service");
async function listarActividades(req, res) {
    try {
        const actividades = await (0, actividades_service_1.getActividades)();
        res.json({
            total: actividades.length,
            data: actividades,
        });
    }
    catch (error) {
        console.error("Error listarActividades:", error);
        res.status(500).json({
            message: "Error al obtener actividades",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function obtenerActividad(req, res) {
    try {
        const actividad = await (0, actividades_service_1.getActividadById)(String(req.params.id));
        if (!actividad) {
            return res.status(404).json({
                message: "Actividad no encontrada",
            });
        }
        res.json({
            data: actividad,
        });
    }
    catch (error) {
        console.error("Error obtenerActividad:", error);
        res.status(500).json({
            message: "Error al obtener actividad",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function crearActividad(req, res) {
    try {
        const actividad = await (0, actividades_service_1.createActividad)(req.body);
        res.status(201).json({
            message: "Actividad creada correctamente",
            data: actividad,
        });
    }
    catch (error) {
        console.error("Error crearActividad:", error);
        res.status(400).json({
            message: "Error al crear actividad",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function actualizarActividad(req, res) {
    try {
        const actividad = await (0, actividades_service_1.updateActividad)(String(req.params.id), req.body);
        res.json({
            message: "Actividad actualizada correctamente",
            data: actividad,
        });
    }
    catch (error) {
        console.error("Error actualizarActividad:", error);
        res.status(400).json({
            message: "Error al actualizar actividad",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function eliminarActividad(req, res) {
    try {
        await (0, actividades_service_1.deleteActividad)(String(req.params.id));
        res.json({
            message: "Actividad desactivada correctamente",
        });
    }
    catch (error) {
        console.error("Error eliminarActividad:", error);
        res.status(400).json({
            message: "Error al eliminar actividad",
            error: error instanceof Error ? error.message : error,
        });
    }
}
//# sourceMappingURL=actividades.controller.js.map