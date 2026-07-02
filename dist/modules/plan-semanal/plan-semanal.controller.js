"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerCatalogos = obtenerCatalogos;
exports.listarPlanes = listarPlanes;
exports.obtenerPlan = obtenerPlan;
exports.crearPlan = crearPlan;
exports.actualizarPlan = actualizarPlan;
exports.eliminarPlan = eliminarPlan;
exports.subirAdjuntoPlan = subirAdjuntoPlan;
const plan_semanal_service_1 = require("./plan-semanal.service");
async function obtenerCatalogos(req, res) {
    try {
        const catalogos = await (0, plan_semanal_service_1.getCatalogosPlanSemanal)();
        res.json({ data: catalogos });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener catálogos",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function listarPlanes(req, res) {
    try {
        const planes = await (0, plan_semanal_service_1.getPlanesSemanales)();
        res.json({ total: planes.length, data: planes });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener planes",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function obtenerPlan(req, res) {
    try {
        const plan = await (0, plan_semanal_service_1.getPlanSemanalById)(String(req.params.id));
        if (!plan) {
            return res.status(404).json({ message: "Plan no encontrado" });
        }
        res.json({ data: plan });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener plan",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function crearPlan(req, res) {
    try {
        const plan = await (0, plan_semanal_service_1.createPlanSemanal)(req.body);
        res.status(201).json({
            message: "Plan semanal creado correctamente",
            data: plan,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error al crear plan",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function actualizarPlan(req, res) {
    try {
        const plan = await (0, plan_semanal_service_1.updatePlanSemanal)(String(req.params.id), req.body);
        res.json({
            message: "Plan semanal actualizado correctamente",
            data: plan,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error al actualizar plan",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function eliminarPlan(req, res) {
    try {
        await (0, plan_semanal_service_1.deletePlanSemanal)(String(req.params.id));
        res.json({
            message: "Plan semanal eliminado correctamente",
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error al eliminar plan",
            error: error instanceof Error ? error.message : error,
        });
    }
}
async function subirAdjuntoPlan(req, res) {
    try {
        const archivo = req.file;
        if (!archivo) {
            return res.status(400).json({
                message: "No se recibió ningún archivo",
            });
        }
        const adjunto = await (0, plan_semanal_service_1.createPlanSemanalAdjunto)({
            planSemanalId: String(req.params.id),
            url: `/uploads/plan-semanal/${archivo.filename}`,
            nombreArchivo: archivo.originalname,
            tipoArchivo: archivo.mimetype,
        });
        res.status(201).json({
            message: "Adjunto guardado correctamente",
            data: adjunto,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error al guardar adjunto",
            error: error instanceof Error ? error.message : error,
        });
    }
}
//# sourceMappingURL=plan-semanal.controller.js.map