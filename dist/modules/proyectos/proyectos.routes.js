"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proyectos_controller_1 = require("./proyectos.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authMiddleware, proyectos_controller_1.listarProyectos);
router.get("/:id", auth_middleware_1.authMiddleware, proyectos_controller_1.obtenerProyecto);
router.post("/", auth_middleware_1.authMiddleware, proyectos_controller_1.crearProyecto);
router.put("/:id", auth_middleware_1.authMiddleware, proyectos_controller_1.actualizarProyecto);
router.delete("/:id", auth_middleware_1.authMiddleware, proyectos_controller_1.eliminarProyecto);
exports.default = router;
//# sourceMappingURL=proyectos.routes.js.map