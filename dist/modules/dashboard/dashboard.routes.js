"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const router = (0, express_1.Router)();
router.get("/resumen", dashboard_controller_1.obtenerResumenDashboard);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map