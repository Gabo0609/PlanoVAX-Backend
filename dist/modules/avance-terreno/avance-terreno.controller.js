"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarAvancesTerreno = listarAvancesTerreno;
exports.obtenerAvanceTerreno = obtenerAvanceTerreno;
exports.crearAvanceTerreno = crearAvanceTerreno;
exports.actualizarAvanceTerreno = actualizarAvanceTerreno;
exports.eliminarAvanceTerreno = eliminarAvanceTerreno;
const avance_terreno_service_1 = require("./avance-terreno.service");
async function listarAvancesTerreno(req, res) {
    try {
        const avances = await (0, avance_terreno_service_1.getAvancesTerreno)();
        res.json({
            total: avances.length,
            data: avances,
        });
    }
    catch (error) {
        console.error("Error listarAvancesTerreno:", error);
        res.status(500).json({
            message: "Error al obtener avances de terreno",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function obtenerAvanceTerreno(req, res) {
    try {
        const avance = await (0, avance_terreno_service_1.getAvanceTerrenoById)(String(req.params.id));
        if (!avance) {
            return res.status(404).json({
                message: "Avance de terreno no encontrado",
            });
        }
        res.json({
            data: avance,
        });
    }
    catch (error) {
        console.error("Error obtenerAvanceTerreno:", error);
        res.status(500).json({
            message: "Error al obtener avance de terreno",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function crearAvanceTerreno(req, res) {
    try {
        const avance = await (0, avance_terreno_service_1.createAvanceTerreno)(req.body);
        res.status(201).json({
            message: "Avance de terreno guardado correctamente",
            data: avance,
        });
    }
    catch (error) {
        console.error("Error crearAvanceTerreno:", error);
        res.status(400).json({
            message: "Error al guardar avance de terreno",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function actualizarAvanceTerreno(req, res) {
    try {
        const avance = await (0, avance_terreno_service_1.updateAvanceTerreno)(String(req.params.id), req.body);
        res.json({
            message: "Avance de terreno actualizado correctamente",
            data: avance,
        });
    }
    catch (error) {
        console.error("Error actualizarAvanceTerreno:", error);
        res.status(400).json({
            message: "Error al actualizar avance de terreno",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function eliminarAvanceTerreno(req, res) {
    try {
        await (0, avance_terreno_service_1.deleteAvanceTerreno)(String(req.params.id));
        res.json({
            message: "Avance de terreno eliminado correctamente",
        });
    }
    catch (error) {
        console.error("Error eliminarAvanceTerreno:", error);
        res.status(400).json({
            message: "Error al eliminar avance de terreno",
            error: error instanceof Error ? error.message : error,
        });
    }
}
//# sourceMappingURL=avance-terreno.controller.js.map