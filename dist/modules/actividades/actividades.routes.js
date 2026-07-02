"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividades_controller_1 = require("./actividades.controller");
const router = (0, express_1.Router)();
router.get("/", actividades_controller_1.listarActividades);
router.get("/:id", actividades_controller_1.obtenerActividad);
router.post("/", actividades_controller_1.crearActividad);
router.put("/:id", actividades_controller_1.actualizarActividad);
router.delete("/:id", actividades_controller_1.eliminarActividad);
exports.default = router;
//# sourceMappingURL=actividades.routes.js.map