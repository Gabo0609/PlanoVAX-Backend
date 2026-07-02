"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerResumenDashboard = obtenerResumenDashboard;
const dashboard_service_1 = require("./dashboard.service");
async function obtenerResumenDashboard(req, res) {
    try {
        const resumen = await (0, dashboard_service_1.getDashboardResumen)();
        res.json({
            message: "Resumen dashboard obtenido correctamente",
            data: resumen,
        });
    }
    catch (error) {
        console.error("Error obtenerResumenDashboard:", error);
        res.status(500).json({
            message: "Error al obtener resumen dashboard",
            error: error instanceof Error ? error.message : error,
        });
    }
}
//# sourceMappingURL=dashboard.controller.js.map