"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCatalogosLookahead = obtenerCatalogosLookahead;
exports.listarLookahead = listarLookahead;
exports.obtenerLookahead = obtenerLookahead;
exports.crearLookahead = crearLookahead;
exports.actualizarLookahead = actualizarLookahead;
exports.eliminarLookahead = eliminarLookahead;
exports.obtenerResumenLookahead = obtenerResumenLookahead;
const lookahead_service_1 = require("./lookahead.service");
function getParamId(req) {
    return String(req.params.id);
}
async function obtenerCatalogosLookahead(req, res) {
    try {
        const data = await (0, lookahead_service_1.getCatalogosLookahead)();
        res.json({
            message: "Catálogos lookahead obtenidos correctamente",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener catálogos lookahead",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function listarLookahead(req, res) {
    try {
        const data = await (0, lookahead_service_1.getLookaheads)();
        res.json({
            message: "Lookahead obtenido correctamente",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener lookahead",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function obtenerLookahead(req, res) {
    try {
        const id = getParamId(req);
        const data = await (0, lookahead_service_1.getLookaheadById)(id);
        if (!data) {
            return res.status(404).json({
                message: "Registro lookahead no encontrado",
            });
        }
        res.json({
            message: "Registro lookahead obtenido correctamente",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener registro lookahead",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function crearLookahead(req, res) {
    try {
        const data = await (0, lookahead_service_1.createLookahead)(req.body);
        res.status(201).json({
            message: "Registro lookahead creado correctamente",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al crear registro lookahead",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function actualizarLookahead(req, res) {
    try {
        const id = getParamId(req);
        const data = await (0, lookahead_service_1.updateLookahead)(id, req.body);
        res.json({
            message: "Registro lookahead actualizado correctamente",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al actualizar registro lookahead",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function eliminarLookahead(req, res) {
    try {
        const id = getParamId(req);
        await (0, lookahead_service_1.deleteLookahead)(id);
        res.json({
            message: "Registro lookahead eliminado correctamente",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al eliminar registro lookahead",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function obtenerResumenLookahead(req, res) {
    try {
        const data = await (0, lookahead_service_1.getResumenLookahead)();
        res.json({
            message: "Resumen lookahead obtenido correctamente",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener resumen lookahead",
            error: error instanceof Error ? error.message : error,
        });
    }
}
//# sourceMappingURL=lookahead.controller.js.map