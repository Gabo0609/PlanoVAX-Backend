"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarProyectos = listarProyectos;
exports.obtenerProyecto = obtenerProyecto;
exports.crearProyecto = crearProyecto;
exports.actualizarProyecto = actualizarProyecto;
exports.eliminarProyecto = eliminarProyecto;
const proyectos_service_1 = require("./proyectos.service");
async function listarProyectos(req, res) {
    try {
        const proyectos = await (0, proyectos_service_1.getAllProyectos)();
        res.json({
            total: proyectos.length,
            data: proyectos,
        });
    }
    catch {
        res.status(500).json({
            message: "Error al obtener proyectos",
        });
    }
}
async function obtenerProyecto(req, res) {
    try {
        const id = String(req.params.id);
        const proyecto = await (0, proyectos_service_1.getProyectoById)(id);
        if (!proyecto) {
            return res.status(404).json({
                message: "Proyecto no encontrado",
            });
        }
        res.json({
            data: proyecto,
        });
    }
    catch {
        res.status(500).json({
            message: "Error al obtener proyecto",
        });
    }
}
async function crearProyecto(req, res) {
    try {
        const proyecto = await (0, proyectos_service_1.createProyecto)(req.body);
        res.status(201).json({
            message: "Proyecto creado correctamente",
            data: proyecto,
        });
    }
    catch {
        res.status(400).json({
            message: "Error al crear proyecto",
        });
    }
}
async function actualizarProyecto(req, res) {
    try {
        const id = String(req.params.id);
        const proyecto = await (0, proyectos_service_1.updateProyecto)(id, req.body);
        res.json({
            message: "Proyecto actualizado",
            data: proyecto,
        });
    }
    catch {
        res.status(400).json({
            message: "Error al actualizar proyecto",
        });
    }
}
async function eliminarProyecto(req, res) {
    try {
        const id = String(req.params.id);
        await (0, proyectos_service_1.deleteProyecto)(id);
        res.json({
            message: "Proyecto eliminado",
        });
    }
    catch {
        res.status(400).json({
            message: "Error al eliminar proyecto",
        });
    }
}
//# sourceMappingURL=proyectos.controller.js.map