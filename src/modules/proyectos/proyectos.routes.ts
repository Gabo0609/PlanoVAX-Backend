import { Router } from "express";
import {
  listarProyectos,
  obtenerProyecto,
  crearProyecto,
  actualizarProyecto,
  eliminarProyecto,
} from "./proyectos.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, listarProyectos);

router.get(
  "/:id",
  authMiddleware,
  obtenerProyecto
);

router.post(
  "/",
  authMiddleware,
  crearProyecto
);

router.put(
  "/:id",
  authMiddleware,
  actualizarProyecto
);

router.delete(
  "/:id",
  authMiddleware,
  eliminarProyecto
);

export default router;