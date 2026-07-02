"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restricciones_controller_1 = require("./restricciones.controller");
const router = (0, express_1.Router)();
router.get("/", restricciones_controller_1.listarRestricciones);
router.get("/:id", restricciones_controller_1.obtenerRestriccion);
router.post("/", restricciones_controller_1.crearRestriccion);
router.put("/:id", restricciones_controller_1.actualizarRestriccion);
router.delete("/:id", restricciones_controller_1.eliminarRestriccion);
exports.default = router;
//# sourceMappingURL=restricciones.routes.js.map