"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lookahead_controller_1 = require("./lookahead.controller");
const router = (0, express_1.Router)();
router.get("/catalogos", lookahead_controller_1.obtenerCatalogosLookahead);
router.get("/resumen", lookahead_controller_1.obtenerResumenLookahead);
router.get("/", lookahead_controller_1.listarLookahead);
router.get("/:id", lookahead_controller_1.obtenerLookahead);
router.post("/", lookahead_controller_1.crearLookahead);
router.put("/:id", lookahead_controller_1.actualizarLookahead);
router.delete("/:id", lookahead_controller_1.eliminarLookahead);
exports.default = router;
//# sourceMappingURL=lookahead.routes.js.map