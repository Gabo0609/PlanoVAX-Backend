"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avance_terreno_controller_1 = require("./avance-terreno.controller");
const router = (0, express_1.Router)();
router.get("/", avance_terreno_controller_1.listarAvancesTerreno);
router.get("/:id", avance_terreno_controller_1.obtenerAvanceTerreno);
router.post("/", avance_terreno_controller_1.crearAvanceTerreno);
router.put("/:id", avance_terreno_controller_1.actualizarAvanceTerreno);
router.delete("/:id", avance_terreno_controller_1.eliminarAvanceTerreno);
exports.default = router;
//# sourceMappingURL=avance-terreno.routes.js.map